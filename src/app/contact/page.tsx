"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import QuickViewModal from "@/components/QuickViewModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<"client" | "architect" | "dealer">("client");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, inquiryType }),
      });
    } catch (e) {
      // Fallback UI
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-200">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">✦ Private Client Services ✦</span>
          <h1 className="serif text-4xl md:text-5xl font-light text-white mt-3 mb-4">
            Connect With FLAMPIA Atelier
          </h1>
          <p className="text-xs md:text-sm text-gray-400 font-light">
            Our architectural lighting consultants are available for private consultations, custom estate specifications, and global trade partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form Container (7 cols) */}
          <div className="lg:col-span-7 glass-card p-8 border-white/10">
            {/* Inquiry Type Tabs */}
            <div className="flex border-b border-white/10 pb-4 mb-6 gap-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setInquiryType("client")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  inquiryType === "client"
                    ? "bg-red-600 text-white shadow-md shadow-red-950/60"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Private Estate Client
              </button>

              <button
                type="button"
                onClick={() => setInquiryType("architect")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  inquiryType === "architect"
                    ? "bg-red-600 text-white shadow-md shadow-red-950/60"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Architect & Designer
              </button>

              <button
                type="button"
                onClick={() => setInquiryType("dealer")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  inquiryType === "dealer"
                    ? "bg-red-600 text-white shadow-md shadow-red-950/60"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Dealer / Trade Inquiry
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="serif text-2xl text-white font-medium">Inquiry Submitted Successfully</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto font-light">
                  Thank you for reaching out to FLAMPIA Atelier. One of our senior lighting specialists will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full border border-white/10 text-xs text-gray-300 hover:text-white hover:border-red-500 mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-red-400 uppercase tracking-widest font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Arav Sharma"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-red-400 uppercase tracking-widest font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="arav@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
                      Firm / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Studio / Residence Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-red-400 uppercase tracking-widest font-semibold mb-1">
                    Project / Inquiry Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your space, timeline, or fixture requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold uppercase tracking-wider text-xs shadow-lg shadow-red-950/60 transition-all"
                >
                  Submit Inquiry to Atelier →
                </button>
              </form>
            )}
          </div>

          {/* Flagship Studios Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 border-white/10">
              <span className="eyebrow">✦ Flagship Atelier ✦</span>
              <h3 className="serif text-xl text-white font-medium mt-1 mb-2">Milano Optical Studio</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Via Montenapoleone 18, 20121 Milano, Italy
              </p>
              <div className="text-xs text-red-400 font-mono space-y-1">
                <p>Phone: +39 02 8901 4402</p>
                <p>Hours: Mon - Fri (10:00 - 19:00 CET)</p>
              </div>
            </div>

            <div className="glass-card p-6 border-white/10">
              <span className="eyebrow">✦ Experience Center ✦</span>
              <h3 className="serif text-xl text-white font-medium mt-1 mb-2">Bengaluru Sanctuary</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                100ft Road, Indiranagar, Bengaluru, Karnataka 560038
              </p>
              <div className="text-xs text-red-400 font-mono space-y-1">
                <p>Phone: +91 98200 12345</p>
                <p>Email: atelier@flampia.com</p>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6">
              <h4 className="serif text-white text-base font-medium mb-2">Architect Concierge Direct</h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Need CAD models, IES photometric files, or custom dimming driver specifications for your project? Connect directly via WhatsApp or email.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
