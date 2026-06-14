import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { SITE } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(SITE);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  
  if (body.name !== undefined) SITE.name = body.name;
  if (body.tagline !== undefined) SITE.tagline = body.tagline;
  if (body.description !== undefined) SITE.description = body.description;
  if (body.logo !== undefined) SITE.logo = body.logo;
  if (body.email !== undefined) SITE.email = body.email;
  if (body.phone !== undefined) SITE.phone = body.phone;
  if (body.address !== undefined) SITE.address = body.address;
  if (body.socials !== undefined) {
    if (body.socials.twitter !== undefined) SITE.socials.twitter = body.socials.twitter;
    if (body.socials.instagram !== undefined) SITE.socials.instagram = body.socials.instagram;
    if (body.socials.facebook !== undefined) SITE.socials.facebook = body.socials.facebook;
  }

  return NextResponse.json(SITE);
}
