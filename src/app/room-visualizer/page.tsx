"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import RoomVisualizer from "@/components/RoomVisualizer";
import AiAssistantModal from "@/components/AiAssistantModal";
import QuickViewModal from "@/components/QuickViewModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ShopProvider } from "@/lib/store";

function RoomVisualizerContent() {
  return (
    <div className="min-h-screen bg-[#070709] text-gray-200">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main className="pt-24 pb-12">
        <RoomVisualizer />
      </main>

      <Footer />
    </div>
  );
}

export default function RoomVisualizerPage() {
  return (
    <ShopProvider>
      <RoomVisualizerContent />
    </ShopProvider>
  );
}
