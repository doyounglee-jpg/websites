"use client";

// DebtScrollStory — scroll-driven counter narrative for the /companies
// §03 CONTEXT section.
//
// What happens: as the user scrolls through this section (which is
// ~3 viewports tall), a giant dollar number animates from $172B (US
// consumer debt in 1974) up to $17.5T (today), with the caption
// underneath cross-fading between three beats. Final beat lands on
// "Clerkie reverses that trend." — the brand statement.
//
// Implementation notes:
// - The OUTER container is tall (300vh). The INNER content uses
//   `position: sticky` so it pins to the viewport while the user
//   scrolls through the outer container's height.
// - We can NOT wrap this section in <Reveal> because Reveal applies
//   `filter: blur()`, which creates a containing block and breaks
//   `position: sticky` (sticky would pin to the Reveal element, not
//   the viewport). The section appears with the natural .page-enter
//   fade instead.
// - On mobile (where 300vh of pinned scroll feels weird and the GPU
//   cost of redrawing the number every frame is more expensive), we
//   skip the sticky pin and just stack the three beats vertically with
//   a normal IntersectionObserver fade per beat.
// - Number interpolation is exponential — debt grew ~100x in 50 years,
//   linear interp would feel like nothing for the first 95% of scroll
//   then a sudden jump. Exponential maps scroll progress to a
//   visually-uniform growth feeling.

import { useEffect, useRef, useState } from "react";

// The narrative beats. Beats 1-3 are the "growth" story (debt only goes
// up); beat 4 is the "reversal" story (Clerkie's actual impact). The
// label change carries the narrative shift entirely — no color tricks
// or special visual treatment for the final beat (kept all numbers
// uniformly styled per cleaner-design feedback).
const BEATS: Array<{ value: number; label: string }> = [
  { value: 172_000_000_000,    label: "US consumer debt, 1974" },
  { value: 4_200_000_000_000,  label: "US consumer debt, 2004" },
  { value: 17_500_000_000_000, label: "US consumer debt, today" },
  // Reversal beat — number plunges from $17.5T (macro problem) all the
  // way down to $4,820 (per-member personal impact). This is the same
  // figure used in the §03 CONTEXT footer of the old MEMBER_SAVINGS
  // table ("Average saved per enrolled employee · $4,820"), so the
  // narrative collapses from "trillions, abstract" to "thousands,
  // tangible". Believable, defensible, ties back to existing claims.
  { value: 4_820,              label: "Saved per Clerkie member, on average." },
];

// Each beat HOLDS for this fraction of total scroll, then a TRANSITION
// occupies the gap to the next beat. With 4 beats + 3 transitions:
//   4 * 0.175 + 3 * 0.10 = 0.70 + 0.30 = 1.00 ✓
// Tuned so the moment the number changes feels readable (not a snap).
// Hold zones still get a comfortable ~0.5s of scroll on the 450vh
// container; transitions get ~0.28s each, ~3× longer than before.
const HOLD_FRACTION = 0.175;
const TRANSITION_FRACTION = 0.10;

// Format a raw USD amount as "$X.XT" / "$XXXB" / "$XXM" depending on
// magnitude. Mono digits keep the number visually stable as it ticks
// (proportional digits would jitter horizontally as their widths
// change).
function formatDebt(v: number): string {
  if (v >= 1e12) {
    const t = v / 1e12;
    // 1 decimal for single-digit trillions ($4.2T), whole numbers above
    // ($17T) — keeps the digit count from jumping around.
    return `$${t < 10 ? t.toFixed(1) : Math.round(t)}T`;
  }
  if (v >= 1e9) {
    const b = v / 1e9;
    return `$${b < 10 ? b.toFixed(1) : Math.round(b)}B`;
  }
  if (v >= 1e6) {
    const m = v / 1e6;
    return `$${m < 10 ? m.toFixed(1) : Math.round(m)}M`;
  }
  // Below $1M — show raw dollars with comma separators. Used in the
  // final reversal beat ($4,820) and the intermediate transition values
  // as the number plummets from trillions to thousands.
  return `$${Math.round(v).toLocaleString("en-US")}`;
}

