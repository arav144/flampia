"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShop } from "@/lib/store";
import FlampiaLogo from "./Logo";
import { Sparkles, Heart, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, setIsAiModalOpen } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      {/* Brand Logo */}
      <FlampiaLogo size="md" />

      {/* Nav links */}
      <nav className="site-nav hidden md:block">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop Collection</Link>
          </li>
          <li>
            <Link href="/room-visualizer">Room Visualizer</Link>
          </li>
          <li>
            <Link href="/about">About Atelier</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Action controls */}
      <div className="nav-right">
        {/* AI Lighting Assistant Coming Soon Trigger */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-600/50 bg-red-950/30 text-red-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all text-xs font-semibold uppercase tracking-wider shadow-sm shadow-red-950/40"
          title="AI Assistant — Coming Soon"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Assistant</span>
          <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-mono">BETA</span>
        </button>



        {/* Saved Wishlist Link */}
        <Link
          href="/shop"
          className="relative p-2 text-gray-300 hover:text-red-400 transition-colors"
          title="Wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-red-500/30 p-6 flex flex-col gap-4 md:hidden">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-white font-medium py-2 border-b border-white/10"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-white font-medium py-2 border-b border-white/10"
          >
            Shop Collection
          </Link>
          <Link
            href="/room-visualizer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-white font-medium py-2 border-b border-white/10"
          >
            Room Visualizer
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-white font-medium py-2 border-b border-white/10"
          >
            About Atelier
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-white font-medium py-2"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
