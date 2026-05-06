"use client";

import { useEffect, useState } from "react";

/**
 * Animated bills chat panel for the §04 bento "Every bill, paid on time".
 *
 * Reuses the chat-UI shell from /members' intelligence section (header,
 * body, suggestion chips, input row) but with bill content. A short
 * conversation loops: user asks about upcoming bills, Clerkie replies
 * with a reasoning card whose rows stagger in.
 *
 * Layout — body has min-h reserved for the full conversation so the
 * headline below the panel never reflows. Bubbles render conditionally
 * and use the chat-bubble-in keyframe for entry. The reasoning card has
 * a min-h so staggered row entry doesn't push the action buttons down.
 *
 * Step model (10 steps total):
 *   0 → empty / blank between cycles
 *   1 → user msg
 *   2 → user msg + typing dots
 *   3 → user msg + AI reply (meta line + text)
 *   4 → + reasoning card header
 *   5 → + bill row 1 (PG&E)
 *   6 → + bill row 2 (Spotify)
 *   7 → + bill row 3 (Capital One)
 *   8 → + action buttons (full convo)
 *   9 → hold full convo, then reset to 0
 */
export function AnimatedBillsChatPanel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Per-step dwell times (ms). Tuned so reading + typing feel natural.
    const durations = [
      600,   // 0 → 1   small gap before user appears
      1100,  // 1 → 2   read user msg, then typing
      1300,  // 2 → 3   typing dwell, then AI lands
      900,   // 3 → 4   read AI, then reasoning card header
      350,   // 4 → 5   row 1 stagger
      350,   // 5 → 6   row 2 stagger
      350,   // 6 → 7   row 3 stagger
      900,   // 7 → 8   action buttons appear
      3500,  // 8 → 9   hold full convo
      400,   // 9 → 0   reset
    ];
    const t = setTimeout(
      () => setStep((s) => (s + 1) % 10),
      durations[step] ?? 1500,
    );
    return () => clearTimeout(t);
  }, [step]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="flex w-full max-w-[440px] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#101113]/60 backdrop-blur shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        {/* Header — Clerkie AI · ONLINE · ⌘K (always visible) */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <LogoBadge />
            <span className="text-[13px] font-semibold tracking-[-0.005em] text-white">
              Clerkie AI
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#5EEAD4]/10 px-2 py-0.5">
              <span className="block h-[5px] w-[5px] rounded-full bg-[#5EEAD4]" />
              <span className="text-[10px] font-medium tracking-[0.04em] text-[#5EEAD4]">
                ONLINE
              </span>
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">⌘K</span>
        </div>

        {/* Body — animated bubbles. min-h reserves the full conversation
            height so adding new bubbles never pushes the panel taller. */}
        <div className="flex min-h-[380px] flex-col gap-3 px-5 py-5">
          {/* User question */}
          {step >= 1 && (
            <div className="anim-bills-in flex justify-end pl-12">
              <div className="rounded-[14px_14px_4px_14px] border border-white/[0.06] bg-white/[0.06] px-3.5 py-2.5">
                <span className="text-[13px] leading-[1.4] text-white/90">
                  What&apos;s coming up this week?
                </span>
              </div>
            </div>
          )}

          {/* Typing indicator (only while step === 2) */}
          {step === 2 && (
            <div className="anim-bills-in flex">
              <div className="rounded-[14px_14px_14px_4px] border border-[#5EEAD4]/20 bg-[#5EEAD4]/[0.08] px-3.5 py-3 backdrop-blur">
                <div className="flex items-center gap-1">
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* AI response: meta line + text + reasoning card + action buttons */}
          {step >= 3 && (
            <div className="anim-bills-in flex flex-col items-start gap-2 pr-6">
              {/* Meta line ("CLERKIE · ANALYZED 3 ACCOUNTS") */}
              <div className="flex items-center gap-2">
                <LogoBadge size={4} />
                <span className="text-[10px] font-medium tracking-[0.04em] text-zinc-500">
                  CLERKIE · ANALYZED 3 ACCOUNTS
                </span>
              </div>

              {/* Answer text */}
              <p className="text-[13px] leading-[1.5] text-white/85">
                You&apos;ve got{" "}
                <span className="font-medium text-white">3 bills</span> due
                this week, totaling{" "}
                <span className="font-medium text-white">$267</span>. Here&apos;s
                the order I&apos;m paying them:
              </p>

              {/* Reasoning card — rows stagger in. min-h reserves full height
                  so action buttons don't jump as rows appear. */}
              {step >= 4 && (
                <div className="anim-bills-in flex min-h-[140px] w-full flex-col gap-2 rounded-xl border border-white/10 bg-[#0E1014]/60 px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.04em] text-zinc-500">
                      UPCOMING THIS WEEK
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      payment plan · v1
                    </span>
                  </div>
                  {BILLS.map((bill, i) =>
                    step >= 5 + i ? (
                      <div
                        key={bill.label}
                        className="anim-bills-in flex items-center gap-2.5"
                      >
                        <span className="w-4 font-mono text-[11px] font-medium text-zinc-500">
                          {i + 1}.
                        </span>
                        <div className="flex flex-1 items-center gap-2">
                          <span className="text-[13px] font-medium text-white">
                            {bill.label}
                          </span>
                          <span className="rounded bg-white/[0.06] px-1.5 py-px font-mono text-[10px] font-medium text-zinc-300">
                            {bill.due}
                          </span>
                        </div>
                        <span className="font-mono text-[13px] text-zinc-300">
                          {bill.amount}
                        </span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              {/* Action buttons */}
              {step >= 8 && (
                <div className="anim-bills-in flex items-center gap-2 pt-1">
                  <span className="rounded-lg border border-white/[0.06] bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white">
                    Looks good
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-zinc-400">
                    Change order
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggestion chips — always visible, hint at follow-ups */}
        <div className="flex flex-wrap gap-1.5 px-5 pb-3">
          {SUGGESTIONS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Input row — always visible */}
        <div className="flex items-center gap-2 border-t border-white/[0.06] bg-[#0E1014]/60 px-4 py-3">
          <span className="flex-1 text-[12px] tracking-[-0.005em] text-zinc-600">
            Ask anything about your money…
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-600">↵</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-50 text-[12px] font-semibold text-[#0E1014]">
              ↑
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Data ----------------------------------------------------------- */

const BILLS = [
  { label: "PG&E", due: "Mon", amount: "$72" },
  { label: "Spotify", due: "Wed", amount: "$11" },
  { label: "Capital One", due: "Fri", amount: "$184" },
];

const SUGGESTIONS = [
  "Pause Spotify?",
  "Move Capital One earlier",
  "Check next month",
];

/* --- Sub-components ------------------------------------------------- */

/**
 * Small cyan badge that stands in for the Clerkie logo. Two sizes:
 *   default (size 5) for the chat header
 *   compact (size 4) for the inline AI meta line
 */
function LogoBadge({ size = 5 }: { size?: 4 | 5 }) {
  const outer = size === 5 ? "h-5 w-5" : "h-4 w-4";
  const inner = size === 5 ? "h-2 w-2" : "h-1.5 w-1.5";
  return (
    <div
      className={`flex ${outer} items-center justify-center rounded-md bg-[#5EEAD4]/15`}
    >
      <span className={`block ${inner} rounded-full bg-[#5EEAD4]`} />
    </div>
  );
}

/* --- Keyframes ------------------------------------------------------ */
/* Distinct class names from AnimatedChatPanel so the two components
   don't fight over global CSS, even though the animations are similar. */
const KEYFRAMES = `
@keyframes bills-fade-in {
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.anim-bills-in {
  animation: bills-fade-in 0.32s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes bills-typing-dot {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2px); }
}
.anim-bills-dot {
  animation: bills-typing-dot 1.2s ease-in-out infinite;
}
`;
