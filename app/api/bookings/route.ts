import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { nightsBetween } from "@/lib/utils";
import { getSession } from "@/lib/auth";

const schema = z.object({
  listingId: z.string().min(1),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().int().positive(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );

  const d = parsed.data;
  const checkIn = new Date(d.checkIn);
  const checkOut = new Date(d.checkOut);
  const nights = nightsBetween(checkIn, checkOut);

  if (nights < 1)
    return NextResponse.json(
      { error: "Check-out must be after check-in" },
      { status: 422 }
    );

  const listing = await prisma.listing.findUnique({
    where: { id: d.listingId },
  });
  if (!listing)
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });

  if (d.guests > listing.maxGuests)
    return NextResponse.json(
      { error: `This home sleeps a maximum of ${listing.maxGuests} guests` },
      { status: 422 }
    );

  const total = nights * listing.pricePerNight;

  const session = await getSession();

  const booking = await prisma.booking.create({
    data: {
      listingId: listing.id,
      userId: session?.userId || null,
      guestName: d.guestName,
      guestEmail: d.guestEmail,
      checkIn,
      checkOut,
      guests: d.guests,
      nights,
      total,
    },
  });

  return NextResponse.json(
    {
      booking: {
        id: booking.id,
        title: listing.title,
        nights,
        total,
        checkIn: d.checkIn,
        checkOut: d.checkOut,
      },
    },
    { status: 201 }
  );
}
