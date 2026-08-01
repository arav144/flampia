"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { useShop } from "@/lib/store";
import ProductCard from "./ProductCard";

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { setQuickViewProduct } = useShop();

  const categories = ["All", "Ceiling Lights", "Wall Lights", "Spot Lights", "Luxury Collection"];

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter(
          (p) => p.category === activeCategory || p.collection === activeCategory
        );

  return (
    <section className="section-pad bg-black/40">
      <div className="section-head">
        <span className="eyebrow">✦ Masterwork Catalog ✦</span>
        <h2 className="serif text-white">Sculptural Luminaires</h2>
        <p>
          Each fixture is individually hand-finished with custom micro-optics and continuous warm glow dimming.
        </p>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/60"
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="product-grid max-w-7xl mx-auto">
        {filteredProducts.map((p, idx) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} index={idx} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/shop" className="btn ghost">
          View Entire Master Catalog →
        </Link>
      </div>
    </section>
  );
}
