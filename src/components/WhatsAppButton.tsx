"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down -> hide
        setVisible(false);
      } else {
        // Scrolling up -> show
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello FLAMPIA, I am interested in your luxury architectural lighting collection. Please share details."
  )}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center p-3.5 rounded-full bg-black/70 backdrop-blur-xl border border-red-500/40 text-white shadow-2xl shadow-red-950/80 hover:border-red-500 hover:scale-110 transition-all duration-300"
      >
        {/* Soft pulse animation every 8s */}
        <span className="absolute -inset-1.5 rounded-full bg-red-600/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-ping duration-[8000ms]" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 text-white relative z-10 filter drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]" />

        {/* Floating Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-white/15 text-[11px] font-medium text-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl">
          <span className="text-red-400 font-bold mr-1">✦</span> Need Help? Chat with FLAMPIA
        </div>
      </a>
    </div>
  );
}
