"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/lib/store";

export default function CtaBand() {
  const { setIsAiModalOpen } = useShop();

  return (
    <section className="cta-band relative overflow-hidden bg-gradient-to-b from-black to-red-950/20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="eyebrow block mb-4">✦ Transform Your Sanctuary ✦</span>
        <h2 className="serif text-white text-3xl md:text-5xl font-medium mb-6">
          Ready to Experience Lighting That Defines Modern Living?
        </h2>
        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light">
          Consult with our AI Architectural Advisor or explore our 2026 flagship collection with complimentary express delivery across India.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn shadow-xl shadow-red-950">
            Shop Collection Now
          </Link>
          <button onClick={() => setIsAiModalOpen(true)} className="btn ghost">
            ✨ Launch AI Assistant
          </button>
        </div>
      </div>
    </section>
  );
}
