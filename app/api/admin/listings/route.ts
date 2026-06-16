import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { MOCK_LISTINGS } from "@/lib/mock-data";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(MOCK_LISTINGS);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Simplified listing creation
    const newListing = await prisma.property.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/\s+/g, '-'),
        location: body.location,
        country: "Unknown",
        lat: 0,
        lng: 0,
        description: body.description || "",
        pricePerNight: Number(body.price),
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: Number(body.maxGuests),
        amenities: [],
        images: [body.imageUrl || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"],
        hostId: session.userId,
      }
    });
    return NextResponse.json(newListing);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
