"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Collections() {
  return (
    <section className="section-pad relative overflow-hidden transition-colors duration-500">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-head max-w-3xl mx-auto text-center relative z-10 mb-14">
        <span className="eyebrow inline-flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          ✦ Curated Architectural Lines ✦
        </span>
        <h2 className="serif text-white text-3xl sm:text-4xl md:text-5xl font-medium mt-2">
          Lighting Collections
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
          From suspended dining ring sculptures to precision gallery spotlights and IP67 weather-proof estate illuminations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 relative z-10">
        {CATEGORIES.map((c, index) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.65,
              delay: (index % 6) * 0.1,
              ease: [0.16, 0.84, 0.44, 1],
            }}
          >
            <Link
              href={`/shop?category=${encodeURIComponent(c.name)}`}
              className="c-tile group block relative rounded-3xl p-7 border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/50 hover:border-red-500/40 overflow-hidden"
            >
              {/* Radial Lighting Glow Behind Image */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-red-600/15 filter blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

              {/* Header: Title & Arrow */}
              <div className="flex items-start justify-between z-10 relative mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block mb-1">
                    {c.itemCount} Sculptured Fixtures
                  </span>
                  <h3 className="serif text-white text-2xl font-medium group-hover:text-red-400 transition-colors">
                    {c.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all shadow-sm">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Luminaire Visual Stage */}
              <div className="relative my-6 flex items-center justify-center min-h-[190px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/5 overflow-hidden">
                <img
                  src={c.image || "/img1.png"}
                  alt={c.name}
                  className="w-40 h-40 object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-110 filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Description */}
              <p className="text-xs text-gray-400 font-light leading-relaxed relative z-10 line-clamp-2">
                {c.description}
              </p>

              {/* Footer CTA */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-300 group-hover:text-white transition-colors">
                <span className="uppercase tracking-widest">Explore Collection</span>
                <span className="text-red-500 font-mono">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
