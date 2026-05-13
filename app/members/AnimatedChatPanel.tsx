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
        {/* Fixed-height stack — every bubble is ALWAYS rendered in the
            DOM, with `visible` driving opacity only. This means the
            flex layout never reflows when a new bubble "arrives": the
            invisible slots already reserve the right amount of space,
            so existing bubbles don't shift, and the section below
            never feels jittery. The conversation reads its final
            layout from step 0; bubbles just fade in at their
            permanent positions on cue. */}
        <div className="flex h-[360px] w-full max-w-[420px] flex-col justify-end gap-5">
          <UserBubble visible={step >= 1}>
            Why am I always broke on Fridays?
          </UserBubble>
          {/* AI bubble slot 1 — shows typing dots at step 2, full text
              from step 3 onward. The bubble's height is anchored by
              the full text so swapping content doesn't resize it. */}
          <AiBubble visible={step >= 2} typing={step === 2}>
            You averaged $147 in DoorDash + Uber the last 3 Fridays. Want a
            $50 Friday cap?
          </AiBubble>
          <UserBubble visible={step >= 4}>Yeah, do it.</UserBubble>
          <AiBubble visible={step >= 5} typing={step === 5}>
            Done. Starts tomorrow.
          </AiBubble>
          <VoiceWaveformPill />
        </div>
      </div>
    </>
  );
}

function UserBubble({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  // User (right): outline-only ghost — visually quieter, reads as "prompt".
  // Opacity-only reveal — keeps the bubble's layout slot at the
  // same position whether visible or not.
  return (
    <div
      className="max-w-[85%] self-end rounded-3xl rounded-br-md border border-white/15 px-5 py-3 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <p className="text-[14px] leading-[1.4] text-white/75">{children}</p>
    </div>
  );
}

function AiBubble({
  visible,
  typing,
  children,
}: {
  visible: boolean;
  typing: boolean;
  children: React.ReactNode;
}) {
  // AI (left): filled — visually heavier, reads as "the focus / response".
  // The full text is always laid out (driving the slot height), but
  // hidden behind opacity while typing dots overlay on top. This keeps
  // the bubble the same size whether it's showing typing or text.
  return (
    <div
      className="relative max-w-[85%] self-start rounded-3xl rounded-bl-md bg-white/[0.10] px-5 py-3 backdrop-blur transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <p
        className="text-[14px] leading-[1.4] text-white/95 transition-opacity duration-200"
        style={{ opacity: typing ? 0 : 1 }}
      >
        {children}
      </p>
      {typing && (
        <div className="absolute inset-0 flex items-center px-5">
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
      )}
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
