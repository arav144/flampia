"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Product, PRODUCTS, COUPONS } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, finish?: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  themeMode: "dark" | "light";
  toggleThemeMode: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["flampia-aura-pendant"]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeMode: "dark" | "light" =
    mounted && (resolvedTheme === "light" || theme === "light") ? "light" : "dark";

  const toggleThemeMode = () => {
    const next = themeMode === "dark" ? "light" : "dark";
    setTheme(next);
  };


  const addToCart = (product: Product, finish?: string, qty: number = 1) => {
    const selectedFinish = finish || product.finish || "Standard";
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedFinish === selectedFinish
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty, selectedFinish }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const discount = COUPONS[cleanCode];
    if (discount) {
      setCouponCode(cleanCode);
      setDiscountPercent(discount);
      return { success: true, message: `Coupon ${cleanCode} applied! (${discount}% OFF)` };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist: (id: string) => wishlist.includes(id),
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        themeMode,
        toggleThemeMode,
        subtotal,
        discountAmount,
        total,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
};
