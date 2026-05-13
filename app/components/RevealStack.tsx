"use client";

// RevealStack — hero-specific Linear-style staggered reveal.
//
// What it does: when this wrapper scrolls into view, every descendant
// marked with `className="reveal-item"` reveals in DOM order
// (top-to-bottom, left-to-right within rows). Each item picks up the
// .reveal-item CSS (opacity 0 → 1, translateY(24px) → 0, blur(12px) →
// 0, scale(0.97) → 1) from globals.css; this component just owns the
// trigger and the cascading transition-delay values.
//
// Why "stack" and not auto-staggering inside <Reveal>: the existing
// <Reveal> animates a whole block as one unit. Heroes want their inner
// pieces (eyebrow, headline, body, CTA, mockup) to land one after the
// other — a fundamentally different feel. Keeping two distinct
// primitives keeps each one focused on its job.
//
// Delays are assigned via inline style at mount, not nth-child CSS, so
// any number of `.reveal-item` descendants work without hardcoded
// rules. The querySelectorAll runs once on mount; if items are added
// later you'd need to re-run it (not a concern for the current heroes,
// which are static).

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealStackProps = {
  children: ReactNode;
  className?: string;
  // ms between successive items' reveals (DOM order).
  // Larger = more pronounced staircase; smaller = tighter cascade.
  stagger?: number;
  // ms per item's transition. Wired through as the --reveal-duration
  // CSS variable that .reveal-item's transition reads. Longer than
  // .reveal's 800ms because hero reveals are meant to feel cinematic.
  duration?: number;
  // ms before the first item starts revealing. A small pause (~80ms)
  // after the section enters view makes the cascade feel intentional
  // rather than instant.
  startDelay?: number;
};

export default function RevealStack({
  children,
  className = "",
  stagger = 150,
  duration = 1200,
  startDelay = 80,
}: RevealStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Assign cascading transition-delay values to every .reveal-item
    // descendant. Done up-front (before the observer fires) so the
    // delays are in place by the time we flip the `revealed` class.
    const items = el.querySelectorAll<HTMLElement>(".reveal-item");
    items.forEach((item, i) => {
      item.style.transitionDelay = `${startDelay + i * stagger}ms`;
    });

    // Respect reduced-motion — skip the cascade and show content
    // immediately. The CSS @media rule also handles this defensively.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      {
        // Lower threshold than .reveal — heroes are usually in view on
        // page load, so we want the cascade to start the moment any
        // sliver is visible (rather than waiting for 10%).
        threshold: 0.05,
        // Slight bottom trim, but smaller than .reveal so the hero
        // starts revealing earlier than a mid-page section would.
        rootMargin: "0px 0px -5% 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stagger, startDelay]);

  // Drive the .reveal-item transition duration from this component so
  // a single duration knob propagates to every item without per-item
  // inline styling.
  const style = { "--reveal-duration": `${duration}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={["reveal-stack", revealed ? "revealed" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
