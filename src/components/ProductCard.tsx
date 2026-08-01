"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { MessageCircle, Eye, Zap, Sun, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay: (index % 6) * 0.1,
        ease: [0.16, 0.84, 0.44, 1],
      }}
      className="p-card group flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/50 border border-white/10 rounded-3xl p-6 bg-black/40 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Background Soft Glow on Hover */}
      <div className="absolute inset-0 bg-radial-gradient from-red-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Top Badges Header */}
      <div className="flex justify-between items-center z-10 mb-4">
        {product.isNewArrival ? (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
            ✦ New Arrival
          </span>
        ) : product.isBestSeller ? (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ★ Best Seller
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10">
            {product.collection}
          </span>
        )}

        <span className="font-mono text-[11px] text-gray-500 tracking-wider">
          {product.modelNumber}
        </span>
      </div>

      {/* Product Image Stage with Luxury Floating Lighting Pedestal */}
      <div className="p-visual my-4 relative flex items-center justify-center min-h-[230px] aspect-square rounded-2xl overflow-hidden">
        <div className="glow opacity-30 group-hover:opacity-90 group-hover:scale-125 transition-all duration-700 absolute w-44 h-44 rounded-full bg-red-600/25 filter blur-2xl pointer-events-none" />
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-52 h-52 object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)]"
        />
      </div>

      {/* Specs Chips Row */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-3 pt-1">
        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
          <Zap className="w-3 h-3 text-red-400" />
          {product.power}
        </span>
        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
          <Sun className="w-3 h-3 text-amber-400" />
          {product.colorTemp}
        </span>
        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          {product.ipRating}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="serif text-white text-xl font-medium group-hover:text-red-400 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-light leading-relaxed">
          {product.tagline}
        </p>

        {/* Price & Action Triggers */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block">
              Investment
            </span>
            <span className="font-bold text-lg text-white font-mono">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick View Button */}
            <button
              onClick={() => onQuickView(product)}
              className="p-2.5 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-red-500/50 hover:bg-white/5 transition-all"
              title="Quick View Specs"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Premium WhatsApp Enquiry Button */}
            <button
              onClick={() => openWhatsAppEnquiry(product.name, product.modelNumber, product.price)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-red-950/60 hover:shadow-red-600/40 transition-all group-hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
