"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import QuickViewModal from "@/components/QuickViewModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

const TIMELINE = [
  {
    year: "2018",
    title: "Atelier Founded in Milano",
    desc: "FLAMPIA originated as an industrial optics studio dedicated to replacing harsh LED glare with architectural warm ambient glow.",
  },
  {
    year: "2021",
    title: "Patent-Pending Optical Lightguides",
    desc: "Engineered our proprietary internal diffuser technology, achieving CRI >97 Ra with zero eye fatigue.",
  },
  {
    year: "2024",
    title: "Bengaluru Architectural Experience Center",
    desc: "Opened our flagship 6,000 sq ft lighting sanctuary for interior architects and private estate clients.",
  },
  {
    year: "2026",
    title: "Gen-III Smart Continuous Dimming",
    desc: "Launched wireless mesh touch controls and AI Lighting Assistant integration for intelligent spatial ambiance.",
  },
];

const MATERIALS = [
  {
    title: "Aircraft-Grade Milled Brass",
    desc: "Solid brass precision CNC-machined and finished with hand-brushed anti-tarnish sealed coatings.",
    metric: "100% Solid",
  },
  {
    title: "Hand-Carved Natural Alabaster",
    desc: "Selected from European quarries for unique mineral vein patterns and soft translucent diffusion.",
    metric: "Natural Mineral",
  },
  {
    title: "Smoked Quartz & Obsidian Glass",
    desc: "Optically clear, high-durability glass components tailored for dramatic light refraction.",
    metric: "Ultra Clarity",
  },
  {
    title: "Custom Thermal Core",
    desc: "Aerospace heat dissipation fins maintaining LED junction temperature below 55°C for 60,000hr lifespan.",
    metric: "60,000 Hours",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-gray-200">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main className="pt-28 pb-20">
        {/* About Hero Section */}
        <section className="max-w-6xl mx-auto px-6 text-center py-16">
          <span className="eyebrow">✦ The Heritage of FLAMPIA ✦</span>
          <h1 className="serif text-4xl md:text-6xl font-light text-white mt-4 mb-6 leading-tight">
            Crafting Light Into <span className="text-red-500 italic">Living Architecture</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base font-light leading-relaxed">
            FLAMPIA stands at the intersection of Scandinavian minimalism, Milano industrial art, and futuristic optical engineering. We do not mass-produce fixtures; we sculpt light itself.
          </p>
        </section>

        {/* Brand Philosophy Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 border-red-500/20 hover:border-red-500/50">
              <div className="text-3xl text-red-500 mb-4">✦</div>
              <h3 className="serif text-xl text-white font-medium mb-3">Minimalist Form</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Clean geometric silhouettes that remain timelessly elegant whether turned on or off.
              </p>
            </div>

            <div className="glass-card p-8 border-red-500/20 hover:border-red-500/50">
              <div className="text-3xl text-red-500 mb-4">☀️</div>
              <h3 className="serif text-xl text-white font-medium mb-3">Shadowless Warmth</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Custom optical lightguides projecting continuous 2700K warm glow without harsh glares.
              </p>
            </div>

            <div className="glass-card p-8 border-red-500/20 hover:border-red-500/50">
              <div className="text-3xl text-red-500 mb-4">🛡️</div>
              <h3 className="serif text-xl text-white font-medium mb-3">5-Year Atelier Guarantee</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Uncompromising durability backed by continuous replacement support for all components.
              </p>
            </div>
          </div>
        </section>

        {/* Materials & Craftsmanship */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">✦ Uncompromising Materiality ✦</span>
            <h2 className="serif text-3xl font-medium text-white mt-2">Unmatched Craftsmanship</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MATERIALS.map((m, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-red-500/40 transition-colors">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="serif text-xl text-white font-medium">{m.title}</h3>
                    <span className="text-xs font-mono text-red-400 px-3 py-1 bg-red-950/40 rounded-full border border-red-500/30">
                      {m.metric}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Animated History Timeline */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">✦ Evolution ✦</span>
            <h2 className="serif text-3xl font-medium text-white mt-2">The FLAMPIA Timeline</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:to-transparent">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                } group`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-black shadow-lg shadow-red-500" />
                <div className="ml-10 md:ml-0 md:w-1/2 px-6">
                  <div className="glass-card p-6 border-white/10 group-hover:border-red-500/40 transition-colors">
                    <span className="text-2xl font-bold text-red-500 font-mono block mb-1">
                      {item.year}
                    </span>
                    <h3 className="serif text-lg text-white font-medium mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="glass-card p-12 border-red-500/30">
            <h2 className="serif text-3xl text-white font-medium mb-4">Experience Atelier Lighting</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-8 font-light">
              Explore our masterwork catalog or schedule a private consultation with our architectural lighting team.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/shop" className="btn">
                Browse Collection →
              </Link>
              <Link href="/contact" className="btn ghost">
                Contact Atelier
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
