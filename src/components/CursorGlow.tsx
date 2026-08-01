"use client";

import React, { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (!target || !glowRef.current) return;

      const isButton = target.closest("button, a, input, select, .btn");
      const isProduct = target.closest(".p-card, .p-visual, canvas, .c-tile");

      if (isProduct) {
        glowRef.current.className = "cursor-glow product-hover";
      } else if (isButton) {
        glowRef.current.className = "cursor-glow hover";
      } else {
        glowRef.current.className = "cursor-glow normal";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const animate = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.2;
      currentPos.current.y += dy * 0.2;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow normal" />;
}
