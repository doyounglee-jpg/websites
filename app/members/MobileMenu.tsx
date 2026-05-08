"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mobile-only hamburger menu. Opens a full-width glassy sheet under the top
 * bar with Members / Companies / About + the "Get the App" CTA. Lives next
 * to the Clerkie wordmark on the right at small viewports; the desktop pill
 * nav handles those routes on md+.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md"
      >
        {open ? (
          // Close (X) icon
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Hamburger icon
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1H15M1 6H15M1 11H15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          {/* Sheet — anchored top, full-width, padded under the top bar.
              "Get the App" lives outside the sheet (next to the hamburger),
              so the menu only carries page navigation links. */}
          <div className="fixed left-3 right-3 top-[60px] z-50 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#15171B]/95 p-3 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <SheetLink href="/members" onClick={() => setOpen(false)}>
              Members
            </SheetLink>
            <SheetLink href="/companies" onClick={() => setOpen(false)}>
              Companies
            </SheetLink>
          </div>
        </>
      )}
    </>
  );
}

function SheetLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-4 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </Link>
  );
}
