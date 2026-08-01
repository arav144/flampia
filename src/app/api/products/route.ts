import { NextResponse } from "next/server";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");
  const maxPrice = searchParams.get("maxPrice");

  let filtered = [...PRODUCTS];

  if (category && category !== "All") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase() || p.collection.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filtered = filtered.filter((p) => p.price <= max);
    }
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    categories: CATEGORIES,
    products: filtered,
  });
}
