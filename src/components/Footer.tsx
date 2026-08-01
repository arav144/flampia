"use client";

import React, { useState } from "react";
import Link from "next/link";
import FlampiaLogo from "./Logo";
import { Send, Check, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="site-footer bg-black border-t border-white/10 text-gray-400">
      <div className="footer-top max-w-7xl mx-auto">
        {/* Brand & Newsletter */}
        <div className="space-y-4">
          <FlampiaLogo size="lg" />
          <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
            Luxury architectural lighting designed for beautiful spaces. Sculpted in warm brass, obsidian crystal, and soft crimson radiance.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
            <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block">
              Subscribe to Private Atelier Catalog Updates
            </span>
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md shadow-red-950/60"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
            {subscribed && (
              <p className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Registered for FLAMPIA Atelier updates.</span>
              </p>
            )}
          </form>
        </div>

        {/* Collections Links */}
        <div>
          <h4>Collections</h4>
          <ul>
            <li>
              <Link href="/shop?category=Ceiling%20Lights">Ceiling Pendants</Link>
            </li>
            <li>
              <Link href="/shop?category=Wall%20Lights">Wall Blades & Sconces</Link>
            </li>
            <li>
              <Link href="/shop?category=Spot%20Lights">Precision Spotlights</Link>
            </li>
            <li>
              <Link href="/shop?category=Outdoor%20Lights">IP67 Outdoor Torches</Link>
            </li>
            <li>
              <Link href="/shop?category=Luxury%20Collection">Luxury Masterworks</Link>
            </li>
          </ul>
        </div>

        {/* Platform Links */}
        <div>
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="/shop">Master Catalog</Link>
            </li>
            <li>
              <Link href="/room-visualizer">AI Room Visualizer</Link>
            </li>
          </ul>
        </div>

        {/* Corporate / Support Links */}
        <div>
          <h4>Support & Legal</h4>
          <ul>
            <li className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500 inline" />
              <span className="text-gray-300">5-Year Warranty</span>
            </li>
            <li>
              <a href="#shipping">Complimentary Express Shipping</a>
            </li>
            <li>
              <a href="#terms">Terms & Conditions</a>
            </li>
            <li>
              <Link href="/about">About Atelier</Link>
            </li>
            <li>
              <Link href="/contact">Contact Atelier</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom max-w-7xl mx-auto">
        <p>© 2026 FLAMPIA Lighting Atelier Inc. All rights reserved.</p>
        <p className="text-red-400 font-mono text-[11px]">
          Designed with Red & Black Luxury Dynamics
        </p>
      </div>
    </footer>
  );
}
