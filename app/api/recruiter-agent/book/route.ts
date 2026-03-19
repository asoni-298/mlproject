import { bookCalendarSlot, sendRecruiterSummaryEmail } from '@/lib/google-workspace';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const booking = await bookCalendarSlot({
      startIso: body.startIso,
      recruiterName: body.recruiterName,
      recruiterEmail: body.recruiterEmail,
      company: body.company,
      roleTitle: body.roleTitle,
      notes: body.notes,
    });

    let emailStatus: 'sent' | 'failed' | 'disabled' = 'disabled';

    try {
      const emailResult = await sendRecruiterSummaryEmail({
        recruiterName: body.recruiterName,
        recruiterEmail: body.recruiterEmail,
        company: body.company,
        roleTitle: body.roleTitle,
        location: body.location,
        compensation: body.compensation,
        gatheredSummary: [
          `Interview slot request: ${body.startIso}`,
          body.notes ? `Notes: ${body.notes}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
      });
      emailStatus = emailResult.sent ? 'sent' : 'disabled';
    } catch (error) {
      emailStatus = 'failed';
      console.error('Recruiter booking summary email failed', error);
    }

    return Response.json(
      {
        ok: true,
        booking,
        emailStatus,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('Recruiter slot booking failed', error);
    return Response.json(
      { ok: false, message: 'Unable to book the selected slot right now.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
