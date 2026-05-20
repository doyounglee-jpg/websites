"use client";

import { useEffect, useState } from "react";

/**
 * Animated credit score gauge for the §04 right bento ("Watch your credit
 * climb."). Mirrors the structure + visual language of DebtPayoffSequence
 * in §02 left - same glass UI card, same notification + sparkle effects,
 * neutral white accents (no cyan).
 *
 * Cycle (loops):
 *   filling (4.5s) → paid (2.5s) → hidden (2.0s, card dissolves so the
 *   photo behind shows through) → filling again …
 *
 * Visual reset trick: during `hidden`, the bar + score + notification
 * stay at their END state while the card fades out (so the user never
 * sees a "snap to empty" - the card is already invisible by the time we
 * reset visuals).
 */

const SCORE_MIN = 300;
const SCORE_MAX = 850;
const SCORE_START = 580;
const SCORE_END = 720;
const SCORE_GAIN = SCORE_END - SCORE_START;
const FILL_DURATION_MS = 4500;
const FADE_MS = 700;

const ARC_RADIUS = 90;
const ARC_LENGTH = Math.PI * ARC_RADIUS;

const startFrac = (SCORE_START - SCORE_MIN) / (SCORE_MAX - SCORE_MIN);
const endFrac = (SCORE_END - SCORE_MIN) / (SCORE_MAX - SCORE_MIN);

type Phase = "filling" | "paid" | "hidden";

const PHASE_DURATIONS: Record<Phase, number> = {
  filling: FILL_DURATION_MS,
  paid: 2500,
  hidden: 2000,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  filling: "paid",
  paid: "hidden",
  hidden: "filling",
};

