"use client";

import React, { useState, useRef, useEffect } from "react";
import { PRODUCTS, Product } from "@/lib/data";

const PRESET_ROOMS = [
  {
    name: "Modern Minimal Suite",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Obsidian Living Lounge",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Executive Bedroom",
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function RoomVisualizer() {
  const [selectedRoom, setSelectedRoom] = useState(PRESET_ROOMS[0].url);
  const [customRoom, setCustomRoom] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Lamp overlay state
  const [lampPos, setLampPos] = useState({ x: 50, y: 35 }); // percentage
  const [lampScale, setLampScale] = useState(1.2);
  const [brightness, setBrightness] = useState(80);
  const [glowColor, setGlowColor] = useState("#ff1a3c");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  const activeRoomUrl = customRoom || selectedRoom;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const roomImg = new Image();
    roomImg.crossOrigin = "anonymous";
    roomImg.src = activeRoomUrl;

    const lampImg = new Image();
    lampImg.crossOrigin = "anonymous";
    lampImg.src = selectedProduct.images[0];

    let animationId: number;

    const draw = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw Room Background
      if (roomImg.complete) {
        ctx.drawImage(roomImg, 0, 0, w, h);
      }

      // Calculate Lamp Position
      const lx = (w * lampPos.x) / 100;
      const ly = (h * lampPos.y) / 100;

      // Render Lighting Glow Beam
      const glowRadius = (brightness / 100) * 350 * lampScale;
      const radGrad = ctx.createRadialGradient(lx, ly, 10, lx, ly, glowRadius);
      radGrad.addColorStop(0, glowColor);
      radGrad.addColorStop(0.3, "rgba(255, 26, 60, 0.25)");
      radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(lx, ly, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Lamp Image
      if (lampImg.complete) {
        const lampW = 120 * lampScale;
        const lampH = 120 * lampScale;
        ctx.save();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = brightness * 0.4;
        ctx.drawImage(lampImg, lx - lampW / 2, ly - lampH / 2, lampW, lampH);
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [activeRoomUrl, selectedProduct, lampPos, lampScale, brightness, glowColor]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomRoom(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    updatePos(e);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) updatePos(e);
  };

  const handleCanvasMouseUp = () => {
    isDragging.current = false;
  };

  const updatePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
    setLampPos({ x, y });
  };

  return (
    <section className="section-pad relative bg-black/60 overflow-hidden">
      <div className="section-head">
        <span className="eyebrow">✦ AI Photometric Studio ✦</span>
        <h2 className="serif text-white">Interactive Room Visualizer</h2>
        <p>
          Upload your space or choose a luxury suite preset. Drag the FLAMPIA lamp fixture and calibrate real-time lumens & ambient crimson warmth.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Controls Column */}
        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2 block">
              1. Choose Room Preset or Upload
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {PRESET_ROOMS.map((r) => (
                <button
                  key={r.name}
                  onClick={() => {
                    setCustomRoom(null);
                    setSelectedRoom(r.url);
                  }}
                  className={`h-16 rounded-xl overflow-hidden border transition-all ${
                    !customRoom && selectedRoom === r.url
                      ? "border-red-500 ring-2 ring-red-500/50"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img src={r.url} alt={r.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <label className="block w-full text-center py-2.5 px-4 rounded-xl border border-dashed border-red-500/40 hover:border-red-500 bg-red-950/10 cursor-pointer text-xs text-red-300 font-medium transition-colors">
              📷 Upload Your Own Room Photo
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2 block">
              2. Select Lamp Fixture
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`w-full p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                    selectedProduct.id === p.id
                      ? "bg-red-950/40 border-red-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="serif text-xs truncate font-medium">{p.name}</p>
                    <p className="text-[10px] text-red-400">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2 block">
              3. Calibrate Lumens & Warmth
            </label>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Lamp Scale</span>
                  <span>{Math.round(lampScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="2.5"
                  step="0.1"
                  value={lampScale}
                  onChange={(e) => setLampScale(parseFloat(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Illumination Intensity (Lumens)</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Ambient Light Glow Tint</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { label: "Crimson Red", color: "#ff1a3c" },
                    { label: "Warm Sunset", color: "#ff6b35" },
                    { label: "Soft Amber", color: "#f4c430" },
                    { label: "Pure White", color: "#ffffff" },
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setGlowColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`flex-1 h-8 rounded-lg border transition-transform ${
                        glowColor === c.color ? "scale-110 border-white shadow-lg" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Display Column */}
        <div className="lg:col-span-2 glass-card p-4 h-[550px] relative overflow-hidden flex flex-col">
          <div className="relative flex-1 w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-crosshair">
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 text-[11px] text-red-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Click or drag canvas to reposition light fixture</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>Fixture: <strong className="text-white">{selectedProduct.name}</strong></span>
            <button
              onClick={() => alert("High-resolution room visualization exported to gallery!")}
              className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold uppercase text-[10px] tracking-widest transition-colors"
            >
              Export HD Render
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
