import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MOCK_JOBS } from "@/lib/mock-data";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(MOCK_JOBS);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  
  const newJob = {
    id: `job-${Date.now()}`,
    title: body.title,
    location: body.location,
    type: body.type || "Full-time",
    department: body.department,
    description: body.description,
    status: body.status || "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  MOCK_JOBS.unshift(newJob);

  return NextResponse.json(newJob);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, status } = body;

  const job = MOCK_JOBS.find(j => j.id === id);
  if (job) {
    job.status = status;
    return NextResponse.json(job);
  }

  return NextResponse.json({ error: "Job not found" }, { status: 404 });
}
