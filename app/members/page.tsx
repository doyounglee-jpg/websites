import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Car01Icon,
  ChartUpIcon,
  CreditCardIcon,
  MoneyBag01Icon,
  Mortarboard01Icon,
  StethoscopeIcon,
} from "@hugeicons-pro/core-stroke-standard";
import { TopNav } from "../components/TopNav";
import { AnimatedBillsChatPanel } from "./AnimatedBillsChatPanel";
import { AnimatedChatPanel } from "./AnimatedChatPanel";
import { LiveSavingsTicker } from "./LiveSavingsTicker";

/**
 * /members — DARK Cleo-inspired bento + cinematic photography direction.
 *
 * (Promoted from /members-v3 → /members. The previous v1 lives at
 * /members-archived for reference.) Same structural moves as the now-
 * archived layout (full-bleed photo hero, alternating bento + features,
 * glassy pill nav) with restrained cyan over mostly monochrome surfaces.
 *
 * Photos: Unsplash hot-linked CDN URLs (prototype-only). Photos chosen
 * for moodier dusk/night/cool-toned cinematic mood.
 *
 * Color palette:
 *   - Page bg:       #0E1014  (matches /members and /companies)
 *   - Surface:       #15171B  (slightly lifted dark surface)
 *   - Text primary:  #F7F8F8
 *   - Text muted:    rgba(247,248,248,0.6)
 *   - Accent:        restrained cyan over mostly monochrome surfaces
 */

