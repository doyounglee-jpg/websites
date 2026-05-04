import Link from "next/link";

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
  // Cool-toned portrait
  bentoPortrait:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
  // Night/neon cityscape — section 3
  feature2Portrait:
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2400&q=80",
  // Warm intimate family portrait — testimonial (local asset)
  testimonialPortrait: "/testimonial-warm.png",
  // Misty forest — CTA
  ctaBackdrop:
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=2400&q=80",
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
          2. HERO — full-bleed aurora/dusk landscape + floating phone
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.heroLandscape}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Heavy dark overlay to keep mood dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-[#0E1014]/80" />

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <PhoneMockup variant="hero" />
        </div>
      </section>

      {/* ============================================================
          3. § 01 — FULL-BLEED FEATURE ("Clerkie gets to know you")
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
          <div className="flex max-w-[480px] flex-col gap-6">
            <span className="text-[11px] font-medium tracking-[0.18em] text-[#5EEAD4]">
              REAL HUMAN HELP
            </span>
            <h2 className="text-[56px] font-medium leading-[1.05] tracking-[-0.025em] text-white">
              Clerkie gets to know you{" "}
              <span className="text-white/50">(and your debt).</span>
            </h2>
          </div>

          <div className="absolute right-10 top-1/2 -translate-y-1/2 md:right-16">
            <PhoneMockup variant="negotiation" tilt />
          </div>
        </div>
      </section>

      {/* ============================================================
          4. § 02 — BENTO PAIR (cool portrait / dark cyan chat panel)
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
            {/* Chat bubble */}
            <div className="flex flex-1 items-center justify-center">
              <div className="flex max-w-[420px] flex-col gap-4">
                <div className="self-end rounded-3xl rounded-br-md border border-[#5EEAD4]/20 bg-[#5EEAD4]/[0.08] px-5 py-3.5 backdrop-blur">
                  <p className="text-[15px] leading-[1.4] text-white/90">
                    I&apos;m learning so much about you. Like the $58 weekly
                    DoorDash spend. Maybe pause auto-renewals?
                  </p>
                </div>
                {/* Voice indicator */}
                <div className="self-end">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur">
                    <div className="flex items-center gap-0.5">
                      <span className="block h-2 w-0.5 rounded-full bg-[#5EEAD4]" />
                      <span className="block h-3 w-0.5 rounded-full bg-[#5EEAD4]" />
                      <span className="block h-2 w-0.5 rounded-full bg-[#5EEAD4]" />
                      <span className="block h-1.5 w-0.5 rounded-full bg-[#5EEAD4]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
          5. § 03 — FULL-BLEED FEATURE ("Introducing one-tap negotiation")
         ============================================================ */}
      <section className="relative h-[100vh] min-h-[820px] w-full overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.feature2Portrait}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1014] via-[#0E1014]/60 to-[#0E1014]/0" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-6 px-10 md:px-16">
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 rounded-full bg-[#5EEAD4]" />
            <span className="text-[11px] font-medium tracking-[0.18em] text-[#5EEAD4]">
              INTRODUCING ONE-TAP NEGOTIATION
            </span>
          </div>
          <h2 className="max-w-[760px] text-[64px] font-medium leading-[1.02] tracking-[-0.03em] text-white md:text-[80px]">
            Crush your debt by up to{" "}
            <span className="text-[#5EEAD4]">70%.</span>
          </h2>
          <div className="pt-4">
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-zinc-50 px-7 py-3.5 text-sm font-medium text-[#0E1014]"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

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
              <BillsMockup />
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

      {variant === "hero" ? (
        <div className="flex h-full flex-col gap-5 px-6 pt-12">
          <h3 className="text-[42px] font-medium leading-[1] tracking-[-0.03em] text-white">
            Hey you
          </h3>
          <div className="self-end rounded-2xl rounded-br-md border border-[#5EEAD4]/20 bg-[#5EEAD4]/[0.08] px-4 py-2.5">
            <span className="text-[13px] text-white/90">
              My finances are hot garbage 🔥
            </span>
          </div>
          <p className="text-[14px] leading-[1.4] text-white/80">
            You say this every Sunday 🙃
            <br />
            <br />
            It&apos;s time to fix this financial broken record. I&apos;ll
            create a plan.
          </p>
          {/* Online indicator */}
          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full bg-[#5EEAD4]/10 px-2 py-0.5">
            <span className="block h-[5px] w-[5px] rounded-full bg-[#5EEAD4]" />
            <span className="text-[10px] font-medium tracking-[0.04em] text-[#5EEAD4]">
              ONLINE
            </span>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

/**
 * Bills mockup — dark surface version.
 */
function BillsMockup() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.1em] text-zinc-500">
          UPCOMING THIS WEEK
        </span>
        <span className="font-mono text-[11px] text-zinc-500">3 of 7</span>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { name: "Capital One", due: "Tue", amount: "$184" },
          { name: "Spotify", due: "Wed", amount: "$11" },
          { name: "Pacific Gas & Electric", due: "Fri", amount: "$72" },
        ].map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5EEAD4]/10 font-mono text-[10px] font-semibold text-[#5EEAD4]">
                {b.due.toUpperCase()}
              </span>
              <span className="text-[13px] font-medium text-white">
                {b.name}
              </span>
            </div>
            <span className="font-mono text-[13px] font-medium text-white">
              {b.amount}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="text-[11px] text-zinc-500">All on autopay</span>
        <div className="flex items-center gap-1.5">
          <span
            className="block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
            style={{ boxShadow: "0 0 8px rgba(94,234,212,0.6)" }}
          />
          <span className="font-mono text-[10px] tracking-[0.06em] text-[#5EEAD4]">
            ON TRACK
          </span>
        </div>
      </div>
    </div>
  );
}
