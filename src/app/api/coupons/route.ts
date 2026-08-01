import { NextResponse } from "next/server";
import { COUPONS } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const uppercaseCode = (code || "").toUpperCase();

    if (COUPONS[uppercaseCode]) {
      return NextResponse.json({
        valid: true,
        code: uppercaseCode,
        discountPercent: COUPONS[uppercaseCode],
      });
    }

    return NextResponse.json(
      { valid: false, message: "Invalid coupon code" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ valid: false, message: "Error" }, { status: 500 });
  }
}
