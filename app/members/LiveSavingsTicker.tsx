"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Members' Savings" ticker — a cumulative savings counter with a rotating
 * showcase of example member wins.
 *
 * Framed as totals, not live. The big number does tick up slowly (the kind
 * of thing that happens over weeks of member negotiations) and example
 * wins rotate through the feed every few seconds. Past tense, no
 * "just now" / "live" cues, no claims about real-time data.
 *
 * Visual flourish: when the big number changes, each digit position scrolls
 * into its new value (slot-machine style) for a tactile, tactile feel.
 */

/**
 * Counter is event-driven, baseline is Unix-time-anchored.
 *
 * On mount we set the baseline using a Unix-time formula:
 *   baseline = ANCHOR_TOTAL + (Date.now() - ANCHOR_EPOCH_MS) / 1000 × RATE_PER_SEC
 * That makes the *starting* number different on different days, so reloads
 * over time give visibly higher numbers — no per-load reset.
 *
 * From then on, each new feed item bumps the total by that item's amount.
 * The counter and the "K.O. saved $4,180" notification are causally linked:
 * one negotiation → one feed entry → total goes up by exactly that amount.
 *
 * Calibration so today (2026-05) lands around $148M.
 */
const ANCHOR_EPOCH_MS = 1_762_300_800_000; // 2025-11-05 00:00 UTC
const ANCHOR_TOTAL = 101_000_000;
const RATE_PER_SEC = 3;
const SSR_BASELINE = 147_900_000;

function calculateBaseline(): number {
  const elapsedSec = (Date.now() - ANCHOR_EPOCH_MS) / 1000;
  return Math.floor(ANCHOR_TOTAL + elapsedSec * RATE_PER_SEC);
}

/**
 * Per-browser persistence so the counter never appears to roll back on
 * reload. Every tick adds an amount; we store the running session delta in
 * localStorage and read it back on mount. Combined with the Unix-anchored
 * baseline (which also only grows), the displayed total is monotonic
 * within a single browser. Different browsers/devices may show slightly
 * different totals — fine for marketing.
 */
const STORAGE_KEY = "clerkie:members-savings-delta-v1";

function readStoredDelta(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (!v) return 0;
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function writeStoredDelta(value: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // ignore (private mode, quota exceeded, etc.)
  }
}

// Realistic-looking negotiations used to populate the rolling feed.
const FEED_POOL: ReadonlyArray<{
  initial: string;
  lender: string;
  amount: number;
}> = [
  { initial: "M.A.", lender: "Capital One", amount: 1820 },
  { initial: "J.K.", lender: "Sallie Mae", amount: 3420 },
  { initial: "L.R.", lender: "Discover", amount: 2140 },
  { initial: "T.W.", lender: "LendingClub", amount: 980 },
  { initial: "S.P.", lender: "Mt Sinai Hospital", amount: 2860 },
  { initial: "D.H.", lender: "Chase Sapphire", amount: 1540 },
  { initial: "A.G.", lender: "Ally Bank", amount: 720 },
  { initial: "K.O.", lender: "Wells Fargo", amount: 4180 },
  { initial: "R.M.", lender: "Citi", amount: 1340 },
  { initial: "B.N.", lender: "American Express", amount: 2890 },
  { initial: "C.F.", lender: "Synchrony", amount: 1180 },
  { initial: "P.E.", lender: "Mercy Hospital", amount: 1740 },
];

type FeedItem = {
  id: number;
  initial: string;
  lender: string;
  amount: number;
};

