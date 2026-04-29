import Link from "next/link";

/**
 * Split homepage — Clerkie + Fiber.
 *
 * Layout:
 * - Desktop (≥ 768px): vertical-leaning split. Clerkie left ~half,
 *   Fiber right ~half, divider tilts slightly diagonal (top boundary
 *   at 45% width, bottom boundary at 55% width).
 * - Mobile (< 768px): both halves visible in one screen by stacking
 *   horizontally — Clerkie occupies the top, Fiber the bottom, divider
 *   runs horizontally with a slight tilt (top boundary at 45% height
 *   on the right, 55% on the left). Device mockups are hidden on
 *   mobile to preserve readability in tight space.
 *
 * Source: Figma file wX2OdcKMUlEwnFjV0idi11 (Frame 1618872609).
 * Hover behavior: each side reveals its own nav pills on hover (desktop only).
 */
export default function Home() {
  return (
    <>
      <SplitStyles />
      <main className="relative min-h-screen w-full overflow-hidden">
        <ClerkieSide />
        <FiberSide />
        <DiagonalSeam />
      </main>
    </>
  );
}

/* ============================================================
   Responsive clip-paths and seam gradient.
   Defined as CSS classes so we can vary them per breakpoint
   (Tailwind doesn't have a clean responsive arbitrary clip-path).
   ============================================================ */
function SplitStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        /* Mobile: top/bottom stack with a horizontal-ish diagonal (/ slope) */
        .split-clerkie { clip-path: polygon(0 0, 100% 0, 100% 55%, 0 45%); }
        .split-fiber   { clip-path: polygon(0 45%, 100% 55%, 100% 100%, 0 100%); }
        .split-seam    { background: linear-gradient(to bottom left, transparent calc(50% - 0.4px), rgba(255,255,255,0.06) 50%, transparent calc(50% + 0.4px)); }

        /* Desktop: left/right with a vertical-ish diagonal (/ slope) */
        @media (min-width: 768px) {
          .split-clerkie { clip-path: polygon(0 0, 55% 0, 45% 100%, 0 100%); }
          .split-fiber   { clip-path: polygon(55% 0, 100% 0, 100% 100%, 45% 100%); }
          /* Seam direction is the same as mobile — to-bottom-left produces a / slope */
        }
      `,
      }}
    />
  );
}

function DiagonalSeam() {
  return (
    <div
      aria-hidden="true"
      className="split-seam pointer-events-none absolute inset-0 z-40"
    />
  );
}

/* ============================================================
   CLERKIE SIDE (dark)
   - Desktop: left half (polygon top-left, top:45%, bottom:55%, bottom-left)
   - Mobile: top half (polygon top-left, top-right, right:45%, left:55%)
   ============================================================ */
function ClerkieSide() {
  return (
    <div
      className="split-clerkie group absolute inset-0 z-10 text-zinc-50 transition-[filter] duration-300 hover:brightness-110"
      style={{
        background:
          "radial-gradient(120% 80% at 30% 30%, #1a1a1a 0%, #0F0F0F 60%, #080808 100%)",
      }}
    >
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

      {/* Hover nav pills — desktop only (mobile is too tight) */}
      <div className="pointer-events-none absolute left-[22%] top-10 z-30 hidden -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:flex">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <DarkPill href="/members" label="Members" />
        <DarkPill href="/companies" label="Companies" />
        <DarkPill href="#" label="Lenders" />
      </div>

      {/* Content stack
          Mobile: centered horizontally, ~22% from top (center of top half)
          Desktop: ~25% from left (center of left half), ~38% from top */}
      <div className="pointer-events-none absolute left-1/2 top-[22%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 md:left-[25%] md:top-[38%]">
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

      {/* iPhone mockup — desktop only, peeks from bottom-left of Clerkie */}
      <div className="pointer-events-none absolute bottom-[-60px] left-[10%] z-20 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/iphone-mockup.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-[300px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}

/* ============================================================
   FIBER SIDE (light)
   - Desktop: right half
   - Mobile: bottom half
   ============================================================ */
function FiberSide() {
  return (
    <div
      className="split-fiber group absolute inset-0 z-10 bg-white text-zinc-900 transition-[filter] duration-300 hover:brightness-[1.02]"
    >
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
      <div className="pointer-events-none absolute left-[75%] top-10 z-30 hidden -translate-x-1/2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:flex">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <LightPill href="#" label="Collectors" />
        <LightPill href="#" label="Creditors" />
        <LightPill href="#" label="Agencies" />
      </div>

      {/* Content stack
          Mobile: centered horizontally, ~78% from top (center of bottom half)
          Desktop: ~75% from left (center of right half), ~38% from top */}
      <div className="pointer-events-none absolute left-1/2 top-[78%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 md:left-[75%] md:top-[38%]">
        <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] md:mb-7 md:h-[68px] md:w-[68px] md:rounded-[18px]">
          <span
            className="font-serif text-[32px] font-bold leading-none text-[#1c5fff] md:text-[36px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            F
          </span>
        </div>

        <h1 className="font-serif text-[40px] font-bold leading-none tracking-[-0.02em] text-[#1c5fff] md:text-[54px]">
          Fiber
        </h1>

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

      {/* Laptop mockup — desktop only, peeks from bottom-right of Fiber */}
      <div className="pointer-events-none absolute bottom-[-30px] right-[2%] z-20 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/laptop-mockup.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-[600px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
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
