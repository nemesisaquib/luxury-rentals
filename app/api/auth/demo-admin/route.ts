import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Bypass Prisma database entirely for the mock demo
    await setSession("mock-admin-id", "ADMIN");

    return NextResponse.json({ message: "Demo admin logged in successfully" });
  } catch (error: any) {
    console.error("Demo admin login error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
