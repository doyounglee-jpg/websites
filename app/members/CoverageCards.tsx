"use client";

/**
 * § 05 COVERAGE - separated glass cards with cursor-tracked tilt + sheen.
 *
 * What this gives you (per the brief):
 *   1. Each category is now its OWN card - glass chrome that matches
 *      companies §02 (rounded, white-10% border, opaque-dark surface,
 *      backdrop blur). No more single bordered wrapper with hairline
 *      dividers; each card stands alone on the page background.
 *   2. On hover, the card rotates to face the cursor. Max ±6° on each
 *      axis (rotateX from vertical mouse pos, rotateY from horizontal),
 *      and the whole card lifts ~16px out of the page on translateZ.
 *   3. A radial-gradient "sheen" highlight rides under the cursor -
 *      its position is tied to the same mouse coords, so as the card
 *      tilts the highlight glides across the surface like real glass
 *      catching light.
 *
 * The math runs in `onMouseMove` and writes CSS custom properties
 * directly on the DOM element (not React state) so the tilt follows
 * the cursor at native refresh rate without re-rendering every frame.
 *
 * Touch devices never fire `mousemove`, so they get the static glass
 * card and skip the tilt entirely - by design (touch-tilt feels wrong).
 */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export type CoverageCategory = {
  title: string;
  desc: string;
  statLabel: string;
  statValue: string;
  icon: IconSvgElement;
};

// Tuning constants - small enough that the effect reads as "subtle
// premium feedback" rather than "swinging in every direction".
const MAX_TILT_DEG = 3.5;
const LIFT_PX = 12;

export function CoverageCards({ categories }: { categories: CoverageCategory[] }) {
  return (
    <div className="reveal-item grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <TiltCard key={cat.title} category={cat} />
      ))}
    </div>
  );
}

function TiltCard({ category }: { category: CoverageCategory }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  // Touch-only devices never fire `mousemove`, but Tailwind's `:hover`
  // pseudo-class DOES stick after a tap and can persist until the
  // user taps elsewhere. So we gate every hover interaction (tilt,
  // sheen, lift, border brightening) on this flag - checked on mount
  // via matchMedia. SSR-safe: starts false; useEffect upgrades it on
  // desktop where it ends up true.
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHoverCapable(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  // Translate the cursor's pixel position inside the card to:
  //   --rx / --ry - rotation in degrees (clamped to ±MAX_TILT_DEG)
  //   --mx / --my - % from top-left of card (drives sheen position)
  // Writing CSS vars directly on the element avoids any React re-render
  // on mousemove - the GPU just animates from var() values.
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const nx = (px / r.width) * 2 - 1;   // -1..1 left-to-right
    const ny = (py / r.height) * 2 - 1;  // -1..1 top-to-bottom
    // rotateX inverts ny so cursor-above-center tilts the TOP toward
    // the viewer (the natural "lean toward me" direction).
    el.style.setProperty("--rx", `${-ny * MAX_TILT_DEG}deg`);
    el.style.setProperty("--ry", `${nx * MAX_TILT_DEG}deg`);
    el.style.setProperty("--mx", `${(px / r.width) * 100}%`);
    el.style.setProperty("--my", `${(py / r.height) * 100}%`);
  };

  // On leave, reset all CSS vars so the long ease-out transition
  // glides the card back to flat / centered sheen.
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    setHovered(false);
  };

  // Hover tilt layer transform - runs ON TOP of the scroll-proximity
  // translateY applied by the outer wrapper. Two layers means the
  // proximity wave can scroll smoothly (no transition) while the
  // hover lift still glides nicely.
  const tiltTransform = hovered
    ? `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(${LIFT_PX}px)`
    : "rotateX(0deg) rotateY(0deg) translateZ(0px)";

  // Two transition modes for the tilt layer:
  //   - hovered: snappy 90ms linear so tilt follows the cursor
  //   - resting: 500ms ease-out so leaving the card glides back
  const tiltTransition = hovered
    ? "transform 90ms linear, box-shadow 250ms ease, border-color 200ms ease"
    : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease, border-color 300ms ease";

  return (
    // Perspective container - gives the rotateX/Y inside it a vanishing
    // point. Without this the rotations are flat (just shears).
    <div style={{ perspective: "1100px" }}>
      <div
        ref={ref}
        onMouseEnter={hoverCapable ? () => setHovered(true) : undefined}
        onMouseMove={hoverCapable ? handleMove : undefined}
        onMouseLeave={hoverCapable ? handleLeave : undefined}
        className="relative flex min-h-[260px] flex-col gap-6 overflow-hidden rounded-[22px] border bg-white/[0.02] p-5"
        style={{
          transform: tiltTransform,
          transition: tiltTransition,
          transformStyle: "preserve-3d",
          // Border is state-driven (not Tailwind's `:hover`) so the
          // brightening only happens on hover-capable devices - taps
          // on mobile won't stick a brighter border state.
          borderColor:
            hoverCapable && hovered
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.08)",
          // Shadow grows on hover so the Z-lift reads as a real lift,
          // not just rotation in place.
          boxShadow:
            hoverCapable && hovered
              ? "0 28px 60px -16px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 0 0 0 transparent",
        }}
      >
        {/* Sheen highlight - a radial gradient anchored to --mx/--my.
            As the cursor moves, the bright spot follows; combined with
            the rotation this reads as the card surface catching light. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px]"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.025), transparent 65%)",
            opacity: hoverCapable && hovered ? 1 : 0,
            transition: "opacity 250ms ease",
          }}
        />

        {/* Icon bubble */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <HugeiconsIcon
            icon={category.icon}
            size={22}
            color="currentColor"
            strokeWidth={1.5}
            className="text-white/80"
          />
        </div>

        {/* Title + description */}
        <div className="relative flex flex-1 flex-col gap-2">
          <span className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
            {category.title}
          </span>
          <span className="text-sm leading-[1.55] tracking-[-0.005em] text-white/60">
            {category.desc}
          </span>
        </div>

        {/* Stat line */}
        <div className="relative flex items-center gap-2 pt-1">
          <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-white/50">
            {category.statLabel}
          </span>
          <span className="font-mono text-[13px] font-medium text-white">
            {category.statValue}
          </span>
        </div>
      </div>
    </div>
  );
}
