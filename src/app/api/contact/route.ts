import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, message, inquiryType } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    // Process inquiry logging or notification
    console.log(`[FLAMPIA Atelier Inquiry] Type: ${inquiryType}, Client: ${fullName} (${email})`);

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been registered with FLAMPIA Atelier Private Concierge.",
      referenceId: `FLP-INQ-${Date.now().toString().slice(-6)}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
