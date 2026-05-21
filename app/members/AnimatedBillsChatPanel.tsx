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
 * Layout - body has min-h reserved for the full conversation so the
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
      {/* Outer wrapper - centers the bills chat in the panel's upper area
          (same pattern as §02 AnimatedChatPanel). Scales up at xl/2xl so
          the chat doesn't feel lost on wide displays. */}
      <div className="flex flex-1 items-center justify-center">
        {/* Bubble column - fixed height + justify-end so bubbles enter at
            the bottom and push older messages up (chat-from-bottom feel,
            matches §02 AnimatedChatPanel). Heights leave headroom for the
            full convo (user + AI bubble with reasoning + buttons + pill). */}
        <div className="flex h-[420px] w-full max-w-[440px] flex-col justify-end gap-3 xl:h-[460px] xl:max-w-[500px] 2xl:h-[500px] 2xl:max-w-[560px]">
          {/* User question */}
          {step >= 1 && (
            <div className="anim-bills-in flex justify-end pl-12">
              <div className="rounded-3xl rounded-br-md border border-white/25 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md">
                <span className="text-[14px] leading-[1.4] text-white/85 2xl:text-[15px]">
                  What&apos;s coming up this week?
                </span>
              </div>
            </div>
          )}

          {/* Typing indicator (only while step === 2) */}
          {step === 2 && (
            <div className="anim-bills-in flex">
              <div className="rounded-3xl rounded-bl-md border border-white/15 bg-white/[0.18] px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-1">
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-white/80"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-white/80"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="anim-bills-dot block h-1.5 w-1.5 rounded-full bg-white/80"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* AI response: meta + text + reasoning card + action buttons,
              all wrapped in one frosted-glass bubble so the multi-part
              answer reads as a single response over the photo. */}
          {step >= 3 && (
            <div className="anim-bills-in flex flex-col items-start gap-2 self-start max-w-[95%] rounded-3xl rounded-bl-md border border-white/15 bg-white/[0.18] px-4 py-3 backdrop-blur-md">
              {/* Meta line ("CLERKIE · ANALYZED 3 ACCOUNTS") */}
              <span className="text-[10px] font-medium tracking-[0.04em] text-white/60">
                CLERKIE · ANALYZED 3 ACCOUNTS
              </span>

              {/* Answer text */}
              <p className="text-[14px] leading-[1.45] text-white/95 2xl:text-[15px]">
                You&apos;ve got{" "}
                <span className="font-medium text-white">3 bills</span> due
                this week, totaling{" "}
                <span className="font-medium text-white">$267</span>. Here&apos;s
                the order I&apos;m paying them:
              </p>

              {/* Reasoning card - nested glass over the parent glass bubble.
                  min-h reserves full height so action buttons don't jump. */}
              {step >= 4 && (
                <div className="anim-bills-in flex min-h-[140px] w-full flex-col gap-2 rounded-xl border border-white/15 bg-black/20 px-3.5 py-3 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.04em] text-white/60">
                      UPCOMING THIS WEEK
                    </span>
                    <span className="font-mono text-[10px] text-white/50">
                      payment plan · v1
                    </span>
                  </div>
                  {BILLS.map((bill, i) =>
                    step >= 5 + i ? (
                      <div
                        key={bill.label}
                        className="anim-bills-in flex items-center gap-2.5"
                      >
                        <span className="w-4 font-mono text-[11px] font-medium text-white/50">
                          {i + 1}.
                        </span>
                        <div className="flex flex-1 items-center gap-2">
                          <span className="text-[13px] font-medium text-white">
                            {bill.label}
                          </span>
                          <span className="rounded bg-white/[0.10] px-1.5 py-px font-mono text-[10px] font-medium text-white/80">
                            {bill.due}
                          </span>
                        </div>
                        <span className="font-mono text-[13px] text-white/85">
                          {bill.amount}
                        </span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              {/* Action buttons - glass chips */}
              {step >= 8 && (
                <div className="anim-bills-in flex items-center gap-2 pt-1">
                  <span className="rounded-lg border border-white/25 bg-white/[0.10] px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                    Looks good
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-white/70">
                    Change order
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Always-on voice waveform pill - reads as "Clerkie is listening".
              Matches the pattern from §02 AnimatedChatPanel. */}
          <BillsVoiceWaveformPill />
        </div>
      </div>
    </>
  );
}

function BillsVoiceWaveformPill() {
  return (
    <div className="mt-2 self-start">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md">
        <div className="flex items-center gap-0.5">
          <span
            className="anim-bills-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="anim-bills-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.18s" }}
          />
          <span
            className="anim-bills-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.36s" }}
          />
          <span
            className="anim-bills-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.12s" }}
          />
        </div>
      </div>
    </div>
  );
}

/* --- Data ----------------------------------------------------------- */

const BILLS = [
  { label: "PG&E", due: "Mon", amount: "$72" },
  { label: "Spotify", due: "Wed", amount: "$11" },
  { label: "Capital One", due: "Fri", amount: "$184" },
];

/* --- Keyframes ------------------------------------------------------ */
/* Distinct class names from AnimatedChatPanel so the two components
   don't fight over global CSS, even though the animations are similar. */
const KEYFRAMES = `
@keyframes bills-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes bills-wave {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
.anim-bills-wave {
  animation: bills-wave 0.85s ease-in-out infinite;
  height: 4px;
}
`;
