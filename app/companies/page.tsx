import Link from "next/link";
import { TopNav } from "../components/TopNav";
import Reveal from "../components/Reveal";
import RevealStack from "../components/RevealStack";
import FeatureCardsSection from "./FeatureCardsSection";

/**
 * /companies - Origin-style visual language.
 * Two key patterns from the reference images:
 *   Image #11 - atmospheric photo fills card background, frosted UI panel floats on top
 *   Image #12 - blue gradient section with centered italic-serif heading + wide chart panel
 */

export default function CompaniesPage() {
  return (
    <main className="page-enter min-h-screen bg-[#0E1014] text-zinc-50">

      {/* Shared marketing top nav - wordmark, center pill nav, CTA / hamburger. */}
      <TopNav active="companies" ctaLabel="Request demo" ctaHref="#cta" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* overflow-hidden removed so the bottom of IntegrationMockup can
          extend below this section and get covered by LogoTicker. The
          aurora/dot-grid effects are now wrapped in their own bounded,
          overflow-hidden div so they don't bleed into the next section.
          Hero uses <RevealStack>: eyebrow → headline → body → CTA →
          mockup reveal in sequence with the Linear blur-in feel. The
          outer section is no longer wrapped — the stack handles the
          entry animation. */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-mono absolute left-1/2 top-[-200px] h-[900px] w-[1400px] -translate-x-1/2" aria-hidden="true" />
          <div className="dot-grid absolute inset-x-0 top-0 h-[900px]" aria-hidden="true" />
        </div>

        <RevealStack>
          <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 pb-12 pt-20 sm:gap-10 sm:px-10 sm:pb-16 sm:pt-28 md:px-16 md:pb-20 md:pt-[120px]">
            <div className="reveal-item flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5">
              <span className="rounded-full border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em] text-[#5EEAD4]">
                FOR COMPANIES
              </span>
              <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-300">
                An employee benefit your team will actually use
              </span>
            </div>

            <div className="flex max-w-[1040px] flex-col items-center gap-7">
              <h1 className="reveal-item text-center text-[44px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[60px] md:text-[72px] lg:text-[88px] lg:leading-[1.0]">
                Help your community pay off their debt.
              </h1>
              <p className="reveal-item max-w-[680px] text-center text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 sm:text-lg lg:text-[19px]">
                Clerkie partners with employers, financial institutions, and unions
                to provide borrowers with personalized, data-driven repayment options.
              </p>
            </div>

            <div className="reveal-item flex items-center gap-3">
              <a
                href="#cta"
                className="flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#050507]"
              >
                Request Demo
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>
          {/* Mockup container — no bottom padding, small negative-mb pushes
              the mockup down so it overflows below the hero by ~5-7%. The
              LogoTicker below (z-30 at document level) paints over the
              overflowed sliver. This works *with* the reveal-item because
              the LogoTicker sits HIGHER than the hero <section> as a
              whole, regardless of the mockup's inner z-index. */}
          <div className="reveal-item relative z-10 -mb-5 flex justify-center px-6 sm:-mb-6 sm:px-10 md:-mb-8 md:px-16">
            <div className="aurora-mono-tight pointer-events-none absolute left-1/2 top-[40px] h-[600px] w-[1100px] -translate-x-1/2" aria-hidden="true" />
            <IntegrationMockup />
          </div>
        </RevealStack>
      </section>

      {/* ── § LOGOS - TICKER ─────────────────────────────────────────── */}
      {/* relative + z-30 so the solid LogoTicker bg paints OVER the bottom
          slice of the mockup that overflowed past the hero section above.
          NOT wrapped in <Reveal>: .reveal applies `filter: blur()` which
          creates a stacking context, which sandboxes this z-30 inside the
          Reveal element. The mockup (z-10 at document level) would then
          render OVER this ticker. Leaving the ticker unrevealed keeps the
          original stacking intact and the overlap correct. */}
      <div className="relative z-30">
        <LogoTicker />
      </div>

      {/* ── § 01 - PHOTO CARDS (Image #11 style) ────────────────────── */}
      <Reveal>
      <section id="features" className="bg-[#0E1014] px-6 py-24 sm:px-10 md:px-16 md:py-32 lg:px-24 lg:py-40">
        <div className="mx-auto mb-16 max-w-[1440px] text-center md:mb-20">
          <SectionEyebrow>02 - PLATFORM</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
            Everything they need, handled.
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-base leading-[1.55] text-zinc-400 sm:text-[18px]">
            Clerkie gives every employee a personal debt advisor - AI-powered plans,
            live lender negotiations, and real-time progress tracking.
          </p>
          <a
            href="#cta"
            className="mt-8 inline-flex items-center rounded-[10px] border border-white/15 bg-white/5 px-6 py-2.5 text-[12px] font-semibold tracking-[0.06em] uppercase"
          >
            More about the platform
          </a>
        </div>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Card 1 - Smart Debt Paydown */}
          <div className="group relative flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-white/[0.10] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/[0.20] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:min-h-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.22) 45%,rgba(0,0,0,0.65) 100%)" }} />
            <div className="relative z-10 flex-1 p-5 pt-6">
              <DebtPaydownPanel />
            </div>
            <div className="relative z-10 px-6 pb-7 pt-4">
              <p className="text-[20px] font-semibold leading-snug tracking-[-0.015em]">Smart Debt Paydown</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/55">Automatically lower your balances faster with optimized payment strategies.</p>
            </div>
          </div>

          {/* Card 2 - Adaptive Budgeting */}
          <div className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-[22px] border border-white/[0.10] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/[0.20] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:min-h-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sunrise-landscape.png" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.0) 0%,rgba(4,2,0,0.20) 40%,rgba(14,7,0,0.68) 100%)" }} />
            <div className="relative z-10 flex-1 p-5 pt-6">
              <BudgetMockPanel />
            </div>
            <div className="relative z-10 px-6 pb-7 pt-4">
              <p className="text-[20px] font-semibold leading-snug tracking-[-0.015em]">Adaptive Budgeting</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/55">Stay on track with a budget that updates as your life changes.</p>
            </div>
          </div>

          {/* Card 3 - Upcoming Payments */}
          <div className="group relative flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-white/[0.10] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/[0.20] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:min-h-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lake.avif" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.22) 45%,rgba(0,0,0,0.65) 100%)" }} />
            <div className="relative z-10 flex-1 p-5 pt-6">
              <UpcomingPaymentsPanel />
            </div>
            <div className="relative z-10 px-6 pb-7 pt-4">
              <p className="text-[20px] font-semibold leading-snug tracking-[-0.015em]">Upcoming Payments, Simplified</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/55">See what&apos;s coming and stay ahead of every due date.</p>
            </div>
          </div>

        </div>
      </section>
      </Reveal>

      {/* ── § 03 - CONTEXT ───────────────────────────────────────────── */}
      <Reveal>
      <section className="border-t border-white/[0.06] bg-[#0E1014]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="mb-12 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div className="flex max-w-[760px] flex-col gap-4 lg:gap-6">
              <SectionEyebrow>03 - CONTEXT</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
                Consumer debt has{" "}
                <span className="text-zinc-500">more than tripled</span>{" "}
                over the past decade.
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:max-w-[380px] lg:text-[17px]">
              Crippling nearly every facet of borrowers&apos; lives. Many overwhelmed
              by credit card debt don&apos;t know their options, causing them to
              overpay and default. We&apos;re here to help.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="sm:min-w-[840px]">
              <div className="hidden items-center border-b border-white/[0.06] bg-white/[0.015] px-6 py-3.5 sm:flex">
                <div className="w-14 shrink-0" />
                <span className="flex-1 text-xs font-medium tracking-[0.04em] text-zinc-500">MEMBER</span>
                <span className="w-[220px] shrink-0 text-xs font-medium tracking-[0.04em] text-zinc-500">EMPLOYER</span>
                <span className="w-[160px] shrink-0 text-xs font-medium tracking-[0.04em] text-zinc-500">DEBT TYPE</span>
                <span className="w-40 shrink-0 text-right text-xs font-medium tracking-[0.04em] text-zinc-500">SAVED</span>
              </div>
              {MEMBER_SAVINGS.map((row, i) => (
                <MemberSavingsRow key={row.id} {...row} isLast={i === MEMBER_SAVINGS.length - 1} />
              ))}
              {/* Mobile footer summary.
                  Dot wrapped in a 36×36 (h-9 w-9) flex-centered container so
                  its center aligns horizontally with the 36×36 avatar badges
                  in the rows above. */}
              <div className="flex flex-col gap-1.5 border-t border-white/[0.06] bg-white/[0.02] px-5 py-4 sm:hidden">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <span className="block h-2 w-2 rounded-full bg-zinc-50" style={{ boxShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
                  </span>
                  <span className="flex-1 text-sm font-medium tracking-[-0.005em]">Average saved per enrolled employee</span>
                  <span className="font-mono text-base font-semibold tracking-[-0.01em]">$4,820</span>
                </div>
                <p className="pl-[48px] text-[13px] text-zinc-500">Across 240+ employer partners · All categories</p>
              </div>
              {/* Desktop footer summary.
                  Same 36×36 wrapper so the dot's center sits on the same
                  vertical line as the avatar badges in rows above. */}
              <div className="hidden items-center border-t border-white/[0.06] bg-white/[0.02] px-6 py-4 sm:flex">
                <div className="w-14 shrink-0">
                  <span className="flex h-9 w-9 items-center justify-center">
                    <span className="block h-2 w-2 rounded-full bg-zinc-50" style={{ boxShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
                  </span>
                </div>
                <span className="flex-1 text-sm font-medium tracking-[-0.005em]">Average saved per enrolled employee</span>
                <span className="w-[220px] shrink-0 text-[13px] text-zinc-500">Across 240+ employer partners</span>
                <span className="w-[160px] shrink-0 text-[13px] text-zinc-500">All categories</span>
                <span className="w-40 shrink-0 text-right font-mono text-base font-semibold tracking-[-0.01em]">$4,820</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
        <FeatureCardsSection />
      </Reveal>

      {/* ── § 04 - RETURN ───────────────────────────────────────────── */}
      <Reveal>
      <section className="border-t border-white/[0.06] bg-[#0E1014]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:flex-row lg:gap-20 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="flex flex-col gap-6 pt-0 sm:gap-8 lg:max-w-[480px] lg:shrink-0 lg:pt-6">
            <SectionEyebrow>03 - RETURN</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              Good for employees.{" "}
              <span className="text-zinc-500">Great for employers.</span>
            </h2>
            <p className="text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Reduce employee financial stress and increase retention and
              productivity in your business.
            </p>
            <ul className="flex flex-col gap-3.5 pt-2">
              {[
                "Single point of contact for HR and benefits leads.",
                "Rolls out in days - not quarters.",
                "Plugs into the HRIS and payroll stack you already run.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="block h-1 w-1 rounded-full bg-zinc-50" />
                  <span className="text-sm font-medium text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#050507]"
              >
                Request Demo
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>

          <RoiMockup />
        </div>
      </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Reveal>
      <section
        id="cta"
        className="relative h-[80vh] min-h-[640px] w-full overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/picnic.png"
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
      </Reveal>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.08] bg-[#0E1014]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-10 py-16 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="flex max-w-[320px] flex-col items-start gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clerkie-wordmark.svg" alt="Clerkie" className="h-[22px] w-auto" />
              <p className="text-sm leading-[1.55] text-zinc-500">
                A quieter way to handle the money side of life. Built for people,
                not credit-card algorithms.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 md:w-auto md:gap-20">
              <FooterCol title="PRODUCT" links={[
                { label: "For members", href: "/members" },
                { label: "For companies", href: "/companies", active: true },
                { label: "Get the app" },
              ]} />
              <FooterCol title="COMPANY" links={[
                { label: "About" },{ label: "Press" },{ label: "Careers" },{ label: "Support" },
              ]} />
              <FooterCol title="LEGAL" links={[
                { label: "Privacy" },{ label: "Terms of Service" },
                { label: "Do not sell my info" },{ label: "Disclosures" },
              ]} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
            <span className="font-mono text-xs text-zinc-600">© 2025 Henry Labs Inc. · /companies prototype</span>
            <div className="flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" style={{ boxShadow: "0 0 10px rgba(94,234,212,0.7)" }} />
              <span className="text-xs font-medium text-zinc-500">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================
   LOGO TICKER
   ================================================================ */

const ROW_A = [
  /* Yahoo Finance */
  <span key="yahoo" className="flex flex-col items-start leading-[1.15]">
    <span className="text-[30px] font-extrabold tracking-[-0.03em]">yahoo!</span>
    <span className="text-[13px] font-bold tracking-[0.06em] opacity-55">FINANCE</span>
  </span>,
  /* Bloomberg */
  <span key="bloomberg" className="text-[32px] font-bold tracking-[-0.015em]">Bloomberg</span>,
  /* The Wall Street Journal */
  <span key="wsj" className="flex flex-col items-start leading-[1.2]">
    <span className="text-[11px] font-semibold tracking-[0.18em] opacity-55">THE</span>
    <span className="text-[22px] font-bold tracking-[0.04em]">WALL STREET</span>
    <span className="text-[22px] font-bold tracking-[0.04em]">JOURNAL<span className="opacity-40">.</span></span>
  </span>,
  /* Medium */
  <span key="medium" className="flex items-center gap-2.5">
    <svg width="26" height="26" viewBox="0 0 195 195" fill="currentColor">
      <path d="M110.5 97.5c0 33.4-26.8 60.5-59.8 60.5S-9.1 130.9-9.1 97.5 17.7 37 50.7 37s59.8 27.1 59.8 60.5zm65.6 0c0 31.5-13.4 57-30 57s-30-25.5-30-57 13.4-57 30-57 30 25.5 30 57zm23.9 0c0 28.2-4.7 51.1-10.5 51.1S179 125.7 179 97.5 183.7 46.4 189.5 46.4s10.5 22.9 10.5 51.1z"/>
    </svg>
    <span className="text-[30px] font-normal tracking-[-0.01em]">Medium</span>
  </span>,
  /* Business Insider */
  <span key="bi" className="flex flex-col items-start leading-[1.15]">
    <span className="text-[13px] font-bold tracking-[0.14em] opacity-55">BUSINESS</span>
    <span className="text-[28px] font-extrabold tracking-[-0.01em]">Insider</span>
  </span>,
  /* Inc. */
  <span key="inc" className="text-[38px] font-black italic tracking-[-0.03em]">Inc<span className="opacity-50">.</span></span>,
  /* PR Newswire */
  <span key="prnewswire" className="flex flex-col items-start leading-[1.15]">
    <span className="text-[28px] font-black tracking-[-0.01em]">PR</span>
    <span className="text-[13px] font-semibold tracking-[0.08em] opacity-55">NEWSWIRE</span>
  </span>,
];

function LogoTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-inner { animation: ticker-fwd 93s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }
      `}</style>
      <section className="border-t border-white/[0.08] border-b border-b-white/[0.08] bg-[#0E1014] py-12 sm:py-14">
        <p className="mb-8 text-center text-[10px] font-semibold tracking-[0.16em] text-white/30">
          FEATURED IN
        </p>
        {/* Ticker */}
        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0E1014] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0E1014] to-transparent" />
          {/* Track - duplicated for seamless loop */}
          <div className="ticker-inner flex w-max items-center gap-[96px]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-[96px]">
                {ROW_A.map((logo, i) => (
                  <div key={i} className="shrink-0 text-white/55 transition-colors duration-200 hover:text-white/80">
                    {logo}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ================================================================
   HELPERS
   ================================================================ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">{children}</span>;
}

function LogoMark({ size = 24 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/clerkie-logo.svg" alt="Clerkie" width={size} height={size} style={{ width: size, height: size }} />
  );
}

/* ================================================================
   ROI MOCKUP - § 03 RETURN
   ================================================================ */

function RoiMockup() {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Employer ROI · last 12 months</span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-400">
            ACME INC
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/80">12M</span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">6M</span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">QTR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">RETENTION LIFT</span>
          <span className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-0.04em] text-white/90 sm:text-[40px]">
            +14<span className="text-white/30">.2%</span>
          </span>
          <span className="text-[12px] text-zinc-500">vs. control cohort, year 1</span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">STRESS REDUCTION</span>
          <span className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-0.04em] text-white/90 sm:text-[40px]">
            −32<span className="text-white/30">%</span>
          </span>
          <span className="text-[12px] text-zinc-500">self-reported, 6-month survey</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium tracking-[0.04em] text-white/40">ENROLLMENT GROWTH</span>
          <span className="font-mono text-[11px] text-white/55">↑ 28% MoM</span>
        </div>
        <Sparkline />
        <div className="flex items-center justify-between font-mono text-[10px] text-white/35">
          <span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span><span>DEC</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {[
          { label: "Productive hours recovered / employee / yr", value: "62" },
          { label: "Avg. time to first member win",              value: "11 days" },
          { label: "Cost to employer per employee / yr",         value: "$8.40" },
        ].map((r, i) => (
          <div
            key={r.label}
            className={`flex items-center justify-between border-t border-white/[0.06] py-3.5 ${i === 2 ? "border-b" : ""}`}
          >
            <span className="text-sm font-medium text-white/60">{r.label}</span>
            <span className="font-mono text-[13px] font-semibold text-white/90">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline() {
  // x=0 → Jan, x=150 → Apr, x=300 → Jul, x=450 → Oct, x=600 → Dec
  const pts: [number, number][] = [
    [0,   73],
    [100, 68],
    [200, 58],
    [300, 44],
    [400, 27],
    [500, 14],
    [600,  8],
  ];

  // Catmull-Rom → cubic bezier: tangents pass through neighbors, no S-bumps
  const linePath = pts.reduce((acc, p2, i) => {
    if (i === 0) return `M ${p2[0]},${p2[1]}`;
    const p0 = pts[Math.max(i - 2, 0)];
    const p1 = pts[i - 1];
    const p3 = pts[Math.min(i + 1, pts.length - 1)];
    const cp1x = (p1[0] + (p2[0] - p0[0]) / 6).toFixed(2);
    const cp1y = (p1[1] + (p2[1] - p0[1]) / 6).toFixed(2);
    const cp2x = (p2[0] - (p3[0] - p1[0]) / 6).toFixed(2);
    const cp2y = (p2[1] - (p3[1] - p1[1]) / 6).toFixed(2);
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }, "");

  const fillPath = `${linePath} L 600,80 L 0,80 Z`;

  return (
    <svg viewBox="0 0 600 80" width="100%" style={{ height: "auto", display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#sparkGrad)" />
      <path d={linePath} fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="0"   cy="73" r="3" fill="rgba(255,255,255,0.55)" />
      <circle cx="600" cy="8"  r="3" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

/* ================================================================
   § 01 - ROI CHART PANEL (Image #12 style)
   Wide floating panel on gradient background
   ================================================================ */

function RoiChartPanel() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/20 bg-white/[0.08] backdrop-blur-sm">
      {/* Header row */}
      <div className="flex flex-col gap-1 border-b border-white/[0.12] px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium tracking-[0.04em] text-white/50">TEAM DEBT ELIMINATED</span>
          <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-white">$228,400</span>
        </div>
        <div className="flex flex-col items-start gap-0.5 sm:items-end">
          <span className="text-[12px] font-medium tracking-[0.04em] text-white/50">PROJECTED BY YEAR END</span>
          <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-white">
            $412,000 <span className="text-[22px] text-white/60">↗</span>
          </span>
          <span className="text-[12px] text-white/40">+$183,600 (80%)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-8 pb-4 pt-6">
        <svg width="100%" height="160" viewBox="0 0 1000 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="roiAreaV7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          ))}
          {/* Area fill */}
          <path d="M 0,145 C 120,135 250,120 400,100 C 550,80 700,55 850,35 C 920,24 960,18 1000,14 L 1000,160 L 0,160 Z" fill="url(#roiAreaV7)" />
          {/* Solid line */}
          <path d="M 0,145 C 120,135 250,120 400,100 C 550,80 700,55 850,35 C 920,24 960,18 1000,14" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
          {/* Today marker */}
          <circle cx="0" cy="145" r="5" fill="white" />
          {/* Milestone circles */}
          <circle cx="320" cy="108" r="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <circle cx="680" cy="62" r="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          {/* Vertical milestone lines */}
          <line x1="320" y1="108" x2="320" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="680" y1="62" x2="680" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
        </svg>

        {/* X axis */}
        <div className="mt-3 flex justify-between">
          {["TODAY", "3 MONTHS", "6 MONTHS", "9 MONTHS", "1 YEAR", "18 MONTHS"].map((l) => (
            <span key={l} className={`font-mono text-[10px] tracking-wider ${l === "TODAY" ? "text-white/70" : "text-white/30"}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Bottom stat row */}
      <div className="grid grid-cols-2 gap-px border-t border-white/[0.1] bg-white/[0.06] sm:grid-cols-4">
        {[
          ["62,418+", "negotiations completed"],
          ["24% → 9%", "avg APR reduction"],
          ["$4,820", "avg saved / employee / yr"],
          ["240+", "employer partners"],
        ].map(([val, label]) => (
          <div key={val} className="flex flex-col gap-1 bg-white/[0.04] px-6 py-4">
            <span className="font-mono text-[20px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[24px]">{val}</span>
            <span className="text-[11px] leading-[1.4] text-white/45">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   § 02 - PHOTO CARD UI PANELS (Image #11 style)
   ================================================================ */

/* Panel 1 - Payment schedule calendar (Image #11 Card 1 style) */
function DebtPaydownPanel() {
  const accounts = [
    { label: "Credit Cards", balance: "$8,200",  pct: 72 },
    { label: "Auto Loan",    balance: "$11,400", pct: 85 },
    { label: "Medical",      balance: "$4,780",  pct: 45 },
  ];
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">TOTAL BALANCE</span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em]">$24,380</div>
          <div className="mt-1.5 text-[11px] text-white/45">↓ $2,140 saved this year</div>
        </div>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          On track
        </span>
      </div>

      {/* Downward trend chart */}
      <div className="mb-4 overflow-hidden rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 pb-2 pt-3">
        <svg viewBox="0 0 300 72" className="h-14 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="debtAreaV7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path d="M 0,18 C 50,22 100,32 150,42 C 200,52 250,60 300,65 L 300,72 L 0,72 Z" fill="url(#debtAreaV7)" />
          <path d="M 0,18 C 50,22 100,32 150,42 C 200,52 250,60 300,65" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="0" cy="18" r="3" fill="rgba(255,255,255,0.65)" />
          <circle cx="300" cy="65" r="3" fill="rgba(255,255,255,0.25)" />
          {(["Jan","Apr","Jul","Oct"] as const).map((m, i) => (
            <text key={m} x={i * 100} y={71} fontSize="6.5" fill="rgba(255,255,255,0.22)" textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}>{m}</text>
          ))}
        </svg>
      </div>

      {/* Per-account progress */}
      <div className="flex flex-col gap-3">
        {accounts.map((a) => (
          <div key={a.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/55">{a.label}</span>
              <span className="font-mono text-[11px] text-white/35">{a.balance}</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{ width: `${a.pct}%`, background: "linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.40))" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetMockPanel() {
  const cats = [
    { name: "Food & Dining",    pct: 68 },
    { name: "Bills & Utilities",pct: 91 },
    { name: "Transport",        pct: 60 },
    { name: "Shopping",         pct: 73 },
    { name: "Entertainment",    pct: 30 },
  ];
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(26,14,4,0.74)] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">MONTHLY BUDGET</span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em]">$1,675</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30">of $2,250</div>
          <div className="mt-0.5 text-[11px] font-medium text-white/50">74% used</div>
        </div>
      </div>

      {/* Overall bar */}
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[74%] rounded-full" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.20),rgba(255,255,255,0.42))" }} />
      </div>

      <div className="flex flex-col gap-3.5">
        {cats.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-[110px] shrink-0 truncate text-[11px] font-medium text-white/55">{c.name}</span>
            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct}%`, background: "linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.38))" }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[10px] text-white/30">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingPaymentsPanel() {
  const DAY_LABELS = ["S","M","T","W","T","F","S"];
  const weeks = [
    [null,null,null,null,1,2,3],
    [4,5,6,7,8,9,10],
    [11,12,13,14,15,16,17],
    [18,19,20,21,22,23,24],
    [25,26,27,28,29,30,31],
  ];
  const events: Record<number,{ label:string; color:string; amount:string }> = {
    7:  { label:"Netflix",   color:"rgba(185,65,65,0.85)",   amount:"$15.99" },
    12: { label:"Rent",      color:"rgba(120,95,175,0.85)",  amount:"$2,200" },
    15: { label:"Spotify",   color:"rgba(50,145,75,0.85)",   amount:"$9.99"  },
    20: { label:"Car ins.",  color:"rgba(65,115,175,0.85)",  amount:"$124"   },
    28: { label:"Gym",       color:"rgba(175,130,45,0.85)",  amount:"$45"    },
  };
  const TODAY = 14;
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(8,12,22,0.74)] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">UPCOMING PAYMENTS</span>
        <span className="font-mono text-[10px] text-white/25">MAY 2025</span>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {DAY_LABELS.map((d, i) => (
          <span key={i} className="pb-1.5 text-[9px] font-medium tracking-wider text-white/25">{d}</span>
        ))}
        {weeks.flat().map((day, i) => {
          if (day === null) return <span key={`e${i}`} />;
          const ev = events[day];
          const isToday = day === TODAY;
          return (
            <div
              key={day}
              className={`flex flex-col items-center rounded-[8px] py-1.5 ${isToday ? "bg-white/10 ring-1 ring-inset ring-white/20" : ""}`}
            >
              <span className={`text-[10px] font-medium leading-none ${isToday ? "text-white" : "text-white/40"}`}>{day}</span>
              {ev ? (
                <span
                  className="mt-1 block h-1.5 w-1.5 rounded-full"
                  style={{ background: ev.color }}
                />
              ) : <span className="mt-1 block h-1.5" />}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
        {([7,12,15] as const).map((day) => {
          const ev = events[day];
          return (
            <div key={day} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ev.color }} />
                <span className="text-[11px] font-medium text-white/60">{ev.label}</span>
                <span className="text-[10px] text-white/28">May {day}</span>
              </div>
              <span className="font-mono text-[11px] text-white/45">{ev.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   INTEGRATION MOCKUP (hero)
   ================================================================ */

function IntegrationMockup() {
  return (
    <div className="relative z-20 flex w-[1040px] max-w-full max-h-[513px] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#0C0D0F] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:max-h-none">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-[11px] text-zinc-500">benefits.clerkie.io / acme-inc</span>
        </div>
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">
          ACME INC · 1,240 EMPLOYEES
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-white/[0.06] md:grid-cols-3">
        {/* Col 1: Enrollment */}
        <div className="flex flex-col gap-4 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">ENROLLMENT</span>
            <span className="font-mono text-[11px] text-zinc-500">Q2</span>
          </div>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.03em]">68<span className="text-zinc-500">%</span></span>
          <span className="text-xs text-zinc-400">843 of 1,240 employees enrolled</span>
          <div className="relative mt-1 h-1.5 overflow-hidden rounded-[3px] bg-white/[0.06]">
            <span className="absolute left-0 top-0 h-full rounded-[3px]" style={{ width: "68%", background: "linear-gradient(90deg,#F7F8F8 0%,rgba(247,248,248,0.5) 100%)" }} />
          </div>
          <div className="mt-2 flex flex-col gap-2 border-t border-white/[0.06] pt-3.5 text-[12px]">
            <Row label="New this week"    value="+ 18"   />
            <Row label="Active sessions"  value="312"    />
            <Row label="Avg. enroll time" value="2m 14s" />
          </div>
        </div>

        {/* Col 2: HRIS sync */}
        <div className="flex flex-col gap-3.5 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">HRIS · PAYROLL</span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-0.5">
              <span className="block h-[5px] w-[5px] rounded-full bg-zinc-50" />
              <span className="font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">LIVE</span>
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {INTEGRATIONS.map((it) => <IntegrationRow key={it.code} {...it} />)}
          </div>
        </div>

        {/* Col 3: Member wins */}
        <div className="flex flex-col gap-3.5 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">MEMBER WINS · TODAY</span>
            <span className="font-mono text-[11px] text-zinc-500">04:21 PM</span>
          </div>
          <div className="flex flex-col gap-2">
            {MEMBER_WINS.map((w) => <MemberWinRow key={w.name} {...w} />)}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3.5">
            <span className="text-xs text-zinc-400">Saved this quarter</span>
            <span className="font-mono text-[15px] font-semibold tracking-[-0.01em]">$1,184,602</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const INTEGRATIONS: Array<{ code: string; name: string; meta: string; status: string }> = [
  { code: "WD", name: "Workday",   meta: "HRIS",    status: "Synced 2m ago"  },
  { code: "GS", name: "Gusto",     meta: "Payroll", status: "Synced 6m ago"  },
  { code: "AD", name: "ADP",       meta: "Payroll", status: "Synced 14m ago" },
  { code: "RP", name: "Rippling",  meta: "HRIS",    status: "Synced 21m ago" },
  { code: "BB", name: "BambooHR",  meta: "HRIS",    status: "Synced 1h ago"  },
];

function IntegrationRow({ code, name, meta, status }: (typeof INTEGRATIONS)[number]) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.05] py-2 last:border-b-0">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05]">
        <span className="text-[10px] font-semibold">{code}</span>
      </span>
      <div className="flex flex-1 flex-col">
        <span className="text-[13px] font-medium">{name}</span>
        <span className="text-[11px] text-zinc-500">{meta}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="block h-1.5 w-1.5 rounded-full bg-zinc-50" />
        <span className="font-mono text-[10px] text-zinc-400">{status}</span>
      </div>
    </div>
  );
}

const MEMBER_WINS: Array<{ name: string; action: string; amount: string }> = [
  { name: "M. Alvarez", action: "Negotiated card",   amount: "+ $1,820" },
  { name: "J. Park",    action: "Refi student loan",  amount: "+ $4,260" },
  { name: "S. Cooper",  action: "Settled medical",    amount: "+ $740"   },
  { name: "R. Singh",   action: "Lowered APR",        amount: "+ $2,140" },
];

function MemberWinRow({ name, action, amount }: (typeof MEMBER_WINS)[number]) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <span className="text-[9px] font-semibold">{name.split(" ").map((p) => p[0]).join("")}</span>
      </span>
      <span className="flex-1 text-[12px] text-zinc-300">
        <span className="font-medium text-zinc-50">{name}</span>{" "}
        <span className="text-zinc-500">· {action}</span>
      </span>
      <span className="font-mono text-[12px] font-medium text-white/80">{amount}</span>
    </div>
  );
}

/* ================================================================
   § 03 - MEMBER SAVINGS TABLE
   ================================================================ */

const MEMBER_SAVINGS: Array<{ id: string; initials: string; name: string; employer: string; category: string; saved: string }> = [
  { id: "ma", initials: "MA", name: "M. Alvarez", employer: "Acme Inc · Operations",     category: "Student Loans", saved: "$14,278" },
  { id: "jp", initials: "JP", name: "J. Park",    employer: "Northwind Co · Engineering", category: "Credit Cards",  saved: "$2,343"  },
  { id: "sc", initials: "SC", name: "S. Cooper",  employer: "Lumen Health · Nursing",     category: "Medical Debt",  saved: "$22,389" },
  { id: "rs", initials: "RS", name: "R. Singh",   employer: "Atlas Logistics · Drivers",  category: "Auto Loan",     saved: "$1,220"  },
];

function MemberSavingsRow({ initials, name, employer, category, saved, isLast }: (typeof MEMBER_SAVINGS)[number] & { isLast: boolean }) {
  const borderCls = isLast ? "" : "border-b border-white/[0.05]";
  return (
    <>
      {/* Mobile - card layout */}
      <div className={`flex flex-col gap-1.5 px-5 py-4 sm:hidden ${borderCls}`}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
            <span className="text-[11px] font-semibold">{initials}</span>
          </span>
          <span className="flex-1 text-[15px] font-medium tracking-[-0.01em]">{name}</span>
          <span className="font-mono text-[15px] font-medium">{saved}</span>
        </div>
        <p className="pl-[48px] text-[13px] text-zinc-400">{employer} · {category}</p>
      </div>
      {/* Desktop - table row */}
      <div className={`hidden items-center px-6 py-4 sm:flex ${borderCls}`}>
        <div className="w-14 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
            <span className="text-[11px] font-semibold">{initials}</span>
          </span>
        </div>
        <span className="flex-1 text-[15px] font-medium tracking-[-0.01em]">{name}</span>
        <span className="w-[220px] shrink-0 text-sm text-zinc-400">{employer}</span>
        <span className="w-[160px] shrink-0 text-sm text-zinc-400">{category}</span>
        <span className="w-40 shrink-0 text-right font-mono text-[15px] font-medium">{saved}</span>
      </div>
    </>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; active?: boolean; href?: string }> }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-zinc-600">{title}</span>
      {links.map((l) =>
        l.href ? (
          <Link key={l.label} href={l.href} className={`text-[15px] transition-colors hover:text-zinc-50 ${l.active ? "font-semibold text-zinc-100" : "font-normal text-zinc-500"}`}>
            {l.label}
          </Link>
        ) : (
          <span key={l.label} className={`text-[15px] ${l.active ? "font-semibold text-zinc-100" : "font-normal text-zinc-500"}`}>{l.label}</span>
        )
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-100">{value}</dd>
    </div>
  );
}
