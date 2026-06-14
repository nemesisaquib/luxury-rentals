import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(MOCK_APPLICATIONS);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, status } = body;

  const app = MOCK_APPLICATIONS.find(a => a.id === id);
  if (app) {
    app.status = status;
    return NextResponse.json(app);
  }

  return NextResponse.json({ error: "Application not found" }, { status: 404 });
}
