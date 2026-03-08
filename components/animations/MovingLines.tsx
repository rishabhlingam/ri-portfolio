"use client";

import { useEffect, useState } from "react";

interface Line {
  id: number;
  isVertical: boolean;
  position: number;      // % along perpendicular axis (top for h-lines, left for v-lines)
  duration: number;      // animation duration in seconds
  delay: number;         // negative delay = start mid-animation
  reverse: boolean;      // direction of travel
  opacity: number;       // slight opacity variation
}

export default function MovingLines() {
  const [lines, setLines] = useState<Line[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generated: Line[] = [];

    // 4 horizontal lines (span full width, move top→bottom or bottom→top)
    for (let i = 0; i < 4; i++) {
      generated.push({
        id: i,
        isVertical: false,
        position: 5 + Math.random() * 90,         // spread across viewport
        duration: 10 + Math.random() * 8,          // 10–18s
        delay: -(Math.random() * 18),              // start mid-cycle
        reverse: i % 2 === 1,
        opacity: 0.04 + Math.random() * 0.04,
      });
    }

    // 4 vertical lines (span full height, move left→right or right→left)
    for (let i = 0; i < 4; i++) {
      generated.push({
        id: 4 + i,
        isVertical: true,
        position: 5 + Math.random() * 90,
        duration: 12 + Math.random() * 10,         // 12–22s
        delay: -(Math.random() * 22),
        reverse: i % 2 === 1,
        opacity: 0.03 + Math.random() * 0.03,
      });
    }

    setLines(generated);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {lines.map((line) =>
        line.isVertical ? (
          /* Vertical line: 1px wide, full height, slides left↔right */
          <div
            key={line.id}
            className="bg-line-v"
            style={{
              left: `${line.position}%`,
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
              animationDirection: line.reverse ? "reverse" : "normal",
              background: `rgba(255, 255, 255, ${line.opacity})`,
            }}
          />
        ) : (
          /* Horizontal line: full width, 1px tall, slides top↔bottom */
          <div
            key={line.id}
            className="bg-line-h"
            style={{
              top: `${line.position}%`,
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
              animationDirection: line.reverse ? "reverse" : "normal",
              background: `rgba(255, 255, 255, ${line.opacity})`,
            }}
          />
        )
      )}
    </div>
  );
}
