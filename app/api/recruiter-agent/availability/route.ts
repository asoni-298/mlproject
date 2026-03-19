import { getAvailabilitySlots } from '@/lib/google-workspace';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const availability = await getAvailabilitySlots();
    return Response.json(availability, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json(
      { message: 'Unable to load availability right now.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
