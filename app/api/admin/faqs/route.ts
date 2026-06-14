import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MOCK_FAQS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(MOCK_FAQS);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const newFaq = {
    id: `faq-${Date.now()}`,
    question: body.question,
    answer: body.answer
  };
  MOCK_FAQS.push(newFaq);
  
  return NextResponse.json(newFaq);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const index = MOCK_FAQS.findIndex(f => f.id === body.id);
  if (index > -1) {
    MOCK_FAQS[index] = { ...MOCK_FAQS[index], question: body.question, answer: body.answer };
    return NextResponse.json(MOCK_FAQS[index]);
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  const index = MOCK_FAQS.findIndex(f => f.id === id);
  if (index > -1) {
    MOCK_FAQS.splice(index, 1);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
