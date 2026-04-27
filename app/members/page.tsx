import Link from "next/link";
import { MobileMenu } from "../components/MobileMenu";

/**
 * Clerkie /members — Linear-style monochrome redesign.
 *
 * This is a 1:1 translation of the Paper design at:
 *   app.paper.design/file/01KQ7GJ645FE0CVZRNQ1YDX8GR
 *
 * Sections are in the same order as clerkie.io/members:
 *   1. Nav
 *   2. Hero (headline + phone mockup)
 *   3. § 01 — Negotiation table ("Crush your debt by up to 70%")
 *   4. § 02 — AI Q&A chat ("Real answers. Anytime. Anywhere.")
 *   5. § 03 — Categories grid ("Every kind of debt. One quiet app.")
 *   6. § 04 — Bills dashboard ("Every bill, paid on time")
 *   7. § 05 — Safety net ("When the month is hard, we've got you")
 *   8. CTA ("Try it out.") + App Store / Play Store
 *   9. Footer
 *
 * Color palette (B&W theme):
 *   - Ground:        #08090A  → bg-[#08090A]
 *   - Surface:       rgba(255,255,255,0.03–0.06)  → bg-white/5
 *   - Hairline:      rgba(255,255,255,0.06–0.1)   → border-white/10
 *   - Text primary:  #F7F8F8                       → text-zinc-50
 *   - Text muted:    rgba(247,248,248,0.55)        → text-zinc-400
 *   - Text dim:      rgba(247,248,248,0.4)         → text-zinc-500
 */

