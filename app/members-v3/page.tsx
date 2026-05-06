import Link from "next/link";
import { AnimatedBillsChatPanel } from "./AnimatedBillsChatPanel";
import { AnimatedChatPanel } from "./AnimatedChatPanel";
import { LiveSavingsTicker } from "./LiveSavingsTicker";

/**
 * /members-v3 — DARK Cleo-inspired bento + cinematic photography direction.
 *
 * Sibling to /members-v2. Same structural moves (full-bleed photo hero,
 * alternating bento + features, glassy pill nav), but uses the dark-cyan
 * palette from /members so the whole site shares one accent system.
 *
 * Photos: Unsplash hot-linked CDN URLs (prototype-only). Photos chosen
 * for moodier dusk/night/cool-toned cinematic mood.
 *
 * Color palette:
 *   - Page bg:       #0E1014  (matches /members and /companies)
 *   - Surface:       #15171B  (slightly lifted dark surface)
 *   - Text primary:  #F7F8F8
 *   - Text muted:    rgba(247,248,248,0.6)
 *   - Accent:        #5EEAD4  (cyan — same as /members)
 */

const PHOTOS = {
  // Aurora / northern lights — moody hero
  heroLandscape:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  // Foggy/dusk mountain — section 1 backdrop
  feature1Backdrop:
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80",
  // "Get your debt off your mind" portrait — local asset
  bentoPortrait: "/happy-two.png",
  // "Crush your debt by 70%" backdrop — local asset
  feature2Portrait: "/woman-on-mountain.png",
  // Warm intimate family portrait — testimonial (local asset)
  testimonialPortrait: "/testimonial-warm-two.png",
  // "Solve your debt. Get back to living." CTA backdrop — local asset
  ctaBackdrop: "/picnic.png",
};

