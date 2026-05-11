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
  return (
    <>
      {/* Clerkie wordmark — left side, all sizes. No pill wrapper. */}
      <div className="fixed left-5 top-5 z-50">
        <Link href="/members" aria-label="Clerkie home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clerkie-wordmark.svg"
            alt="Clerkie"
            className="h-[20px] w-auto"
          />
        </Link>
      </div>

      {/* Center pill nav — desktop only (md+). */}
      <header className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 md:block">
        <nav className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1.5 backdrop-blur-md">
          <NavLink href="/members" active={active === "members"}>
            Members
          </NavLink>
          <NavLink href="/companies" active={active === "companies"}>
            Companies
          </NavLink>
        </nav>
      </header>

      {/* Right side — desktop CTA pill, mobile hamburger. */}
      <div className="fixed right-5 top-5 z-50">
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
    </>
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
