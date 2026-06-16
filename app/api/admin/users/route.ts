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
    return NextResponse.json([
      { id: "admin-id", name: "Demo Admin", email: "admin@hearthandkey.com", role: "ADMIN", createdAt: new Date(), _count: { bookings: 0 } },
      { id: "user-id", name: "Demo User", email: "demo@hearthandkey.com", role: "GUEST", createdAt: new Date(), _count: { bookings: 2 } },
    ]);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
