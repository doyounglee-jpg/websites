import Link from "next/link";
import { MobileMenu } from "../components/MobileMenu";

/**
 * Clerkie /companies — Linear-style monochrome redesign.
 *
 * Audience: HR / People-Ops at companies looking to offer Clerkie as
 * an employee financial wellness benefit.
 *
 * Sections (in original clerkie.io/companies order):
 *   1. Nav
 *   2. Hero — "Help your community pay off their debt" + integration mockup
 *   3. § 01 — IMPACT — Member outcome stats + Metlife context
 *   4. § 02 — BENEFITS — Three core feature cards
 *   5. § 03 — RETURN — "Good for employees / Great for employers" + ROI panel
 *   6. § 04 — CONTEXT — "Consumer Debt has more than tripled" + savings rows
 *   7. § 05 — PRESS — Logo wall (Yahoo, Bloomberg, WSJ, Medium)
 *   8. CTA — "Paying off debt has never been easier" + contact form
 *   9. Footer
 *
 * All headlines/subheads from the original /companies page are preserved
 * verbatim. Only the layout, visuals, and color treatment have changed.
 */

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-[#08090A] text-zinc-50">
      {/* ============================================================
          1. NAV — hairline border, blurred dark background
         ============================================================ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08090A]/60 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10 sm:py-5 md:px-16">
          <div className="flex items-center gap-2.5">
            <LogoMark size={24} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clerkie-wordmark.svg"
              alt="Clerkie"
              className="h-[22px] w-auto"
            />
          </div>
          <div className="hidden items-center gap-9 md:flex">
            <NavLink href="/members">Members</NavLink>
            <NavLink href="/companies" active>
              Companies
            </NavLink>
          </div>
          {/* Desktop: single Request demo CTA. Hidden on mobile — hamburger drawer takes over. */}
          <div className="hidden md:flex">
            <a
              href="#cta"
              className="rounded-lg bg-zinc-50 px-3.5 py-2 text-[13px] font-medium tracking-[-0.005em] text-[#08090A]"
            >
              Request demo
            </a>
          </div>
          <MobileMenu
            activePath="companies"
            ctaLabel="Request demo"
            ctaHref="#cta"
          />
        </nav>
      </header>

      {/* ============================================================
          2. HERO — eyebrow pill, big headline, CTAs, integration mockup
         ============================================================ */}
      <section className="relative overflow-hidden">
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

        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 pb-12 pt-20 sm:gap-10 sm:px-10 sm:pb-16 sm:pt-28 md:px-16 md:pb-20 md:pt-[120px]">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5">
            <span className="rounded-full border border-white/20 bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em]">
              FOR COMPANIES
            </span>
            <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-300">
              An employee benefit your team will actually use →
            </span>
          </div>

          {/* Headline + subhead — verbatim from original site */}
          <div className="flex max-w-[1040px] flex-col items-center gap-7">
            <h1 className="text-center text-[44px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[60px] md:text-[72px] lg:leading-[1.0] lg:text-[88px]">
              Help your community pay off their debt.
            </h1>
            <p className="max-w-[680px] text-center text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 sm:text-lg lg:text-[19px]">
              Clerkie partners with employers, financial institutions, and
              unions to provide borrowers with personalized, data-driven
              repayment options.
            </p>
          </div>

          {/* CTAs — verbatim from original site */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#08090A]"
            >
              Request Demo
              <span className="text-zinc-500">→</span>
            </a>
            <a
              href="#impact"
              className="rounded-[10px] border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium tracking-[-0.005em]"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Integration mockup (centered with halo) */}
        <div className="relative z-10 flex justify-center px-6 pb-20 sm:px-10 sm:pb-24 md:px-16 md:pb-32">
          <div
            className="aurora-mono-tight pointer-events-none absolute left-1/2 top-[40px] h-[600px] w-[1100px] -translate-x-1/2"
            aria-hidden="true"
          />
          <IntegrationMockup />
        </div>
      </section>

      {/* ============================================================
          3. § 01 — IMPACT (member outcome metrics)
         ============================================================ */}
      <section id="impact" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          {/* Asymmetric header — stacks on mobile */}
          <div className="mb-12 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div className="flex max-w-[760px] flex-col gap-4 lg:gap-6">
              <SectionEyebrow>01 — IMPACT</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
                Members feel it.{" "}
                <span className="text-zinc-500">Employers see it.</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:max-w-[380px] lg:text-[17px]">
              According to Metlife, 1 out of every 3 employees admit to being
              less productive at work because of financial stress.
            </p>
          </div>

          {/* 4-up stat grid */}
          <div className="overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.06]">
            <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
              {IMPACT_STATS.map((stat) => (
                <ImpactStatCard key={stat.copy} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. § 02 — BENEFITS (three core features)
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="mb-10 flex max-w-[760px] flex-col gap-4 sm:gap-6 lg:mb-16">
            <SectionEyebrow>02 — BENEFITS</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              A simple and powerful solution{" "}
              <span className="text-zinc-500">for all debt.</span>
            </h2>
            <p className="max-w-[580px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Three things every employee gets from day one — no waiting period,
              no underwriting, no surprise fees.
            </p>
          </div>

          {/* 3-column feature grid */}
          <div className="overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.06]">
            <div className="grid grid-cols-1 gap-px md:grid-cols-3">
              {BENEFITS.map((b, i) => (
                <BenefitCard key={b.title} {...b} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. § 03 — RETURN (good for employees / great for employers)
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:flex-row lg:gap-20 lg:px-24 lg:pb-32 lg:pt-40">
          {/* Left: copy */}
          <div className="flex flex-col gap-6 pt-0 sm:gap-8 lg:max-w-[480px] lg:shrink-0 lg:pt-6">
            <SectionEyebrow>03 — RETURN</SectionEyebrow>
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
                "Rolls out in days — not quarters.",
                "Plugs into the HRIS and payroll stack you already run.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="block h-1 w-1 rounded-full bg-zinc-50" />
                  <span className="text-sm font-medium text-zinc-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#08090A]"
              >
                Request Demo
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>

          {/* Right: ROI dashboard mockup */}
          <RoiMockup />
        </div>
      </section>

      {/* ============================================================
          6. § 04 — CONTEXT (consumer debt + member testimonials)
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="mb-12 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div className="flex max-w-[760px] flex-col gap-4 lg:gap-6">
              <SectionEyebrow>04 — CONTEXT</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
                Consumer debt has{" "}
                <span className="text-zinc-500">more than tripled</span> over
                the past decade.
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:max-w-[380px] lg:text-[17px]">
              Crippling nearly every facet of borrowers&apos; lives. Many
              borrowers overwhelmed by student loans and credit card debt
              don&apos;t know their options, causing them to overpay and default
              on their loans. We&apos;re here to help.
            </p>
          </div>

          {/* Member testimonial / savings table — horizontal scroll on small viewports */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="min-w-[840px]">
            {/* Table header */}
            <div className="flex items-center border-b border-white/[0.06] bg-white/[0.015] px-6 py-3.5">
              <div className="w-14 shrink-0" />
              <span className="flex-1 text-xs font-medium tracking-[0.04em] text-zinc-500">
                MEMBER
              </span>
              <span className="w-[220px] shrink-0 text-xs font-medium tracking-[0.04em] text-zinc-500">
                EMPLOYER
              </span>
              <span className="w-[160px] shrink-0 text-xs font-medium tracking-[0.04em] text-zinc-500">
                DEBT TYPE
              </span>
              <span className="w-40 shrink-0 text-right text-xs font-medium tracking-[0.04em] text-zinc-500">
                SAVED
              </span>
            </div>
            {/* Rows */}
            {MEMBER_SAVINGS.map((row, i) => (
              <MemberSavingsRow
                key={row.id}
                {...row}
                isLast={i === MEMBER_SAVINGS.length - 1}
              />
            ))}
            {/* Footer (totals) */}
            <div className="flex items-center border-t border-white/[0.06] bg-white/[0.02] px-6 py-4">
              <div className="flex w-14 shrink-0 items-center">
                <span
                  className="block h-2 w-2 rounded-full bg-zinc-50"
                  style={{ boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
                />
              </div>
              <span className="flex-1 text-sm font-medium tracking-[-0.005em]">
                Average saved per enrolled employee
              </span>
              <span className="w-[220px] shrink-0 text-[13px] text-zinc-500">
                Across 240+ employer partners
              </span>
              <span className="w-[160px] shrink-0 text-[13px] text-zinc-500">
                All categories
              </span>
              <span className="w-40 shrink-0 text-right font-mono text-base font-semibold tracking-[-0.01em]">
                $4,820
              </span>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. § 05 — PRESS (logo wall)
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24 md:px-16 md:pb-28 md:pt-28 lg:px-24 lg:pb-32 lg:pt-32">
          <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
            <SectionEyebrow>05 — PRESS</SectionEyebrow>
            <h2 className="max-w-[640px] text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-[40px]">
              Featured across the financial press.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">
            {PRESS_LOGOS.map((p) => (
              <PressLogo key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CTA — Paying off debt has never been easier + contact form
         ============================================================ */}
      <section
        id="cta"
        className="relative overflow-hidden border-t border-white/[0.06]"
      >
        <div
          className="aurora-mono pointer-events-none absolute left-1/2 top-20 h-[600px] w-[1100px] -translate-x-1/2"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-6 pb-24 pt-28 text-center sm:gap-10 sm:px-10 sm:pb-32 sm:pt-36 md:px-16 md:pb-40 md:pt-48 lg:px-24">
          <div className="flex max-w-[760px] flex-col items-center gap-5 sm:gap-7">
            <h2 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.02]">
              Paying off debt has never been easier.
            </h2>
            <p className="max-w-[560px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 sm:text-lg lg:text-[19px]">
              Our plans make it easy for members to make the right money moves
              and take the first step toward financial health.
            </p>
          </div>

          {/* Contact form — "Bring Clerkie to your community" */}
          <ContactForm />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
            {["SOC 2 Type II", "256-bit encryption", "HRIS-ready"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="block h-1 w-1 rounded-full bg-zinc-50" />
                  <span className="text-[13px] font-medium text-zinc-400">
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          9. FOOTER
         ============================================================ */}
      <footer className="border-t border-white/[0.08] bg-[#08090A]/60">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 pb-12 pt-12 sm:px-10 sm:pt-16 md:px-16 lg:px-24">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between lg:gap-20">
            <div className="flex max-w-[320px] flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <LogoMark size={24} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clerkie-wordmark.svg"
                  alt="Clerkie"
                  className="h-[22px] w-auto"
                />
              </div>
              <p className="text-sm leading-[1.55] tracking-[-0.005em] text-zinc-500">
                A quieter way to handle the money side of life. Built for
                people, not credit-card algorithms.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 lg:flex lg:w-auto lg:gap-20">
              <FooterCol
                title="PRODUCT"
                links={[
                  { label: "For members", href: "/members" },
                  { label: "For lenders" },
                  { label: "For companies", href: "/companies", active: true },
                  { label: "Get the app" },
                ]}
              />
              <FooterCol
                title="COMPANY"
                links={[
                  { label: "About" },
                  { label: "Press" },
                  { label: "Careers" },
                  { label: "Support" },
                ]}
              />
              <FooterCol
                title="LEGAL"
                links={[
                  { label: "Privacy" },
                  { label: "Terms of Service" },
                  { label: "Do not sell my info" },
                  { label: "Disclosures" },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:gap-0 sm:pt-8">
            <span className="font-mono text-xs text-zinc-500">
              © 2025 Henry Labs Inc. · All rights reserved
            </span>
            <div className="flex items-center gap-2">
              <span
                className="block h-1.5 w-1.5 rounded-full bg-zinc-50"
                style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
              />
              <span className="text-xs font-medium text-zinc-400">
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
   HELPERS — small primitives reused across sections
   ============================================================ */

function NavLink({
  href = "#",
  children,
  active,
}: {
  href?: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-zinc-50 ${
        active ? "text-zinc-200" : "text-zinc-400"
      }`}
    >
      {children}
    </Link>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-medium tracking-[0.06em] text-zinc-400">
      {children}
    </span>
  );
}

function LogoMark({ size = 24 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/clerkie-logo.svg"
      alt="Clerkie"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}

/* ============================================================
   INTEGRATION MOCKUP (hero) — HRIS / payroll / benefits portal
   ============================================================ */

function IntegrationMockup() {
  return (
    <div className="relative z-20 flex w-[1040px] max-w-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#0C0D0F] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      {/* Top window chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="block h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-[11px] text-zinc-500">
            benefits.clerkie.io / acme-inc
          </span>
        </div>
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">
          ACME INC · 1,240 EMPLOYEES
        </span>
      </div>

      {/* Body — 3 columns */}
      <div className="grid grid-cols-1 gap-px bg-white/[0.06] md:grid-cols-3">
        {/* Col 1: Enrollment */}
        <div className="flex flex-col gap-4 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
              ENROLLMENT
            </span>
            <span className="font-mono text-[11px] text-zinc-500">Q2</span>
          </div>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.03em]">
            68<span className="text-zinc-500">%</span>
          </span>
          <span className="text-xs text-zinc-400">
            843 of 1,240 employees enrolled
          </span>
          <div className="relative mt-1 h-1.5 overflow-hidden rounded-[3px] bg-white/[0.06]">
            <span
              className="absolute left-0 top-0 h-full rounded-[3px]"
              style={{
                width: "68%",
                background:
                  "linear-gradient(90deg, #F7F8F8 0%, rgba(247,248,248,0.5) 100%)",
              }}
            />
          </div>
          <div className="mt-2 flex flex-col gap-2 border-t border-white/[0.06] pt-3.5 text-[12px]">
            <Row label="New this week" value="+ 18" />
            <Row label="Active sessions" value="312" />
            <Row label="Avg. enroll time" value="2m 14s" />
          </div>
        </div>

        {/* Col 2: HRIS sync feed */}
        <div className="flex flex-col gap-3.5 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
              HRIS · PAYROLL
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-0.5">
              <span className="block h-[5px] w-[5px] rounded-full bg-zinc-50" />
              <span className="font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">
                LIVE
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {INTEGRATIONS.map((it) => (
              <IntegrationRow key={it.code} {...it} />
            ))}
          </div>
        </div>

        {/* Col 3: Member outcome ticker */}
        <div className="flex flex-col gap-3.5 bg-[#0C0D0F] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
              MEMBER WINS · TODAY
            </span>
            <span className="font-mono text-[11px] text-zinc-500">04:21 PM</span>
          </div>
          <div className="flex flex-col gap-2">
            {MEMBER_WINS.map((w) => (
              <MemberWinRow key={w.name} {...w} />
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3.5">
            <span className="text-xs text-zinc-400">Saved this quarter</span>
            <span className="font-mono text-[15px] font-semibold tracking-[-0.01em]">
              $1,184,602
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const INTEGRATIONS: Array<{
  code: string;
  name: string;
  meta: string;
  status: string;
}> = [
  { code: "WD", name: "Workday", meta: "HRIS", status: "Synced 2m ago" },
  { code: "GS", name: "Gusto", meta: "Payroll", status: "Synced 6m ago" },
  { code: "AD", name: "ADP", meta: "Payroll", status: "Synced 14m ago" },
  { code: "RP", name: "Rippling", meta: "HRIS", status: "Synced 21m ago" },
  { code: "BB", name: "BambooHR", meta: "HRIS", status: "Synced 1h ago" },
];

function IntegrationRow({
  code,
  name,
  meta,
  status,
}: (typeof INTEGRATIONS)[number]) {
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
  { name: "M. Alvarez", action: "Negotiated card", amount: "+ $1,820" },
  { name: "J. Park", action: "Refi student loan", amount: "+ $4,260" },
  { name: "S. Cooper", action: "Settled medical", amount: "+ $740" },
  { name: "R. Singh", action: "Lowered APR", amount: "+ $2,140" },
];

function MemberWinRow({ name, action, amount }: (typeof MEMBER_WINS)[number]) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <span className="text-[9px] font-semibold">
          {name.split(" ").map((p) => p[0]).join("")}
        </span>
      </span>
      <span className="flex-1 text-[12px] text-zinc-300">
        <span className="font-medium text-zinc-50">{name}</span>{" "}
        <span className="text-zinc-500">· {action}</span>
      </span>
      <span className="font-mono text-[12px] font-medium">{amount}</span>
    </div>
  );
}

/* ============================================================
   IMPACT STATS — § 01
   ============================================================ */

const IMPACT_STATS: Array<{
  pct: string;
  copy: string;
}> = [
  {
    pct: "92%",
    copy: "say Clerkie has helped reduce or pay off debt",
  },
  {
    pct: "87%",
    copy: "more motivated at work knowing they have this benefit",
  },
  {
    pct: "84%",
    copy: "get out of debt faster and feel more in control with their money",
  },
  {
    pct: "78%",
    copy: "freed room in their budget and paid their bills on time",
  },
];

function ImpactStatCard({ pct, copy }: (typeof IMPACT_STATS)[number]) {
  return (
    <div className="flex min-h-[260px] flex-col justify-between gap-6 bg-[#0C0D0F] px-8 py-9">
      <span className="text-[64px] font-semibold leading-none tracking-[-0.04em]">
        {pct}
      </span>
      <span className="text-[15px] leading-[1.4] tracking-[-0.005em] text-zinc-400">
        {copy}
      </span>
    </div>
  );
}

/* ============================================================
   BENEFITS GRID — § 02
   ============================================================ */

const BENEFITS: Array<{
  title: string;
  desc: string;
  statLabel: string;
  statValue: string;
}> = [
  {
    title: "Financial Assistant",
    desc: "Every member gets access to a dedicated Financial Assistant who understands and inspires beyond a standalone app.",
    statLabel: "AVG. RESPONSE",
    statValue: "< 4 min",
  },
  {
    title: "Instant Debt Reductions",
    desc: "Our automated platform gives members access to instant debt negotiation savings for their credit cards and student loans.",
    statLabel: "AVG. SAVED",
    statValue: "$3,820",
  },
  {
    title: "Access Emergency Cash",
    desc: "As members, you get access to responsible solutions to address your urgent money needs and avoid payday loans.",
    statLabel: "AVG. ADVANCE",
    statValue: "$342",
  },
];

function BenefitCard({
  title,
  desc,
  statLabel,
  statValue,
  index,
}: (typeof BENEFITS)[number] & { index: number }) {
  return (
    <div className="flex min-h-[300px] flex-col gap-6 bg-[#0C0D0F] px-8 py-9">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <BenefitIcon index={index} />
        </div>
        <span className="font-mono text-[11px] tracking-[0.04em] text-zinc-500">
          0{index}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        <span className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
          {title}
        </span>
        <span className="text-sm leading-[1.55] tracking-[-0.005em] text-zinc-400">
          {desc}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-[11px] font-medium tracking-[0.04em] text-zinc-500">
          {statLabel}
        </span>
        <span className="font-mono text-[14px] font-medium">{statValue}</span>
      </div>
    </div>
  );
}

/**
 * Three glyphs for the three benefits. Pure B&W — no colored shapes.
 */
function BenefitIcon({ index }: { index: number }) {
  if (index === 1) {
    // Person / chat bubble glyph
    return (
      <div className="relative flex h-5 w-5 items-end justify-center">
        <span className="absolute top-0 block h-2 w-2 rounded-full bg-white/70" />
        <span className="block h-3 w-4 rounded-t-[6px] bg-white/40" />
      </div>
    );
  }
  if (index === 2) {
    // Stacked bars / reduction glyph
    return (
      <div className="flex h-5 w-5 items-end justify-between">
        <span className="block h-4 w-1 rounded-sm bg-white/70" />
        <span className="block h-3 w-1 rounded-sm bg-white/55" />
        <span className="block h-2 w-1 rounded-sm bg-white/40" />
        <span className="block h-1 w-1 rounded-sm bg-white/30" />
      </div>
    );
  }
  // index 3 — circle (coin / cash)
  return (
    <div className="flex h-5 w-5 items-center justify-center">
      <span className="block h-4 w-4 rounded-full border-2 border-white/60" />
    </div>
  );
}

/* ============================================================
   ROI MOCKUP — § 03
   ============================================================ */

function RoiMockup() {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-[18px] border border-white/10 bg-[#0C0D0F] p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Employer ROI · last 12 months
          </span>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">
            ACME INC
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/[0.06] bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium">
            12M
          </span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">
            6M
          </span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">
            QTR
          </span>
        </div>
      </div>

      {/* Two big stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
            RETENTION LIFT
          </span>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.04em]">
            +14<span className="text-zinc-500">.2%</span>
          </span>
          <span className="text-[12px] text-zinc-400">
            vs. control cohort, year 1
          </span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
            STRESS REDUCTION
          </span>
          <span className="text-[40px] font-semibold leading-none tracking-[-0.04em]">
            −32<span className="text-zinc-500">%</span>
          </span>
          <span className="text-[12px] text-zinc-400">
            self-reported, 6-month survey
          </span>
        </div>
      </div>

      {/* Sparkline / trend strip */}
      <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
            ENROLLMENT GROWTH
          </span>
          <span className="font-mono text-[11px] text-zinc-300">↑ 28% MoM</span>
        </div>
        <Sparkline />
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
          <span>JAN</span>
          <span>APR</span>
          <span>JUL</span>
          <span>OCT</span>
          <span>DEC</span>
        </div>
      </div>

      {/* Bottom rows */}
      <div className="flex flex-col gap-0">
        {[
          { label: "Productive hours recovered / employee / yr", value: "62" },
          { label: "Avg. time to first member win", value: "11 days" },
          { label: "Cost to employer per employee / yr", value: "$8.40" },
        ].map((r, i) => (
          <div
            key={r.label}
            className={`flex items-center justify-between border-t border-white/[0.06] py-3.5 ${
              i === 2 ? "border-b" : ""
            }`}
          >
            <span className="text-sm font-medium text-zinc-300">{r.label}</span>
            <span className="font-mono text-[13px] font-medium">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Tiny inline SVG sparkline rendered in pure white. No color.
 */
function Sparkline() {
  // Stylized monotonic-ish growth curve.
  const points = [
    [0, 38],
    [40, 34],
    [80, 30],
    [120, 28],
    [160, 22],
    [200, 19],
    [240, 16],
    [280, 11],
    [320, 9],
    [360, 6],
  ];
  const path = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  return (
    <svg viewBox="0 0 360 48" className="h-12 w-full" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="rgba(247,248,248,0.85)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Soft baseline */}
      <line
        x1="0"
        x2="360"
        y1="46"
        y2="46"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ============================================================
   MEMBER SAVINGS TABLE — § 04
   ============================================================ */

const MEMBER_SAVINGS: Array<{
  id: string;
  initials: string;
  name: string;
  employer: string;
  category: string;
  saved: string;
}> = [
  {
    id: "ma",
    initials: "MA",
    name: "M. Alvarez",
    employer: "Acme Inc · Operations",
    category: "Student Loans",
    saved: "$14,278",
  },
  {
    id: "jp",
    initials: "JP",
    name: "J. Park",
    employer: "Northwind Co · Engineering",
    category: "Credit Cards",
    saved: "$2,343",
  },
  {
    id: "sc",
    initials: "SC",
    name: "S. Cooper",
    employer: "Lumen Health · Nursing",
    category: "Medical Debt",
    saved: "$22,389",
  },
  {
    id: "rs",
    initials: "RS",
    name: "R. Singh",
    employer: "Atlas Logistics · Drivers",
    category: "Auto Loan",
    saved: "$1,220",
  },
];

function MemberSavingsRow({
  initials,
  name,
  employer,
  category,
  saved,
  isLast,
}: (typeof MEMBER_SAVINGS)[number] & { isLast: boolean }) {
  return (
    <div
      className={`flex items-center px-6 py-4.5 ${
        isLast ? "" : "border-b border-white/[0.05]"
      }`}
    >
      <div className="w-14 shrink-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
          <span className="text-[11px] font-semibold">{initials}</span>
        </span>
      </div>
      <span className="flex-1 text-[15px] font-medium tracking-[-0.01em]">
        {name}
      </span>
      <span className="w-[220px] shrink-0 text-sm text-zinc-400">
        {employer}
      </span>
      <span className="w-[160px] shrink-0 text-sm text-zinc-400">
        {category}
      </span>
      <div className="flex w-40 shrink-0 items-center justify-end gap-2">
        <span className="font-mono text-[15px] font-medium">{saved}</span>
      </div>
    </div>
  );
}

/* ============================================================
   PRESS LOGO WALL — § 05
   ============================================================ */

const PRESS_LOGOS: Array<{ name: string; mark: string }> = [
  { name: "Yahoo", mark: "Yahoo!" },
  { name: "Bloomberg", mark: "Bloomberg" },
  { name: "Wall Street Journal", mark: "WSJ" },
  { name: "Medium", mark: "Medium" },
];

function PressLogo({ name, mark }: (typeof PRESS_LOGOS)[number]) {
  return (
    <div className="flex h-[140px] items-center justify-center bg-[#0C0D0F]">
      <span className="text-[22px] font-semibold tracking-[-0.02em] text-zinc-300">
        {mark}
      </span>
      <span className="sr-only">{name}</span>
    </div>
  );
}

/* ============================================================
   CONTACT FORM — final CTA
   ============================================================ */

function ContactForm() {
  return (
    <div className="relative w-full max-w-[720px] overflow-hidden rounded-[18px] border border-white/10 bg-[#101113]/80 p-8 backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 text-left">
        <span className="text-xs font-medium tracking-[0.06em] text-zinc-500">
          BRING CLERKIE TO YOUR COMMUNITY
        </span>
        <span className="text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]">
          Give your members the best tools to get out of debt and manage their
          money.
        </span>
        <span className="text-[13px] text-zinc-400">
          Give your employees a benefit they love! Fill out the form below to
          start a conversation.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Full name" placeholder="Jane Cooper" />
        <FormField label="Work email" placeholder="jane@acme.com" />
        <FormField label="Company" placeholder="Acme Inc" />
        <FormField label="Headcount" placeholder="500 – 1,000" />
        <div className="md:col-span-2">
          <FormField
            label="What are you hoping to solve?"
            placeholder="We'd like to roll out Clerkie to ~800 employees in Q3…"
            multiline
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[12px] text-zinc-500">
          We&apos;ll get back to you within one business day.
        </span>
        <button className="flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-2.5 text-sm font-medium tracking-[-0.005em] text-[#08090A]">
          Send
          <span className="text-zinc-500">→</span>
        </button>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  multiline,
}: {
  label: string;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-zinc-500">
        {label.toUpperCase()}
      </span>
      <span
        className={`flex items-start rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-[13px] tracking-[-0.005em] text-zinc-500 ${
          multiline ? "min-h-[88px]" : ""
        }`}
      >
        {placeholder}
      </span>
    </label>
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

/* ============================================================
   FOOTER COLUMN
   ============================================================ */

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; active?: boolean; href?: string }>;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-xs font-medium tracking-[0.06em] text-zinc-600">
        {title}
      </span>
      {links.map((l) =>
        l.href ? (
          <Link
            key={l.label}
            href={l.href}
            className={`text-sm font-medium transition-colors hover:text-zinc-50 ${
              l.active ? "text-zinc-200" : "text-zinc-500"
            }`}
          >
            {l.label}
          </Link>
        ) : (
          <span
            key={l.label}
            className={`text-sm font-medium ${
              l.active ? "text-zinc-200" : "text-zinc-500"
            }`}
          >
            {l.label}
          </span>
        ),
      )}
    </div>
  );
}
