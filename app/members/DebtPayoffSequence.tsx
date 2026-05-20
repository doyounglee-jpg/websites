"use client";

import { useEffect, useState } from "react";

/**
 * Animated payoff sequence for the §02 left bento ("Get your debt off your
 * mind"). The bar and the "Paid in full" notification both float in the
 * vertical+horizontal center of the panel.
 *
 * Cycle (loops):
 *   0 → filling: progress bar animates 0 → 100% (~4.5s)
 *   1 → paid:    notification slides in above the bar with sparkles + a
 *                bar glow pulse (~2.8s)
 *   2 → reset:   bar snaps back to 0% (~200ms)
 *
 * Visual language: light frosted glass for the notification + check token
 * (matches the §02 right-panel chat bubbles). No cyan accent, no surrounding
 * frame — the bar and notification sit directly over the photo.
 */
export function DebtPayoffSequence() {
  const [phase, setPhase] = useState<0 | 1 | 2>(2);

  useEffect(() => {
    const durations: Record<0 | 1 | 2, number> = {
      0: 4500,
      1: 2800,
      2: 200,
    };
    const t = setTimeout(() => {
      setPhase((p) => (((p + 1) % 3) as 0 | 1 | 2));
    }, durations[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const paid = phase === 1;

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Centered cluster — anchored to the middle of the panel. Wrapped
          in a soft glass card so the animation has a clear UI boundary
          against the photo (vs. floating "loose" elements). When the
          notification mounts (phase 1), the flex column grows and the
          wrapper's -translate-y-1/2 recenters it — visually pushing the
          progress bar UP to make room for the notification appearing
          below it. The notification animates IN from below for a natural
          "rise from bottom into center" feel. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-[calc(100%-4rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-3xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-md md:w-[calc(100%-6rem)] md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {/* Progress bar block — sits at the center of the panel when
            alone. Gets pushed up when the notification mounts below. */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/65">
              Capital One · $4,200 payoff
            </span>
            <span className="font-mono text-[11px] tabular-nums text-white/55">
              {paid ? "paid" : phase === 0 ? "in progress" : "—"}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md">
            <div
              className={[
                "h-full rounded-full bg-white/75",
                paid ? "anim-debt-bar-glow" : "",
              ].join(" ")}
              style={{
                width: phase === 2 ? "0%" : "100%",
                transition:
                  phase === 0
                    ? "width 4.5s cubic-bezier(0.65, 0, 0.35, 1)"
                    : "none",
              }}
            />
          </div>
        </div>

        {/* Notification banner — slides up from below into the center,
            naturally pushing the bar upward as the column grows. */}
        {paid && (
          <div className="anim-debt-notif-slide-up">
            <div className="relative flex items-center gap-3 rounded-3xl border border-white/15 bg-white/[0.18] px-4 py-3 backdrop-blur-md">
              {/* Check token — lighter glass, neutral white (no cyan). */}
              <span className="anim-debt-check-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.10] backdrop-blur-md">
                <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 text-white">
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
                <span className="text-[14px] font-medium leading-[1.2] text-white">
                  Paid in full
                </span>
                <span className="text-[12px] leading-[1.3] text-white/70">
                  Capital One · $4,200 cleared
                </span>
              </div>
              {/* Sparkles — fan outward from the check token on entry. */}
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="anim-debt-spark absolute left-6 top-1/2 h-1 w-1 rounded-full bg-white/95"
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

// Sparkle particle config — small dots that fan outward from the
// notification's left edge (where the check token sits).
const SPARKS = [
  { dx: -22, dy: -24, delay: 0.05 },
  { dx: 26, dy: -20, delay: 0.0 },
  { dx: -14, dy: 26, delay: 0.1 },
  { dx: 30, dy: 22, delay: 0.15 },
  { dx: -32, dy: 4, delay: 0.2 },
  { dx: 38, dy: -2, delay: 0.08 },
];

const KEYFRAMES = `
@keyframes debt-notif-slide-up {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
.anim-debt-notif-slide-up {
  animation: debt-notif-slide-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes debt-check-pop {
  0%   { transform: scale(0.4); opacity: 0; }
  60%  { transform: scale(1.18); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.anim-debt-check-pop {
  animation: debt-check-pop 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both;
}

@keyframes debt-bar-glow {
  0%   { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  35%  { box-shadow: 0 0 18px 3px rgba(255, 255, 255, 0.45); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}
.anim-debt-bar-glow {
  animation: debt-bar-glow 1.2s ease-out both;
}

@keyframes debt-spark {
  0%   { opacity: 0; transform: translate(0, 0) scale(0); }
  25%  { opacity: 1; transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.4); }
}
.anim-debt-spark {
  animation: debt-spark 0.9s ease-out both;
}
`;
