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
    return NextResponse.json({
      totalUsers: 142,
      totalListings: 24,
      totalBookings: 89,
      totalRevenue: 45200
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
