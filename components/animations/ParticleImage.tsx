"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface ParticleImageProps {
  src: string;
  width?: number;
  height?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
  returnSpeed?: number;
  /** Size of each displacement tile in CSS px (larger = more visible scatter) */
  tileSize?: number;
}

export default function ParticleImage({
  src,
  width = 450,
  height = 520,
  repulsionRadius = 60,
  repulsionStrength = 8,
  returnSpeed = 0.12,
  tileSize = 6,
}: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<{
    drawW: number;
    drawH: number;
    offsetX: number;
    offsetY: number;
    pixels: Uint8ClampedArray;
  } | null>(null);
  const gridRef = useRef<{
    cols: number;
    rows: number;
    curX: Float32Array;
    curY: Float32Array;
    /** Per-tile random multiplier (0.2–1.0) for varying displacement "height" */
    jitter: Float32Array;
  } | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);
  const animateLoopRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use a fixed default for SSR; resolve actual dpr after mount to avoid hydration mismatch
  const dpr = mounted ? Math.min(window.devicePixelRatio || 1, 2) : 2;
  const cW = Math.round(width * dpr);
  const cH = Math.round(height * dpr);
  const sTile = Math.round(tileSize * dpr);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  // ── Build image data + displacement grid ─────────────────────────
  const buildData = useCallback(
    (img: HTMLImageElement) => {
      const off = document.createElement("canvas");
      const ctx = off.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const scale = Math.min(cW / img.width, cH / img.height);
      const drawW = Math.round(img.width * scale);
      const drawH = Math.round(img.height * scale);

      off.width = drawW;
      off.height = drawH;
      ctx.drawImage(img, 0, 0, drawW, drawH);

      const imageData = ctx.getImageData(0, 0, drawW, drawH);
      const offsetX = Math.round((cW - drawW) / 2);
      const offsetY = Math.round((cH - drawH) / 2);

      imgRef.current = {
        drawW,
        drawH,
        offsetX,
        offsetY,
        pixels: imageData.data,
      };

      // Create coarse displacement grid with per-tile random sensitivity
      const cols = Math.ceil(drawW / sTile);
      const rows = Math.ceil(drawH / sTile);
      const total = cols * rows;
      const jitter = new Float32Array(total);
      for (let i = 0; i < total; i++) {
        jitter[i] = 0.2 + Math.random() * 0.8; // 0.2–1.0
      }
      gridRef.current = {
        cols,
        rows,
        curX: new Float32Array(total),
        curY: new Float32Array(total),
        jitter,
      };
    },
    [cW, cH, sTile],
  );

  // ── Animation loop ───────────────────────────────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const imgD = imgRef.current;
    const grid = gridRef.current;
    if (!canvas || !imgD || !grid) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const out = ctx.createImageData(cW, cH);
    const outData = out.data;

    const { drawW, drawH, offsetX, offsetY, pixels } = imgD;
    const { cols, rows, curX, curY, jitter } = grid;
    const mouse = mouseRef.current;
    const mx = mouse.x * dpr - offsetX;
    const my = mouse.y * dpr - offsetY;
    const scaledR = repulsionRadius * dpr;
    const rSq = scaledR * scaledR;
    const str = repulsionStrength * dpr;

    // ── Update tile displacements ──────────────────────────────────
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const gi = row * cols + col;
        const tcx = (col + 0.5) * sTile;
        const tcy = (row + 0.5) * sTile;

        if (mouse.active) {
          const dx = tcx - mx;
          const dy = tcy - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < rSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Per-tile jitter gives varying displacement "height"
            const force = ((scaledR - dist) / scaledR) * str * jitter[gi];
            curX[gi] += (dx / dist) * force;
            curY[gi] += (dy / dist) * force;
          }
        }

        // Spring back toward 0 (home)
        curX[gi] *= 1 - returnSpeed;
        curY[gi] *= 1 - returnSpeed;
      }
    }

    // ── Render pixels with tile displacement ───────────────────────
    for (let y = 0; y < drawH; y++) {
      const tileRow = (y / sTile) | 0;
      const rowGi = tileRow * cols;
      for (let x = 0; x < drawW; x++) {
        const si = (y * drawW + x) * 4;
        if (pixels[si + 3] < 10) continue;

        const tileCol = (x / sTile) | 0;
        const gi = rowGi + tileCol;

        const destX = Math.round(x + offsetX + curX[gi]);
        const destY = Math.round(y + offsetY + curY[gi]);

        if (destX >= 0 && destX < cW && destY >= 0 && destY < cH) {
          const di = (destY * cW + destX) * 4;
          outData[di] = pixels[si];
          outData[di + 1] = pixels[si + 1];
          outData[di + 2] = pixels[si + 2];
          outData[di + 3] = pixels[si + 3];
        }
      }
    }

    ctx.putImageData(out, 0, 0);
    rafRef.current = requestAnimationFrame(() => animateLoopRef.current());
  }, [cW, cH, dpr, sTile, repulsionRadius, repulsionStrength, returnSpeed]);

  useLayoutEffect(() => {
    animateLoopRef.current = animate;
  }, [animate]);

  // ── Load image ───────────────────────────────────────────────────
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    // Only proxy when src is a direct Sanity CDN URL (avoid double-proxy: /_next/image?url=... already contains "cdn.sanity.io" in query)
    let loadSrc = src;
    if (
      typeof window !== "undefined" &&
      src.startsWith("https://cdn.sanity.io")
    ) {
      loadSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=90`;
    }
    const resolvedSrc =
      loadSrc.startsWith("/") ? `${window.location.origin}${loadSrc}` : loadSrc;
    img.onload = () => {
      buildData(img);
      setReady(true);
    };
    img.onerror = () => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[ParticleImage] Failed to load image:", resolvedSrc);
      }
    };
    img.src = resolvedSrc;
    return () => cancelAnimationFrame(rafRef.current);
  }, [src, buildData]);

  useEffect(() => {
    if (!ready) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, animate]);

  // ── Mouse tracking ───────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handleMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };
    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);
    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // ── 3-axis wobble ────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let wobbleRaf: number;
    const wobble = (t: number) => {
      const s = t * 0.001;
      const rx = Math.sin(s * 0.4) * 8;
      const ry = Math.sin(s * 0.3 + 1) * 10;
      const rz = Math.sin(s * 0.2 + 2) * 3;
      const ty = Math.sin(s * 0.5 + 0.5) * 18;
      wrapper.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translateY(${ty}px)`;
      wobbleRaf = requestAnimationFrame(wobble);
    };
    wobbleRaf = requestAnimationFrame(wobble);
    return () => cancelAnimationFrame(wobbleRaf);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{
        width,
        height,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <canvas
        ref={canvasRef}
        width={cW}
        height={cH}
        className="block"
        style={{ width, height }}
      />
    </div>
  );
}
