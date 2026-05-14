import Link from "next/link";
import { TopNav } from "../components/TopNav";
import RevealStack from "../components/RevealStack";
import DebtScrollStory from "./DebtScrollStory";
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
              <h1 className="reveal-item text-center text-[44px] font-medium leading-[1.05] tracking-[-0.045em] sm:text-[60px] md:text-[72px] lg:text-[88px] lg:leading-[1.0]">
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

      {/* ── § 02 - PLATFORM ──────────────────────────────────────────
          Re-aimed at the COMPANIES audience — what HR/employer teams
          get from the platform, not what employees see (that's /members).
          RevealStack cascade reveals header pieces first, then each card
          in sequence (reveal-item on each element). */}
      <RevealStack>
      <section id="features" className="bg-[#0E1014] px-6 py-24 sm:px-10 md:px-16 md:py-32 lg:px-24 lg:py-40">
        <div className="mx-auto mb-16 max-w-[1440px] text-center md:mb-20">
          <SectionEyebrow className="reveal-item">02 - PLATFORM</SectionEyebrow>
          <h2 className="reveal-item mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
            Built for the people writing the check.
          </h2>
          <p className="reveal-item mx-auto mt-5 max-w-[540px] text-base leading-[1.55] text-zinc-400 sm:text-[18px]">
            Aggregate visibility, no-lift deployment, and a security posture
            your lawyers will sign off on the first read.
          </p>
          <a
            href="#cta"
            className="reveal-item mt-8 inline-flex items-center rounded-[10px] border border-white/15 bg-white/5 px-6 py-2.5 text-[12px] font-semibold tracking-[0.06em] uppercase"
          >
            More about the platform
          </a>
        </div>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-3">
          <PlatformCard
            className="reveal-item"
            eyebrow="01 · INSIGHTS"
            title="See instant ROI"
            body="Aggregate dashboards - engagement, dollar savings, payoff velocity - refreshed in real time. Never a single employee's personal data."
            graphic={<InsightsGraphic />}
            bgImage="/c1.png"
          />
          <PlatformCard
            className="reveal-item"
            eyebrow="02 · DEPLOY"
            title="Connect once, live in a week"
            body="Drop-in HRIS hookups for Workday, Rippling, BambooHR, ADP. No SSO project, no IT lift, no data export."
            graphic={<DeployGraphic />}
            bgImage="/c2.png"
          />
          <PlatformCard
            className="reveal-item"
            eyebrow="03 · TRUST"
            title="Privacy your lawyers will sign"
            body="SOC 2 Type II, GDPR/CCPA aligned, end-to-end encrypted. Individual financial data never crosses your servers."
            graphic={<TrustGraphic />}
            bgImage="/c3.png"
          />
        </div>
      </section>
      </RevealStack>

      {/* ── § 03 - CONTEXT ───────────────────────────────────────────── */}
      {/* INTENTIONALLY NOT wrapped in <Reveal>: the inner DebtScrollStory
          uses position: sticky. <Reveal>'s filter:blur() would create a
          containing block that breaks sticky positioning.
          DebtScrollStory owns its own headline + paragraph copy now
          (laid out beside the animating counter inside the sticky pin),
          so the section here is just a thin shell. */}
      <section className="border-t border-white/[0.06] bg-[#0E1014]">
        <DebtScrollStory />
      </section>

      <RevealStack>
        <FeatureCardsSection />
      </RevealStack>

      {/* ── § 04 - RETURN ───────────────────────────────────────────── */}
      <RevealStack>
      <section className="border-t border-white/[0.06] bg-[#0E1014]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:flex-row lg:gap-20 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="flex flex-col gap-6 pt-0 sm:gap-8 lg:max-w-[480px] lg:shrink-0 lg:pt-6">
            <SectionEyebrow className="reveal-item">05 - RETURN</SectionEyebrow>
            <h2 className="reveal-item text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              Good for employees.{" "}
              <span className="text-zinc-500">Great for employers.</span>
            </h2>
            <p className="reveal-item text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Reduce employee financial stress and increase retention and
              productivity in your business.
            </p>
            <ul className="reveal-item flex flex-col gap-3.5 pt-2">
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
            <div className="reveal-item pt-2">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#050507]"
              >
                Request Demo
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>

          <div className="reveal-item">
            <RoiMockup />
          </div>
        </div>
      </section>
      </RevealStack>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <RevealStack>
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
          <h2 className="reveal-item max-w-[820px] text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[80px]">
            Solve your debt.{" "}
            <span className="text-white/50">Get back to living.</span>
          </h2>
          <p className="reveal-item max-w-[520px] text-[17px] leading-[1.55] text-white/70">
            The easiest way to pay off debt, manage bills, and get personalized
            financial answers.
          </p>
          <a
            href="#"
            className="reveal-item flex items-center rounded-full bg-zinc-50 px-8 py-4 text-base font-medium tracking-[-0.005em] text-[#0E1014]"
          >
            Get the App
          </a>
        </div>
      </section>
      </RevealStack>

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

function SectionEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

/* ================================================================
   PLATFORM CARD + GRAPHICS - § 02
   Card: subtle border, faint surface, eyebrow + graphic + text block.
   Each card carries its own audience-relevant mockup graphic.
   ================================================================ */

