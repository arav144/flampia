"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import AiAssistantModal from "@/components/AiAssistantModal";
import QuickViewModal from "@/components/QuickViewModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useShop } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { Heart, MessageCircle, ShieldCheck, CheckCircle2, Star, Zap, Sun } from "lucide-react";

function ProductDetailContent({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { wishlist, toggleWishlist } = useShop();

  const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedFinish, setSelectedFinish] = useState(product.finish);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "reviews">("specs");

  // Review submission state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewName && newReviewComment) {
      setReviewsList([
        {
          id: Date.now().toString(),
          userName: newReviewName,
          comment: newReviewComment,
          rating: newReviewRating,
          date: new Date().toISOString().split("T")[0],
          verified: true,
        },
        ...reviewsList,
      ]);
      setNewReviewName("");
      setNewReviewComment("");
    }
  };

  const isLiked = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-[#070709] text-gray-200">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-mono">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <span>/</span>
          <span className="text-red-400 font-semibold">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative glass-card p-8 h-[450px] flex items-center justify-center overflow-hidden group border-white/10">
              <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-transparent pointer-events-none" />
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(229,9,20,0.35)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden glass-card p-2 border transition-all ${
                    activeImage === img ? "border-red-500 ring-2 ring-red-500/50" : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Purchase Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-red-400 font-bold border border-red-500/30 px-3 py-1 rounded-full">
                  {product.collection}
                </span>
                <span className="font-mono text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full bg-white/5">
                  Model: {product.modelNumber}
                </span>
              </div>
              <h1 className="serif text-white text-3xl md:text-4xl font-medium mt-3 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 font-light">{product.tagline}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-mono text-red-400 text-3xl font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/30 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock} units)</span>
              </span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Finish selection */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-2">
                Body Finish: <span className="text-white font-bold">{selectedFinish}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Brushed Crimson Brass", "Matte Obsidian Black", "Smoked Quartz Glass"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-4 py-2 rounded-xl text-xs border transition-all ${
                      selectedFinish === f
                        ? "border-red-500 bg-red-950/40 text-white font-semibold"
                        : "border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquire on WhatsApp Action */}
            <div className="flex gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => openWhatsAppEnquiry(product.name, product.modelNumber, product.price)}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs uppercase tracking-widest shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp — ₹{product.price.toLocaleString("en-IN")}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
                  isLiked ? "bg-red-600 border-red-500 text-white" : "border-white/10 text-gray-400 hover:text-white"
                }`}
                title="Save to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Spec Tabs & Reviews Section */}
        <div className="glass-card p-8 border-white/10">
          <div className="flex border-b border-white/10 mb-8 gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "specs" ? "border-red-500 text-red-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Architectural Specs
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "features" ? "border-red-500 text-red-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "reviews" ? "border-red-500 text-red-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Client Reviews ({reviewsList.length})
            </button>
          </div>

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400">{key}:</span>
                  <span className="text-white font-medium">{val}</span>
                </div>
              ))}
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-400">Power Rating:</span>
                <span className="text-white font-medium">{product.power}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-400">Color Temperature:</span>
                <span className="text-white font-medium">{product.colorTemp}</span>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <ul className="space-y-3 text-sm text-gray-300">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">{rev.userName}</span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 font-light">{rev.comment}</p>
                    <span className="text-[10px] text-gray-500 block mt-2 font-mono">{rev.date}</span>
                  </div>
                ))}
              </div>

              {/* Add Review */}
              <form onSubmit={handleAddReview} className="pt-6 border-t border-white/10 space-y-4">
                <h4 className="serif text-white text-base">Write a Review</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="Your Name"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                    className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value={5}>5 Stars — Excellent</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Average</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your architectural lighting experience..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailContent paramsPromise={params} />;
}
