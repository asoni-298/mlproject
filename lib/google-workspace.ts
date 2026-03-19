import { Readable } from 'node:stream';
import { google } from 'googleapis';
import { portfolioData } from '@/data/portfolio-data';

const DEFAULT_TIME_ZONE = 'Asia/Kolkata';
const DEFAULT_SLOT_HOURS = [11, 15, 12, 16];

type BookingInput = {
  startIso: string;
  recruiterName: string;
  recruiterEmail?: string;
  company?: string;
  roleTitle?: string;
  notes?: string;
};

type SummaryInput = {
  recruiterName?: string;
  recruiterEmail?: string;
  company?: string;
  roleTitle?: string;
  location?: string;
  compensation?: string;
  jdLink?: string;
  attachment?: File;
  gatheredSummary: string;
};

function hasConfiguredValue(value?: string) {
  if (!value) return false;
  const normalized = value.trim();
  if (!normalized) return false;
  return !/^your[_-]/i.test(normalized);
}

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export function getGoogleWorkspaceConfigState() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const notificationEmail = getNotificationEmail();
  const oauthReady = Boolean(clientId && clientSecret && refreshToken);

  return {
    oauthReady,
    emailEnabled: oauthReady,
    calendarEnabled: oauthReady && Boolean(calendarId),
    driveEnabled: oauthReady && hasConfiguredValue(driveFolderId),
    notificationEmail,
  };
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

function getNotificationEmail() {
  return process.env.ASHISH_NOTIFICATION_EMAIL || 'engr.ashishsoni@gmail.com';
}

function buildCandidateSlots() {
  const now = new Date();
  const slots: { start: Date; end: Date }[] = [];

  for (let dayOffset = 1; dayOffset <= 10; dayOffset += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + dayOffset);
    const weekday = date.getDay();
    if (weekday === 0 || weekday === 6) continue;

    for (const hour of DEFAULT_SLOT_HOURS) {
      const start = new Date(date);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 45);
      slots.push({ start, end });
    }
  }

  return slots;
}

function formatSlot(date: Date, locale = 'en-IN') {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: DEFAULT_TIME_ZONE,
  }).format(date);
}

export async function getAvailabilitySlots() {
  const slots = buildCandidateSlots();
  const auth = getOAuthClient();

  if (!auth) {
    return {
      source: 'mock' as const,
      slots: slots.slice(0, 6).map((slot) => ({
        startIso: slot.start.toISOString(),
        endIso: slot.end.toISOString(),
        label: formatSlot(slot.start),
      })),
    };
  }

  const calendar = google.calendar({ version: 'v3', auth });
  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: slots[0]?.start.toISOString(),
      timeMax: slots[slots.length - 1]?.end.toISOString(),
      timeZone: DEFAULT_TIME_ZONE,
      items: [{ id: getCalendarId() }],
    },
  });

  const busy = freeBusy.data.calendars?.[getCalendarId()]?.busy ?? [];
  const available = slots.filter((slot) => {
    return !busy.some((interval) => {
      if (!interval.start || !interval.end) return false;
      return slot.start < new Date(interval.end) && slot.end > new Date(interval.start);
    });
  });

  return {
    source: 'google-calendar' as const,
    slots: available.slice(0, 8).map((slot) => ({
      startIso: slot.start.toISOString(),
      endIso: slot.end.toISOString(),
      label: formatSlot(slot.start),
    })),
  };
}

export async function bookCalendarSlot(input: BookingInput) {
  const auth = getOAuthClient();

  if (!auth) {
    return {
      source: 'mock' as const,
      booked: false,
      message: 'Google Calendar is not configured yet, so the slot has been noted in mock mode.',
    };
  }

  const calendar = google.calendar({ version: 'v3', auth });
  const start = new Date(input.startIso);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 45);
  const recruiter = input.recruiterName || 'Recruiter';
  const companySuffix = input.company ? ` - ${input.company}` : '';

  const event = await calendar.events.insert({
    calendarId: getCalendarId(),
    requestBody: {
      summary: `Recruiter Screening${companySuffix}`,
      description: [
        `Recruiter: ${recruiter}`,
        input.recruiterEmail ? `Email: ${input.recruiterEmail}` : null,
        input.roleTitle ? `Role: ${input.roleTitle}` : null,
        input.notes ? `Notes: ${input.notes}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      start: {
        dateTime: start.toISOString(),
        timeZone: DEFAULT_TIME_ZONE,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: DEFAULT_TIME_ZONE,
      },
      attendees: input.recruiterEmail ? [{ email: input.recruiterEmail, displayName: recruiter }] : undefined,
    },
    sendUpdates: input.recruiterEmail ? 'all' : 'none',
  });

  return {
    source: 'google-calendar' as const,
    booked: true,
    eventId: event.data.id ?? undefined,
    eventLink: event.data.htmlLink ?? undefined,
    message: `Booked for ${formatSlot(start)}.`,
  };
}

export async function uploadToDrive(file: File) {
  const auth = getOAuthClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!auth || !hasConfiguredValue(folderId)) {
    return {
      source: 'disabled' as const,
      fileLink: undefined,
      fileId: undefined,
    };
  }

  const drive = google.drive({ version: 'v3', auth });
  const buffer = Buffer.from(await file.arrayBuffer());
  const response = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [folderId],
    },
    media: {
      mimeType: file.type || 'application/octet-stream',
      body: Readable.from(buffer),
    },
    fields: 'id, webViewLink',
  });

  const fileId = response.data.id;
  if (fileId) {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  }

  return {
    source: 'google-drive' as const,
    fileId: response.data.id ?? undefined,
    fileLink: response.data.webViewLink ?? undefined,
  };
}

function encodeEmail(raw: string) {
  return Buffer.from(raw)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export async function sendRecruiterSummaryEmail(input: SummaryInput) {
  const auth = getOAuthClient();

  if (!auth) {
    return {
      source: 'disabled' as const,
      sent: false,
    };
  }

  const gmail = google.gmail({ version: 'v1', auth });
  const to = getNotificationEmail();
  const subject = `Recruiter Agent Summary${input.company ? ` - ${input.company}` : ''}`;
  const body = [
    `Candidate: ${portfolioData.personal.name}`,
    `Recruiter Name: ${input.recruiterName || 'Not captured'}`,
    `Recruiter Email: ${input.recruiterEmail || 'Not captured'}`,
    `Company: ${input.company || 'Not captured'}`,
    `Role: ${input.roleTitle || 'Not captured'}`,
    `Location: ${input.location || 'Not captured'}`,
    `Compensation Range: ${input.compensation || 'Not captured'}`,
    input.jdLink ? `JD Link: ${input.jdLink}` : 'JD Link: Not provided',
    '',
    'Conversation Summary:',
    input.gatheredSummary,
  ].join('\n');

  let raw: string;

  if (input.attachment) {
    const boundary = `boundary_${Date.now()}`;
    const attachmentBase64 = Buffer.from(await input.attachment.arrayBuffer()).toString('base64');
    raw = [
      `To: ${to}`,
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      body,
      '',
      `--${boundary}`,
      `Content-Type: ${input.attachment.type || 'application/octet-stream'}; name="${input.attachment.name}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${input.attachment.name}"`,
      '',
      attachmentBase64,
      '',
      `--${boundary}--`,
    ].join('\n');
  } else {
    raw = [
      `To: ${to}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');
  }

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodeEmail(raw),
    },
  });

  return {
    source: 'gmail' as const,
    sent: true,
  };
}
