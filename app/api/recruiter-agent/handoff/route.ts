import { GoogleGenAI } from '@google/genai';
import { buildRecruiterSummaryExtractionPrompt, type RecruiterChatMessage } from '@/lib/recruiter-agent';
import { getGoogleWorkspaceConfigState, sendRecruiterSummaryEmail, uploadToDrive } from '@/lib/google-workspace';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawMessages = String(formData.get('messages') || '[]');
    const messages = JSON.parse(rawMessages) as RecruiterChatMessage[];
    const file = formData.get('jdFile');
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { ok: false, message: 'GEMINI_API_KEY is required for recruiter summary extraction.' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    let parsed = {
      recruiterName: '',
      recruiterEmail: '',
      company: '',
      roleTitle: '',
      location: '',
      compensation: '',
      interviewProcess: '',
      jdMentioned: '',
      summary: '',
    };

    try {
      const ai = new GoogleGenAI({ apiKey });
      const extractionPrompt = buildRecruiterSummaryExtractionPrompt(messages);
      const extraction = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: extractionPrompt,
      });

      try {
        parsed = JSON.parse(extraction.text ?? '');
      } catch {
        parsed.summary = extraction.text ?? 'Summary extraction unavailable.';
      }
    } catch (error) {
      console.error('Recruiter summary extraction failed, continuing with transcript fallback', error);
      parsed.summary =
        'AI summary extraction is temporarily unavailable, so this email includes the raw recruiter conversation transcript instead.';
    }

    const configState = getGoogleWorkspaceConfigState();
    let driveResult: { fileLink?: string } | undefined;
    let driveUploadFailed = false;
    if (file instanceof File && file.size > 0) {
      try {
        driveResult = await uploadToDrive(file);
      } catch (error) {
        driveUploadFailed = true;
        console.error('Recruiter handoff Drive upload failed', error);
      }
    }

    let emailResult = { sent: false };
    let emailFailed = false;
    try {
      emailResult = await sendRecruiterSummaryEmail({
        recruiterName: parsed.recruiterName,
        recruiterEmail: parsed.recruiterEmail,
        company: parsed.company,
        roleTitle: parsed.roleTitle,
        location: parsed.location,
        compensation: parsed.compensation,
        attachment: file instanceof File && file.size > 0 ? file : undefined,
        gatheredSummary: [
          parsed.summary || 'No extracted summary available.',
          parsed.interviewProcess ? `Interview Process: ${parsed.interviewProcess}` : null,
          parsed.jdMentioned ? `JD Notes: ${parsed.jdMentioned}` : null,
          '',
          'Transcript:',
          ...messages.map((message) => `${message.role === 'user' ? 'Recruiter' : 'Assistant'}: ${message.content}`),
        ]
          .filter(Boolean)
          .join('\n'),
        jdLink: driveResult?.fileLink,
      });
    } catch (error) {
      emailFailed = true;
      console.error('Recruiter handoff summary email failed', error);
    }

    return Response.json(
      {
        ok: true,
        driveLink: driveResult?.fileLink,
        emailed: emailResult.sent,
        driveEnabled: configState.driveEnabled,
        emailConfigured: configState.emailEnabled,
        driveUploadFailed,
        emailFailed,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('Recruiter handoff failed', error);
    return Response.json(
      { ok: false, message: 'Unable to hand off recruiter details right now.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
