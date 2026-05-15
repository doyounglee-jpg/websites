"use client";

/**
 * § 05 RETURN — Employer ROI mockup card.
 *
 * Two layers of polish (same recipe as the "Why It Works" cards in
 * ./FeatureCardsSection.tsx and the platform cards in
 * ./PlatformGraphics.tsx):
 *   1. Cursor-tracked tilt + sheen + lift on the outer card.
 *   2. Inside numerics animate every time the card is hovered:
 *        - +14.2% retention lift counts up from 0
 *        - −32% stress reduction counts up from 0
 *        - Sparkline draws in left-to-right
 *        - Bottom stat rows cascade in
 *
 * The outer container is an <article> so the closest("article")
 * hover detection in useArticleHover finds the right ancestor.
 */

import { useEffect, useRef, useState, type MouseEvent } from "react";

/* ─────────────────────────────────────────────────────────────────
   HOOKS — same shape as FeatureCardsSection / PlatformGraphics
   ───────────────────────────────────────────────────────────────── */

function useArticleHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [playCount, setPlayCount] = useState(1);

  useEffect(() => {
    const root = ref.current;
    const article = root?.closest("article");
    if (!article) return;
    const onEnter = () => setPlayCount((c) => c + 1);
    article.addEventListener("mouseenter", onEnter);
    return () => article.removeEventListener("mouseenter", onEnter);
  }, []);

  return { ref, playCount };
}

// Integer count-up.
function useCountUp(target: number, key: number, durMs = 900) {
  const [val, setVal] = useState(target);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    setVal(0);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, key, durMs]);

  return val;
}

// Decimal count-up (for "14.2" style values). Returns a fixed-decimal string.
function useCountUpDecimal(target: number, key: number, decimals = 1, durMs = 900) {
  const [val, setVal] = useState(target);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    setVal(0);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, key, decimals, durMs]);

  return val.toFixed(decimals);
}

/* ─────────────────────────────────────────────────────────────────
   INNER GRAPHIC — wires up the count-ups + sparkline draw-in.
   ───────────────────────────────────────────────────────────────── */

