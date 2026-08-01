"use client";

import React from "react";

export const MARQUEE_ITEMS = [
  "Sculpted Aircraft Brass",
  "Hand-Carved Alabaster",
  "Continuous 2700K Warm Glow",
  "Blue-Light Filter Optics",
  "Atelier Milano Design",
  "5-Year International Guarantee",
  "Shadowless Ambient Illumination",
  "IP67 Weatherproof Estate Lighting",
];

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-wrap bg-black/80 border-y border-white/10 py-5 overflow-hidden">
      <div className="marquee flex gap-12 whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="serif italic text-sm text-gray-300 flex items-center gap-6">
            <span>{item}</span>
            <span className="text-red-500 font-normal text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
