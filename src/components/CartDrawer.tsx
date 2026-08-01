"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useShop } from "@/lib/store";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    discountAmount,
    total,
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success?: boolean; text?: string }>({});
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"address" | "payment" | "success">("address");

  const [address, setAddress] = useState({
    fullName: "Arav Sharma",
    email: "arav@example.com",
    street: "702 Grand Imperial Towers, Worli",
    city: "Mumbai",
    postalCode: "400018",
  });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const handlePaymentSuccess = () => {
    setPaymentStep("success");
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff1a3c", "#ffffff", "#d4af37"],
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Cart Panel */}
      <div className="w-full max-w-md h-full bg-[#0d0c11] border-l border-red-500/30 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl shadow-red-950">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <h3 className="serif text-xl text-white font-medium">Shopping Bag</h3>
              <span className="text-xs text-red-400 font-bold">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Cart items */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-4xl text-gray-600 block">🛍️</span>
              <p className="text-sm text-gray-400">Your lighting bag is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}`}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="serif text-xs text-white truncate font-medium">{item.product.name}</h4>
                    <p className="text-[10px] text-gray-400">Finish: {item.selectedFinish}</p>
                    <p className="text-xs text-red-400 font-semibold mt-1">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-500 hover:text-red-400 text-xs"
                    >
                      ✕
                    </button>
                    <div className="flex items-center border border-white/10 rounded-full px-2 py-0.5 text-xs text-gray-300">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="px-1 hover:text-white">
                        -
                      </button>
                      <span className="px-2 font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="px-1 hover:text-white">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            {/* Coupon Code Input */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Coupon code (e.g. FLAMPIA10)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
              {couponMsg.text && (
                <p className={`text-[11px] mt-1 ${couponMsg.success ? "text-green-400" : "text-red-400"}`}>
                  {couponMsg.text}
                </p>
              )}
              {couponCode && (
                <div className="flex items-center justify-between text-xs text-green-400 bg-green-950/20 border border-green-500/30 p-2 rounded-lg mt-2">
                  <span>Applied: {couponCode} ({discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-white text-xs">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Coupon Discount</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Architectural Express Shipping</span>
                <span className="text-green-400">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold text-white">
                <span>Total</span>
                <span className="serif text-red-400 text-base">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs uppercase tracking-widest shadow-xl shadow-red-950/60 transition-all"
            >
              Proceed To Checkout — ₹{total.toLocaleString("en-IN")}
            </button>
          </div>
        )}
      </div>

      {/* Razorpay Simulation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-lg glass-card border border-red-500/40 p-6 md:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm"
            >
              ✕
            </button>

            {paymentStep === "address" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xl font-bold">1</span>
                  <h3 className="serif text-lg text-white font-medium">Shipping Address</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                  />
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                  />
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Street Address & Villa No."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                    />
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="Pincode"
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setPaymentStep("payment")}
                  className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Continue to Razorpay Payment →
                </button>
              </div>
            )}

            {paymentStep === "payment" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">Razorpay</span>
                    <span className="text-xs text-gray-400">Secure Checkout</span>
                  </div>
                  <span className="serif text-red-400 font-bold">₹{total.toLocaleString("en-IN")}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePaymentSuccess}
                    className="w-full p-4 rounded-xl border border-red-500/40 bg-red-950/20 hover:bg-red-900/40 text-left flex items-center justify-between text-white transition-all"
                  >
                    <div>
                      <p className="font-semibold text-xs">UPI / GPay / PhonePe / Paytm</p>
                      <p className="text-[10px] text-gray-400">Instant 1-Click Verification</p>
                    </div>
                    <span className="text-red-400 font-bold text-sm">Pay ₹{total.toLocaleString("en-IN")}</span>
                  </button>

                  <button
                    onClick={handlePaymentSuccess}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left flex items-center justify-between text-white transition-all"
                  >
                    <div>
                      <p className="font-semibold text-xs">Credit / Debit Card</p>
                      <p className="text-[10px] text-gray-400">Visa, Mastercard, Amex, Diners</p>
                    </div>
                    <span className="text-gray-400 text-xs">→</span>
                  </button>
                </div>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 text-green-400 flex items-center justify-center text-3xl mx-auto animate-bounce">
                  ✓
                </div>
                <h3 className="serif text-2xl text-white font-medium">Order Confirmed!</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{address.fullName}</strong>. Order{" "}
                  <span className="text-red-400 font-mono">#FLP-990421</span> has been sent to assembly.
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 text-left space-y-1">
                  <p>📦 Delivery Address: {address.street}, {address.city} - {address.postalCode}</p>
                  <p>🚚 Tracking link dispatched to: {address.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      clearCart();
                      setIsCheckoutModalOpen(false);
                      setIsCartOpen(false);
                      setPaymentStep("address");
                    }}
                    className="flex-1 py-3 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
