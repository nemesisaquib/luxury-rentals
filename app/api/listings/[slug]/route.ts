import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const property = await prisma.property.findUnique({
    where: { slug: resolvedParams.slug },
  });
  if (!property)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ listing: property });
}
