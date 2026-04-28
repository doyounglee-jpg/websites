"use client";

/**
 * Mobile-only hamburger + drawer for the marketing nav.
 *
 * Renders nothing on screens >= md (768px). On mobile, it renders:
 *   1. A hamburger button in the top-right (sibling of the desktop CTAs).
 *   2. A full-screen drawer overlay when tapped, with the same nav links
 *      that desktop shows inline + the page's CTA at the bottom.
 *
 * Used by /members, /companies, /members2 — pass `activePath` so the
 * current page's link gets highlighted, and pass `ctaLabel` / `ctaHref`
 * if the page's primary CTA differs from "Sign up" (e.g., /companies
 * uses "Request demo").
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ActivePath = "members" | "companies" | null;

export function MobileMenu({
  activePath,
  ctaLabel = "Sign up",
  ctaHref = "#cta",
}: {
  activePath: ActivePath;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Portal target: only available client-side. We hold the body element
  // in state so the first render (before mount) doesn't try to portal.
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  return (
    <>
      {/* Hamburger button — only visible on mobile (< md). */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-zinc-200 transition-colors hover:bg-white/[0.06] md:hidden"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 3.5h12M1 7h12M1 10.5h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Drawer overlay — portaled to <body> so it escapes the nav's
          backdrop-filter containing block. Without portaling, position:
          fixed would be confined to the nav header instead of covering
          the viewport. */}
      {open &&
        portalTarget &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            style={{ backgroundColor: "#000000" }}
            role="dialog"
            aria-modal="true"
          >
          {/* Drawer header — logo on left, X button on right */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clerkie-logo.svg"
                alt="Clerkie"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clerkie-wordmark.svg"
                alt="Clerkie"
                className="h-[22px] w-auto"
              />
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-zinc-200 transition-colors hover:bg-white/[0.06]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Drawer body — large stacked nav links */}
          <nav className="flex flex-1 flex-col px-6 py-4">
            <DrawerLink
              href="/members"
              active={activePath === "members"}
              onClick={close}
            >
              Members
            </DrawerLink>
            <DrawerLink
              href="/companies"
              active={activePath === "companies"}
              onClick={close}
            >
              Companies
            </DrawerLink>
          </nav>

          {/* Drawer footer — primary CTA only */}
          <div className="flex flex-col gap-3 border-t border-white/[0.06] px-6 py-6">
            <Link
              href={ctaHref}
              onClick={close}
              className="rounded-lg bg-zinc-50 py-3 text-center text-sm font-medium tracking-[-0.005em] text-[#000000]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>,
          portalTarget,
        )}
    </>
  );
}

/**
 * A single tappable row inside the drawer. Big tap target, hairline
 * separator below, right-arrow affordance, active page gets brighter.
 */
function DrawerLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between border-b border-white/[0.06] py-5 text-2xl font-medium tracking-[-0.02em] transition-colors ${
        active ? "text-zinc-50" : "text-zinc-300"
      }`}
    >
      <span>{children}</span>
      <span className="text-zinc-600">→</span>
    </Link>
  );
}
