"use client";

import React, { useState } from "react";
import { useShop } from "@/lib/store";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { X, RotateCw, Star, MessageCircle, ArrowRight } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useShop();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState("");
  const [is360Active, setIs360Active] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentFinish = selectedFinish || product.finish;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-card border border-red-500/30 overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl shadow-red-950/80">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors text-lg"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media / 360 Viewer Column */}
        <div className="w-full md:w-1/2 bg-black/60 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10 relative">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold border border-red-500/30 px-3 py-1 rounded-full">
              {product.collection}
            </span>

            <button
              onClick={() => setIs360Active(!is360Active)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-all ${
                is360Active
                  ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-600/40"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-red-500"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{is360Active ? "Gallery" : "360° View"}</span>
            </button>
          </div>

          {/* Main Visual */}
          <div className="relative w-full h-72 flex items-center justify-center my-auto overflow-hidden">
            {is360Active ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center cursor-ew-resize">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_25px_rgba(229,9,20,0.35)] transition-transform duration-75"
                />
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                  className="w-4/5 mt-4 accent-red-500"
                />
                <p className="text-[10px] text-red-400 mt-1 uppercase tracking-widest font-mono">
                  Rotate fixture 360°
                </p>
              </div>
            ) : (
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_30px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-105"
              />
            )}
          </div>

          {/* Thumbnails */}
          {!is360Active && product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border transition-all ${
                    activeImageIndex === idx ? "border-red-500 ring-2 ring-red-500/50" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} verified reviews)</span>
              </div>
              <span className="font-mono text-[10px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                {product.modelNumber}
              </span>
            </div>

            <h3 className="serif text-2xl text-white font-medium mb-2">{product.name}</h3>
            <p className="text-xs text-gray-400 mb-4 font-light leading-relaxed">{product.tagline}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-bold text-2xl text-red-400 font-mono">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs mb-6">
              <div>
                <span className="text-gray-500 block">Lumens</span>
                <span className="text-gray-200 font-medium">{product.lumens}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Power</span>
                <span className="text-gray-200 font-medium">{product.power}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Color Temp</span>
                <span className="text-gray-200 font-medium">{product.colorTemp}</span>
              </div>
              <div>
                <span className="text-gray-500 block">IP Rating</span>
                <span className="text-gray-200 font-medium">{product.ipRating}</span>
              </div>
            </div>

            {/* Finish Selection */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                Finish: <span className="text-white">{currentFinish}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Brushed Crimson Brass", "Matte Obsidian Black", "Smoked Quartz Glass"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      currentFinish === f
                        ? "border-red-500 bg-red-950/40 text-white"
                        : "border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                openWhatsAppEnquiry(product.name, product.modelNumber, product.price);
                setQuickViewProduct(null);
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs uppercase tracking-widest shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp — ₹{product.price.toLocaleString("en-IN")}</span>
            </button>

            <a
              href={`/products/${product.id}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-center rounded-full border border-white/20 hover:border-red-500 text-gray-300 hover:text-white font-semibold text-xs uppercase tracking-widest transition-colors"
            >
              <span>View Full Architectural Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