function PlatformCard({
  eyebrow,
  title,
  body,
  graphic,
  bgImage,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body: string;
  graphic?: React.ReactNode;
  bgImage?: string;
  className?: string;
}) {
  return (
    <article className={`group relative flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.18] sm:min-h-[600px] ${className}`}>
      {bgImage && (
        <>
          {/* Full-bleed photo backdrop. object-cover crops to the card's
              taller-than-wide aspect. Gradient overlay sits above the
              photo so the title/body at the bottom stays legible — same
              recipe as the prior platform photo cards. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.80) 100%)",
            }}
            aria-hidden
          />
        </>
      )}
      <div className="relative z-10">
        {graphic && <div>{graphic}</div>}
      </div>
      <div className="relative z-10 mt-auto pt-6">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-cyan-100/85">
          {eyebrow}
        </span>
        <h3 className="mt-2 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[30px]">
          {title}
        </h3>
        <p className="mt-3 max-w-[360px] text-[14px] leading-[1.55] text-white/70 sm:text-[15px]">
          {body}
        </p>
      </div>
    </article>
  );
}

/* All three graphics share the glass-panel design language of the
   prior platform mockups: rounded-[16px] white-tinted card on a
   nearly-opaque dark surface, monospace numerics, white-only tonal
   accents (no brand cyan inside the mockups themselves). */

/* INSIGHTS — aggregate savings dashboard. */
function InsightsGraphic() {
  const bars = [40, 55, 35, 70, 50, 78, 92];
  const subs = [
    { label: "Engagement", pct: 87 },
    { label: "Coverage",   pct: 92 },
  ];
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
            TEAM SAVINGS · Q4
          </span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em]">
            $487,290
          </div>
          <div className="mt-1.5 text-[11px] text-white/45">
            ↑ $52K vs last quarter
          </div>
        </div>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          On track
        </span>
      </div>

      {/* Mini trend bars */}
      <div className="mb-4 overflow-hidden rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-3">
        <div className="flex h-10 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h}%`,
                background:
                  i === bars.length - 1
                    ? "linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.30))"
                    : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Sub metrics */}
      <div className="flex flex-col gap-3">
        {subs.map((s) => (
          <div key={s.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/55">{s.label}</span>
              <span className="font-mono text-[11px] text-white/35">{s.pct}%</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.pct}%`,
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.40))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* DEPLOY — HRIS connector status list. */
function DeployGraphic() {
  const integrations = [
    { name: "Workday",  code: "WD", meta: "v2024.R2", state: "Synced 2m ago" },
    { name: "Rippling", code: "RP", meta: "OAuth",    state: "Synced 4m ago" },
    { name: "BambooHR", code: "BH", meta: "API key",  state: "Synced 6m ago" },
    { name: "ADP",      code: "AD", meta: "Marketpl", state: "Synced 8m ago" },
  ];
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
            HRIS · CONNECTED
          </span>
          <div className="mt-1 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em]">
            4 / 4
          </div>
          <div className="mt-1.5 text-[11px] text-white/45">
            All systems syncing
          </div>
        </div>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {integrations.map(({ name, code, meta, state }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-2"
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
    </div>
  );
}

/* TRUST — compliance badges grid. */
function TrustGraphic() {
  const badges = [
    { label: "SOC 2 TYPE II", sub: "Audited annually" },
    { label: "GDPR",          sub: "EU aligned" },
    { label: "CCPA",          sub: "CA aligned" },
    { label: "AES-256",       sub: "End-to-end" },
  ];
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[rgba(14,12,16,0.74)] p-5 backdrop-blur-md">
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
        {badges.map(({ label, sub }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 rounded-[10px] border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
              <span className="text-[10px] font-semibold tracking-[0.04em] text-white/85">
                {label}
              </span>
            </div>
            <span className="text-[10px] text-white/45">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
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

        {/* Col 3: Savings by debt type
            Replaced the old "Member Wins · TODAY" panel which surfaced
            individual employee names + their savings — employers should
            never see PII like that. Aggregating by debt category is both
            privacy-correct AND a stronger pitch (it shows the breadth of
            debt types Clerkie handles). */}
        <div className="flex flex-col gap-3.5 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">SAVINGS · BY DEBT TYPE</span>
            {/* Visual-only filter chip — sells the "filterable" idea without
                wiring up state. Mimics the look of a real picker. */}
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-[0.02em] text-zinc-400">
              THIS QUARTER
              <span className="text-zinc-500">▾</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {SAVINGS_BY_DEBT_TYPE.map((s) => <SavingsByDebtTypeRow key={s.category} {...s} />)}
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

// Aggregated savings rolled up by debt category. Numbers are mockup-grade
// (sum is close to but not exactly $1,184,602 in the footer — reads as
// more honest than a tidy mockup). Deltas are vs the prior quarter.
const SAVINGS_BY_DEBT_TYPE: Array<{
  category: string;
  icon: string;
  delta: string;
  amount: string;
}> = [
  { category: "Student Loans", icon: "🎓", delta: "+ 18%", amount: "$487,210" },
  { category: "Credit Cards",  icon: "💳", delta: "+ 12%", amount: "$312,840" },
  { category: "Auto",          icon: "🚗", delta: "+ 7%",  amount: "$214,560" },
  { category: "Medical",       icon: "🏥", delta: "+ 23%", amount: "$169,992" },
];

function SavingsByDebtTypeRow({
  category,
  icon,
  delta,
  amount,
}: (typeof SAVINGS_BY_DEBT_TYPE)[number]) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {/* Rounded-square icon — replaces the avatar circle in the old
          per-member version. Same 24px footprint so the row height
          stays identical. */}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
        <span className="text-[11px] leading-none">{icon}</span>
      </span>
      <span className="flex-1 text-[12px] text-zinc-300">
        <span className="font-medium text-zinc-50">{category}</span>{" "}
        {/* Tiny green delta pill — sells "trend" without a chart. */}
        <span className="ml-1 inline-flex items-center rounded-full bg-emerald-400/10 px-1.5 py-px font-mono text-[10px] font-medium text-emerald-300">
          {delta}
        </span>
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
