import React from "react";

/* ================================================================
   04 — WHY IT WORKS
   2×2 feature card grid. Dark glass surfaces, Linear-style depth.
   ================================================================ */

/* ── Card 1 UI — Automation flow ─────────────────────────────── */
function AutomationFlow() {
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
    <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-5">
      {/* Steps row */}
      <div className="mb-5 flex items-start">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.03]">
                {s.icon}
              </div>
              <span className="text-[10px] font-medium tracking-[0.04em] text-white/45">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mt-[18px] h-px bg-white/[0.10]" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.07] bg-white/[0.015] px-3.5 py-2.5">
        <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
        <span className="text-[11px] text-white/50">Payment optimized · next run in 3 days</span>
      </div>
    </div>
  );
}

/* ── Card 2 UI — Adaptive plan ────────────────────────────────── */
function AdaptivePlanPanel() {
  const rows = [
    { label: "Income",  value: "$5,240", pct: 88, chip: "+2.1%" },
    { label: "Bills",   value: "$1,820", pct: 64, chip: "−8.3%" },
    { label: "Savings", value: "$640",   pct: 38, chip: "+12%"  },
  ];

  return (
    <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.07em] text-white/35">PERSONALIZED PLAN</span>
        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="text-[10px] font-medium text-white/50">Updated</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div key={r.label}>
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
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 3 UI — Milestone progress ──────────────────────────── */
function MilestoneProgress() {
  const BAR = 68;
  const milestones = [
    { label: "$250 saved",   pct: 20 },
    { label: "Debt reduced", pct: 52 },
    { label: "On track",     pct: 88 },
  ];
  const stats = [
    { label: "Saved",    value: "$1,840" },
    { label: "Debt out", value: "$6,200" },
    { label: "Streak",   value: "14 wks" },
  ];

  return (
    <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.07em] text-white/35">PROGRESS</span>
        <span className="text-[10px] font-medium text-white/35">{BAR}% complete</span>
      </div>

      {/* Track + fill + dots */}
      <div className="relative mb-2 h-1.5 w-full rounded-full bg-white/[0.09]">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${BAR}%`,
            background: "linear-gradient(90deg,rgba(255,255,255,.26),rgba(255,255,255,.48))",
          }}
        />
        {milestones.map((m) => (
          <div
            key={m.label}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.pct}%` }}
          >
            <div
              className={`h-3 w-3 rounded-full border-2 ${
                BAR >= m.pct
                  ? "border-white/60 bg-white/30"
                  : "border-white/[0.20] bg-white/[0.07]"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="mb-5 flex justify-between pl-[2%] pr-[5%]">
        {milestones.map((m) => (
          <span key={m.label} className="text-[9px] font-medium text-white/32">
            {m.label}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5 rounded-[10px] border border-white/[0.07] bg-white/[0.015] py-2.5">
            <span className="font-mono text-[13px] font-semibold text-white/85">{s.value}</span>
            <span className="text-[8px] font-semibold tracking-[0.05em] text-white/32">{s.label.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 4 UI — Coaching message ────────────────────────────── */
function CoachingCardUI() {
  return (
    <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-5">
      {/* Coach header */}
      <div className="mb-4 flex items-center gap-3">
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

      {/* Message */}
      <div className="mb-4 rounded-[10px] border border-white/[0.07] bg-white/[0.015] px-4 py-3">
        <p className="text-[13px] leading-[1.55] text-white/62">
          Nice progress — stay consistent this week.{" "}
          Your balance is down{" "}
          <span className="font-semibold text-white/88">$420</span>{" "}
          since last month.
        </p>
      </div>

      {/* Action chips */}
      <div className="flex gap-2">
        {["Review plan", "Keep going"].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/52"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Feature card wrapper ────────────────────────────────────── */
function FeatureCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-[22px] border border-white/[0.06] bg-white/[0.015] p-7">
      {/* Subtle top-edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {children}
      <div>
        <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-white/90">{title}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white/55">{body}</p>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
const CARDS = [
  {
    title: "Automation removes the hard part",
    body: "Employees don't have to rely on willpower. Key financial actions happen in the background — no manual steps needed.",
    ui: <AutomationFlow />,
  },
  {
    title: "Plans that keep up with real life",
    body: "As income or expenses shift, Clerkie recalibrates automatically so users stay on track without touching a thing.",
    ui: <AdaptivePlanPanel />,
  },
  {
    title: "Small wins compound over time",
    body: "Visible progress milestones keep employees engaged and moving forward — not just in the first week.",
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
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">
            04 — WHY IT WORKS
          </span>
          <h2 className="mt-5 max-w-[700px] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
            Built around behavior, not intention.
          </h2>
          <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/50">
            Most financial tools tell people what to do. Clerkie automates the doing — and keeps adapting as life changes.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((c) => (
            <FeatureCard key={c.title} title={c.title} body={c.body}>
              {c.ui}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
