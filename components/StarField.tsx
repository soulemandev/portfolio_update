"use client";

import { useEffect, useRef } from "react";

// A quiet, slow-drifting field of points behind the hero — the one
// orchestrated motion moment on the page. Respects reduced-motion.
// Clicking anywhere over the hero spawns a small burst of stars from
// the click point (a shooting-star-ish sparkle), then fades out.
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Point = { x: number; y: number; r: number; drift: number; twinkle: number; phase: number };
    let points: Point[] = [];

    // Burst particles spawned on click — separate from the ambient
    // field so they can carry their own velocity/lifetime.
    type Burst = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      life: number; // 0..1 remaining
      decay: number;
    };
    let bursts: Burst[] = [];

    function spawnBurst(x: number, y: number) {
      const count = 14 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 0.6 + Math.random() * 2.2;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.6 + 0.6,
          life: 1,
          decay: 0.012 + Math.random() * 0.014,
        });
      }
      // Cap total burst particles so rapid clicking can't runaway.
      if (bursts.length > 400) {
        bursts.splice(0, bursts.length - 400);
      }
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 480;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 9000);
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        drift: Math.random() * 0.15 + 0.02,
        twinkle: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    let raf = 0;
    let t = 0;

    // Read the current --color-ink value so dots match the active theme
    // (dark: pale points, light: ink-dark points), and stay in sync if
    // the theme toggles while this page is open.
    let dotRgb = "231, 233, 245";
    function readThemeColor() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-ink")
        .trim();
      if (raw) dotRgb = raw.split(/\s+/).join(", ");
    }
    readThemeColor();
    const themeObserver = new MutationObserver(readThemeColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Amber accent for the click bursts, matching the site's --color-amber.
    let amberRgb = "245, 166, 35";
    function readAmberColor() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-amber")
        .trim();
      if (raw) amberRgb = raw.split(/\s+/).join(", ");
    }
    readAmberColor();

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of points) {
        const alpha = 0.35 + 0.45 * Math.sin(t * p.twinkle + p.phase);
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${dotRgb}, ${Math.max(0.08, alpha)})`;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();

        if (!prefersReducedMotion) {
          p.y -= p.drift;
          if (p.y < -2) {
            p.y = height + 2;
            p.x = Math.random() * width;
          }
        }
      }

      if (bursts.length) {
        for (let i = bursts.length - 1; i >= 0; i--) {
          const b = bursts[i];
          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${amberRgb}, ${Math.max(0, b.life)})`;
          ctx!.arc(b.x, b.y, b.r * Math.max(0.2, b.life), 0, Math.PI * 2);
          ctx!.fill();

          if (!prefersReducedMotion) {
            b.x += b.vx;
            b.y += b.vy;
            b.vx *= 0.96;
            b.vy *= 0.96;
          }
          b.life -= b.decay;
          if (b.life <= 0) bursts.splice(i, 1);
        }
      }

      t += 0.015;
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // The canvas itself stays pointer-events-none so it never blocks
    // clicks on real hero content (links, buttons, text). Instead we
    // listen on the parent section — clicks still bubble up to it —
    // and translate the click position into canvas-local coordinates.
    const parent = canvas.parentElement;
    function onClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      spawnBurst(x, y);
    }
    parent?.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      parent?.removeEventListener("click", onClick);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
