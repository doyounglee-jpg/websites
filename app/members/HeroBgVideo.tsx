"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background video with a mobile-only tap-to-play
 * fallback. Some phones (iOS low-power mode, Android Data Saver) block
 * muted autoplay even with playsinline, and Safari then paints its
 * own play-button glyph somewhere on the <video> element. That glyph
 * lives in the user-agent shadow DOM and is often unstyleable from
 * outside, so a pure CSS hide isn't enough to guarantee a clean UI.
 *
 * Strategy:
 *   - On mount, try video.play().
 *   - If it succeeds, the video plays as usual; nothing else mounts.
 *   - If it rejects, switch to a fallback state where the <video> is
 *     made `invisible` (visibility: hidden, which also hides any UA
 *     shadow-DOM controls) and an <img src="/hero.png"> still frame is
 *     rendered in its place with the same transforms.
 *   - A centered custom play button is shown alongside the image.
 *     Tapping it calls video.play() synchronously inside the click
 *     handler — the user gesture unblocks playback, the 'play' event
 *     restores `needsTap` to false, image disappears, video reappears.
 */
export function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    }

    const onPlay = () => setNeedsTap(false);
    const onPause = () => {
      if (v.currentTime === 0) setNeedsTap(true);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const handleTap = () => {
    const v = videoRef.current;
    if (!v) return;
    // Synchronous play() inside the click handler — preserves the user
    // gesture so iOS will let the playback start.
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.then(() => setNeedsTap(false)).catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center ${
          needsTap ? "invisible" : ""
        }`}
      />
      {needsTap && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center"
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
