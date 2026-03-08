"use client";

import { useEffect, useRef, useState } from "react";

interface GlitchSlice {
  id: number;
  y: number;       // top %
  height: number;  // px
  xOffset: number; // translateX px (small, +/-)
  width: number;   // % of viewport width
  xStart: number;  // left %
  opacity: number;
}

interface GlitchState {
  active: boolean;
  slices: GlitchSlice[];
}

const IDLE_STATE: GlitchState = { active: false, slices: [] };

export default function GlitchEffect() {
  const [glitch, setGlitch] = useState<GlitchState>(IDLE_STATE);
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function triggerGlitch() {
      // 2-4 random horizontal slices
      const count = 2 + Math.floor(Math.random() * 3);
      const slices: GlitchSlice[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        y: Math.random() * 96,
        height: 1 + Math.random() * 2.5,
        xOffset: (Math.random() - 0.5) * 12,       // ±6px shift
        width: 40 + Math.random() * 60,             // 40–100% wide
        xStart: Math.random() * 10,                 // slight left jitter
        opacity: 0.035 + Math.random() * 0.055,
      }));

      setGlitch({ active: true, slices });

      // Clear after a very short burst (100–280ms)
      clearRef.current = setTimeout(() => {
        setGlitch(IDLE_STATE);
      }, 100 + Math.random() * 180);
    }

    function schedule() {
      // Repeat every 5–13 seconds
      const delay = 5000 + Math.random() * 8000;
      scheduleRef.current = setTimeout(() => {
        triggerGlitch();
        schedule(); // reschedule after firing
      }, delay);
    }

    schedule();

    return () => {
      if (scheduleRef.current) clearTimeout(scheduleRef.current);
      if (clearRef.current) clearTimeout(clearRef.current);
    };
  }, []);

  if (!glitch.active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {glitch.slices.map((slice) => (
        <div
          key={slice.id}
          style={{
            position: "absolute",
            top: `${slice.y}%`,
            left: `${slice.xStart}%`,
            width: `${slice.width}%`,
            height: `${slice.height}px`,
            transform: `translateX(${slice.xOffset}px)`,
            background: `rgba(255, 255, 255, ${slice.opacity})`,
          }}
        />
      ))}
    </div>
  );
}
