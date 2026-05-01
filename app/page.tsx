import Link from "next/link";

/**
 * Split homepage — Clerkie + Fiber.
 * Simplified layout: horizontal top/bottom split, no diagonal,
 * no device mockups, no hover pills. Each half is a single Link
 * to its product page.
 *
 * - Clerkie: top half, dark bg, content aligned LEFT (~15% from left)
 * - Fiber:   bottom half, light bg, content aligned RIGHT (~15% from right)
 *
 * Source: Figma file wX2OdcKMUlEwnFjV0idi11 (Frame 1618872612 — simplified target).
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ClerkieSide />
      <FiberSide />
    </main>
  );
}

/* ============================================================
   CLERKIE SIDE — top half, dark, content aligned left
   ============================================================ */
function ClerkieSide() {
  return (
    <Link
      href="/members"
      aria-label="Go to Clerkie"
      className="group relative flex min-h-[50vh] items-center bg-black pl-[10%] text-zinc-50 transition-[filter] duration-300 hover:brightness-110 md:pl-[15%]"
      style={{
        background:
          "radial-gradient(120% 80% at 30% 30%, #1a1a1a 0%, #0F0F0F 60%, #080808 100%)",
      }}
    >
      <div className="flex items-center gap-5 md:gap-6">
        {/* Logo badge */}
        <div
          className="flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-[16px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] md:h-[64px] md:w-[64px] md:rounded-[18px]"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, #2a2a2a 0%, #0d0d0d 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clerkie-logo.svg"
            alt="Clerkie"
            className="h-7 w-7 md:h-8 md:w-8"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        {/* Headline + subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-[40px] font-bold leading-none tracking-[-0.02em] md:text-[52px]">
            Clerkie
          </h1>
          <p className="max-w-[320px] text-[13px] leading-[1.55] tracking-[-0.005em] text-zinc-400 md:text-[14px]">
            Laoreet varius enim consequat elementum done.
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   FIBER SIDE — bottom half, light, content aligned right
   ============================================================ */
function FiberSide() {
  return (
    <Link
      href="#"
      aria-label="Go to Fiber"
      className="group relative flex min-h-[50vh] items-center justify-end bg-white pr-[10%] text-zinc-900 transition-[filter] duration-300 hover:brightness-[1.02] md:pr-[15%]"
    >
      <div className="flex items-center gap-5 md:gap-6">
        {/* Logo badge */}
        <div className="flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-[16px] border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] md:h-[64px] md:w-[64px] md:rounded-[18px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fiber-logo.svg"
            alt="Fiber"
            className="h-8 w-8 md:h-9 md:w-9"
          />
        </div>
        {/* Wordmark + subtitle */}
        <div className="flex flex-col gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fiber-logo-text.svg"
            alt="Fiber"
            className="h-[30px] w-auto md:h-[38px]"
          />
          <p className="max-w-[320px] text-[13px] leading-[1.55] tracking-[-0.005em] text-zinc-600 md:text-[14px]">
            Vitae elit sit lectus pellentesque diam massa.
          </p>
        </div>
      </div>
    </Link>
  );
}
