import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Bypass Prisma database entirely for the mock demo
    return NextResponse.json([
      { 
        id: "1", 
        propertyId: "1", 
        userId: "user1", 
        checkIn: new Date(), 
        checkOut: new Date(Date.now() + 86400000 * 3), 
        totalPrice: 1350, 
        status: "CONFIRMED", 
        createdAt: new Date(), 
        property: { title: "The Glass House" }, 
        user: { name: "Demo User", email: "demo@hearthandkey.com" } 
      }
    ]);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    return NextResponse.json({ id, status });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
