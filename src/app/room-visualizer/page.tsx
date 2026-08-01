"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import RoomVisualizer from "@/components/RoomVisualizer";
import AiAssistantModal from "@/components/AiAssistantModal";
import QuickViewModal from "@/components/QuickViewModal";
import WhatsAppButton from "@/components/WhatsAppButton";

function RoomVisualizerContent() {
  return (
    <div className="min-h-screen bg-ink text-beige transition-colors duration-500">
      <CursorGlow />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main className="pt-24 pb-16">
        <RoomVisualizer />
      </main>

      <Footer />
    </div>
  );
}

export default function RoomVisualizerPage() {
  return <RoomVisualizerContent />;
}