export default function DebtScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 0..1, where 0 = top of section just entered viewport, 1 = bottom
  // of section about to leave. The sticky inner content pins for this
  // whole range — same behavior on desktop AND mobile per design call
  // (mobile got the sticky treatment after preview feedback).
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frameId = 0;
    const onScroll = () => {
      // Throttle to one update per animation frame — getBoundingClientRect
      // can be expensive at scroll-event frequency (especially on
      // mobile where touch-scroll fires events very rapidly).
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        const rect = el.getBoundingClientRect();
        // Total scroll distance available within the section is its
        // own height minus one viewport (since the sticky child takes
        // a full viewport at any pinned moment).
        const totalScroll = rect.height - window.innerHeight;
        if (totalScroll <= 0) return;
        // How far have we scrolled past the section's top? When the
        // section's top is exactly at viewport top, rect.top is 0.
        const scrolled = Math.max(0, Math.min(totalScroll, -rect.top));
        setProgress(scrolled / totalScroll);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Hold-aware progression. The scroll range is divided into
  // alternating hold zones (number is static, label sits) and
  // transition zones (number animates quickly to the next beat).
  // Layout looks like:
  //
  //   |---HOLD beat 0---|trans|---HOLD beat 1---|trans|...|---HOLD beat 3---|
  //   0%             22%   26%               48%   52% ... 78%            100%
  //
  // Within a transition zone we use geometric interpolation so the
  // number "ramps" rather than jumping. For the last transition (debt
  // → Clerkie reversal), the value DECREASES (trillions to billions);
  // exponential decay reads as a free-fall which suits the narrative.
  const { value: interpolated, label } = (() => {
    let cursor = 0;
    for (let i = 0; i < BEATS.length; i++) {
      const holdEnd = cursor + HOLD_FRACTION;
      if (progress < holdEnd) {
        // We're in beat i's hold zone (or just entered).
        return { value: BEATS[i].value, label: BEATS[i].label };
      }
      // Past this beat's hold — if there's a next beat, check whether
      // we're in the transition zone TO it.
      if (i < BEATS.length - 1) {
        const transEnd = holdEnd + TRANSITION_FRACTION;
        if (progress < transEnd) {
          // In transition i → i+1. Local t goes 0..1 within the zone.
          const t = (progress - holdEnd) / TRANSITION_FRACTION;
          const a = BEATS[i].value;
          const b = BEATS[i + 1].value;
          // Geometric interp: a * (b/a)^t. Works for both growth AND
          // decay (final transition is decay) — produces a curve that
          // feels uniform regardless of direction.
          const value = a * Math.pow(b / a, t);
          // Label flips at the MIDPOINT of the transition so the
          // arriving label appears as the number nears its new value.
          const labelSrc = t >= 0.5 ? BEATS[i + 1] : BEATS[i];
          return { value, label: labelSrc.label };
        }
        cursor = transEnd;
      }
    }
    // Past everything — hold final beat.
    const last = BEATS[BEATS.length - 1];
    return { value: last.value, label: last.label };
  })();

  // How "deep" into the Clerkie reversal beat the user is. 0 = before
  // the transition into beat 4 starts; 1 = fully in beat 4's hold zone.
  // Ramps smoothly through the transition (progress 0.725 → 0.825) so
  // the glow eases in as the narrative turns, rather than snapping on.
  // The math mirrors the BEATS cursor layout (last hold = beat 3 starts
  // at progress 0.825; prior transition starts at 0.725).
  const clerkieIntensity = (() => {
    const finalTransStart = (BEATS.length - 1) * HOLD_FRACTION + (BEATS.length - 2) * TRANSITION_FRACTION;
    const finalHoldStart = finalTransStart + TRANSITION_FRACTION;
    if (progress <= finalTransStart) return 0;
    if (progress >= finalHoldStart) return 1;
    return (progress - finalTransStart) / TRANSITION_FRACTION;
  })();

  return (
    <div
      ref={containerRef}
      // 450vh on both desktop and mobile. With 4 narrative beats and
      // a hold-then-transition cadence (4×17.5% holds + 3×10%
      // transitions = 100%), 3.5 viewports of scroll (450vh - 100vh
      // sticky) yields ~490px per hold zone (~0.5s at typical scroll)
      // and ~280px per transition (~0.28s) — both readable.
      // Mobile uses the same pattern so the experience is consistent
      // across viewport sizes. The long page-scroll is acceptable on
      // mobile because the sticky pin means content stays in view
      // throughout (it doesn't feel like an empty stretch).
      className="relative w-full"
      style={{ height: "450vh" }}
    >
      {/* Sticky pin — pins to the viewport for the duration of the
          section's scroll. Layout pairs the section's contextual copy
          (eyebrow + headline + paragraph) on the LEFT with the
          animating counter card on the RIGHT. On mobile they stack
          vertically. Putting text + counter in the SAME viewport
          (instead of two separate scrolled regions) means the reader
          sees the "why" and the "what" together — the headline frames
          the number throughout, not just before it. */}
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 sm:px-10 md:px-16 lg:flex-row lg:items-center lg:gap-16 lg:px-24">
          {/* LEFT — context copy. Constrained width on desktop so it
              doesn't crowd the counter card; full width on mobile. */}
          <div className="flex flex-col gap-4 lg:max-w-[420px] lg:gap-6 lg:flex-shrink-0">
            {/* Section eyebrow — matches the inline <SectionEyebrow>
                helper in page.tsx (text-[13px] font-medium tracking-[0.06em]
                text-[#5EEAD4]) so it visually pairs with §02 PLATFORM /
                §05 RETURN / etc. Format is "NN - LABEL". */}
            <span className="text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">
              03 - CONTEXT
            </span>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl md:text-[44px] lg:text-[52px] lg:leading-[1.02]">
              Consumer debt has{" "}
              <span className="text-zinc-500">more than tripled</span>{" "}
              over the past decade.
            </h2>
            <p className="text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Crippling nearly every facet of borrowers&apos; lives. Many overwhelmed
              by credit card debt don&apos;t know their options, causing them to
              overpay and default. We&apos;re here to help.
            </p>
          </div>

          {/* RIGHT — counter visual + the MOBILE progress bar. The
              counter is wrapped along with the mobile bar so on small
              screens the bar sits right under the caption — close to
              the content so it's always visible without hunting for
              it at the viewport bottom. */}
          <div className="flex-1 min-w-0">
            <DebtScrollVisual value={interpolated} label={label} clerkieIntensity={clerkieIntensity} />
            {/* Mobile-only progress bar — flows right below the
                counter visual. Hidden on desktop where the absolute
                bottom-of-viewport bar takes over. */}
            <div className="mt-8 px-2 lg:hidden">
              <ProgressBar progress={progress} clerkieIntensity={clerkieIntensity} />
            </div>
          </div>
        </div>

        {/* Desktop-only progress bar — absolutely pinned to the bottom
            of the viewport for the whole duration of the section.
            Hidden on mobile where the in-flow bar above renders
            instead. Same component, different placement. */}
        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto hidden px-6 sm:px-10 md:px-16 lg:block lg:px-24">
          <div className="mx-auto max-w-[1440px]">
            <ProgressBar progress={progress} clerkieIntensity={clerkieIntensity} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Progress bar shared between the mobile (in-flow, sits right under
// the counter) and desktop (absolute, pinned to viewport bottom)
// placements. Same component renders both — only the wrapper changes.
//
// On the Clerkie beat (clerkieIntensity > 0), a bright dot appears at
// the leading edge of the fill, surrounded by a multi-layer box-shadow
// halo. Reads as a "shining tip" — like a star at the head of the
// progress, emitting light outward. Disappears on beats 1-3.
function ProgressBar({
  progress,
  clerkieIntensity,
}: {
  progress: number;
  clerkieIntensity: number;
}) {
  return (
    <div className="relative h-px w-full bg-white/[0.08]">
      <div
        className="absolute inset-y-0 left-0 bg-white/60"
        style={{
          width: `${Math.round(progress * 100)}%`,
          boxShadow:
            clerkieIntensity > 0
              ? `0 0 ${10 * clerkieIntensity}px rgba(255, 255, 255, ${0.8 * clerkieIntensity}), 0 0 ${20 * clerkieIntensity}px rgba(255, 255, 255, ${0.4 * clerkieIntensity})`
              : undefined,
          backgroundColor:
            clerkieIntensity > 0
              ? `rgba(255, 255, 255, ${0.6 + 0.4 * clerkieIntensity})`
              : undefined,
        }}
        aria-hidden="true"
      >
        {/* Shining tip — a soft white "light source" at the leading
            edge of the fill. We use filter: blur() so the dot itself
            has no hard edge (reads as light, not a pixel), and stack
            multi-layer box-shadow on top for the spreading halo.
            Combined effect is a glowing orb that feels like the head
            of the progress bar is emitting light outward. Only on the
            Clerkie beat. */}
        {clerkieIntensity > 0 && (
          <span
            className="pointer-events-none absolute right-0 top-1/2 block h-1 w-1 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
            style={{
              // Blur + halo sizes are FIXED — they don't ramp with
              // clerkieIntensity. The dot appears as a blurry light
              // from the very first frame it's visible, instead of
              // morphing from a sharp pixel into a soft light.
              // clerkieIntensity only fades the OPACITY (via the dot's
              // own opacity + the box-shadow alpha values), so the
              // light eases IN at full shape rather than growing into it.
              filter: "blur(2px)",
              opacity: clerkieIntensity,
              boxShadow: `0 0 10px rgba(255, 255, 255, ${clerkieIntensity}), 0 0 22px rgba(255, 255, 255, ${0.7 * clerkieIntensity}), 0 0 44px rgba(255, 255, 255, ${0.3 * clerkieIntensity})`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

// Desktop visualization — the big number + caption + a thin scroll-progress
// indicator. Wrapped in a rounded card with a soft aurora behind it so
// the number doesn't float in a void.
function DebtScrollVisual({
  value,
  label,
  clerkieIntensity,
}: {
  value: number;
  label: string;
  clerkieIntensity: number;
}) {
  return (
    // No card chrome. Number floats on the dark page; the only visual
    // chrome is a soft white aurora that fades in for the Clerkie
    // beat (clerkieIntensity 0..1). Subtle text-shadow on the number
    // adds a tighter halo glow, layered on top of the aurora. Both
    // are white-only — no cyan — per the "make it cleaner" feedback,
    // but still gives beat 4 a distinct visual moment.
    <div className="relative flex w-full flex-col items-center gap-6 text-center">
      {/* Soft white aurora — large, blurred radial halo behind the
          number + caption. Dialed down slightly (0.16 vs prior 0.22)
          per "make the glow a little less around numbers" feedback;
          still distinct enough that beat 4 reads as visually different. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 75% 85% at 50% 50%, rgba(255, 255, 255, ${0.16 * clerkieIntensity}) 0%, rgba(255, 255, 255, ${0.04 * clerkieIntensity}) 40%, rgba(255, 255, 255, 0) 70%)`,
          filter: "blur(50px)",
          opacity: clerkieIntensity,
        }}
        aria-hidden="true"
      />
      {/* The number — gets a white text-shadow halo on the Clerkie
          beat. Dialed down slightly (tight 8px @ 0.45 alpha, wide
          45px @ 0.55 alpha) so the number reads as "lit" without
          looking overblown. */}
      <div
        className="font-mono text-[72px] font-medium leading-[1] tracking-[-0.04em] text-white sm:text-[100px] lg:text-[140px]"
        style={{
          fontVariantNumeric: "tabular-nums",
          textShadow:
            clerkieIntensity > 0
              ? `0 0 ${8 * clerkieIntensity}px rgba(255, 255, 255, ${0.45 * clerkieIntensity}), 0 0 ${45 * clerkieIntensity}px rgba(255, 255, 255, ${0.55 * clerkieIntensity})`
              : undefined,
        }}
      >
        {formatDebt(value)}
      </div>
      {/* Caption — picks up the same glow treatment as the number on
          the Clerkie beat so "Saved per Clerkie member" reads as part
          of the lit moment, not as muted afterthought. Color shifts
          from zinc-400 (muted on debt beats) to pure white (on the
          Clerkie beat) in lockstep with clerkieIntensity. */}
      <div
        className="text-lg font-medium sm:text-xl lg:text-2xl"
        style={{
          color: `rgba(${244 + (255 - 244) * clerkieIntensity}, ${244 + (255 - 244) * clerkieIntensity}, ${245 + (255 - 245) * clerkieIntensity}, ${0.6 + 0.4 * clerkieIntensity})`,
          textShadow:
            clerkieIntensity > 0
              ? `0 0 ${24 * clerkieIntensity}px rgba(255, 255, 255, ${0.6 * clerkieIntensity})`
              : undefined,
        }}
      >
        {label}
      </div>
    </div>
  );
}