export default function MembersV3Page() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-zinc-50">
      {/* ============================================================
          1. FLOATING PILL NAV — glassy on dark
         ============================================================ */}
      <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1.5 backdrop-blur-md">
          <PillNavLink href="/members-v3" active>
            Members
          </PillNavLink>
          <PillNavLink href="/companies">Companies</PillNavLink>
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
          Get the App
        </a>
      </div>

      <div className="flex flex-col gap-3 p-3">
      {/* ============================================================
          2. HERO — eyebrow pill, headline, CTAs, phone (from /members)
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[1000px] w-full overflow-hidden rounded-3xl bg-[#0E1014]">
        {/* Aurora halo */}
        <div
          className="aurora-mono pointer-events-none absolute left-1/2 top-[-200px] h-[900px] w-[1400px] -translate-x-1/2"
          aria-hidden="true"
        />
        {/* Dotted grid texture */}
        <div
          className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[900px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 pb-12 pt-32 sm:gap-10 sm:px-10 sm:pb-16 sm:pt-36 md:px-16 md:pb-20 md:pt-[140px]">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5">
            <span className="rounded-full border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em] text-[#5EEAD4]">
              NEW
            </span>
            <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-300">
              Negotiate any debt with one tap
            </span>
          </div>

          {/* Headline + subhead */}
          <div className="flex max-w-[920px] flex-col items-center gap-7">
            <h1 className="text-center text-[44px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[60px] md:text-[72px] lg:leading-[1.0] lg:text-[88px]">
              Solve your debt and money problems.
            </h1>
            <p className="max-w-[580px] text-center text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 sm:text-lg lg:text-[19px]">
              The easiest way to pay off debt, manage bills, and get
              personalized financial answers — built for the way real people
              earn and spend.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#0E1014]"
            >
              Get the App
              <span className="text-zinc-500">→</span>
            </a>
            <a
              href="#"
              className="rounded-[10px] border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium tracking-[-0.005em]"
            >
              Talk to an advisor
            </a>
          </div>
        </div>

        {/* Phone mockup (centered with halo). Wrapper height < phone height + overflow-hidden = hard cut at the hero's bottom edge. */}
        <div className="relative z-10 flex h-[540px] justify-center overflow-hidden px-6 sm:px-10 md:px-16">
          <div
            className="aurora-mono-tight pointer-events-none absolute left-1/2 top-[60px] h-[600px] w-[1100px] -translate-x-1/2"
            aria-hidden="true"
          />
          <PhoneMockup variant="hero" />
        </div>
      </section>

      {/* ============================================================
          3. § 02 — BENTO PAIR (cool portrait / dark cyan chat panel)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: cool-toned portrait with overlay copy */}
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
              Get your debt off your mind.
            </h3>
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/70">
              Clerkie negotiates and tracks your payoff plan, adjusting as life
              moves. No more anxiety or mental math.
            </p>
          </div>
        </div>

        {/* Right: dark surface panel with cyan-accented chat */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014]">
          {/* Subtle cyan glow */}
          <div
            className="pointer-events-none absolute right-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.12) 0%, rgba(94,234,212,0) 70%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            {/* Live chat: looping conversation + animated voice waveform. */}
            <AnimatedChatPanel />

            <div className="flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                More personalized than most apps.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/60">
                Clerkie&apos;s always learning about you and your spending — so
                money conversations feel personal (with real personality).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. § 03 — LIVE TICKER (replaces the static "Crush your debt 70%")
         ============================================================ */}
      <LiveSavingsTicker />

      {/* ============================================================
          6. § 04 — BENTO PAIR (bills dashboard / dark testimonial)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: dark bills dashboard panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014]">
          {/* Subtle cyan glow corner */}
          <div
            className="pointer-events-none absolute left-[-20%] bottom-[-20%] h-[500px] w-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.08) 0%, rgba(94,234,212,0) 70%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            <div className="flex flex-1 items-center justify-center">
              <AnimatedBillsChatPanel />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                Every bill, paid on time.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/60">
                Clerkie watches your bills, due dates, and balances — and gives
                you a heads-up before anything slips.
              </p>
            </div>
          </div>
        </div>

        {/* Right: dark testimonial portrait */}
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
              — M. ALVAREZ, MEMBER SINCE 2024
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          6.5 § 05 — COVERAGE (categories grid, ported from /members)
         ============================================================ */}
      <section className="w-full overflow-hidden rounded-3xl bg-[#0E1014]">
        <div className="px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24 md:px-16 md:pb-28 md:pt-28">
          <div className="mb-10 flex max-w-[720px] flex-col gap-4 sm:gap-6 lg:mb-16">
            <span className="text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">
              03 — COVERAGE
            </span>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-[52px] lg:text-[56px]">
              Every kind of debt.{" "}
              <span className="text-white/50">One quiet app.</span>
            </h2>
            <p className="max-w-[540px] text-base leading-[1.55] tracking-[-0.005em] text-white/60 lg:text-[17px]">
              Whether it&apos;s a hospital bill, a car payment, or a maxed-out
              card, Clerkie handles the negotiation, the paperwork, and the
              follow-through.
            </p>
          </div>

          {/* 2x3 grid with hairline gridlines (made of background bleed) */}
          <div className="overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.06]">
            <div className="flex flex-wrap gap-px">
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.title} {...cat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. CTA — full-bleed dark photo + signup
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
          <h2 className="max-w-[820px] text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[80px]">
            Solve your debt.{" "}
            <span className="text-white/50">Get back to living.</span>
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.55] text-white/70">
            The easiest way to pay off debt, manage bills, and get personalized
            financial answers.
          </p>
          <a
            href="#"
            className="flex items-center rounded-full bg-zinc-50 px-8 py-4 text-base font-medium tracking-[-0.005em] text-[#0E1014]"
          >
            Get the App
          </a>
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
                href="/members"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /members (v1)
              </Link>
              <Link
                href="/members-v2"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /members-v2
              </Link>
              <Link
                href="/companies"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /companies
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
            <span className="font-mono text-xs text-zinc-600">
              © 2025 Henry Labs Inc. · /members-v3 prototype
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
 * Phone mockup — dark UI version with cyan accents.
 *
 * - "hero" variant: 1:1 copy of the phone from /members (greeting, progress
 *   card, suggested negotiation, upcoming bills).
 * - "negotiation" variant: short list of cards used in §01.
 */
