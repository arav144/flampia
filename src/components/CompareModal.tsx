"use client";

import React from "react";
import { Product } from "@/lib/data";

interface CompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function CompareModal({ products, isOpen, onClose, onRemove }: CompareModalProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0e0d12] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="eyebrow">✦ Precision Benchmark ✦</span>
            <h2 className="serif text-2xl font-bold text-white mt-1">Fixture Specification Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-red-500 transition-colors flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
            >
              <button
                onClick={() => onRemove(p.id)}
                className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-300 bg-red-950/40 px-2 py-1 rounded-full border border-red-500/30"
              >
                Remove
              </button>

              <div>
                <img src={p.images[0]} alt={p.name} className="w-full h-40 object-contain mb-4 rounded-xl" />
                <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold block mb-1">
                  {p.category}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{p.name}</h3>
                <p className="text-xl font-bold text-red-500 mb-4">₹{p.price.toLocaleString("en-IN")}</p>

                {/* Specs Table */}
                <div className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Power:</span>
                    <span className="font-semibold text-white">{p.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lumens:</span>
                    <span className="font-semibold text-white">{p.lumens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Color Temp:</span>
                    <span className="font-semibold text-white">{p.colorTemp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Finish:</span>
                    <span className="font-semibold text-white">{p.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IP Rating:</span>
                    <span className="font-semibold text-white">{p.ipRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Material:</span>
                    <span className="font-semibold text-white">{p.material}</span>
                  </div>
                </div>
              </div>

              <a
                href={`/products/${p.id}`}
                className="mt-6 w-full py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-center text-xs font-bold uppercase tracking-wider block transition-colors"
              >
                View Full Specs →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
