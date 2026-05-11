import Link from "next/link";

/**
 * /companies-v3 — DARK Cleo-inspired bento + cinematic photography for B2B.
 *
 * Sibling to /members. Same structural moves (full-bleed photo hero,
 * alternating bento + features, glassy pill nav, gaps + rounded cards),
 * but content and mockups adapted for the employer / benefits-leader audience.
 *
 * Photos: Unsplash hot-linked CDN URLs (prototype-only).
 *
 * Color palette:
 *   - Page bg:       #0E1014  (matches /members and /companies)
 *   - Surface:       #15171B  (slightly lifted dark surface)
 *   - Text primary:  #F7F8F8
 *   - Text muted:    rgba(247,248,248,0.6)
 *   - Accent:        #5EEAD4  (cyan)
 */

const PHOTOS = {
  // Night cityscape — moody hero (employers are urban/professional)
  heroLandscape:
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2400&q=80",
  // Foggy mountain — section 1 backdrop
  feature1Backdrop:
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80",
  // Professional portrait
  bentoPortrait:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
  // Workspace / desk dark
  feature2Backdrop:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=80",
  // Subdued portrait — testimonial
  testimonialPortrait:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1600&q=80",
  // Misty forest — CTA
  ctaBackdrop:
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=2400&q=80",
};