function PhoneMockup({
  variant,
  tilt,
}: {
  variant: "hero" | "negotiation";
  tilt?: boolean;
}) {
  if (variant === "hero") {
    return (
      <div
        className="relative z-20 flex h-[700px] w-[340px] flex-col rounded-[44px] border border-white/10 bg-[#101113] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        style={tilt ? { transform: "rotate(-4deg)" } : undefined}
      >
        <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-[36px] bg-gradient-to-b from-[#0C0D0F] to-[#16181C] px-5 py-7">
          {/* Status bar */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[13px] font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <span className="block h-2 w-4 rounded-sm bg-zinc-400" />
              <span className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-zinc-400 p-[1.5px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-zinc-50" />
              </span>
            </div>
          </div>

          {/* Greeting */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium tracking-[0.02em] text-zinc-500">
              GOOD MORNING, MARIA
            </span>
            <span className="text-2xl font-semibold leading-[1.15] tracking-[-0.02em]">
              You&apos;re $2,847 closer to debt-free.
            </span>
          </div>

          {/* Progress card */}
          <div className="flex flex-col gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-zinc-400">
                Total debt remaining
              </span>
              <span className="font-mono text-[11px] font-medium text-zinc-300">
                ↓ 18%
              </span>
            </div>
            <span className="text-[32px] font-semibold leading-none tracking-[-0.03em]">
              $12,946
            </span>
            <div className="relative h-1.5 overflow-hidden rounded-[3px] bg-white/[0.06]">
              <span
                className="absolute left-0 top-0 h-full rounded-[3px]"
                style={{
                  width: "62%",
                  background:
                    "linear-gradient(90deg, #F7F8F8 0%, rgba(247,248,248,0.5) 100%)",
                }}
              />
            </div>
          </div>

          {/* Action card */}
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-[11px] font-medium tracking-[0.04em] text-zinc-300">
              SUGGESTED · NEGOTIATION
            </span>
            <span className="text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]">
              We can lower your $4,200 card balance by ~$1,890.
            </span>
            <div className="flex items-center justify-between pt-1.5">
              <span className="text-xs text-zinc-400">Takes ~2 minutes</span>
              <span className="text-xs font-medium">Start →</span>
            </div>
          </div>

          {/* Bills row */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-medium tracking-[0.02em] text-zinc-500">
              UPCOMING THIS WEEK
            </span>
            <BillItem code="CL" name="Capital One" amount="$184.00" />
            <BillItem code="SF" name="Sallie Mae" amount="$262.40" last />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[640px] w-[300px] overflow-hidden rounded-[48px] border-[10px] border-[#1A1A1D] bg-gradient-to-b from-[#16181C] to-[#0E1014] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      style={tilt ? { transform: "rotate(-4deg)" } : undefined}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3.5">
        <span className="text-[13px] font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1">
          <span className="block h-2 w-2 rounded-full bg-white/40" />
          <span className="block h-2.5 w-3.5 rounded-sm bg-white/40" />
        </div>
      </div>

      {/* Notch */}
      <div className="absolute left-1/2 top-3 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-[#0E1014]" />

      <div className="flex h-full flex-col gap-3 px-5 pt-12">
        <span className="text-[11px] font-medium tracking-[0.1em] text-[#5EEAD4]">
          NEGOTIATING NOW
        </span>
        <h3 className="text-[26px] font-medium leading-[1.1] tracking-[-0.02em] text-white">
          Crushing your card debt.
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          {[
            { name: "Capital One", saved: "$1,820", pct: "−23%" },
            { name: "Discover", saved: "$2,140", pct: "−18%" },
            { name: "Chase Sapphire", saved: "$3,420", pct: "−31%" },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2.5"
            >
              <span className="text-[12px] font-medium text-white">
                {row.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[12px] text-[#5EEAD4]">
                  {row.saved}
                </span>
                <span className="rounded bg-[#5EEAD4]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#5EEAD4]">
                  {row.pct}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillItem({
  code,
  name,
  amount,
  last,
}: {
  code: string;
  name: string;
  amount: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 ${
        last ? "" : "border-b border-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06]">
          <span className="text-[11px] font-semibold">{code}</span>
        </span>
        <span className="text-[13px] font-medium">{name}</span>
      </div>
      <span className="font-mono text-xs font-medium">{amount}</span>
    </div>
  );
}

/* ============================================================
   CATEGORIES GRID — § 05 (ported from /members)
   ============================================================ */

const CATEGORIES = [
  {
    title: "Credit Cards",
    desc: "Lower your APR, consolidate balances, and stop interest from eating your paycheck.",
    statLabel: "AVG. SAVED",
    statValue: "$3,820",
  },
  {
    title: "Student Loans",
    desc: "Federal, private, refinance — we walk you through every payoff path with the math up front.",
    statLabel: "AVG. SAVED",
    statValue: "$9,420",
  },
  {
    title: "Personal Loans",
    desc: "Negotiate rates, prepay strategically, or fold them into a smarter consolidation plan.",
    statLabel: "AVG. SAVED",
    statValue: "$2,140",
  },
  {
    title: "Medical Debt",
    desc: "Hospital and dental bills are negotiable. We dispute charges and settle for less.",
    statLabel: "AVG. SAVED",
    statValue: "$4,260",
  },
  {
    title: "Auto Loans",
    desc: "Refinance for a lower rate or restructure when payments are squeezing your budget.",
    statLabel: "AVG. SAVED",
    statValue: "$2,890",
  },
  {
    title: "Boost Your Credit",
    desc: "Dispute errors, build positive history, and add tradelines that move your score quickly.",
    statLabel: "AVG. LIFT",
    statValue: "+84 pts",
  },
];

function CategoryCard({
  title,
  desc,
  statLabel,
  statValue,
}: (typeof CATEGORIES)[number]) {
  return (
    <div className="flex min-h-[240px] basis-full flex-col gap-6 bg-[#0C0D0F] px-6 py-7 sm:basis-[calc(50%-1px)] sm:px-8 sm:py-9 lg:basis-[calc(33.333%-1px)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        <div className="relative h-4 w-5.5 rounded-[3px] bg-white/40">
          <div className="absolute left-0 top-1 h-[3px] w-full bg-[#0E1014]/40" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
          {title}
        </span>
        <span className="text-sm leading-[1.55] tracking-[-0.005em] text-white/60">
          {desc}
        </span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-white/50">
          {statLabel}
        </span>
        <span className="font-mono text-[13px] font-medium text-[#5EEAD4]">
          {statValue}
        </span>
      </div>
    </div>
  );
}
