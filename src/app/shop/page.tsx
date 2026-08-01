"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import QuickViewModal from "@/components/QuickViewModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/lib/store";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { Search, SlidersHorizontal, Grid, List, RotateCcw, MessageCircle, Eye } from "lucide-react";

function ShopContent() {
  const { setQuickViewProduct } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFinish, setSelectedFinish] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        p.category === selectedCategory ||
        p.collection === selectedCategory;

      const matchesFinish =
        selectedFinish === "All" || p.finish.includes(selectedFinish);

      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesFinish && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured
    });
  }, [searchQuery, selectedCategory, selectedFinish, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-[#070709] text-gray-200">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      {/* Page Banner */}
      <section className="pt-32 pb-12 px-6 border-b border-white/10 bg-radial from-red-950/30 via-black to-black text-center">
        <span className="eyebrow">✦ Atelier Masterwork Catalog ✦</span>
        <h1 className="serif text-white text-4xl md:text-5xl font-medium mt-2">
          Shop Architectural Luminaires
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-3 font-light">
          Filter by room category, lumen intensity, custom hand-brushed finishes, and model specifications.
        </p>
      </section>

      {/* Main Shop Interface */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6 glass-card p-6 h-fit sticky top-28 border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-red-500" />
              <h3 className="serif text-white text-base font-medium">Catalog Search</h3>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or model (FLP-AUR-01)..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-red-500" />
              <h3 className="serif text-white text-base font-medium">Categories</h3>
            </div>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between ${
                  selectedCategory === "All"
                    ? "bg-red-600 text-white font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>All Fixtures</span>
                <span>({PRODUCTS.length})</span>
              </button>

              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between ${
                    selectedCategory === c.name
                      ? "bg-red-600 text-white font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{c.name}</span>
                  <span>({c.itemCount})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="serif text-white text-base font-medium mb-3">Max Price: ₹{maxPrice.toLocaleString("en-IN")}</h3>
            <input
              type="range"
              min="15000"
              max="100000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div>
            <h3 className="serif text-white text-base font-medium mb-3">Body Finish</h3>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Brass", "Obsidian", "Ruby", "Stainless"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                    selectedFinish === f
                      ? "border-red-500 bg-red-950/40 text-white"
                      : "border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Results Grid */}
        <section className="lg:col-span-3 space-y-6">
          {/* Top Bar: Sort & View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-card border-white/10">
            <p className="text-xs text-gray-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> architectural fixtures
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="featured">Featured Masterworks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>

              <div className="flex border border-white/10 rounded-lg overflow-hidden text-xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-red-600 text-white" : "text-gray-400"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-red-600 text-white" : "text-gray-400"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 glass-card space-y-3 border-white/10">
              <p className="text-xl text-gray-400">No matching luminaires found.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setMaxPrice(100000);
                  setSelectedFinish("All");
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-red-950/60"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="glass-card p-6 border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-red-500/40 transition-all"
                >
                  <img src={p.images[0]} alt={p.name} className="w-28 h-28 object-contain" />
                  <div className="flex-1">
                    <span className="font-mono text-[10px] text-red-400">{p.modelNumber}</span>
                    <h3 className="serif text-white text-lg font-medium">{p.name}</h3>
                    <p className="text-xs text-gray-400 font-light mt-1">{p.tagline}</p>
                    <div className="flex gap-3 text-[10px] font-mono text-gray-400 mt-2">
                      <span>Power: {p.power}</span>
                      <span>Color: {p.colorTemp}</span>
                      <span>IP: {p.ipRating}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <span className="font-bold text-xl text-white font-mono">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQuickViewProduct(p)}
                        className="p-2 rounded-full border border-white/10 text-gray-300 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openWhatsAppEnquiry(p.name, p.modelNumber, p.price)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return <ShopContent />;
}
