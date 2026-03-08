"use client";

import { useEffect, useState } from "react";

interface WaveDot {
  id: number;
  x: number;
  topPx: number;
  size: number;
  waveDuration: number;
  waveDelay: number;
  amplitude: number;
  pulseDuration: number;
  pulseDelay: number;
}

const ROW_CONFIGS = [
  { baseYFraction: 0.06, waveDuration: 4.2, amplitude: 20, parallax: 0.10 },
  { baseYFraction: 0.18, waveDuration: 3.3, amplitude: 27, parallax: 0.14 },
  { baseYFraction: 0.30, waveDuration: 5.5, amplitude: 30, parallax: 0.12 },
  { baseYFraction: 0.42, waveDuration: 4.7, amplitude: 34, parallax: 0.20 },
  { baseYFraction: 0.54, waveDuration: 3.8, amplitude: 28, parallax: 0.17 },
  { baseYFraction: 0.66, waveDuration: 6.0, amplitude: 38, parallax: 0.25 },
  { baseYFraction: 0.78, waveDuration: 4.4, amplitude: 41, parallax: 0.28 },
  { baseYFraction: 0.90, waveDuration: 5.0, amplitude: 35, parallax: 0.32 },
] as const;

function buildRow(
  rowIndex: number,
  dotsPerRow: number,
  vh: number,
  config: (typeof ROW_CONFIGS)[number],
): WaveDot[] {
  const { baseYFraction, waveDuration, amplitude } = config;
  const COPIES = 4;
  const dots: WaveDot[] = [];

  for (let n = 0; n < COPIES; n++) {
    for (let i = 0; i < dotsPerRow; i++) {
      const phase = i / dotsPerRow;
      dots.push({
        id: rowIndex * 100_000 + n * 1_000 + i,
        x: (i / (dotsPerRow - 1)) * 100,
        topPx: baseYFraction * vh + n * vh,
        size: 2.5 + Math.random() * 2,
        waveDuration,
        waveDelay: -phase * waveDuration,
        amplitude,
        pulseDuration: 2 + Math.random() * 2,
        pulseDelay: -(Math.random() * 4),
      });
    }
  }

  return dots;
}

export default function WaveDots() {
  const [rows, setRows] = useState<WaveDot[][]>(() =>
    ROW_CONFIGS.map(() => [])
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const vh = window.innerHeight;
    const dotsPerRow = window.innerWidth < 768 ? 10 : 20;
    setRows(ROW_CONFIGS.map((cfg, i) => buildRow(i, dotsPerRow, vh, cfg)));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, overflow: "visible" }}
      aria-hidden="true"
    >
      {rows.map((rowDots, rowIndex) => (
        <div
          key={rowIndex}
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          {rowDots.map((dot) => (
            <div
              key={dot.id}
              className="bg-wave-dot"
              style={{
                left: `${dot.x}%`,
                top: `${dot.topPx}px`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                animationDuration: `${dot.waveDuration}s`,
                animationDelay: `${dot.waveDelay}s`,
                "--wave-amp": `${dot.amplitude}px`,
              } as React.CSSProperties}
            >
              <div
                className="bg-wave-dot-inner"
                style={{
                  animationDuration: `${dot.pulseDuration}s`,
                  animationDelay: `${dot.pulseDelay}s`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
