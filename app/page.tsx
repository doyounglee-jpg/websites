import Link from "next/link";

/**
 * Split homepage — Clerkie (left, dark) + Fiber (right, light).
 *
 * v1 scaffold from the Figma design (file wX2OdcKMUlEwnFjV0idi11, node 5026-72655).
 * - Skipped: iPhone / Dell-XPS mockup PNGs (need Figma exports). Bottom slot reserved.
 * - Hover behavior: nav pills slide in at the top of the active card.
 * - Mobile: stacks vertically (Clerkie on top, Fiber below).
 *
 * Architecture: each half is a `group` div with a positioned cover-link
 * (`absolute inset-0 z-0`) so the whole card is clickable. The decorative
 * content sits above (z-10, pointer-events-none) and the hover nav pills
 * sit at the top (z-30, pointer-events-auto on hover) so they intercept
 * clicks before the cover-link does. This avoids nested `<a>` tags, which
 * are invalid HTML and break Next.js routing.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      <ClerkieCard />
      <FiberCard />
    </main>
  );
}

/* ============================================================
   LEFT CARD — Clerkie (dark, white text)
   ============================================================ */
function ClerkieCard() {
  return (
    <div className="group relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#080808] text-zinc-50 transition-[filter] duration-300 hover:brightness-110 min-h-[100vh] md:min-h-screen">
      {/* Cover link — the entire card is clickable */}
      <Link
        href="/members"
        aria-label="Go to Clerkie members"
        className="absolute inset-0 z-0"
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Hover nav pills — z-30 so they sit above the cover link and capture clicks */}
      <div className="pointer-events-none absolute left-1/2 top-10 z-30 flex -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <DarkPill href="/members" label="Members" />
        <DarkPill href="/companies" label="Companies" />
        <DarkPill href="#" label="Lenders" />
      </div>

      {/* Card content — z-20, decorative (pointer-events-none lets the cover link catch clicks) */}
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-center px-8 pb-[260px] pt-32">
        {/* Logo badge */}
        <div
          className="mb-9 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, #2a2a2a 0%, #0d0d0d 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clerkie-logo.svg"
            alt="Clerkie"
            className="h-9 w-9"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[54px] font-bold leading-none tracking-[-0.02em]">
          Clerkie
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[320px] text-center text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc-400">
          Laoreet varius enim consequat elementum done.
        </p>

        {/* CTA (visual only — cover-link drives navigation) */}
        <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-100 transition-colors group-hover:border-white/30 group-hover:bg-white/[0.08]">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>

      {/* Bottom mockup slot — placeholder for iPhone PNG */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[280px] items-end justify-center overflow-visible">
        <PhoneMockupPlaceholder />
      </div>
    </div>
  );
}

/* ============================================================
   RIGHT CARD — Fiber (light, dark text)
   ============================================================ */
function FiberCard() {
  return (
    <div className="group relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-[#FBFAF6] via-[#F5F3ED] to-[#EFEDE6] text-zinc-900 transition-[filter] duration-300 hover:brightness-[1.02] min-h-[100vh] md:min-h-screen">
      {/* Cover link */}
      <Link
        href="#"
        aria-label="Go to Fiber"
        className="absolute inset-0 z-0"
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Hover nav pills */}
      <div className="pointer-events-none absolute left-1/2 top-10 z-30 flex -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <LightPill href="#" label="Collectors" />
        <LightPill href="#" label="Creditors" />
        <LightPill href="#" label="Agencies" />
      </div>

      {/* Card content */}
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-center px-8 pb-[260px] pt-32">
        {/* Logo badge — white with shadow */}
        <div className="mb-9 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
          {/* Provisional Fiber 'F' mark — replace with real Fiber asset later */}
          <span
            className="font-serif text-[36px] font-bold leading-none text-[#1c5fff]"
            style={{ letterSpacing: "-0.04em" }}
          >
            F
          </span>
        </div>

        {/* Headline — Fiber in blue per Figma */}
        <h1 className="font-serif text-[54px] font-bold leading-none tracking-[-0.02em] text-[#1c5fff]">
          Fiber
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[320px] text-center text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc-600">
          Vitae elit sit lectus pellentesque diam massa.
        </p>

        {/* CTA */}
        <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors group-hover:border-[#1c5fff]/40 group-hover:text-[#1c5fff]">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1c5fff]">
            →
          </span>
        </div>
      </div>

      {/* Bottom mockup slot — placeholder for laptop PNG */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[300px] items-end justify-center overflow-visible">
        <LaptopMockupPlaceholder />
      </div>
    </div>
  );
}

/* ============================================================
   NAV PILLS
   ============================================================ */
function DarkPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[#b2b2b2]/30 bg-gradient-to-b from-[#2a2a2a] to-[#15110F] px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.005em] text-zinc-50 transition-colors hover:border-white/40 hover:from-[#3a3530] hover:to-[#1a1614]"
    >
      {label}
    </Link>
  );
}

function LightPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[#d5e2ff] bg-white px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.005em] text-[#1c5fff] transition-colors hover:border-[#1c5fff]/40 hover:bg-[#f4f7ff]"
    >
      {label}
    </Link>
  );
}

/* ============================================================
   MOCKUP PLACEHOLDERS — CSS-only silhouettes.
   To be replaced by real Figma exports (iPhone-16 PNG + Dell-XPS PNG).
   ============================================================ */
function PhoneMockupPlaceholder() {
  return (
    <div
      className="relative h-[480px] w-[260px] -translate-y-[-180px] rotate-[-8deg] rounded-[36px] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #080808 100%)",
      }}
    >
      <div className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
      <div className="absolute inset-2.5 rounded-[28px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-4">
        <div className="mt-7 space-y-3">
          <div className="h-2 w-1/3 rounded-full bg-white/10" />
          <div className="h-3 w-3/4 rounded-full bg-white/15" />
          <div className="h-3 w-1/2 rounded-full bg-white/15" />
          <div className="mt-6 h-12 rounded-xl bg-white/[0.06]" />
          <div className="h-12 rounded-xl bg-white/[0.04]" />
          <div className="h-12 rounded-xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

function LaptopMockupPlaceholder() {
  return (
    <div className="relative -translate-y-[-120px] rotate-[8deg]">
      <div className="relative h-[280px] w-[480px] rounded-t-[14px] border border-zinc-300 bg-gradient-to-b from-[#FAFAF8] to-[#EAE8E2] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-3">
        <div className="h-full rounded-md bg-white p-4 shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-2 w-1/4 rounded-full bg-zinc-200" />
            <div className="h-3 w-3/4 rounded-full bg-zinc-300" />
            <div className="h-3 w-2/3 rounded-full bg-zinc-200" />
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-14 rounded bg-zinc-100" />
              <div className="h-14 rounded bg-zinc-100" />
              <div className="h-14 rounded bg-[#1c5fff]/10" />
            </div>
            <div className="mt-3 h-16 rounded bg-zinc-50" />
          </div>
        </div>
      </div>
      <div
        className="mx-auto h-[6px] w-[520px] rounded-b-[3px] bg-gradient-to-b from-zinc-300 to-zinc-200"
        style={{ marginTop: "-1px" }}
      />
    </div>
  );
}
