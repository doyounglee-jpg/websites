"use client";

import React, { useEffect, useRef, useState, type MouseEvent } from "react";

/* ================================================================
   04 - WHY IT WORKS
   2×2 feature card grid. Dark glass surfaces, Linear-style depth.

   Two layers of interactive polish:
     1. Cursor-tracked tilt + sheen on each card (mirrors
        members §05 COVERAGE - see ./../members/CoverageCards.tsx).
     2. Each graphic inside the card replays its entrance animation
        on every hover (mirrors companies §02 PLATFORM - see
        ./PlatformGraphics.tsx).
   ================================================================ */

/* ─────────────────────────────────────────────────────────────────
   SHARED HOOKS
   - useArticleHover: each graphic increments `playCount` whenever
     the closest <article> ancestor fires mouseenter. Downstream
     `key={playCount}` props remount the animated nodes so their CSS
     animations replay from frame zero.
   - useCountUp: rAF-driven ease-out cubic count to `target`,
     restarted whenever `key` changes.
   These mirror the same-named hooks in PlatformGraphics.tsx; kept
   local to keep the file self-contained.
   ───────────────────────────────────────────────────────────────── */

function useArticleHover() {
  const ref = useRef<HTMLDivElement>(null);
  // Start at 1 so first paint already animates (otherwise the
  // dashboards look "empty" until first hover).
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

/* ── Card 1 UI - Automation flow ─────────────────────────────── */
function AutomationFlow() {
  const { ref, playCount } = useArticleHover();
  const steps = [
    {
      label: "Analyze",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />
          <path d="M5 7l1.5 1.5L9.5 5.5" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Optimize",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 11V7M7 11V4.5M10.5 11V8" stroke="rgba(255,255,255,.42)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Pay",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 7l2.5 2.5L10.5 4.5" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref}>
      {/* Steps row - each step + connector pair cascades in left-to-right. */}
      <div className="mb-5 flex items-start">
        {steps.map((s, i) => (
          <React.Fragment key={`${playCount}-${s.label}`}>
            <div
              className="shrink-0 flex flex-col items-center gap-2"
              style={{ animation: `feat-step-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 140}ms both` }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.03]">
                {s.icon}
              </div>
              <span className="text-[10px] font-medium tracking-[0.04em] text-white/45">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 mt-[18px] h-px bg-white/[0.10]"
                style={{
                  animation: `feat-line-grow 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 140 + 80}ms both`,
                  transformOrigin: "left",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Status bar - fades in after the last step lands. */}
      <div
        key={`status-${playCount}`}
        className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.07] bg-white/[0.015] px-3.5 py-2.5"
        style={{ animation: `feat-fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) ${steps.length * 140 + 100}ms both` }}
      >
        <span
          className="block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70"
          style={{ animation: "feat-pulse 1.6s ease-in-out infinite" }}
        />
        <span className="text-[11px] text-white/50">Payment optimized · next run in 3 days</span>
      </div>

      <style>{`
        @keyframes feat-step-in   { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes feat-line-grow { from { transform: scaleX(0); }                    to { transform: scaleX(1); } }
        @keyframes feat-fade-up   { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes feat-pulse     { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(0.9); } }
      `}</style>
    </div>
  );
}

/* ── Card 2 UI - Adaptive plan ────────────────────────────────── */
function AdaptivePlanPanel() {
  const { ref, playCount } = useArticleHover();
  const rows = [
    { label: "Income",  value: "$5,240", pct: 88, chip: "+2.1%" },
    { label: "Bills",   value: "$1,820", pct: 64, chip: "−8.3%" },
    { label: "Savings", value: "$640",   pct: 38, chip: "+12%"  },
  ];

  return (
    <div ref={ref}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.07em] text-white/35">PERSONALIZED PLAN</span>
        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5">
          <span
            key={`dot-${playCount}`}
            className="block h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ animation: "feat-pulse 1.6s ease-in-out infinite" }}
          />
          <span className="text-[10px] font-medium text-white/50">Updated</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <div key={`${playCount}-${r.label}`}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/60">{r.label}</span>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/42">
                  {r.chip}
                </span>
                <span className="font-mono text-[12px] font-medium text-white/75">{r.value}</span>
              </div>
            </div>
            <div className="h-[4px] overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  background: "linear-gradient(90deg,rgba(255,255,255,.20),rgba(255,255,255,.38))",
                  animation: `feat-bar-fill 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms both`,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes feat-bar-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}

/* ── Card 3 UI - Milestone progress ──────────────────────────── */
function MilestoneProgress() {
  const { ref, playCount } = useArticleHover();
  const BAR = 68;
  const milestones = [
    { label: "$250 saved",   pct: 15 },
    { label: "Debt reduced", pct: 50 },
    { label: "On track",     pct: 85 },
  ];
  const stats = [
    { label: "Saved",    value: "$1,840" },
    { label: "Debt out", value: "$6,200" },
    { label: "Streak",   value: "14 wks" },
  ];
  // Headline progress number counts up as the bar fills.
  const barPct = useCountUp(BAR, playCount, 900);

  return (
    <div ref={ref}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.07em] text-white/35">PROGRESS</span>
        <span className="font-mono text-[10px] tabular-nums font-medium text-white/35">
          {barPct}% complete
        </span>
      </div>

      {/* Track + fill + dots
          Bar height matched to Card 2's adaptive plan bars (4px) so
          all progress rails on the page share one weight. Dots are
          slightly bigger than the bar so they read as markers, but
          small enough that they don't loom over the rail. */}
      <div className="relative mb-2 h-1 w-full rounded-full bg-white/[0.09]">
        <div
          key={`fill-${playCount}`}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${BAR}%`,
            background: "linear-gradient(90deg,rgba(255,255,255,.26),rgba(255,255,255,.48))",
            animation: "feat-bar-fill 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
            transformOrigin: "left",
          }}
        />
        {milestones.map((m, i) => (
          // Outer wrapper ONLY handles centering on the bar (no
          // animation). Inner span carries the visible dot styles +
          // the pop-in animation. Splitting these avoids the bug
          // where the animation's `transform: translate(-50%,-50%)`
          // collides with the centering and ends up nudging the dot
          // ~5px off the rail.
          <div
            key={`${playCount}-${m.label}`}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.pct}%` }}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full border ${
                BAR >= m.pct
                  ? "border-white/60 bg-white/30"
                  : "border-white/[0.20] bg-white/[0.07]"
              }`}
              style={{ animation: `feat-dot-pop 420ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 160}ms both` }}
            />
          </div>
        ))}
      </div>

      <div className="relative mb-5 h-4">
        {milestones.map((m) => (
          <span
            key={m.label}
            className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-white/32"
            style={{ left: `${m.pct}%` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      {/* Stats - cascade up after the bar finishes filling. */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div
            key={`${playCount}-${s.label}`}
            className="flex flex-col items-center gap-0.5 rounded-[10px] border border-white/[0.07] bg-white/[0.015] py-2.5"
            style={{ animation: `feat-fade-up 480ms cubic-bezier(0.16, 1, 0.3, 1) ${850 + i * 110}ms both` }}
          >
            <span className="font-mono text-[13px] font-semibold text-white/85">{s.value}</span>
            <span className="text-[8px] font-semibold tracking-[0.05em] text-white/32">{s.label.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes feat-dot-pop  { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

/* ── Card 4 UI - Coaching message ────────────────────────────── */
function CoachingCardUI() {
  const { ref, playCount } = useArticleHover();
  // Dollar amount counts up so the coaching feels "fresh" each hover.
  const balanceDown = useCountUp(420, playCount, 1000);

  return (
    <div ref={ref}>
      {/* Coach header */}
      <div
        key={`hdr-${playCount}`}
        className="mb-4 flex items-center gap-3"
        style={{ animation: "feat-fade-up 480ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.03]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5.5" r="2.2" stroke="rgba(255,255,255,.45)" strokeWidth="1.1" />
            <path d="M2.5 12.5c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" stroke="rgba(255,255,255,.45)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-white/70">Clerkie Coach</div>
          <div className="text-[10px] text-white/32">just now</div>
        </div>
      </div>

      {/* Message - fades in after the header. Dollar amount counts up. */}
      <div
        key={`msg-${playCount}`}
        className="mb-4 rounded-[10px] border border-white/[0.07] bg-white/[0.015] px-4 py-3"
        style={{ animation: "feat-fade-up 480ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both" }}
      >
        <p className="text-[13px] leading-[1.55] text-white/62">
          Nice progress - stay consistent this week.{" "}
          Your balance is down{" "}
          {/* inline-block + fixed min-width reserves space for the
              final "$420" so the count-up (which grows from 1 → 3
              digits) doesn't re-wrap the paragraph. Without this,
              the paragraph height fluctuates mid-animation, which
              cascades up to the grid row and stretches the Progress
              card next to it. text-right keeps digits aligned to the
              right edge of the reserved box so the surrounding text
              spacing stays consistent. */}
          <span className="inline-block min-w-[2.5em] text-right font-semibold tabular-nums text-white/88">${balanceDown}</span>{" "}
          since last month.
        </p>
      </div>

      {/* Action chips - cascade in after the message. */}
      <div className="flex gap-2">
        {["Review plan", "Keep going"].map((chip, i) => (
          <span
            key={`${playCount}-${chip}`}
            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/52"
            style={{ animation: `feat-fade-up 420ms cubic-bezier(0.16, 1, 0.3, 1) ${340 + i * 110}ms both` }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TILT CARD WRAPPER
   Cursor-tracked rotate + sheen + lift, mirrored from
   members/CoverageCards.tsx. Rendered as <article> so the
   useArticleHover hook above can detect parent hover and replay
   the graphic animations.
   ───────────────────────────────────────────────────────────────── */

const MAX_TILT_DEG = 3.5;
const LIFT_PX = 12;

function FeatureCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);

  // Touch devices never fire mousemove - and Tailwind :hover sticks
  // after a tap. Gating all hover behavior on (hover: hover) keeps
  // mobile clean.
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHoverCapable(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  // Cursor → CSS custom properties (--rx/--ry rotation, --mx/--my
  // sheen position). Written to the DOM directly so the GPU animates
  // without per-frame React renders.
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

  // Snappy while hovering so the tilt tracks the cursor; smooth ease
  // back to rest on leave.
  const tiltTransition = hovered
    ? "transform 90ms linear, box-shadow 250ms ease, border-color 200ms ease"
    : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease, border-color 300ms ease";

  return (
    // h-full on this wrapper + the grid cell wrapper in the parent makes
    // the perspective box stretch to the tallest sibling in its row.
    <div className="h-full" style={{ perspective: "1100px" }}>
      <article
        ref={ref}
        onMouseEnter={hoverCapable ? () => setHovered(true) : undefined}
        onMouseMove={hoverCapable ? handleMove : undefined}
        onMouseLeave={hoverCapable ? handleLeave : undefined}
        // h-full + flex-col + mt-auto on the title block (below) anchors
        // the title/body to the BOTTOM of the card, so cards line up
        // visually no matter how tall the graphic above them is.
        className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[22px] border bg-white/[0.015] p-7"
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
        {/* Top-edge highlight (kept from the prior design). */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Sheen - radial gradient anchored to the cursor position. */}
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

        <div className="relative">{children}</div>
        {/* mt-auto pushes the title block to the BOTTOM of the article.
            Combined with h-full above, all cards in the row share the
            same height and their titles bottom-align cleanly. */}
        <div className="relative mt-auto">
          <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-white/90">{title}</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-white/55">{body}</p>
        </div>
      </article>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
const CARDS = [
  {
    title: "Automation removes the hard part",
    body: "Employees don't have to rely on willpower. Key financial actions happen in the background - no manual steps needed.",
    ui: <AutomationFlow />,
  },
  {
    title: "Plans that keep up with real life",
    body: "As income or expenses shift, Clerkie recalibrates automatically so users stay on track without touching a thing.",
    ui: <AdaptivePlanPanel />,
  },
  {
    title: "Small wins compound over time",
    body: "Visible progress milestones keep employees engaged and moving forward - not just in the first week.",
    ui: <MilestoneProgress />,
  },
  {
    title: "Coaching turns intent into habit",
    body: "Timely nudges and personalized guidance bridge the gap between knowing what to do and actually doing it.",
    ui: <CoachingCardUI />,
  },
];

export default function FeatureCardsSection() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0E1014]">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 sm:px-10 sm:pb-28 sm:pt-28 md:px-16 md:pb-32 md:pt-32 lg:px-24 lg:pb-40 lg:pt-40">
        <div className="mb-16 lg:mb-20">
          <span className="reveal-item text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">
            04 - WHY IT WORKS
          </span>
          <h2 className="reveal-item mt-5 max-w-[700px] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
            Built around behavior, not intention.
          </h2>
          <p className="reveal-item mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/50">
            Most financial tools tell people what to do. Clerkie automates the doing - and keeps adapting as life changes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((c) => (
            // h-full so the grid cell explicitly fills the row height,
            // letting <FeatureCard> stretch to the tallest sibling.
            <div key={c.title} className="reveal-item h-full">
              <FeatureCard title={c.title} body={c.body}>
                {c.ui}
              </FeatureCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