export default function CompaniesV3Page() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-zinc-50">
      {/* ============================================================
          1. FLOATING PILL NAV
         ============================================================ */}
      <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1.5 backdrop-blur-md">
          <PillNavLink href="/members">Members</PillNavLink>
          <PillNavLink href="/companies-v3" active>
            Companies
          </PillNavLink>
          <PillNavLink href="#">About</PillNavLink>
        </nav>
      </header>

      <div className="fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/clerkie-wordmark.svg"
          alt="Clerkie"
          className="h-[18px] w-auto"
        />
      </div>
      <div className="fixed top-5 right-5 z-50">
        <a
          href="#cta"
          className="flex items-center rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md"
        >
          Request demo
        </a>
      </div>

      <div className="flex flex-col gap-3 p-3">
      {/* ============================================================
          2. HERO — full-bleed cityscape + floating dashboard mockup
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.heroLandscape}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-[#0E1014]/80" />

        {/* Floating dashboard mockup */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <DashboardMockup />
        </div>
      </section>

      {/* ============================================================
          3. § 01 — FULL-BLEED FEATURE ("Help your community pay off their debt")
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.feature1Backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1014]/60 via-[#0E1014]/40 to-[#0E1014]/80" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-10 md:px-16">
          <div className="flex max-w-[520px] flex-col gap-6">
            <span className="text-[11px] font-medium tracking-[0.18em] text-[#5EEAD4]">
              FOR BENEFITS LEADERS
            </span>
            <h2 className="text-[56px] font-medium leading-[1.05] tracking-[-0.025em] text-white">
              Help your community{" "}
              <span className="text-white/50">pay off their debt.</span>
            </h2>
            <p className="max-w-[480px] text-[16px] leading-[1.55] text-white/70">
              Clerkie partners with employers, financial institutions, and
              unions to provide borrowers with personalized, data-driven
              repayment options.
            </p>
          </div>

          {/* ROI mini-card right side */}
          <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:right-16 md:block">
            <RoiMiniCard />
          </div>
        </div>
      </section>

      {/* ============================================================
          4. § 02 — BENTO PAIR (professional portrait / dark impact panel)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: portrait with overlay copy */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.bentoPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-10 md:p-14">
            <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              An employee benefit your team will actually use.
            </h3>
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/70">
              No waiting period, no underwriting, no surprise fees. Day-one
              access for every employee.
            </p>
          </div>
        </div>

        {/* Right: dark impact stats panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014]">
          {/* Cyan glow */}
          <div
            className="pointer-events-none absolute right-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.12) 0%, rgba(94,234,212,0) 70%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            {/* Stat showcase */}
            <div className="flex flex-1 items-center">
              <div className="grid w-full grid-cols-2 gap-6">
                <ImpactStat pct="92%" copy="have helped reduce or pay off debt" />
                <ImpactStat
                  pct="87%"
                  copy="more motivated at work knowing they have this benefit"
                />
                <ImpactStat
                  pct="84%"
                  copy="get out of debt faster, feel more in control"
                />
                <ImpactStat
                  pct="78%"
                  copy="freed budget room and paid bills on time"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-8">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                Members feel it.{" "}
                <span className="text-white/50">Employers see it.</span>
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/60">
                According to Metlife, 1 in 3 employees admit to being less
                productive at work because of financial stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. § 03 — FULL-BLEED FEATURE ("Plugs into the stack you already run")
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.feature2Backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1014] via-[#0E1014]/70 to-[#0E1014]/0" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-6 px-10 md:px-16">
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 rounded-full bg-[#5EEAD4]" />
            <span className="text-[11px] font-medium tracking-[0.18em] text-[#5EEAD4]">
              ROLLS OUT IN DAYS, NOT QUARTERS
            </span>
          </div>
          <h2 className="max-w-[760px] text-[64px] font-medium leading-[1.02] tracking-[-0.03em] text-white md:text-[80px]">
            Plugs into the{" "}
            <span className="text-[#5EEAD4]">HRIS &amp; payroll</span> stack you
            already run.
          </h2>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {["Workday", "Gusto", "ADP", "Rippling", "BambooHR"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="pt-4">
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-zinc-50 px-7 py-3.5 text-sm font-medium text-[#0E1014]"
            >
              Talk to integrations
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. § 04 — BENTO PAIR (savings table / dark testimonial)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: dark savings table panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014]">
          <div
            className="pointer-events-none absolute left-[-20%] bottom-[-20%] h-[500px] w-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.08) 0%, rgba(94,234,212,0) 70%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            <div className="flex flex-1 items-center justify-center">
              <SavingsTableMockup />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                Real wins. <span className="text-white/50">Every week.</span>
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/60">
                Members across 240+ employer partners save an average of{" "}
                <span className="text-[#5EEAD4]">$4,820</span> on debt.
              </p>
            </div>
          </div>
        </div>

        {/* Right: dark testimonial */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.testimonialPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-10 md:p-14">
            <p className="max-w-[480px] text-[24px] leading-[1.3] tracking-[-0.01em] text-white">
              &ldquo;Clerkie cleared{" "}
              <span className="text-[#5EEAD4]">$14,000</span> in student loans
              I&apos;d been dragging for six years. I didn&apos;t even have to
              call.&rdquo;
            </p>
            <span className="text-[13px] tracking-[0.04em] text-white/60">
              — M. ALVAREZ, ACME INC · OPERATIONS
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. CTA — "Bring Clerkie to your community"
         ============================================================ */}
      <section
        id="cta"
        className="relative h-[80vh] min-h-[640px] w-full overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.ctaBackdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1014]/40 via-[#0E1014]/60 to-[#0E1014]/90" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-8 px-10 text-center md:px-16">
          <span className="text-[11px] font-medium tracking-[0.18em] text-[#5EEAD4]">
            BRING CLERKIE TO YOUR COMMUNITY
          </span>
          <h2 className="max-w-[820px] text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[80px]">
            Paying off debt has{" "}
            <span className="text-white/50">never been easier.</span>
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.55] text-white/70">
            Give your employees a benefit they actually love. We&apos;ll get
            back to you within one business day.
          </p>
          <a
            href="#"
            className="flex items-center rounded-full bg-zinc-50 px-8 py-4 text-base font-medium tracking-[-0.005em] text-[#0E1014]"
          >
            Request demo
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
            {["SOC 2 Type II", "256-bit encryption", "HRIS-ready"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="block h-1 w-1 rounded-full bg-[#5EEAD4]"
                    style={{ boxShadow: "0 0 6px rgba(94,234,212,0.6)" }}
                  />
                  <span className="text-[13px] font-medium text-white/60">
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      </div>

      {/* ============================================================
          8. FOOTER
         ============================================================ */}
      <footer className="border-t border-white/[0.08] bg-[#0E1014]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-10 py-16 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="flex max-w-[320px] flex-col gap-5">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clerkie-wordmark.svg"
                  alt="Clerkie"
                  className="h-[22px] w-auto"
                />
              </div>
              <p className="text-sm leading-[1.55] text-zinc-500">
                A quieter way to handle the money side of life. Built for
                people, not credit-card algorithms.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <Link
                href="/members-archived"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /members-archived
              </Link>
              <Link
                href="/members"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /members
              </Link>
              <Link
                href="/companies-archived"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /companies-archived (v1)
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
            <span className="font-mono text-xs text-zinc-600">
              © 2025 Henry Labs Inc. · /companies-v3 prototype
            </span>
            <div className="flex items-center gap-2">
              <span
                className="block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
                style={{ boxShadow: "0 0 10px rgba(94,234,212,0.7)" }}
              />
              <span className="text-xs font-medium text-zinc-500">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

function PillNavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Dashboard mockup — hero floating element. Shows enrollment + integrations
 * + member wins (carries the /companies IntegrationMockup feel into v3).
 */
function DashboardMockup() {
  return (
    <div className="relative w-[720px] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-[#0E1014]/85 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      {/* Top window chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-[11px] text-white/50">
            benefits.clerkie.io / acme-inc
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#5EEAD4]/10 px-2 py-0.5">
          <span className="block h-[5px] w-[5px] rounded-full bg-[#5EEAD4]" />
          <span className="font-mono text-[10px] font-medium tracking-[0.04em] text-[#5EEAD4]">
            LIVE
          </span>
        </span>
      </div>

      {/* Body — 2 cols */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
        {/* Enrollment */}
        <div className="flex flex-col gap-3 bg-[#0E1014] p-6">
          <span className="text-xs font-medium tracking-[0.04em] text-white/50">
            ENROLLMENT
          </span>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-[#5EEAD4]">
            68<span className="text-white/50">%</span>
          </span>
          <span className="text-xs text-white/60">
            843 of 1,240 employees enrolled
          </span>
          <div className="relative mt-1 h-1.5 overflow-hidden rounded-[3px] bg-white/[0.06]">
            <span
              className="absolute left-0 top-0 h-full rounded-[3px] bg-[#5EEAD4]"
              style={{ width: "68%" }}
            />
          </div>
        </div>

        {/* Saved this quarter */}
        <div className="flex flex-col gap-3 bg-[#0E1014] p-6">
          <span className="text-xs font-medium tracking-[0.04em] text-white/50">
            SAVED THIS QUARTER
          </span>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-[#5EEAD4]">
            $1.18M
          </span>
          <span className="text-xs text-white/60">
            Across 1,240 employees · 24 active negotiations
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#5EEAD4]">
              ↑ 28% MoM
            </span>
            <span className="font-mono text-[10px] text-white/40">
              · 12-month avg $4,820 per employee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mini ROI card — floats next to feature 1 on desktop.
 */
function RoiMiniCard() {
  return (
    <div className="flex w-[320px] flex-col gap-4 rounded-2xl border border-white/10 bg-[#0E1014]/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-[0.04em] text-white/50">
          EMPLOYER ROI · 12M
        </span>
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-white/70">
          ACME INC
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium tracking-[0.04em] text-white/40">
            RETENTION LIFT
          </span>
          <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-[#5EEAD4]">
            +14<span className="text-white/40">.2%</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium tracking-[0.04em] text-white/40">
            STRESS REDUCTION
          </span>
          <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-[#5EEAD4]">
            −32<span className="text-white/40">%</span>
          </span>
        </div>
      </div>
      <div className="border-t border-white/[0.06] pt-3 text-[11px] text-white/50">
        Cost to employer per employee · $8.40/yr
      </div>
    </div>
  );
}

/**
 * Single impact stat — used 4-up in the bento right panel.
 */
function ImpactStat({ pct, copy }: { pct: string; copy: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-[#5EEAD4]">
        {pct}
      </span>
      <span className="text-[13px] leading-[1.4] text-white/60">{copy}</span>
    </div>
  );
}

/**
 * Savings table mockup — small 3-row table showing member wins.
 */
function SavingsTableMockup() {
  const rows = [
    { initials: "MA", name: "M. Alvarez", category: "Student Loans", saved: "$14,278" },
    { initials: "JP", name: "J. Park", category: "Credit Cards", saved: "$2,343" },
    { initials: "SC", name: "S. Cooper", category: "Medical Debt", saved: "$22,389" },
  ];
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <span className="text-[11px] font-medium tracking-[0.1em] text-white/50">
          MEMBER WINS · THIS WEEK
        </span>
        <span className="font-mono text-[11px] text-white/50">+ $1.18M</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.initials}
          className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5EEAD4]/10 text-[10px] font-semibold text-[#5EEAD4]">
            {r.initials}
          </span>
          <div className="flex flex-1 flex-col">
            <span className="text-[13px] font-medium text-white">{r.name}</span>
            <span className="text-[11px] text-white/50">{r.category}</span>
          </div>
          <span className="font-mono text-[13px] font-medium text-[#5EEAD4]">
            {r.saved}
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="text-[11px] text-white/50">240+ employer partners</span>
        <div className="flex items-center gap-1.5">
          <span
            className="block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
            style={{ boxShadow: "0 0 8px rgba(94,234,212,0.6)" }}
          />
          <span className="font-mono text-[10px] tracking-[0.06em] text-[#5EEAD4]">
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
