"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  interactive?: boolean;
  glowColor?: string;
}

export default function ThreeLampViewer({ interactive = true, glowColor = "#ff1a3c" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent?.clientWidth || 400);
    let height = (canvas.height = parent?.clientHeight || 400);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          width = canvas.width = Math.max(200, Math.floor(entry.contentRect.width));
          height = canvas.height = Math.max(200, Math.floor(entry.contentRect.height));
        }
      }
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      angle += 0.008;
      const rotY = rotationRef.current.y + Math.sin(angle) * 0.15;
      const rotX = rotationRef.current.x;

      // Draw Ambient Radiant Light Cone
      const gradCone = ctx.createRadialGradient(
        centerX,
        centerY - 60,
        10,
        centerX,
        centerY + 100,
        width * 0.45
      );
      gradCone.addColorStop(0, "rgba(255, 26, 60, 0.4)");
      gradCone.addColorStop(0.4, "rgba(230, 0, 38, 0.15)");
      gradCone.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradCone;
      ctx.beginPath();
      ctx.arc(centerX, centerY, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Save transform for 3D Lamp tilt
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotY * 0.4);
      ctx.transform(1, rotX * 0.2, 0, 1, 0, 0);

      // Suspension Cable
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -centerY);
      ctx.lineTo(0, -70);
      ctx.stroke();

      // Top Brass Crown Cap
      const crownGrad = ctx.createLinearGradient(-30, -70, 30, -70);
      crownGrad.addColorStop(0, "#4a0812");
      crownGrad.addColorStop(0.5, "#ff1a3c");
      crownGrad.addColorStop(1, "#260409");
      ctx.fillStyle = crownGrad;
      ctx.beginPath();
      ctx.ellipse(0, -70, 35, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sculpted 3D Crimson Ring (Aura Pendant)
      const ringGrad = ctx.createLinearGradient(-110, 0, 110, 0);
      ringGrad.addColorStop(0, "#e60026");
      ringGrad.addColorStop(0.3, "#ff3352");
      ringGrad.addColorStop(0.7, "#ffffff");
      ringGrad.addColorStop(1, "#800014");

      ctx.lineWidth = 18;
      ctx.strokeStyle = ringGrad;
      ctx.shadowColor = "#ff1a3c";
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.ellipse(0, 0, 115 + Math.sin(rotY) * 10, 50, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Glowing Filament Core
      ctx.shadowBlur = 40;
      ctx.shadowColor = "#ffffff";
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Orb Light
      ctx.shadowBlur = 20;
      ctx.shadowColor = glowColor;
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(Math.cos(angle * 2) * 80, Math.sin(angle * 2) * 20, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [glowColor]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      rotationRef.current.x = Math.max(-0.5, Math.min(0.5, rotationRef.current.x + deltaY * 0.005));
      rotationRef.current.y += deltaX * 0.01;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {interactive && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-red-500/70 pointer-events-none">
          ✦ Drag to rotate 3D lamp ✦
        </div>
      )}
    </div>
  );
}
