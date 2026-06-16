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

  const property = await prisma.property.findUnique({
    where: { id: d.listingId },
  });
  if (!property)
    return NextResponse.json({ error: "Property not found" }, { status: 404 });

  if (d.guests > property.maxGuests)
    return NextResponse.json(
      { error: `This home sleeps a maximum of ${property.maxGuests} guests` },
      { status: 422 }
    );

  const totalPrice = nights * property.pricePerNight;

  const session = await getSession();
  if (!session || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const booking = await prisma.booking.create({
    data: {
      propertyId: property.id,
      userId: session.userId,
      checkIn,
      checkOut,
      guests: d.guests,
      totalPrice,
    },
  });

  return NextResponse.json(
    {
      booking: {
        id: booking.id,
        title: property.title,
        nights,
        totalPrice,
        checkIn: d.checkIn,
        checkOut: d.checkOut,
      },
    },
    { status: 201 }
  );
}