const PHOTOS = {
  // Aurora / northern lights — moody hero
  heroLandscape:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  // Foggy/dusk mountain — section 1 backdrop
  feature1Backdrop:
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80",
  // "Get your debt off your mind" portrait — local asset
  bentoPortrait: "/dancing-woman.png",
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
      {/* Shared marketing top nav — wordmark, center pill nav, CTA / hamburger. */}
      <TopNav active="members" ctaLabel="Get the App" ctaHref="#cta" />

      <div className="flex flex-col gap-3 p-3">
      {/* ============================================================
          2. HERO — Cash App-style 3-col: headline · video · body + CTA
         ============================================================ */}
      <section className="relative flex min-h-svh w-full items-center overflow-hidden rounded-3xl bg-[#0E1014] lg:min-h-screen">
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

        {/*
          12-col grid on lg+: headline (cols 1-3) · gap · video (cols 5-8) · gap · body+CTA (cols 10-12).
          Stacks on mobile; video pulled to top via `order-1` to match Cash App's mobile pattern.
          Section uses `items-center` so the grid is vertically centered in the viewport.
        */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-10 md:px-16">
          <div className="flex w-full flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
            {/* LEFT — Headline (cols 1-3) */}
            <div className="order-2 w-full text-center lg:order-1 lg:col-span-3 lg:col-start-1 lg:text-left">
              <h1 className="text-[36px] font-normal leading-[0.95] tracking-[-0.03em] sm:text-[44px] lg:text-[44px] xl:text-[52px]">
                Solve your debt and money problems.
              </h1>
            </div>

            {/*
              CENTER — Video (cols 5-8). aspect 9:19.5 = 0.462 (iPhone), per Cash App spec.
              Height capped at small viewport on mobile and 68vh on desktop so the video
              never overflows the section.
            */}
            <div className="relative order-1 flex w-full justify-center lg:order-2 lg:col-span-4 lg:col-start-5">
              {/* Soft halo behind the video */}
              <div
                className="aurora-mono-tight pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[680px] w-[900px] -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <div className="relative aspect-[9/19.5] h-[55svh] max-h-[600px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)] lg:h-[68vh] lg:max-h-[760px]">
                {/* TODO: drop a real file into /public and set src to /hero-video.mp4 */}
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  {/* <source src="/hero-video.mp4" type="video/mp4" /> */}
                </video>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-mono uppercase tracking-[0.1em] text-white/30">
                  video placeholder
                </div>
              </div>
            </div>

            {/* RIGHT — Body + CTA (cols 10-12) */}
            <div className="order-3 flex w-full flex-col items-center gap-6 text-center lg:order-3 lg:col-span-3 lg:col-start-10 lg:items-start lg:text-left">
              <p className="text-[16px] font-normal leading-[1.4] text-zinc-400 lg:text-[17px] xl:text-[18px]">
                The easiest way to pay off debt, manage bills, and get
                personalized financial answers — built for the way real people
                earn and spend.
              </p>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-[14px] font-normal text-[#0E1014]"
              >
                Get the App
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. § 02 — BENTO PAIR (cool portrait / monochrome chat panel)
         ============================================================ */}
      {/* Mobile: panels stack and each gets its own min-height (via children below).
          md+: section is locked to viewport height so the two columns share it. */}
      <section className="grid w-full grid-cols-1 gap-3 md:h-[100vh] md:min-h-[760px] md:grid-cols-2">
        {/* Left: cool-toned portrait with overlay copy */}
        <div className="relative min-h-[600px] overflow-hidden rounded-3xl md:min-h-0">
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

        {/* Right: dark surface panel with restrained cyan-accented chat */}
        <div className="relative min-h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014] md:min-h-0">
          {/* Subtle neutral-cyan glow */}
          <div
            className="pointer-events-none absolute right-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.055) 0%, rgba(255,255,255,0.035) 38%, rgba(255,255,255,0) 70%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            {/* Live chat: looping conversation + animated voice waveform. */}
            <AnimatedChatPanel />

            {/* 16px buffer from waveform pill (mobile compresses justify-between to 0). */}
            <div className="mt-4 flex flex-col gap-3">
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
      {/* Same pattern as § 02: panels get tall min-heights on mobile, share viewport on md+ */}
      <section className="grid w-full grid-cols-1 gap-3 md:h-[100vh] md:min-h-[760px] md:grid-cols-2">
        {/* Left: dark bills dashboard panel. Taller min-h on mobile so the
            bills chat card (header + 380px body + input row) fits without
            being clipped above the headline. */}
        {/* order-2 on mobile so the testimonial stacks first; reverts to source order on md+ */}
        <div className="relative order-2 min-h-[760px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#15171B] via-[#101216] to-[#0E1014] md:order-none md:min-h-0">
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

            {/* 16px buffer below the bills UI on mobile (justify-between collapses). */}
            <div className="mt-4 flex flex-col gap-3">
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
        {/* order-1 on mobile so it appears above the bills panel; reverts on md+ */}
        <div className="relative order-1 min-h-[600px] overflow-hidden rounded-3xl md:order-none md:min-h-0">
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
                href="/members-archived"
                className="text-sm text-zinc-500 hover:text-zinc-50"
              >
                /members-archived (v1)
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
              © 2025 Henry Labs Inc. · /members
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

/* ============================================================
   CATEGORIES GRID — § 05 (ported from /members)
   ============================================================ */

const CATEGORIES = [
  {
    title: "Credit Cards",
    desc: "Lower your APR, consolidate balances, and stop interest from eating your paycheck.",
    statLabel: "AVG. SAVED",
    statValue: "$3,820",
    icon: CreditCardIcon,
  },
  {
    title: "Student Loans",
    desc: "Federal, private, refinance — we walk you through every payoff path with the math up front.",
    statLabel: "AVG. SAVED",
    statValue: "$9,420",
    icon: Mortarboard01Icon,
  },
  {
    title: "Personal Loans",
    desc: "Negotiate rates, prepay strategically, or fold them into a smarter consolidation plan.",
    statLabel: "AVG. SAVED",
    statValue: "$2,140",
    icon: MoneyBag01Icon,
  },
  {
    title: "Medical Debt",
    desc: "Hospital and dental bills are negotiable. We dispute charges and settle for less.",
    statLabel: "AVG. SAVED",
    statValue: "$4,260",
    icon: StethoscopeIcon,
  },
  {
    title: "Auto Loans",
    desc: "Refinance for a lower rate or restructure when payments are squeezing your budget.",
    statLabel: "AVG. SAVED",
    statValue: "$2,890",
    icon: Car01Icon,
  },
  {
    title: "Boost Your Credit",
    desc: "Dispute errors, build positive history, and add tradelines that move your score quickly.",
    statLabel: "AVG. LIFT",
    statValue: "+84 pts",
    icon: ChartUpIcon,
  },
];

function CategoryCard({
  title,
  desc,
  statLabel,
  statValue,
  icon,
}: (typeof CATEGORIES)[number]) {
  return (
    <div className="flex min-h-[240px] basis-full flex-col gap-6 bg-[#0C0D0F] px-6 py-7 sm:basis-[calc(50%-1px)] sm:px-8 sm:py-9 lg:basis-[calc(33.333%-1px)]">
      {/* Icon bubble — Hugeicons stroke icon, white at 80% opacity. */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        <HugeiconsIcon
          icon={icon}
          size={22}
          color="currentColor"
          strokeWidth={1.5}
          className="text-white/80"
        />
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
