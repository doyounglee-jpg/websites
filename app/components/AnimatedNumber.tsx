"use client";

// AnimatedNumber — tween a number toward a target whenever `target`
// changes. The animation is JS/rAF-driven and runs to completion on its
// own; the caller just snaps `target` to a new value (e.g. in response
// to a scroll-derived state change) and AnimatedNumber smooths the
// visual transition.
//
// Use case: scroll-snap narratives (e.g. /companies §03 debt counter,
// /members §03.5 balance ticker) where scrolling past a "trigger point"
// commits to the next beat. The previous design drove every frame of
// the number from scroll position, which let users pause mid-animation
// at an awkward value. With AnimatedNumber, scroll only chooses the
// target; the tween always settles cleanly.
//
// Interpolation modes:
//   - "linear" (default): straight lerp. Right for in-the-same-order-of-
//     magnitude transitions (e.g. balance dropping $5,200 → $0).
//   - "geometric": multiplicative tween a * (b/a)^t. Right when values
//     span orders of magnitude (e.g. $172B → $17.5T) — linear lerp would
//     look like nothing for ~95% of the duration then a sudden jump.
//     NOTE: geometric requires both endpoints same sign and non-zero;
//     for transitions where one endpoint is 0, fall back to linear.

import { useEffect, useRef, useState } from "react";

type Mode = "linear" | "geometric";

export function AnimatedNumber({
  target,
  formatter,
  durationMs = 700,
  mode = "linear",
  className,
  style,
}: {
  target: number;
  // Renders the current value as a string. Called every frame, so keep
  // it cheap (no string-building beyond what's needed).
  formatter: (v: number) => string;
  durationMs?: number;
  mode?: Mode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState(target);
  // Refs avoid putting `displayed` in the effect's deps (which would
  // re-run the effect every frame and break the animation).
  const displayedRef = useRef(target);
  const targetRef = useRef(target);

  useEffect(() => {
    displayedRef.current = displayed;
  }, [displayed]);

  useEffect(() => {
    // No work needed if the target hasn't actually changed (e.g. on
    // initial mount or React strict-mode double-invocation).
    if (target === targetRef.current) return;
    targetRef.current = target;

    const startTime = performance.now();
    // Snapshot the current visible value as the animation's start. If
    // the user retriggers mid-animation, we start from wherever we
    // currently are (no jump back to the prior beat).
    const startValue = displayedRef.current;

    // Geometric mode requires both endpoints positive and non-zero.
    // Fall back to linear when that condition fails (e.g. the /members
    // balance lands on $0 in the final beat).
    const useGeometric =
      mode === "geometric" && startValue > 0 && target > 0;

    // Use setInterval (16ms ≈ 60fps) rather than requestAnimationFrame.
    // rAF is the "right" tool here, but some embedded preview iframes
    // suspend animation frames when their parent context isn't the
    // foreground tab — the callbacks queue but never fire, and the
    // number stays frozen. setInterval is unaffected by visibility
    // throttling for non-hidden documents and keeps the tween playing
    // reliably. 16ms gives ~60 ticks/sec; cleanup clears it.
    let timer: ReturnType<typeof setInterval> | null = setInterval(() => {
      const now = performance.now();
      const t = Math.min(1, (now - startTime) / durationMs);
      // Ease-out cubic on time. Feels like the number "settles" into
      // place rather than coasting linearly to a stop.
      const eased = 1 - Math.pow(1 - t, 3);
      const value = useGeometric
        ? startValue * Math.pow(target / startValue, eased)
        : startValue + (target - startValue) * eased;
      setDisplayed(value);
      if (t >= 1 && timer) {
        clearInterval(timer);
        timer = null;
      }
    }, 16);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [target, durationMs, mode]);

  return (
    <span className={className} style={style}>
      {formatter(displayed)}
    </span>
  );
}
