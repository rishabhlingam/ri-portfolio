"use client";

import { useEffect, useState } from "react";

interface Dot {
  id: number;
  x: number;       // left %
  y: number;       // top %
  size: number;    // px
  delay: number;   // animation-delay in seconds
  duration: number;// animation-duration in seconds
  opacity: number; // base opacity
}

/**
 * Distributes dots in a roughly uniform grid while adding small random offsets
 * so the pattern feels organic rather than perfectly rigid.
 */
function generateDots(count: number): Dot[] {
  const cols = 8;
  const rows = Math.ceil(count / cols);
  const dots: Dot[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Cell centres as percentages, then jitter within the cell
    const cellW = 100 / cols;
    const cellH = 100 / rows;

    dots.push({
      id: i,
      x: col * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.7,
      y: row * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.7,
      size: 2 + Math.random() * 2,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.05,
    });
  }

  return dots;
}

export default function SquareDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 20 : 35;
    queueMicrotask(() => {
      setDots(generateDots(count));
      setMounted(true);
    });
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="bg-dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            "--dot-opacity": dot.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
