import Link from "next/link";

/**
 * /members-v2 — Cleo-inspired bento + cinematic photography direction.
 *
 * This is a parallel design exploration alongside the main /members page.
 * Reference: web.meetcleo.com — full-bleed photographic backgrounds,
 * floating phone mockups, glassy pill nav/CTAs, alternating full-bleed
 * features + bento pairs.
 *
 * Photos: Unsplash hot-linked CDN URLs (prototype-only — swap for licensed
 * assets before launch). All photos chosen to evoke Cleo's warm, naturalistic,
 * golden-hour mood.
 *
 * Sections:
 *   1. Floating pill nav (glassy, centered)
 *   2. Hero — full-bleed cinematic landscape + floating phone mockup
 *   3. § 01 — Full-bleed feature ("Clerkie gets to know you (and your debt)")
 *   4. § 02 — Bento pair (warm portrait photo / green chat panel)
 *   5. § 03 — Full-bleed feature ("Introducing one-tap negotiation")
 *   6. § 04 — Bento pair (bills dashboard / warm testimonial photo)
 *   7. CTA — final bento with photo + signup
 *   8. Footer
 *
 * Color palette:
 *   - Page bg:       #F7F5F0  (warm off-white between sections)
 *   - Dark text:     #1A1410  (warm near-black, not pure black)
 *   - Muted text:    #6B5F56  (warm gray)
 *   - Accent (chat): #E5DDD2  (warm beige for chat bubbles)
 */

// Unsplash photo URLs — chosen for cinematic golden-hour / warm naturalistic mood
const PHOTOS = {
  heroLandscape:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
  feature1Backdrop:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80",
  bentoPortrait:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
  feature2Portrait:
    "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=2400&q=80",
  testimonialPortrait:
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1600&q=80",
  ctaBackdrop:
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=2400&q=80",
};

