"use client";

/**
 * Platform §02 graphics — hover-animated.
 *
 * Each graphic listens for hover on its closest parent `<article>`
 * (the PlatformCard) and replays a short animation that "fits" what
 * the dashboard represents:
 *
 *   - InsightsGraphic ($487K savings dashboard):
 *       Big $ + delta count up from 0. Trend bars rise from h=0
 *       staggered. Engagement / Coverage progress bars sweep 0→final.
 *
 *   - DeployGraphic (HRIS connector status):
 *       "4 / 4" ticks up 0→4. Each integration row cascades in like
 *       a fresh sync sweep. "Live" dot pulses.
 *
 *   - TrustGraphic (compliance posture):
 *       Each compliance dot lights up cyan in sequence, with the
 *       label briefly brightening — like a posture re-verification.
 *
 * Trigger model: animation replays on every mouseenter (so users can
 * hover-off-and-back to see it again). On mouseleave we leave the
 * graphic at its final state so the dashboard looks "settled".
 */

import { useEffect, useRef, useState } from "react";

/* ─── Hover state from closest parent <article> ────────────────── */
function useArticleHover() {
  const ref = useRef<HTMLDivElement>(null);
  // `playCount` ticks up every mouseenter; downstream effects key off
  // it to retrigger animations. Starts at 1 so the dashboard animates
  // on first paint (so it doesn't look "empty" before any hover).
  const [playCount, setPlayCount] = useState(1);

  useEffect(() => {
    const root = ref.current;
    const article = root?.closest("article");
    if (!article) return;
    const onEnter = () => setPlayCount((c) => c + 1);
    article.addEventListener("mouseenter", onEnter);
    return () => {
      article.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return { ref, playCount };
}

/* ─── Count-up hook ────────────────────────────────────────────── */
function useCountUp(target: number, key: number, durMs = 900) {
  const [val, setVal] = useState(target);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    setVal(0);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, key, durMs]);

  return val;
}

/* ================================================================
   INSIGHTS — aggregate savings dashboard
   ================================================================ */
export function InsightsGraphic() {
  const { ref, playCount } = useArticleHover();
  const bars = [40, 55, 35, 70, 50, 78, 92];
  const subs = [
    { label: "Engagement", pct: 87 },
    { label: "Coverage", pct: 92 },
  ];
  const savings = useCountUp(487290, playCount, 1000);
  const delta = useCountUp(52, playCount, 900);

  return (
    <div
      ref={ref}
      className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
            TEAM SAVINGS · Q4
          </span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
            ${savings.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[11px] tabular-nums text-white/45">
            ↑ ${delta}K vs last quarter
          </div>
        </div>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          On track
        </span>
      </div>

      {/* Trend bars — each rises from 0 to its target height, staggered. */}
      <div className="mb-4 overflow-hidden rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-3">
        <div className="flex h-10 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={`${playCount}-${i}`}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h}%`,
                background:
                  i === bars.length - 1
                    ? "linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.30))"
                    : "rgba(255,255,255,0.10)",
                animation: `insights-bar-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>

      {/* Sub-metric progress bars — sweep 0 → final pct. */}
      <div className="flex flex-col gap-3">
        {subs.map((s, i) => (
          <div key={s.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/55">
                {s.label}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-white/35">
                {s.pct}%
              </span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
              <div
                key={`${playCount}-${s.label}`}
                className="h-full rounded-full"
                style={{
                  width: `${s.pct}%`,
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.40))",
                  animation: `insights-bar-fill 900ms cubic-bezier(0.16, 1, 0.3, 1) ${500 + i * 120}ms both`,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes insights-bar-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes insights-bar-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}

/* ================================================================
   DEPLOY — HRIS connector status list
   ================================================================ */
export function DeployGraphic() {
  const { ref, playCount } = useArticleHover();
  const integrations = [
    { name: "Workday", code: "WD", meta: "v2024.R2", state: "Synced 2m ago" },
    { name: "Rippling", code: "RP", meta: "OAuth", state: "Synced 4m ago" },
    { name: "BambooHR", code: "BH", meta: "API key", state: "Synced 6m ago" },
    { name: "ADP", code: "AD", meta: "Marketpl", state: "Synced 8m ago" },
  ];
  const connected = useCountUp(4, playCount, 900);

  return (
    <div
      ref={ref}
      className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
            HRIS · CONNECTED
          </span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
            {connected} / 4
          </div>
          <div className="mt-1.5 text-[11px] text-white/45">
            All systems syncing
          </div>
        </div>
        {/* Pulsing live dot inside the badge. */}
        <span className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-300/80"
            style={{
              boxShadow: "0 0 8px rgba(110,231,183,0.7)",
              animation: "deploy-pulse 1.6s ease-in-out infinite",
            }}
          />
          Live
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {integrations.map(({ name, code, meta, state }, i) => (
          <div
            key={`${playCount}-${name}`}
            className="flex items-center gap-3 rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-2"
            style={{
              animation: `deploy-row-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms both`,
            }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[10px] font-semibold tracking-wide text-white/80">
              {code}
            </span>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="text-[12px] font-medium text-white/85">{name}</span>
              <span className="font-mono text-[10px] text-white/30">{meta}</span>
            </div>
            <span className="font-mono text-[10px] text-white/35">{state}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes deploy-row-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes deploy-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}

/* ================================================================
   TRUST — compliance badges grid
   ================================================================ */
export function TrustGraphic() {
  const { ref, playCount } = useArticleHover();
  const badges = [
    { label: "SOC 2 TYPE II", sub: "Audited annually" },
    { label: "GDPR", sub: "EU aligned" },
    { label: "CCPA", sub: "CA aligned" },
    { label: "AES-256", sub: "End-to-end" },
  ];

  return (
    <div
      ref={ref}
      className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
            COMPLIANCE · POSTURE
          </span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em]">
            v2.4
          </div>
          <div className="mt-1.5 text-[11px] text-white/45">
            Reviewed quarterly
          </div>
        </div>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          Verified
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {badges.map(({ label, sub }, i) => (
          <div
            key={`${playCount}-${label}`}
            className="flex flex-col gap-1.5 rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
            style={{
              animation: `trust-badge-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 140}ms both`,
            }}
          >
            <div className="flex items-center gap-1.5">
              {/* Dot "lights up" cyan briefly, then settles to white. */}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  animation: `trust-dot-flash 900ms ease-out ${i * 140 + 200}ms both`,
                }}
              />
              <span className="text-[10px] font-semibold tracking-[0.04em] text-white/85">
                {label}
              </span>
            </div>
            <span className="text-[10px] text-white/45">{sub}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes trust-badge-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes trust-dot-flash {
          0%   { background-color: rgba(255,255,255,0.20); box-shadow: 0 0 0 rgba(94,234,212,0); }
          40%  { background-color: rgba(94,234,212,0.95); box-shadow: 0 0 8px rgba(94,234,212,0.6); }
          100% { background-color: rgba(255,255,255,0.55); box-shadow: 0 0 0 rgba(94,234,212,0); }
        }
      `}</style>
    </div>
  );
}
