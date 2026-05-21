"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

/**
 * Hero background with autoplay-blocked fallback that cannot be
 * defeated by iOS Safari's UA shadow DOM play button.
 *
 * Why this is structured the way it is: iOS Safari paints a
 * start-playback button on a <video> whenever muted autoplay is
 * blocked (Low Power Mode / Accessibility / Data Saver). That
 * button lives in the user-agent shadow DOM and CANNOT be reliably
 * hidden by CSS pseudo-elements or `visibility: hidden` — both were
 * tried (PRs #94 and #95) and iPhone users still saw it. The only
 * guaranteed way to suppress it is to not have a <video> element in
 * the DOM at all while autoplay is blocked.
 *
 * Flow:
 *   mode = "video"  — <video> is mounted; tries to play().
 *                     Success → stays mounted, video plays.
 *                     Failure → switch to "poster".
 *   mode = "poster" — <video> is UNMOUNTED. A still <img src="/hero.png">
 *                     fills the slot with the exact same transforms,
 *                     and a centered tap-to-play button is shown.
 *   On tap          — flushSync(setMode("video")) so the <video>
 *                     element mounts synchronously inside the click
 *                     handler (user-gesture context is preserved),
 *                     then play() is called on the fresh ref. iOS
 *                     treats this as user-initiated and allows
 *                     playback. No native button is ever shown.
 */
export function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"video" | "poster">("video");
  // Once the user has tapped, stop auto-switching back to "poster" on
  // any future play() rejection — that prevents a poster/video loop
  // if the user's device really refuses to play even after a gesture.
  const userTappedRef = useRef(false);

  useEffect(() => {
    if (mode !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        if (!userTappedRef.current) setMode("poster");
      });
    }
  }, [mode]);

  const handleTap = () => {
    userTappedRef.current = true;
    // flushSync forces the <video> to mount synchronously before this
    // click handler returns, so play() is still inside the user gesture.
    flushSync(() => setMode("video"));
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      // If for some reason play() still rejects after a real tap, leave
      // the video mounted — at that point iOS may show its native
      // button as a last-resort manual control.
      p.catch(() => {});
    }
  };

  // Shared classes so the <img> and <video> occupy the exact same
  // transformed slot; switching between them is invisible to layout.
  const SLOT_CLASS =
    "pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center";

  return (
    <>
      {mode === "video" && (
        <video
          key="hero-bg-video"
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={SLOT_CLASS}
        />
      )}
      {mode === "poster" && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt=""
            aria-hidden="true"
            className={SLOT_CLASS}
          />
          <button
            type="button"
            aria-label="Play hero video"
            onClick={handleTap}
            className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/55 active:bg-black/65 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </button>
        </>
      )}
    </>
  );
}
