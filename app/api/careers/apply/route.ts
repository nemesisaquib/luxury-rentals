import { NextResponse } from "next/server";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: body.jobId,
      jobTitle: body.jobTitle,
      name: body.name,
      email: body.email,
      portfolio: body.portfolio || "",
      message: body.message,
      status: "UNREAD",
      createdAt: new Date().toISOString(),
    };

    MOCK_APPLICATIONS.unshift(newApp);

    return NextResponse.json({ success: true, application: newApp });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
