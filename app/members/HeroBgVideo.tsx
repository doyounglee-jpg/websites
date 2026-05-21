"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background video with a mobile-only tap-to-play
 * fallback. Some phones (iOS low-power mode, certain Data Saver
 * settings) block autoplay even when muted, in which case the browser
 * paints its own play button on the <video> element. That native
 * button sits at the visual center of the *transformed* video — which,
 * with our mobile origin-bottom scale-[1.25] translate-y-[10%], lands
 * off-center — and it can't be tapped because the video has
 * pointer-events-none. This component watches for autoplay failure and
 * renders a centered, tappable overlay button instead.
 */
export function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
      }
    };

    tryPlay();

    const onPlay = () => setNeedsTap(false);
    const onPause = () => {
      // Only show the button if the pause is from autoplay being blocked
      // (we never call pause() ourselves; if currentTime stayed at 0 the
      // browser refused to start playback).
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
        className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center"
      />
      {needsTap && (
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
      )}
    </>
  );
}