export default function MembersV2Page() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#1A1410]">
      {/* ============================================================
          1. FLOATING PILL NAV — glassy, centered top
         ============================================================ */}
      <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-1 rounded-full border border-white/40 bg-white/30 px-2 py-1.5 backdrop-blur-md">
          <PillNavLink href="/members-v2" active>
            Members
          </PillNavLink>
          <PillNavLink href="/companies">Companies</PillNavLink>
          <PillNavLink href="#">About</PillNavLink>
        </nav>
      </header>

      {/* Logo top-left + CTA top-right (also floating, glassy) */}
      <div className="fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-4 py-2 backdrop-blur-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/clerkie-wordmark.svg"
          alt="Clerkie"
          className="h-[18px] w-auto invert"
        />
      </div>
      <div className="fixed top-5 right-5 z-50">
        <a
          href="#cta"
          className="flex items-center rounded-full border border-white/40 bg-white/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md"
        >
          Get the App
        </a>
      </div>

      <div className="flex flex-col gap-3 p-3">
      {/* ============================================================
          2. HERO — full-bleed cinematic landscape + floating phone
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.heroLandscape}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle warm tint overlay to harmonize with brand */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20" />

        {/* Floating phone mockup */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <PhoneMockup variant="hero" />
        </div>
      </section>

      {/* ============================================================
          3. § 01 — FULL-BLEED FEATURE ("Clerkie gets to know you")
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* Background photo (blurred outdoor mood) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.feature1Backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/0" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-10 md:px-16">
          <div className="flex max-w-[480px] flex-col gap-6">
            <span className="text-[11px] font-medium tracking-[0.18em] text-white/90">
              REAL HUMAN HELP
            </span>
            <h2 className="text-[56px] font-medium leading-[1.05] tracking-[-0.025em] text-white">
              Clerkie gets to know you <span className="text-white/60">(and your debt).</span>
            </h2>
          </div>

          {/* Big phone mockup right side */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 md:right-16">
            <PhoneMockup variant="negotiation" tilt />
          </div>
        </div>
      </section>

      {/* ============================================================
          4. § 02 — BENTO PAIR (warm portrait / green chat panel)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: warm portrait photo with overlay copy */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.bentoPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-10 md:p-14">
            <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              Get your debt off your mind.
            </h3>
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/80">
              Clerkie negotiates and tracks your payoff plan, adjusting as life
              moves. No more anxiety or mental math.
            </p>
          </div>
        </div>

        {/* Right: green/sage gradient panel with chat mockup */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7B8B7C] via-[#9AA89A] to-[#A8B5A8]">
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            {/* Chat bubble */}
            <div className="flex flex-1 items-center justify-center">
              <div className="flex max-w-[420px] flex-col gap-4">
                <div className="self-end rounded-3xl rounded-br-md bg-[#E5DDD2] px-5 py-3.5">
                  <p className="text-[15px] leading-[1.4] text-[#1A1410]">
                    I&apos;m learning so much about you. Like the $58 weekly
                    DoorDash spend. Maybe pause auto-renewals?
                  </p>
                </div>
                {/* Voice indicator (tiny) */}
                <div className="self-end">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur">
                    <div className="flex items-center gap-0.5">
                      <span className="block h-2 w-0.5 rounded-full bg-[#1A1410]" />
                      <span className="block h-3 w-0.5 rounded-full bg-[#1A1410]" />
                      <span className="block h-2 w-0.5 rounded-full bg-[#1A1410]" />
                      <span className="block h-1.5 w-0.5 rounded-full bg-[#1A1410]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom copy */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                More personalized than most apps.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/80">
                Clerkie&apos;s always learning about you and your spending — so
                money conversations feel personal (with real personality).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. § 03 — FULL-BLEED FEATURE ("Introducing one-tap negotiation")
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.feature2Portrait}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/0" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-6 px-10 md:px-16">
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 bg-white" />
            <span className="text-[11px] font-medium tracking-[0.18em] text-white/90">
              INTRODUCING ONE-TAP NEGOTIATION
            </span>
          </div>
          <h2 className="max-w-[760px] text-[64px] font-medium leading-[1.02] tracking-[-0.03em] text-white md:text-[80px]">
            Crush your debt by up to 70%.
          </h2>
          <div className="pt-4">
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-[#1A1410] px-7 py-3.5 text-sm font-medium text-white"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. § 04 — BENTO PAIR (bills dashboard / warm testimonial)
         ============================================================ */}
      <section className="grid h-[100vh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: bills dashboard panel — warm cream gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EFE8DD] via-[#E8DFD2] to-[#DDD0BE]">
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            {/* Bills mini-dashboard */}
            <div className="flex flex-1 items-center justify-center">
              <BillsMockup />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-[#1A1410]">
                Every bill, paid on time.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-[#6B5F56]">
                Clerkie watches your bills, due dates, and balances — and gives
                you a heads-up before anything slips.
              </p>
            </div>
          </div>
        </div>

        {/* Right: warm testimonial portrait photo */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.testimonialPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-10 md:p-14">
            <p className="max-w-[480px] text-[24px] leading-[1.3] tracking-[-0.01em] text-white">
              &ldquo;Clerkie cleared $14,000 in student loans I&apos;d been
              dragging for six years. I didn&apos;t even have to call.&rdquo;
            </p>
            <span className="text-[13px] tracking-[0.04em] text-white/70">
              — M. ALVAREZ, MEMBER SINCE 2024
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. CTA — full-bleed photo + signup pill
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-8 px-10 text-center md:px-16">
          <h2 className="max-w-[820px] text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[80px]">
            Solve your debt. <span className="text-white/60">Get back to living.</span>
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.55] text-white/80">
            The easiest way to pay off debt, manage bills, and get personalized
            financial answers.
          </p>
          <a
            href="#"
            className="flex items-center rounded-full bg-white px-8 py-4 text-base font-medium tracking-[-0.005em] text-[#1A1410]"
          >
            Get the App
          </a>
        </div>
      </section>
      </div>

      {/* ============================================================
          8. FOOTER
         ============================================================ */}
      <footer className="bg-[#1A1410] text-white/70">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-10 py-16 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="flex max-w-[320px] flex-col gap-5">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clerkie-wordmark.svg"
                  alt="Clerkie"
                  className="h-[22px] w-auto invert"
                />
              </div>
              <p className="text-sm leading-[1.55] text-white/60">
                A quieter way to handle the money side of life. Built for
                people, not credit-card algorithms.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/members" className="text-sm text-white/60 hover:text-white">
                /members (v1)
              </Link>
              <Link href="/companies" className="text-sm text-white/60 hover:text-white">
                /companies
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <span className="font-mono text-xs text-white/40">
              © 2025 Henry Labs Inc. · /members-v2 prototype
            </span>
            <span className="text-xs text-white/40">
              Photos via Unsplash (prototype only)
            </span>
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
        active ? "bg-white/40 text-white" : "text-white/80 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Phone mockup — minimal, two variants:
 *  - "hero": chat-bubble greeting screen
 *  - "negotiation": negotiation in-progress screen with debt list
 */
function PhoneMockup({
  variant,
  tilt,
}: {
  variant: "hero" | "negotiation";
  tilt?: boolean;
}) {
  return (
    <div
      className="relative h-[640px] w-[300px] overflow-hidden rounded-[48px] border-[10px] border-[#1A1410] bg-gradient-to-b from-[#FBE8D8] to-[#F2D5BD] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      style={tilt ? { transform: "rotate(-4deg)" } : undefined}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3.5">
        <span className="text-[13px] font-semibold text-[#1A1410]">9:41</span>
        <div className="flex items-center gap-1">
          <span className="block h-2 w-2 rounded-full bg-[#1A1410]/40" />
          <span className="block h-2.5 w-3.5 rounded-sm bg-[#1A1410]/40" />
        </div>
      </div>

      {/* Notch */}
      <div className="absolute left-1/2 top-3 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-[#1A1410]" />

      {/* Body */}
      {variant === "hero" ? (
        <div className="flex h-full flex-col gap-5 px-6 pt-12">
          <h3 className="text-[42px] font-medium leading-[1] tracking-[-0.03em] text-[#1A1410]">
            Hey you
          </h3>
          <div className="self-end rounded-2xl rounded-br-md bg-white/80 px-4 py-2.5">
            <span className="text-[13px] text-[#1A1410]">
              My finances are hot garbage 🔥
            </span>
          </div>
          <p className="text-[14px] leading-[1.4] text-[#1A1410]">
            You say this every Sunday 🙃
            <br />
            <br />
            It&apos;s time to fix this financial broken record. I&apos;ll
            create a plan.
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-3 px-5 pt-12">
          <span className="text-[11px] font-medium tracking-[0.1em] text-[#6B5F56]">
            NEGOTIATING NOW
          </span>
          <h3 className="text-[26px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1A1410]">
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
                className="flex items-center justify-between rounded-xl bg-white/60 px-3 py-2.5"
              >
                <span className="text-[12px] font-medium text-[#1A1410]">
                  {row.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[12px] text-[#1A1410]">
                    {row.saved}
                  </span>
                  <span className="rounded bg-[#1A1410]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#1A1410]">
                    {row.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Bills mockup — small calendar/list hybrid showing upcoming bills.
 */
function BillsMockup() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3 rounded-2xl border border-[#1A1410]/10 bg-white/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.1em] text-[#6B5F56]">
          UPCOMING THIS WEEK
        </span>
        <span className="font-mono text-[11px] text-[#6B5F56]">3 of 7</span>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { name: "Capital One", due: "Tue", amount: "$184" },
          { name: "Spotify", due: "Wed", amount: "$11" },
          { name: "Pacific Gas & Electric", due: "Fri", amount: "$72" },
        ].map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-between rounded-xl border border-[#1A1410]/[0.06] bg-white/80 px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1410] font-mono text-[10px] font-semibold text-white">
                {b.due.toUpperCase()}
              </span>
              <span className="text-[13px] font-medium text-[#1A1410]">
                {b.name}
              </span>
            </div>
            <span className="font-mono text-[13px] font-medium text-[#1A1410]">
              {b.amount}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#1A1410]/[0.06] pt-3">
        <span className="text-[11px] text-[#6B5F56]">All on autopay</span>
        <div className="flex items-center gap-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#7B8B7C]" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-[#6B5F56]">
            ON TRACK
          </span>
        </div>
      </div>
    </div>
  );
}
