import Link from "next/link";

/**
 * Split homepage variant — vertical 50/50 split.
 *
 * Layout:
 * - Desktop (≥ 768px): Clerkie left half, Fiber right half, clean
 *   vertical divider down the middle.
 * - Mobile (< 768px): stacks vertically — Clerkie top half, Fiber
 *   bottom half. Device mockups are hidden on mobile to preserve
 *   readability in tight space.
 *
 * Includes the polish from the diagonal v3:
 * - Real iPhone + Dell-XPS device mockups (peek from bottom of each half)
 * - Real Fiber F-mark + wordmark SVGs
 * - Hover-revealed audience nav pills (desktop only)
 * - Cover-link pattern: whole half is clickable, pills on top remain interactive
 *
 * Source: Figma file wX2OdcKMUlEwnFjV0idi11 (Frame 1618872609), but with
 * vertical divider instead of diagonal.
 */
export default function SplitVerticalPage() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <ClerkieSide />
      <FiberSide />
    </main>
  );
}

/* ============================================================
   CLERKIE SIDE (dark)
   - Mobile: top half (full width)
   - Desktop: left half (50% width, full height)
   ============================================================ */
function ClerkieSide() {
  return (
    <div
      className="group relative min-h-[50vh] flex-1 overflow-hidden text-zinc-50 transition-[filter] duration-300 hover:brightness-110 md:min-h-screen"
      style={{
        background:
          "radial-gradient(120% 80% at 30% 30%, #1a1a1a 0%, #0F0F0F 60%, #080808 100%)",
      }}
    >
      {/* Cover-link: whole half is clickable. Sits at z-0 so content above
          (with pointer-events-none) doesn't block clicks. */}
      <Link
        href="/members"
        aria-label="Go to Clerkie members"
        className="absolute inset-0 z-0"
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Hover nav pills — desktop only (centered horizontally in this half) */}
      <div className="pointer-events-none absolute left-1/2 top-10 z-30 hidden -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:flex">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <DarkPill href="/members" label="Members" />
        <DarkPill href="/companies" label="Companies" />
        <DarkPill href="#" label="Lenders" />
      </div>

      {/* Content stack — centered horizontally in this half, ~38% from top
          (leaves room for the iPhone mockup peeking from the bottom). */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6">
        <div
          className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] md:mb-7 md:h-[68px] md:w-[68px] md:rounded-[18px]"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, #2a2a2a 0%, #0d0d0d 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clerkie-logo.svg"
            alt="Clerkie"
            className="h-8 w-8 md:h-9 md:w-9"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <h1 className="font-serif text-[40px] font-bold leading-none tracking-[-0.02em] md:text-[54px]">
          Clerkie
        </h1>

        <p className="mt-4 max-w-[280px] text-center text-[14px] leading-[1.55] tracking-[-0.005em] text-zinc-400 md:mt-5 md:max-w-[300px] md:text-[15px]">
          Laoreet varius enim consequat elementum done.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-100 transition-colors group-hover:border-white/30 group-hover:bg-white/[0.08] md:mt-8">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>

      {/* iPhone mockup — desktop only. Centered horizontally in this half,
          peeks from bottom (-160px so part bleeds below before overflow-hidden). */}
      <div className="pointer-events-none absolute bottom-[-160px] left-1/2 z-20 hidden -translate-x-1/2 md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/iphone-mockup.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-[360px] max-w-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}

/* ============================================================
   FIBER SIDE (light)
   - Mobile: bottom half (full width)
   - Desktop: right half (50% width, full height)
   ============================================================ */
function FiberSide() {
  return (
    <div className="group relative min-h-[50vh] flex-1 overflow-hidden bg-white text-zinc-900 transition-[filter] duration-300 hover:brightness-[1.02] md:min-h-screen">
      <Link
        href="#"
        aria-label="Go to Fiber"
        className="absolute inset-0 z-0"
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Hover nav pills — desktop only */}
      <div className="pointer-events-none absolute left-1/2 top-10 z-30 hidden -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:flex">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <LightPill href="#" label="Collectors" />
        <LightPill href="#" label="Creditors" />
        <LightPill href="#" label="Agencies" />
      </div>

      {/* Content stack */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6">
        {/* Fiber F-badge */}
        <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] md:mb-7 md:h-[68px] md:w-[68px] md:rounded-[18px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fiber-logo.svg"
            alt="Fiber"
            className="h-9 w-9 md:h-10 md:w-10"
          />
        </div>

        {/* Fiber wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fiber-logo-text.svg"
          alt="Fiber"
          className="h-[28px] w-auto md:h-[40px]"
        />

        <p className="mt-4 max-w-[280px] text-center text-[14px] leading-[1.55] tracking-[-0.005em] text-zinc-600 md:mt-5 md:max-w-[300px] md:text-[15px]">
          Vitae elit sit lectus pellentesque diam massa.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors group-hover:border-[#1c5fff]/40 group-hover:text-[#1c5fff] md:mt-8">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1c5fff]">
            →
          </span>
        </div>
      </div>

      {/* Laptop mockup — desktop only. Centered horizontally in this half. */}
      <div className="pointer-events-none absolute bottom-[9px] left-1/2 z-20 hidden -translate-x-1/2 md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/laptop-mockup.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-[780px] max-w-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
        />
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
      className="rounded-full border border-[#b2b2b2]/30 bg-gradient-to-b from-[#2a2a2a] to-[#15110F] px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.005em] text-zinc-50 transition-colors hover:border-white/40"
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
