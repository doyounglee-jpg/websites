"use client";

// Reveal — Linear-style scroll-triggered fade-up wrapper.
//
// Why this exists: pages like /members and /companies are long, scrollable
// marketing pages. Showing every section at full opacity from the start
// feels static. Linear.app's homepage gives sections a soft entrance —
// they fade in + slide up gently as they scroll into view, with a
// long-tail ease (cubic-bezier(0.16, 1, 0.3, 1) — "ease-out-expo-ish").
//
// Implementation: a tiny IntersectionObserver. When the wrapped element
// crosses ~10% into the viewport, we add a `revealed` class and
// disconnect the observer (Linear's reveal is one-shot — sections do NOT
// fade back out when you scroll past them).
//
// The actual transition lives in globals.css (.reveal / .reveal.revealed)
// so the component is purely behavior; styling stays in CSS.

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  // Optional stagger — extra delay before the transition starts.
  // Use this to chain siblings so they reveal one after the other.
  delay?: number;
  // Forwarded to the wrapper element so callers can keep their existing
  // layout classes (e.g., the original `<section className="...">`).
  className?: string;
  // Render element. Defaults to <div>. Set `as="section"` etc. to keep
  // the surrounding semantic markup intact without an extra wrapper.
  as?: ElementType;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  // `unknown` here because Tag can be any element; React's ref-forwarding
  // types get awkward when the element type is generic. Casting at the
  // observe() call site is safe — IntersectionObserver only needs Element.
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — if the user has it on, just show
    // content immediately without any transition. The CSS rule also
    // handles this, but flipping state here means React doesn't bother
    // running the observer at all.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        // Just one element per observer, so entries[0] is fine.
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      {
        // Fire when ~10% of the element is visible — gives the section a
        // moment of "anticipation" before it slides up, which feels more
        // intentional than firing the instant the top edge enters.
        threshold: 0.1,
        // Negative bottom rootMargin trims the viewport so reveals don't
        // fire when content is just barely peeking. Matches Linear's
        // feel (you have to actually scroll TO a section to trigger it).
        rootMargin: "0px 0px -10% 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Stagger support — applies as a transition-delay on the wrapper.
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      className={["reveal", revealed ? "revealed" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
}
