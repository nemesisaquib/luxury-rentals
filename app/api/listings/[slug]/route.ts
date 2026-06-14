import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
  });
  if (!listing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ listing });
}
