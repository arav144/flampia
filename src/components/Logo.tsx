"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function FlampiaIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Solid Red Triangle */}
      <polygon points="50,10 90,80 10,80" fill="#E50914" />
      {/* Inner Nested Red Triangle Outline */}
      <polygon points="50,34 75,74 25,74" fill="#0A0A0A" />
      <polygon points="50,42 70,72 30,72" fill="#E50914" />
      {/* Emitting Light Rays Downward */}
      <line x1="38" y1="84" x2="32" y2="98" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="84" x2="50" y2="98" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
      <line x1="62" y1="84" x2="68" y2="98" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default function FlampiaLogo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg h-6",
    md: "text-2xl h-8",
    lg: "text-3xl h-10",
    xl: "text-4xl h-14",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
    xl: "w-12 h-12",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group transition-opacity hover:opacity-90 ${className}`}
    >
      {/* FL */}
      <span className="font-extrabold tracking-tight text-white uppercase text-2xl font-body">
        FL
      </span>

      {/* Signature Red Lamp Pyramid Emblem (A) */}
      <div className="relative flex items-center justify-center mx-[-2px]">
        <svg
          viewBox="0 0 100 100"
          className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Red Triangle */}
          <polygon points="50,8 92,82 8,82" fill="#E50914" />
          {/* Inner Negative Cutout */}
          <polygon points="50,32 76,76 24,76" fill="#0A0A0A" />
          {/* Inner Red Core */}
          <polygon points="50,44 70,74 30,74" fill="#E50914" />
          {/* Light Rays */}
          <line x1="38" y1="84" x2="30" y2="98" stroke="#E50914" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          <line x1="50" y1="84" x2="50" y2="98" stroke="#E50914" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          <line x1="62" y1="84" x2="70" y2="98" stroke="#E50914" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>

      {/* MPIA */}
      <span className="font-extrabold tracking-tight text-white uppercase text-2xl font-body">
        MPIA
      </span>
    </Link>
  );
}