export function CreditScoreSequence() {
  // Start at "hidden" so the first transition into "filling" is a real
  // animation (the same trick DebtPayoffSequence uses for phase 2 → 0).
  const [phase, setPhase] = useState<Phase>("hidden");
  const [score, setScore] = useState(SCORE_START);
  const [barAtEnd, setBarAtEnd] = useState(false);

  // Phase ticker - moves through the loop on a timer.
  useEffect(() => {
    const t = setTimeout(() => setPhase(NEXT_PHASE[phase]), PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Per-phase bar + score behaviour.
  useEffect(() => {
    if (phase === "filling") {
      // Drive arc fill via CSS transition; tick score via rAF in sync.
      setBarAtEnd(true);
      let rafId: number;
      const startedAt = performance.now();
      const tick = () => {
        const t = Math.min(
          1,
          (performance.now() - startedAt) / FILL_DURATION_MS,
        );
        const eased = 1 - (1 - t) * (1 - t); // ease-out quadratic
        setScore(Math.round(SCORE_START + SCORE_GAIN * eased));
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }
    if (phase === "paid") {
      setBarAtEnd(true);
      setScore(SCORE_END);
      return;
    }
    // phase === "hidden" - hold visuals at END while the card fades out,
    // then reset to START once the fade is complete (snap is invisible
    // because card opacity has already reached 0).
    const t = setTimeout(() => {
      setBarAtEnd(false);
      setScore(SCORE_START);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const visible = phase !== "hidden";
  // Render the notification through both paid AND hidden so it fades out
  // with the card (otherwise it'd pop off the moment phase flips).
  const showNotification = phase === "paid" || phase === "hidden";
  const dashoffset = barAtEnd
    ? ARC_LENGTH * (1 - endFrac)
    : ARC_LENGTH * (1 - startFrac);

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Glass card. Mobile: anchored near the top of the panel (top-12,
          no Y translate) so it sits above the headline/body that sit at
          the bottom of the panel. md+: anchored to the middle of the
          panel (top-1/2 + -translate-y-1/2) so the original centered
          composition is preserved. Opacity transitions on phase = hidden
          so the card naturally dissolves between cycles, letting the
          photo breathe for ~1.3s (2s phase minus the 700ms fade). */}
      <div
        className="pointer-events-none absolute left-1/2 top-8 z-20 flex w-[calc(100%-5rem)] max-w-[320px] -translate-x-1/2 flex-col gap-3 rounded-3xl border border-white/15 bg-white/[0.05] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md md:top-1/2 md:max-w-[280px] md:w-[calc(100%-6rem)] md:-translate-y-1/2 md:gap-5 md:p-6"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-out`,
        }}
      >
        {/* Gauge block - eyebrow + (MIN, half-circle arc, MAX) on one
            horizontal line, with the score sitting inside the arc dome. */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/65">
            Credit Score
          </span>

          {/* MIN | gauge | MAX. items-end so MIN and MAX align with the
              bottom of the gauge SVG — sitting beside the arc endpoints
              on the same line as the graph. */}
          <div className="flex w-full items-end justify-center gap-2">
            <span className="mb-[2px] font-mono text-[11px] leading-none tabular-nums text-white/50 md:text-[10px]">
              {SCORE_MIN}
            </span>

          <div className="relative w-full max-w-[170px] md:max-w-[220px]">
            <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
              {/* Track - faint white half-circle. */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Fill - animated via stroke-dashoffset. */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={dashoffset}
                style={{
                  transition:
                    phase === "filling"
                      ? `stroke-dashoffset ${FILL_DURATION_MS}ms ease-out`
                      : "none",
                }}
              />
            </svg>

            {/* Score number - centered inside the arc dome. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center">
              <div className="font-mono text-[23px] font-medium leading-none tabular-nums text-white md:text-[32px]">
                {score}
              </div>
            </div>
          </div>

            <span className="mb-[2px] font-mono text-[11px] leading-none tabular-nums text-white/50 md:text-[10px]">
              {SCORE_MAX}
            </span>
          </div>
        </div>

        {/* Notification - slides up from below, pushing the gauge upward.
            No own card chrome (would read as box-in-box). Mounted through
            both paid + hidden so it fades with the card instead of
            popping off at phase change. */}
        {showNotification && (
          <div className="anim-score-notif-slide-up">
            <div className="relative flex items-center gap-3">
              <span className="anim-score-check-pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.10] backdrop-blur-md md:h-8 md:w-8">
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-white md:h-3.5 md:w-3.5">
                  <path
                    d="M2.5 6.5L4.5 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium leading-[1.2] text-white md:text-[14px]">
                  Score up {SCORE_GAIN} points
                </span>
                <span className="text-[10px] leading-[1.3] text-white/70 md:text-[12px]">
                  {SCORE_START} → {SCORE_END} in 6 months
                </span>
              </div>
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="anim-score-spark absolute left-6 top-1/2 h-1 w-1 rounded-full bg-white/95"
                  style={{
                    ["--dx" as never]: `${s.dx}px`,
                    ["--dy" as never]: `${s.dy}px`,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Sparkle particle config - small dots that fan outward from the check
// token area on entry.
const SPARKS = [
  { dx: -22, dy: -24, delay: 0.05 },
  { dx: 26, dy: -20, delay: 0.0 },
  { dx: -14, dy: 26, delay: 0.1 },
  { dx: 30, dy: 22, delay: 0.15 },
  { dx: -32, dy: 4, delay: 0.2 },
  { dx: 38, dy: -2, delay: 0.08 },
];

// Distinct class names so this component's animations don't fight with
// DebtPayoffSequence's identically-styled rules in the global CSS.
const KEYFRAMES = `
@keyframes score-notif-slide-up {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
.anim-score-notif-slide-up {
  animation: score-notif-slide-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes score-check-pop {
  0%   { transform: scale(0.4); opacity: 0; }
  60%  { transform: scale(1.18); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.anim-score-check-pop {
  animation: score-check-pop 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both;
}

@keyframes score-spark {
  0%   { opacity: 0; transform: translate(0, 0) scale(0); }
  25%  { opacity: 1; transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.4); }
}
.anim-score-spark {
  animation: score-spark 0.9s ease-out both;
}
`;
