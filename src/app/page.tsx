"use client";

import React from "react";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import Collections from "@/components/Collections";
import RoomVisualizer from "@/components/RoomVisualizer";
import WhyFlampia from "@/components/WhyFlampia";
import Story from "@/components/Story";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
function HomeContent() {
  return (
    <SmoothScroll>
      <CursorGlow />
      <Loader />
      <Header />
      <QuickViewModal />
      <AiAssistantModal />
      <WhatsAppButton />

      <main>
        <Hero />
        <Marquee />
        <ProductShowcase />
        <Collections />
        <RoomVisualizer />
        <WhyFlampia />
        <Story />
        <CtaBand />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

export default function Home() {
  return <HomeContent />;
}
