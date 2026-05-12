"use client";

/**
 * Shared marketing top nav for all Clerkie pages.
 *
 * Desktop (md+): plain "Clerkie" wordmark on the left, center pill nav
 *   (Members, Companies), and a "Get the App" pill on the right.
 * Mobile (< md): wordmark on the left, hamburger on the right that opens
 *   a full-screen drawer (Members, Companies, primary CTA).
 *
 * Pass `active` so the current page's pill highlights, and pass `ctaLabel`
 * / `ctaHref` if the page's primary CTA differs (e.g. /companies uses
 * "Request demo").
 */

import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

type Active = "members" | "companies" | null;

export function TopNav({
  active = null,
  ctaLabel = "Get the App",
  ctaHref = "#cta",
}: {
  active?: Active;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  /* Single flex row: three equal-width slots (logo / pill / CTA) so all
     three are vertically centered with each other via `items-center`. The
     middle slot uses `justify-center` to keep the pill at viewport center
     regardless of the logo or CTA widths. */
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex items-center justify-between px-5">
      {/* Left: Clerkie wordmark. Nudged down 2px to optically center against
          the pill nav / CTA — the SVG's letters sit higher inside its
          bounding box (top pad 2.25u vs bottom pad 10.65u of viewBox=200). */}
      <div className="flex flex-1 items-center justify-start">
        <Link href="/members" aria-label="Clerkie home" className="inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clerkie-wordmark.svg"
            alt="Clerkie"
            className="h-[20px] w-auto translate-y-[2px]"
          />
        </Link>
      </div>

      {/* Center: pill nav (desktop only) */}
      <div className="flex flex-1 items-center justify-center">
        <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1.5 backdrop-blur-md md:flex">
          <NavLink href="/members" active={active === "members"}>
            Members
          </NavLink>
          <NavLink href="/companies" active={active === "companies"}>
            Companies
          </NavLink>
        </nav>
      </div>

      {/* Right: CTA pill (desktop) or hamburger (mobile) */}
      <div className="flex flex-1 items-center justify-end">
        <a
          href={ctaHref}
          className="hidden items-center rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md md:flex"
        >
          {ctaLabel}
        </a>
        <div className="md:hidden">
          <MobileMenu
            activePath={active}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
          />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
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
