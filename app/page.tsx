import Link from "next/link";

/**
 * Split homepage — Clerkie + Fiber, diagonal `/` split.
 *
 * v2 layout change: instead of a vertical | split (left/right halves),
 * the divider is a diagonal `/` running from the bottom-left corner to
 * the top-right corner. Clerkie occupies the upper-left triangle,
 * Fiber occupies the lower-right triangle.
 *
 * Implementation: both cards are absolutely positioned, full viewport,
 * stacked. Each card uses `clip-path: polygon(...)` to render only its
 * triangular region. Content is positioned within each triangle's
 * visual centroid (roughly 1/3 in from the relevant corner) so it
 * doesn't get clipped by the diagonal edge.
 *
 * Source design: Figma file wX2OdcKMUlEwnFjV0idi11, node 5026-72655.
 * Hover behavior: each card reveals its own nav pills on hover.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <ClerkieTriangle />
      <FiberTriangle />
      <DiagonalSeam />
    </main>
  );
}

/* ============================================================
   Decorative seam — a thin highlight along the diagonal edge
   ============================================================ */
function DiagonalSeam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40"
      style={{
        background:
          "linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(255,255,255,0.06) 50%, transparent calc(50% + 0.5px))",
      }}
    />
  );
}

/* ============================================================
   UPPER-LEFT — Clerkie triangle (dark)
   Triangle vertices: top-left, top-right, bottom-left.
   ============================================================ */
function ClerkieTriangle() {
  return (
    <div
      className="group absolute inset-0 z-10 text-zinc-50 transition-[filter] duration-300 hover:brightness-110"
      style={{
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
        background:
          "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 60%, #080808 100%)",
      }}
    >
      {/* Cover link */}
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

      {/* Hover nav pills — positioned near top-left of the triangle */}
      <div className="pointer-events-none absolute left-[18%] top-10 z-30 flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <DarkPill href="/members" label="Members" />
        <DarkPill href="/companies" label="Companies" />
        <DarkPill href="#" label="Lenders" />
      </div>

      {/* Content — anchored to the upper-left ~30% of the viewport,
          which is the visual centroid of the upper-left triangle */}
      <div className="pointer-events-none absolute left-[28%] top-[34%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6">
        <div
          className="mb-7 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
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

        <h1 className="font-serif text-[54px] font-bold leading-none tracking-[-0.02em]">
          Clerkie
        </h1>

        <p className="mt-5 max-w-[300px] text-center text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc-400">
          Laoreet varius enim consequat elementum done.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-100 transition-colors group-hover:border-white/30 group-hover:bg-white/[0.08]">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>

      {/* iPhone mockup — peeks from the bottom-LEFT corner of the
          viewport, which is inside the Clerkie triangle */}
      <div className="pointer-events-none absolute bottom-[-80px] left-[8%] z-20">
        <PhoneMockupPlaceholder />
      </div>
    </div>
  );
}

/* ============================================================
   LOWER-RIGHT — Fiber triangle (light)
   Triangle vertices: top-right, bottom-right, bottom-left.
   ============================================================ */
function FiberTriangle() {
  return (
    <div
      className="group absolute inset-0 z-10 text-zinc-900 transition-[filter] duration-300 hover:brightness-[1.02]"
      style={{
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        background:
          "linear-gradient(135deg, #FBFAF6 0%, #F5F3ED 60%, #EFEDE6 100%)",
      }}
    >
      {/* Cover link */}
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

      {/* Hover nav pills — positioned near top-right of the triangle */}
      <div className="pointer-events-none absolute right-[18%] top-10 z-30 flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="text-[13px] font-medium tracking-[-0.005em] text-zinc-500">
          For
        </span>
        <LightPill href="#" label="Collectors" />
        <LightPill href="#" label="Creditors" />
        <LightPill href="#" label="Agencies" />
      </div>

      {/* Content — anchored to the lower-right ~70% of the viewport,
          which is the visual centroid of the lower-right triangle */}
      <div className="pointer-events-none absolute right-[28%] bottom-[34%] z-20 flex translate-x-1/2 translate-y-1/2 flex-col items-center px-6">
        <div className="mb-7 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
          <span
            className="font-serif text-[36px] font-bold leading-none text-[#1c5fff]"
            style={{ letterSpacing: "-0.04em" }}
          >
            F
          </span>
        </div>

        <h1 className="font-serif text-[54px] font-bold leading-none tracking-[-0.02em] text-[#1c5fff]">
          Fiber
        </h1>

        <p className="mt-5 max-w-[300px] text-center text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc-600">
          Vitae elit sit lectus pellentesque diam massa.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors group-hover:border-[#1c5fff]/40 group-hover:text-[#1c5fff]">
          Learn More
          <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1c5fff]">
            →
          </span>
        </div>
      </div>

      {/* Laptop mockup — peeks from bottom-RIGHT corner */}
      <div className="pointer-events-none absolute bottom-[-60px] right-[6%] z-20">
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

/* ============================================================
   CSS-only mockup placeholders (replace with real Figma exports)
   ============================================================ */
function PhoneMockupPlaceholder() {
  return (
    <div
      className="relative h-[420px] w-[230px] rotate-[-12deg] rounded-[36px] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #080808 100%)",
      }}
    >
      <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
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
    <div className="relative rotate-[12deg]">
      <div className="relative h-[260px] w-[440px] rounded-t-[14px] border border-zinc-300 bg-gradient-to-b from-[#FAFAF8] to-[#EAE8E2] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-3">
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
          </div>
        </div>
      </div>
      <div
        className="mx-auto h-[6px] w-[480px] rounded-b-[3px] bg-gradient-to-b from-zinc-300 to-zinc-200"
        style={{ marginTop: "-1px" }}
      />
    </div>
  );
}
