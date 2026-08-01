"use client";

import React from "react";

export default function Story() {
  return (
    <section className="section-pad bg-black">
      <div className="story max-w-7xl mx-auto">
        <div className="story-visual group">
          <div className="filament shadow-lg shadow-red-500" />
          <div className="absolute inset-0 bg-gradient-to-tr from-red-950/40 to-transparent pointer-events-none" />
        </div>

        <div>
          <span className="eyebrow">✦ The Heritage of Light ✦</span>
          <h2 className="serif text-white text-3xl md:text-4xl font-medium mt-3 mb-6">
            Where Craftsmanship Meets Architectural Precision
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            FLAMPIA was born from a singular obsession: to replace cold glare with sculpted, ambient radiance. Inspired by the sleek minimalism of Apple and Tesla, combined with the artisan brasswork of The White Teak Company, our lighting fixtures turn empty rooms into living sanctuaries.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed mb-6 font-light">
            Every piece features custom optical lightguides that project shadowless warm red and gold illumination, housing internal blue-light filters that soothe the mind during evening hours.
          </p>

          <div className="story-list space-y-3 pt-4 border-t border-white/10">
            <div>
              <span>01.</span> Precision Machined Aircraft Brass & Obsidian Glass
            </div>
            <div>
              <span>02.</span> Patent-Pending Crimson Ambient Mood Light Engines
            </div>
            <div>
              <span>03.</span> Hand-Inspected in Milano & Assembled with 5-Year Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
