import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Bypass Prisma database entirely for the mock demo
    await setSession("mock-user-id", "USER");

    return NextResponse.json({ message: "Demo user logged in successfully" });
  } catch (error: any) {
    console.error("Demo user login error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
