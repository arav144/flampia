"use client";

import React, { useState } from "react";
import { useShop } from "@/lib/store";
import { Sparkles, X, BellCheck, Cpu } from "lucide-react";

export default function AiAssistantModal() {
  const { isAiModalOpen, setIsAiModalOpen } = useShop();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (!isAiModalOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e0d12] border border-red-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden text-center">
        {/* Glow Aura Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsAiModalOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors text-sm z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-md shadow-red-950/80 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Coming Soon</span>
        </div>

        {/* Title & Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-red-800 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-950/60 border border-red-400/30">
          <Cpu className="w-8 h-8 text-white" />
        </div>

        <h2 className="serif text-white text-2xl font-medium mb-2">
          AI Lighting Assistant
        </h2>

        <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mx-auto mb-6">
          Our proprietary neural spatial engine is being calibrated for real-time room lumen calculations, 3D photometric ray tracing, and custom estate lighting plan recommendations.
        </p>

        {/* Early Access Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <span className="text-[10px] text-red-400 uppercase tracking-widest font-mono font-semibold block mb-3">
            Request Private Beta Access
          </span>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium py-2">
              <BellCheck className="w-4 h-4" />
              <span>You are registered for early VIP Access.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email"
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Notify
              </button>
            </form>
          )}
        </div>

        <p className="text-[10px] text-gray-500 font-mono">
          FLAMPIA Intelligence Atelier • Milano Labs
        </p>
      </div>
    </div>
  );
}