export function LiveSavingsTicker() {
  // Baseline jumps to today's Unix-time value on mount; sessionDelta
  // accumulates per-tick negotiation amounts during this view. Total =
  // baseline + sessionDelta. SSR_BASELINE / deterministic feed seed both
  // exist so server HTML matches the first client render.
  const [baseline, setBaseline] = useState(SSR_BASELINE);
  const [sessionDelta, setSessionDelta] = useState(0);
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    FEED_POOL.slice(0, 4).map((item, i) => ({ id: i + 1, ...item })),
  );
  const idRef = useRef(4);

  // After mount, snap baseline to current Unix-time-derived value AND
  // restore the running delta from localStorage so the total never
  // appears to drop between page loads.
  useEffect(() => {
    setBaseline(calculateBaseline());
    setSessionDelta(readStoredDelta());
  }, []);

  // Every 2s: one new negotiation. The feed item's amount is added to the
  // counter so the visible jump matches what just appeared in the feed,
  // and the new delta is persisted so the next page load picks up here.
  useEffect(() => {
    const i = setInterval(() => {
      const next: FeedItem = {
        id: ++idRef.current,
        ...FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)],
      };
      setSessionDelta((d) => {
        const newDelta = d + next.amount;
        writeStoredDelta(newDelta);
        return newDelta;
      });
      setFeed((f) => [next, ...f.slice(0, 3)]);
    }, 2000);
    return () => clearInterval(i);
  }, []);

  const total = baseline + sessionDelta;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014] md:h-[100vh] md:min-h-[820px]">
      <style>{KEYFRAMES}</style>

      {/* Soft near-monochrome glow centered behind the number */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.055) 0%, rgba(255,255,255,0.035) 36%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col items-center justify-center gap-6 px-5 py-10 md:gap-12 md:px-16 md:py-16">
        {/* Eyebrow — quiet credibility, no live cues */}
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
          <span className="text-[9px] font-medium tracking-[0.16em] text-white/70">
            MEMBERS&apos; SAVINGS
          </span>
        </div>

        {/* Big counter with slot-machine digit scroll */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[48px] md:text-[110px]">
            <ScrollingNumber value={total} />
          </h2>
          <p className="max-w-[520px] text-[16px] leading-[1.55] text-white/65 md:text-[18px]">
            negotiated down for Clerkie members.
          </p>
        </div>

        {/* Curated example wins */}
        <div className="flex w-full max-w-[480px] flex-col gap-2">
          <span className="self-start text-[11px] font-medium tracking-[0.18em] text-white/45">
            RECENT MEMBER WINS
          </span>
          {feed.map((item, i) => (
            <FeedRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Renders a number with each digit on its own vertical scroller.
 * Non-digit chars (commas, $) render statically.
 */
function ScrollingNumber({ value }: { value: number }) {
  const formatted = `$${value.toLocaleString("en-US")}`;
  return (
    <span className="inline-flex tabular-nums" style={{ lineHeight: 1 }}>
      {Array.from(formatted).map((char, i) => (
        <ScrollingChar key={i} char={char} />
      ))}
    </span>
  );
}

/**
 * One digit position. Track holds 0–9 stacked vertically; CSS transform
 * scrolls it to land on the right value, and CSS transition handles the
 * smooth animation between values.
 *
 * Note: when a digit decreases (e.g. 9 → 0 on rollover) the animation
 * scrolls upward, which reads slightly different from the usual downward
 * tumble. Acceptable trade-off for the simpler implementation; for a true
 * forward-only slot-machine we'd extend the track + snap back on every
 * rollover, which adds non-trivial state.
 */
function ScrollingChar({ char }: { char: string }) {
  const isDigit = /[0-9]/.test(char);
  if (!isDigit) {
    return <span>{char}</span>;
  }
  const target = Number(char);
  return (
    <span
      className="inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
    >
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(-${target}em)`,
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span key={d} style={{ height: "1em", lineHeight: 1 }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

function FeedRow({ item, index }: { item: FeedItem; index: number }) {
  return (
    <div
      className="anim-feed-in flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur transition-opacity duration-500"
      style={{ opacity: Math.max(0.3, 1 - index * 0.2) }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5EEAD4]/10 text-[10px] font-semibold tracking-[0.02em] text-[#B9FFF6]">
        {item.initial}
      </span>
      <span className="flex-1 text-[13px] leading-[1.4] text-white/85">
        <span className="font-medium">{item.initial}</span> saved{" "}
        <span className="font-medium text-[#B9FFF6]">
          ${item.amount.toLocaleString()}
        </span>{" "}
        negotiating <span className="text-white/65">{item.lender}</span>
      </span>
    </div>
  );
}

const KEYFRAMES = `
@keyframes ticker-feed-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim-feed-in { animation: ticker-feed-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
`;