function RoiInner() {
  const { ref, playCount } = useArticleHover();
  // "+14.2%" — animate the integer part. The decimal ".2%" stays
  // suffixed so the visual rhythm during the count-up matches the
  // final settled value.
  const retention = useCountUpDecimal(14.2, playCount, 1, 1000);
  // "−32%" — flat integer.
  const stress = useCountUp(32, playCount, 900);

  return (
    <div ref={ref} className="contents">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Employer ROI · last 12 months</span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-400">
            ACME INC
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/80">12M</span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">6M</span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">QTR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          key={`stat-r-${playCount}`}
          className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5"
          style={{ animation: "roi-fade-up 520ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both" }}
        >
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">RETENTION LIFT</span>
          <span className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-white/90 sm:text-[40px]">
            +{retention}<span className="text-white/30">%</span>
          </span>
          <span className="text-[12px] text-zinc-500">vs. control cohort, year 1</span>
        </div>
        <div
          key={`stat-s-${playCount}`}
          className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5"
          style={{ animation: "roi-fade-up 520ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both" }}
        >
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">STRESS REDUCTION</span>
          <span className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-white/90 sm:text-[40px]">
            −{stress}<span className="text-white/30">%</span>
          </span>
          <span className="text-[12px] text-zinc-500">self-reported, 6-month survey</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">ENROLLMENT GROWTH</span>
          <span className="font-mono text-[11px] text-white/55">↑ 28% MoM</span>
        </div>
        <Sparkline playCount={playCount} />
        <div className="flex items-center justify-between font-mono text-[10px] text-white/35">
          <span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span><span>DEC</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {[
          { label: "Productive hours recovered / employee / yr", value: "62" },
          { label: "Avg. time to first member win",              value: "11 days" },
          { label: "Cost to employer per employee / yr",         value: "$8.40" },
        ].map((r, i) => (
          <div
            key={`${playCount}-${r.label}`}
            className={`flex items-center justify-between border-t border-white/[0.06] py-3.5 ${i === 2 ? "border-b" : ""}`}
            style={{ animation: `roi-fade-up 480ms cubic-bezier(0.16, 1, 0.3, 1) ${900 + i * 110}ms both` }}
          >
            <span className="text-sm font-medium text-white/60">{r.label}</span>
            <span className="font-mono text-[13px] font-semibold text-white/90">{r.value}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes roi-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SPARKLINE — animated stroke-draw-in on hover.
   ───────────────────────────────────────────────────────────────── */

function Sparkline({ playCount }: { playCount: number }) {
  // Same Catmull-Rom-derived path as the previous (static) Sparkline,
  // re-keyed by playCount so stroke-dasharray restarts each hover.
  const pts: [number, number][] = [
    [0,   73],
    [100, 68],
    [200, 58],
    [300, 44],
    [400, 27],
    [500, 14],
    [600,  8],
  ];

  const linePath = pts.reduce((acc, p2, i) => {
    if (i === 0) return `M ${p2[0]},${p2[1]}`;
    const p0 = pts[Math.max(i - 2, 0)];
    const p1 = pts[i - 1];
    const p3 = pts[Math.min(i + 1, pts.length - 1)];
    const cp1x = (p1[0] + (p2[0] - p0[0]) / 6).toFixed(2);
    const cp1y = (p1[1] + (p2[1] - p0[1]) / 6).toFixed(2);
    const cp2x = (p2[0] - (p3[0] - p1[0]) / 6).toFixed(2);
    const cp2y = (p2[1] - (p3[1] - p1[1]) / 6).toFixed(2);
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }, "");

  const fillPath = `${linePath} L 600,80 L 0,80 Z`;

  return (
    <svg viewBox="0 0 600 80" width="100%" style={{ height: "auto", display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>
      </defs>
      {/* Fill fades in after the line finishes drawing. */}
      <path
        key={`fill-${playCount}`}
        d={fillPath}
        fill="url(#sparkGrad)"
        style={{ animation: "roi-spark-fill 600ms ease-out 1100ms both" }}
      />
      {/* Stroke draws in left-to-right via dash-offset trick. The
          dasharray is set to roughly the path length; pathLength="1"
          would be cleaner but Safari can be flaky with it. */}
      <path
        key={`line-${playCount}`}
        d={linePath}
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        style={{ animation: "roi-spark-draw 1100ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      />
      <circle cx="0" cy="73" r="3" fill="rgba(255,255,255,0.55)" />
      <circle
        key={`end-${playCount}`}
        cx="600" cy="8" r="3"
        fill="rgba(255,255,255,0.55)"
        style={{ animation: "roi-spark-end 320ms cubic-bezier(0.16, 1, 0.3, 1) 1050ms both" }}
      />
      <style>{`
        @keyframes roi-spark-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes roi-spark-fill { from { opacity: 0; } to { opacity: 1; } }
        @keyframes roi-spark-end  { from { opacity: 0; transform: scale(0.3); transform-origin: 600px 8px; } to { opacity: 1; transform: scale(1); transform-origin: 600px 8px; } }
      `}</style>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TILT WRAPPER — same cursor-tracked tilt + sheen as
   FeatureCardsSection. Rendered as <article> so RoiInner's
   useArticleHover binds to the right ancestor.
   ───────────────────────────────────────────────────────────────── */

const MAX_TILT_DEG = 3.5;
const LIFT_PX = 12;

export default function RoiMockup() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHoverCapable(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const nx = (px / r.width) * 2 - 1;
    const ny = (py / r.height) * 2 - 1;
    el.style.setProperty("--rx", `${-ny * MAX_TILT_DEG}deg`);
    el.style.setProperty("--ry", `${nx * MAX_TILT_DEG}deg`);
    el.style.setProperty("--mx", `${(px / r.width) * 100}%`);
    el.style.setProperty("--my", `${(py / r.height) * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    setHovered(false);
  };

  const tiltTransform = hovered
    ? `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(${LIFT_PX}px)`
    : "rotateX(0deg) rotateY(0deg) translateZ(0px)";

  const tiltTransition = hovered
    ? "transform 90ms linear, box-shadow 250ms ease, border-color 200ms ease"
    : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease, border-color 300ms ease";

  return (
    <div style={{ perspective: "1100px" }}>
      <article
        ref={ref}
        onMouseEnter={hoverCapable ? () => setHovered(true) : undefined}
        onMouseMove={hoverCapable ? handleMove : undefined}
        onMouseLeave={hoverCapable ? handleLeave : undefined}
        className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[18px] border bg-white/[0.02] p-7"
        style={{
          transform: tiltTransform,
          transition: tiltTransition,
          transformStyle: "preserve-3d",
          borderColor:
            hoverCapable && hovered
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.06)",
          boxShadow:
            hoverCapable && hovered
              ? "0 28px 60px -16px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 0 0 0 transparent",
        }}
      >
        {/* Sheen overlay anchored to cursor pos. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px]"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.025), transparent 65%)",
            opacity: hoverCapable && hovered ? 1 : 0,
            transition: "opacity 250ms ease",
          }}
        />

        <RoiInner />
      </article>
    </div>
  );
}
