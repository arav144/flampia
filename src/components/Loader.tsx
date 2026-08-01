"use client";

import React, { useEffect, useState } from "react";
import FlampiaLogo from "./Logo";

export default function Loader() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={opened ? "opened" : ""}>
      <div className="flex flex-col items-center justify-center text-center p-6">
        <div className="scale-125 md:scale-150 transform transition-transform duration-1000">
          <FlampiaLogo size="xl" />
        </div>
        <p className="loader-sub text-red-500 font-semibold tracking-[0.3em] uppercase mt-6">
          Architectural Lighting Atelier
        </p>
      </div>
    </div>
  );
}
