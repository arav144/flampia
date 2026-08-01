"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThreeLampViewer from "./ThreeLampViewer";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, ChevronDown } from "lucide-react";

const HERO_IMAGES = [
  {
    src: "/img1.png",
    label: "Aura Crimson Halo",
    spec: "36W | Solid Brass",
    temp: "2700K Warm",
    glowColor: "rgba(229, 9, 20, 0.45)",
    hex: "#E50914",
  },
  {
    src: "/img2.png",
    label: "Obsidian Core Column",
    spec: "48W | Smoked Glass",
    temp: "3000K Soft Amber",
    glowColor: "rgba(212, 175, 55, 0.4)",
    hex: "#d4af37",
  },
  {
    src: "/img3.png",
    label: "Hyperion Precision Spot",
    spec: "18W | Optical Zoom",
    temp: "2400K Sunset",
    glowColor: "rgba(255, 60, 40, 0.45)",
    hex: "#ff3c28",
  },
  {
    src: "/img4.png",
    label: "Lumière Wall Blade",
    spec: "24W | Warm Red Wash",
    temp: "2700K Warm",
    glowColor: "rgba(229, 9, 20, 0.5)",
    hex: "#E50914",
  },
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"showcase" | "3d">("showcase");
  const [intensity, setIntensity] = useState<number>(85); // Light intensity slider
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentHero = HERO_IMAGES[activeImageIndex];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero relative min-h-screen pt-32 pb-20 px-6 lg:px-12 flex items-center justify-center overflow-hidden transition-colors duration-500"
    >
      {/* Interactive Parallax Lighting Cone */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentHero.glowColor} 0%, rgba(229, 9, 20, 0.08) 50%, transparent 75%)`,
          opacity: (intensity / 100) * 1.2,
          filter: "blur(90px)",
        }}
        animate={{
          x: mousePos.x * 1.5,
          y: mousePos.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      {/* Floating Particles Dust */}
      <div className="hero-particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 17) % 95}%`,
              top: `${((i * 23) % 80) + 10}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${6 + (i % 5)}s`,
              background: currentHero.hex,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>FLAMPIA Architectural Atelier</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 0.84, 0.44, 1] }}
            className="serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white leading-[1.08]"
          >
            Lighting That Defines <br />
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-200 bg-clip-text text-transparent italic">
              Modern Masterpieces
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 0.84, 0.44, 1] }}
            className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed font-light"
          >
            Sculpted in aircraft-grade brass, obsidian crystal, and continuous 2700K soft crimson radiance designed for elite luxury residences.
          </motion.p>

          {/* Key Specification Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
            className="flex flex-wrap gap-4 pt-1 text-xs text-gray-400 font-medium"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>5-Year Atelier Guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Zero-Flicker CRI &gt; 97</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 0.84, 0.44, 1] }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <Link
              href="/shop"
              className="btn px-9 py-4 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/room-visualizer"
              className="btn ghost px-8 py-4 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 text-gray-200 hover:text-white hover:border-red-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              AI Room Visualizer
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Hero Visual Luxury Pedestal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 0.84, 0.44, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Main Visual Container */}
          <motion.div
            animate={{
              rotateX: -mousePos.y * 0.35,
              rotateY: mousePos.x * 0.35,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 25 }}
            className="relative w-full aspect-[4/5] max-w-md rounded-3xl overflow-hidden glass-card border border-white/10 p-4 shadow-2xl shadow-red-950/40 group"
          >
            {/* View Mode Toggle */}
            <div className="absolute top-4 right-4 z-20 flex bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 text-[10px] font-mono">
              <button
                onClick={() => setViewMode("showcase")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  viewMode === "showcase"
                    ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Atelier Photo
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  viewMode === "3d"
                    ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                3D Interactive
              </button>
            </div>

            {/* Showcase View */}
            {viewMode === "showcase" ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 0.84, 0.44, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentHero.src}
                      alt={currentHero.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%), radial-gradient(circle at 50% 30%, ${currentHero.glowColor} 0%, transparent 70%)`,
                    opacity: intensity / 100,
                  }}
                />

                {/* Overlay Metadata */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-left flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{currentHero.label}</p>
                    <p className="text-[11px] text-red-400 font-mono mt-0.5">{currentHero.spec}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] text-amber-200 font-mono border border-white/10">
                    {currentHero.temp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/60">
                <ThreeLampViewer interactive={true} glowColor={currentHero.hex} />
              </div>
            )}
          </motion.div>

          {/* Interactive Light Intensity & Thumbnail Controls */}
          <div className="w-full max-w-md flex flex-col gap-3 mt-4">
            {/* Intensity Slider */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-red-500" />
                <span className="font-medium">Ambient Radiance</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-24 h-1 bg-red-950 rounded-lg appearance-none cursor-pointer accent-red-600"
                  title="Adjust Ambient Radiance"
                />
                <span className="font-mono text-[11px] text-red-400 w-8 text-right">
                  {intensity}%
                </span>
              </div>
            </div>

            {/* Quick Thumbnail Switcher */}
            {viewMode === "showcase" && (
              <div className="flex items-center justify-center gap-3">
                {HERO_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-red-500 scale-110 shadow-lg shadow-red-600/30"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                    title={img.label}
                  >
                    <Image src={img.src} alt={img.label} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.25em]">Scroll to Atelier</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-red-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
