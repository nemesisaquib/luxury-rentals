import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).optional().or(z.literal("")),
  password: z.string().min(6).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const dataToUpdate: any = {};
  
  if (parsed.data.name && parsed.data.name.trim() !== "") {
    dataToUpdate.name = parsed.data.name;
  }
  
  if (parsed.data.password && parsed.data.password.trim() !== "") {
    dataToUpdate.password = await bcrypt.hash(parsed.data.password, 10);
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: dataToUpdate,
  });

  return NextResponse.json({ success: true });
}
