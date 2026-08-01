import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: MOCK_ORDERS.length,
    orders: MOCK_ORDERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: `FLP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Crafting & Assembly",
      ...body,
    };
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Checkout failed" }, { status: 400 });
  }
}
