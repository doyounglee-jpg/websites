"use client";

import { useEffect, useState } from "react";

/**
 * Animated chat panel for the §02 bento "More personalized than most apps".
 *
 * Loops a short conversation between user and Clerkie, with typing-dot
 * indicators between turns. The voice-waveform pill on the bottom-left of
 * the chat reads as "agent is live" — animates continuously.
 *
 * Layout — the bubble column has a reserved min-height covering the full
 * conversation, anchored at the bottom (justify-end). Bubbles render
 * conditionally and fade in: each new one appears at the bottom and pushes
 * the older bubbles up, chat-style. The outer panel never reflows.
 *
 * Step model — `step` advances on a timer; each step = one new bubble (or
 * a typing indicator that gets replaced when the agent's reply lands).
 *
 *   step 0 → empty (about to start)
 *   step 1 → user 1
 *   step 2 → user 1 + typing
 *   step 3 → user 1 + ai 1     (typing disappears)
 *   step 4 → + user 2
 *   step 5 → + typing
 *   step 6 → + ai 2            (full conversation)
 *   step 7 → hold, then loop back to 0
 */
export function AnimatedChatPanel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Per-step dwell times (ms). Tuned so reading + typing feel natural.
    const durations = [
      600,   // 0 → 1   small gap before user 1 appears
      1100,  // 1 → 2   read user 1, then typing appears
      1300,  // 2 → 3   typing dwell, then ai 1 lands
      2600,  // 3 → 4   read ai 1, then user 2
      900,   // 4 → 5   short gap, typing
      1100,  // 5 → 6   typing, then ai 2
      3200,  // 6 → 7   hold full convo
      400,   // 7 → 0   reset
    ];
    const t = setTimeout(
      () => setStep((s) => (s + 1) % 8),
      durations[step] ?? 1500,
    );
    return () => clearTimeout(t);
  }, [step]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="flex flex-1 items-center justify-center">
        {/* min-h reserves space for the full conversation so the headline
            below never reflows. justify-end anchors items at the bottom so
            new bubbles enter at the bottom and shove older ones up. */}
        <div className="flex w-full max-w-[420px] flex-col justify-end gap-5 min-h-[332px]">
          {step >= 1 && (
            <UserBubble key="u1">
              Why am I always broke on Fridays?
            </UserBubble>
          )}
          {step === 2 && <TypingBubble key="t1" />}
          {step >= 3 && (
            <AiBubble key="a1">
              You averaged $147 in DoorDash + Uber the last 3 Fridays. Want a
              $50 Friday cap?
            </AiBubble>
          )}
          {step >= 4 && <UserBubble key="u2">Yeah, do it.</UserBubble>}
          {step === 5 && <TypingBubble key="t2" />}
          {step >= 6 && (
            <AiBubble key="a2">Done. Starts tomorrow.</AiBubble>
          )}
          <VoiceWaveformPill />
        </div>
      </div>
    </>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  // User (right): outline-only ghost — visually quieter, reads as "prompt".
  return (
    <div className="anim-bubble-in max-w-[85%] self-end rounded-3xl rounded-br-md border border-white/15 px-5 py-3">
      <p className="text-[14px] leading-[1.4] text-white/75">{children}</p>
    </div>
  );
}

function AiBubble({ children }: { children: React.ReactNode }) {
  // AI (left): filled — visually heavier, reads as "the focus / response".
  return (
    <div className="anim-bubble-in max-w-[85%] self-start rounded-3xl rounded-bl-md bg-white/[0.10] px-5 py-3 backdrop-blur">
      <p className="text-[14px] leading-[1.4] text-white/95">{children}</p>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="anim-bubble-in self-start rounded-3xl rounded-bl-md bg-white/[0.10] px-4 py-3.5 backdrop-blur">
      <div className="flex items-center gap-1">
        <span
          className="anim-typing-dot block h-1.5 w-1.5 rounded-full bg-white/60"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="anim-typing-dot block h-1.5 w-1.5 rounded-full bg-white/60"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="anim-typing-dot block h-1.5 w-1.5 rounded-full bg-white/60"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}

function VoiceWaveformPill() {
  return (
    <div className="mt-2 self-start">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur">
        <div className="flex items-center gap-0.5">
          <span
            className="anim-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="anim-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.18s" }}
          />
          <span
            className="anim-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.36s" }}
          />
          <span
            className="anim-wave block w-0.5 rounded-full bg-[#5EEAD4]/80"
            style={{ animationDelay: "0.12s" }}
          />
        </div>
      </div>
    </div>
  );
}

const KEYFRAMES = `
@keyframes chat-bubble-in {
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.anim-bubble-in { animation: chat-bubble-in 0.34s cubic-bezier(0.2, 0.8, 0.2, 1) both; }

@keyframes chat-wave {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
.anim-wave {
  animation: chat-wave 0.85s ease-in-out infinite;
  height: 4px;
}

@keyframes chat-typing-dot {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2px); }
}
.anim-typing-dot {
  animation: chat-typing-dot 1.2s ease-in-out infinite;
}
`;