export default function MembersPage() {
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
            <NavLink href="/members" active>
              Members
            </NavLink>
            <NavLink href="/companies">Companies</NavLink>
          </div>
          {/* Desktop: single Get the App CTA. Hidden on mobile — hamburger drawer takes over. */}
          <div className="hidden md:flex">
            <a
              href="#cta"
              className="rounded-lg bg-zinc-50 px-3.5 py-2 text-[13px] font-medium tracking-[-0.005em] text-[#08090A]"
            >
              Get the App
            </a>
          </div>
          <MobileMenu activePath="members" ctaLabel="Get the App" ctaHref="#cta" />
        </nav>
      </header>

      {/* ============================================================
          2. HERO — eyebrow pill, big headline, CTAs, phone mockup
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
              NEW
            </span>
            <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-300">
              Negotiate any debt with one tap →
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
              className="flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-sm font-medium tracking-[-0.005em] text-[#08090A]"
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
          <PhoneMockup />
        </div>
      </section>

      {/* ============================================================
          3. § 01 — NEGOTIATION TABLE
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          {/* Asymmetric header — stacks on mobile, side-by-side on desktop */}
          <div className="mb-12 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div className="flex max-w-[720px] flex-col gap-4 lg:gap-6">
              <SectionEyebrow>01 — NEGOTIATION</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
                Crush your debt by up to{" "}
                <span className="text-zinc-500">70%.</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:max-w-[360px] lg:text-[17px]">
              Our team negotiates directly with your lenders, on your behalf,
              to lower what you owe — fast and without the paperwork.
            </p>
          </div>

          {/* Savings table — horizontal scroll on small viewports */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="min-w-[820px]">
            {/* Table header */}
            <div className="flex items-center border-b border-white/[0.06] bg-white/[0.015] px-6 py-3.5">
              <div className="w-14 shrink-0" />
              <span className="flex-1 text-xs font-medium tracking-[0.04em] text-zinc-500">
                DEBT TYPE
              </span>
              <span className="w-[220px] shrink-0 text-xs font-medium tracking-[0.04em] text-zinc-500">
                LENDER
              </span>
              <span className="w-[140px] shrink-0 text-right text-xs font-medium tracking-[0.04em] text-zinc-500">
                ORIGINAL
              </span>
              <span className="w-40 shrink-0 text-right text-xs font-medium tracking-[0.04em] text-zinc-500">
                SAVED
              </span>
            </div>
            {/* Rows */}
            {SAVINGS_ROWS.map((row, i) => (
              <SavingsRow
                key={row.id}
                {...row}
                isLast={i === SAVINGS_ROWS.length - 1}
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
                Total saved across all members this quarter
              </span>
              <span className="w-[220px] shrink-0 text-[13px] text-zinc-500">
                62,418 negotiations
              </span>
              <span className="w-[140px] shrink-0 text-right font-mono text-sm text-zinc-500">
                $148,420,602
              </span>
              <span className="w-40 shrink-0 text-right font-mono text-base font-semibold tracking-[-0.01em]">
                $78,649,338
              </span>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. § 02 — AI Q&A
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:flex-row lg:gap-20 lg:px-24 lg:pb-32 lg:pt-40">
          {/* Left: copy */}
          <div className="flex flex-col gap-6 pt-0 sm:gap-8 lg:max-w-[460px] lg:shrink-0 lg:pt-6">
            <SectionEyebrow>02 — INTELLIGENCE</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              Real answers. Anytime. Anywhere.
            </h2>
            <p className="text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Clerkie pairs your full financial picture with a private AI
              advisor. Ask anything — debt, credit, budgeting, big-purchase
              decisions — and get an answer grounded in your actual numbers.
            </p>
            <ul className="flex flex-col gap-3.5 pt-2">
              {[
                "Trained on your accounts, not strangers'.",
                "Routes to a human specialist when stakes are high.",
                "No upselling, no commissions, no jargon.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="block h-1 w-1 rounded-full bg-zinc-50" />
                  <span className="text-sm font-medium text-zinc-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: chat mockup */}
          <ChatMockup />
        </div>
      </section>

      {/* ============================================================
          5. § 03 — CATEGORIES GRID
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="mb-10 flex max-w-[720px] flex-col gap-4 sm:gap-6 lg:mb-16">
            <SectionEyebrow>03 — COVERAGE</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              Every kind of debt.{" "}
              <span className="text-zinc-500">One quiet app.</span>
            </h2>
            <p className="max-w-[540px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
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
          6. § 04 — BILLS DASHBOARD
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:flex-row lg:gap-20 lg:px-24 lg:pb-32 lg:pt-40">
          <BillsMockup />
          <div className="flex flex-col gap-6 pt-0 sm:gap-8 lg:max-w-[460px] lg:shrink-0 lg:pt-6">
            <SectionEyebrow>04 — BILL CONTROL</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[52px] lg:text-[56px]">
              Every bill, paid on time. Without thinking about it.
            </h2>
            <p className="text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:text-[17px]">
              Connect your accounts once. Clerkie keeps track of due dates,
              builds your credit with on-time payments, and tells you the
              moment something feels off.
            </p>
            <div className="flex flex-col gap-4 pt-2">
              {[
                "Auto-pay across every account",
                "On-time history reported to bureaus",
                "Anomaly alerts before you overdraft",
              ].map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center justify-between border-t border-white/[0.06] py-3.5 ${
                    i === 2 ? "border-b" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-zinc-300">
                    {item}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. § 05 — SAFETY NET
         ============================================================ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 md:px-16 md:pb-28 md:pt-32 lg:px-24 lg:pb-32 lg:pt-40">
          <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
            <div className="flex max-w-[720px] flex-col gap-4 lg:gap-6">
              <SectionEyebrow>05 — SAFETY NET</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.02]">
                When the month is hard,{" "}
                <span className="text-zinc-500">we&apos;ve got you.</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 lg:max-w-[360px] lg:text-[17px]">
              Borrow up to your verified buffer instantly — no credit pull, no
              spiraling fees. Pay it back on your next deposit.
            </p>
          </div>

          {/* Two columns: stat block (left) + notification stack (right).
              Stacks on mobile. The notif column gets ~1.5x weight so the
              richer content area dominates while the stat stays readable. */}
          <div className="relative flex flex-col items-stretch gap-6 py-8 lg:flex-row lg:gap-10 lg:py-15">
            <div
              className="aurora-mono-tight pointer-events-none absolute left-1/2 top-[30px] h-[380px] w-[800px] -translate-x-1/2"
              aria-hidden="true"
            />
            <SafetyStatBlock label="YOUR INSTANT BUFFER" value="$1,200">
              <div className="h-px bg-white/[0.06]" />
              <dl className="flex flex-col gap-2.5 text-[13px]">
                <Row label="Repayment" value="Next paycheck" />
                <Row label="Fee" value="$0" />
                <Row label="Credit pull" value="None" />
              </dl>
              <p className="pt-2 text-[13px] leading-[1.55] tracking-[-0.005em] text-zinc-400">
                The average advance is $342, fully repaid within 17 days — no
                spiral into payday debt.
              </p>
            </SafetyStatBlock>

            <div className="relative z-10 flex flex-col gap-3 lg:flex-[1.5]">
              <NotifHot />
              <NotifCalm
                eyebrow="REPAID FROM PAYCHECK"
                meta="2d ago"
                body="$84.00 buffer repaid automatically. Your buffer is fully restored."
              />
              <NotifCalm
                eyebrow="BUFFER GREW"
                meta="1w ago"
                body="Two on-time months of payments unlocked an extra $200. You can now borrow up to $1,200."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CTA — Try it out + App Store / Play Store
         ============================================================ */}
      <section
        id="cta"
        className="relative overflow-hidden border-t border-white/[0.06]"
      >
        <div
          className="aurora-mono pointer-events-none absolute left-1/2 top-20 h-[500px] w-[1100px] -translate-x-1/2"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-6 px-6 pb-24 pt-28 text-center sm:gap-8 sm:px-10 sm:pb-32 sm:pt-36 md:px-16 md:pb-40 md:pt-48 lg:px-24">
          <h2 className="text-[44px] font-semibold leading-none tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[80px]">
            Try it out.
          </h2>
          <p className="max-w-[480px] text-base leading-[1.55] tracking-[-0.005em] text-zinc-400 sm:text-lg lg:text-[19px]">
            Free to start. No credit pull. Cancel anytime. Two minutes to your
            first plan.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <AppStoreButton variant="apple" />
            <AppStoreButton variant="google" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 sm:pt-6">
            {["FDIC partners", "SOC 2 Type II", "256-bit encryption"].map(
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
                  { label: "For members", href: "/members", active: true },
                  { label: "For lenders" },
                  { label: "For companies", href: "/companies" },
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-100">{value}</dd>
    </div>
  );
}

/* ============================================================
   PHONE MOCKUP (hero)
   ============================================================ */

function PhoneMockup() {
  return (
    <div className="relative z-20 flex h-[700px] w-[340px] flex-col rounded-[44px] border border-white/10 bg-[#101113] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
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
   SAVINGS TABLE — § 01
   ============================================================ */

const SAVINGS_ROWS = [
  {
    id: "sl",
    code: "SL",
    type: "Student Loans",
    lender: "Sallie Mae · Federal",
    original: "$58,402",
    saved: "$40,558",
    pct: "−69%",
  },
  {
    id: "cc1",
    code: "CC",
    type: "Credit Cards",
    lender: "Capital One · Discover",
    original: "$16,203",
    saved: "$11,250",
    pct: "−31%",
  },
  {
    id: "pl",
    code: "PL",
    type: "Personal Loan",
    lender: "LendingClub",
    original: "$7,940",
    saved: "$5,464",
    pct: "−31%",
  },
  {
    id: "md",
    code: "MD",
    type: "Medical Debt",
    lender: "Mt Sinai Hospital",
    original: "$9,160",
    saved: "$7,253",
    pct: "−21%",
  },
  {
    id: "al",
    code: "AL",
    type: "Auto Loan",
    lender: "Ally Bank",
    original: "$4,840",
    saved: "$3,724",
    pct: "−23%",
  },
  {
    id: "cc2",
    code: "CC",
    type: "Credit Cards",
    lender: "Chase Sapphire",
    original: "$14,820",
    saved: "$10,390",
    pct: "−30%",
  },
];

function SavingsRow({
  code,
  type,
  lender,
  original,
  saved,
  pct,
  isLast,
}: {
  code: string;
  type: string;
  lender: string;
  original: string;
  saved: string;
  pct: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex items-center px-6 py-4.5 ${
        isLast ? "" : "border-b border-white/[0.05]"
      }`}
    >
      <div className="w-14 shrink-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.05]">
          <span className="text-[13px] font-semibold">{code}</span>
        </span>
      </div>
      <span className="flex-1 text-[15px] font-medium tracking-[-0.01em]">
        {type}
      </span>
      <span className="w-[220px] shrink-0 text-sm text-zinc-400">
        {lender}
      </span>
      <span className="w-[140px] shrink-0 text-right font-mono text-sm text-zinc-400">
        {original}
      </span>
      <div className="flex w-40 shrink-0 items-center justify-end gap-2">
        <span className="font-mono text-[15px] font-medium">{saved}</span>
        <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-medium tracking-[0.02em] text-zinc-300">
          {pct}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   CHAT MOCKUP — § 02
   ============================================================ */

function ChatMockup() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#101113]/60 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4.5 py-3.5">
        <div className="flex items-center gap-2">
          <LogoMark size={24} />
          <span className="text-[13px] font-semibold tracking-[-0.005em]">
            Clerkie AI
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-0.5">
            <span className="block h-[5px] w-[5px] rounded-full bg-zinc-50" />
            <span className="text-[10px] font-medium tracking-[0.04em] text-zinc-300">
              ONLINE
            </span>
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500">⌘K</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-6 py-6">
        {/* User message */}
        <div className="flex justify-end pl-20">
          <div className="rounded-[16px_16px_4px_16px] border border-white/[0.06] bg-white/[0.06] px-4 py-3">
            <span className="text-sm leading-[1.5] tracking-[-0.005em]">
              What&apos;s the fastest way for me to get out of debt?
            </span>
          </div>
        </div>

        {/* AI message */}
        <div className="flex flex-col items-start gap-2.5 pr-15">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="text-xs font-medium tracking-[0.02em] text-zinc-500">
              CLERKIE · ANALYZED 4 ACCOUNTS
            </span>
          </div>
          <p className="text-sm leading-[1.55] tracking-[-0.005em]">
            Based on your balances, the avalanche method saves you the most:{" "}
            <span className="font-medium text-zinc-50">
              $2,118 in interest
            </span>{" "}
            over 24 months.
          </p>

          {/* Reasoning card */}
          <div className="flex w-full flex-col gap-2.5 rounded-xl border border-white/10 bg-[#08090A]/60 px-4 py-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-[0.04em] text-zinc-500">
                SUGGESTED ORDER
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                payoff plan · v2
              </span>
            </div>
            {STEP_ROWS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <span className="w-5 font-mono text-[11px] font-medium text-zinc-500">
                  {i + 1}.
                </span>
                <div className="flex flex-1 items-center gap-2.5">
                  <span className="text-[13px] font-medium">{step.label}</span>
                  <span className="rounded bg-white/[0.06] px-1.5 py-px font-mono text-[10px] font-medium text-zinc-300">
                    {step.apr}
                  </span>
                </div>
                <span className="font-mono text-[13px] text-zinc-400">
                  {step.balance}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded-lg border border-white/[0.06] bg-white/[0.06] px-3 py-1.5 text-xs font-medium">
              Apply this plan
            </span>
            <span className="px-3 py-1.5 text-xs font-medium text-zinc-400">
              Show snowball instead
            </span>
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 px-6 pb-4">
        {[
          "How do I improve my credit to buy a house?",
          "Negotiate my medical debt?",
          "Pay off my student loans",
        ].map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-zinc-300"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2.5 border-t border-white/[0.06] bg-[#08090A]/40 px-4.5 py-3.5">
        <span className="flex-1 text-sm tracking-[-0.005em] text-zinc-600">
          Ask anything about your money…
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-zinc-600">↵</span>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-50 text-sm font-semibold text-[#08090A]">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

const STEP_ROWS = [
  { label: "Capital One", apr: "24.9% APR", balance: "$4,200" },
  { label: "Personal loan", apr: "14.2% APR", balance: "$5,464" },
  { label: "Sallie Mae", apr: "5.8% APR", balance: "$40,558" },
];

/* ============================================================
   CATEGORIES GRID — § 03
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
          <div className="absolute left-0 top-1 h-[3px] w-full bg-[#08090A]/40" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
          {title}
        </span>
        <span className="text-sm leading-[1.55] tracking-[-0.005em] text-zinc-400">
          {desc}
        </span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-zinc-500">
          {statLabel}
        </span>
        <span className="font-mono text-[13px] font-medium">{statValue}</span>
      </div>
    </div>
  );
}

/* ============================================================
   BILLS DASHBOARD — § 04
   ============================================================ */

function BillsMockup() {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-[18px] border border-white/10 bg-[#0C0D0F] p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            This month&apos;s bills
          </span>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] text-zinc-300">
            8 PAID · 3 SCHEDULED
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/[0.06] bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium">
            Apr
          </span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">
            May
          </span>
          <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-500">
            Jun
          </span>
        </div>
      </div>

      {/* List — horizontal scroll on small viewports preserves alignment */}
      <div className="-mx-3 overflow-x-auto px-3 sm:-mx-7 sm:px-7">
        <div className="flex min-w-[560px] flex-col">
          {BILL_ROWS.map((row) => (
            <BillRow key={row.code + row.name} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BILL_ROWS: Array<{
  code: string;
  name: string;
  meta: string;
  status: string;
  amount: string;
  alert?: boolean;
  alertNote?: string;
  faded?: boolean;
}> = [
  {
    code: "PG&E",
    name: "Pacific Gas & Electric",
    meta: "Utilities · Auto-pay",
    status: "Paid Apr 12",
    amount: "$142.80",
  },
  {
    code: "VZ",
    name: "Verizon Wireless",
    meta: "Phone · Auto-pay",
    status: "Paid Apr 14",
    amount: "$84.00",
  },
  {
    code: "RT",
    name: "Rent · 245 Mission St",
    meta: "⚠ Up 6.4% from March — review?",
    status: "Due May 1",
    amount: "$2,450.00",
    alert: true,
  },
  {
    code: "SF",
    name: "Sallie Mae",
    meta: "Student Loan · Auto-pay",
    status: "Scheduled May 5",
    amount: "$262.40",
    faded: true,
  },
  {
    code: "CL",
    name: "Capital One",
    meta: "Credit Card · Min payment",
    status: "Scheduled May 9",
    amount: "$184.00",
    faded: true,
  },
];

function BillRow({
  code,
  name,
  meta,
  status,
  amount,
  alert,
  faded,
}: (typeof BILL_ROWS)[number]) {
  return (
    <div
      className={`flex items-center border-b border-white/[0.06] py-3.5 ${
        alert ? "rounded-lg bg-white/[0.04] px-2" : ""
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-white/10 bg-white/5">
        <span className="text-[11px] font-semibold">{code}</span>
      </span>
      <div className="flex flex-1 flex-col gap-0.5 pl-3.5">
        <span className="text-sm font-medium">{name}</span>
        <span className={`text-xs ${alert ? "text-zinc-300" : "text-zinc-500"}`}>
          {meta}
        </span>
      </div>
      <div className="flex w-[110px] shrink-0 items-center gap-1.5">
        <span
          className={`block h-1.5 w-1.5 rounded-full ${
            faded ? "bg-zinc-600" : "bg-zinc-50"
          }`}
        />
        <span className="text-xs font-medium text-zinc-300">{status}</span>
      </div>
      <span className="w-[90px] shrink-0 text-right font-mono text-[13px] font-medium">
        {amount}
      </span>
    </div>
  );
}

/* ============================================================
   SAFETY NET — § 05
   ============================================================ */

function SafetyStatBlock({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex flex-1 flex-col gap-4.5 rounded-[18px] border border-white/10 bg-[#101113]/60 p-8 backdrop-blur">
      <span className="text-xs font-medium tracking-[0.04em] text-zinc-500">
        {label}
      </span>
      <span className="text-[56px] font-semibold leading-none tracking-[-0.04em]">
        {value}
      </span>
      {children}
    </div>
  );
}

function NotifHot() {
  return (
    <div className="flex flex-col gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.04] p-4.5">
      <div className="flex items-center gap-2">
        <LogoMark size={22} />
        <span className="text-[11px] font-medium tracking-[0.04em] text-zinc-300">
          CLERKIE · NOW
        </span>
      </div>
      <span className="text-sm font-medium leading-[1.45] tracking-[-0.005em]">
        Your rent payment is $84 short on Friday. Want me to cover it from
        your buffer until your paycheck lands Monday?
      </span>
      <div className="flex gap-2 pt-1">
        <span className="rounded-lg bg-zinc-50 px-3 py-1.5 text-xs font-medium text-[#08090A]">
          Yes, cover it
        </span>
        <span className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300">
          Not now
        </span>
      </div>
    </div>
  );
}

function NotifCalm({
  eyebrow,
  meta,
  body,
}: {
  eyebrow: string;
  meta: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-4.5 py-4">
      {/* Past notification — dim the logo so it reads as quieter than NotifHot */}
      <span className="shrink-0 opacity-60">
        <LogoMark size={22} />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <span className="text-xs font-medium tracking-[0.02em] text-zinc-500">
            {eyebrow}
          </span>
          <span className="font-mono text-[11px] text-zinc-500">{meta}</span>
        </div>
        <span className="text-[13px] font-medium leading-[1.45] tracking-[-0.005em] text-zinc-200">
          {body}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   APP STORE BUTTONS
   ============================================================ */

function AppStoreButton({ variant }: { variant: "apple" | "google" }) {
  if (variant === "apple") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-5.5 py-3.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#08090A]" />
        <div className="flex flex-col">
          <span className="text-[11px] font-normal tracking-[0.02em] text-[#08090A]/60">
            Download on the
          </span>
          <span className="text-base font-semibold tracking-[-0.01em] text-[#08090A]">
            App Store
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-5.5 py-3.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-50 text-sm font-semibold text-[#08090A]">
        ▶
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-normal tracking-[0.02em] text-zinc-400">
          Get it on
        </span>
        <span className="text-base font-semibold tracking-[-0.01em]">
          Google Play
        </span>
      </div>
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
