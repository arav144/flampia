"use client";

import React from "react";
import { Zap, Sparkles, Clock, Palette, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: <Zap className="w-8 h-8 text-red-500" />,
    title: "Energy Efficient",
    desc: "Custom driver electronics achieving 130 lm/W efficiency with zero harmonic distortion.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-amber-400" />,
    title: "Premium Finish",
    desc: "Hand-brushed aircraft brass & obsidian black anodized aluminum resistant to tarnish.",
  },
  {
    icon: <Clock className="w-8 h-8 text-red-500" />,
    title: "Long Lifespan",
    desc: "Over 60,000 continuous hours of optical clarity with custom thermal dissipation cores.",
  },
  {
    icon: <Palette className="w-8 h-8 text-red-400" />,
    title: "Modern Design",
    desc: "Designed in Atelier Milano and Bengaluru, fusing kinetic geometry with ambient red glow.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    title: "5-Year Warranty",
    desc: "Comprehensive replacement guarantee on drivers, LEDs, and structural brass components.",
  },
];

export default function WhyFlampia() {
  return (
    <section className="section-pad bg-black/60">
      <div className="section-head">
        <span className="eyebrow">✦ Uncompromising Craftsmanship ✦</span>
        <h2 className="serif text-white">Why FLAMPIA Lighting</h2>
        <p>
          We do not build mass-produced fixtures. Every FLAMPIA optical piece is an architectural centerpiece.
        </p>
      </div>

      <div className="why-grid max-w-7xl mx-auto">
        {PILLARS.map((p, i) => (
          <div key={i} className="why-card group hover:border-red-500/50">
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              {p.icon}
            </div>
            <h4 className="serif text-white text-base font-medium mb-2 group-hover:text-red-400 transition-colors">
              {p.title}
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
