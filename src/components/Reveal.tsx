"use client";

import { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section";
  scale?: boolean;
  className?: string;
};

export default function Reveal({ children, as = "div", scale = false, className = "" }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const base = scale ? "reveal-scale" : "reveal";
  const Tag = as as any;

  return (
    <Tag ref={ref} className={`${base} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
