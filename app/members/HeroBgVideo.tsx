"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

/**
 * Hero background with autoplay-blocked fallback that cannot be
 * defeated by iOS Safari's UA shadow DOM play button — see PR #96 for
 * the full reasoning behind the conditional-mount approach.
 *
 * Two pieces of state:
 *   mode          — "video" mounts the <video>; "poster" unmounts it
 *                   so iOS has no element to paint a native button on.
 *   imageVisible  — when true, the still <img src="/hero.png"> stays
 *                   rendered on top of whatever is mounted. Used to
 *                   bridge the tap → video-playing transition so the
 *                   user never sees a black gap while the freshly
 *                   mounted <video> decodes its first frame.
 *
 * The <video> also carries poster="/hero.png" so even if imageVisible
 * is briefly false, the video itself renders the same still while it
 * loads — the swap from poster to live frames is invisible.
 */
export function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"video" | "poster">("video");
  const [imageVisible, setImageVisible] = useState(false);
  // Once the user has tapped, stop auto-switching back to "poster" on
  // any future play() rejection — that prevents a poster/video loop if
  // the user's device really refuses to play even after a gesture.
  const userTappedRef = useRef(false);

  useEffect(() => {
    if (mode !== "video") return;
    const v = videoRef.current;
    if (!v) return;

    // Hide the still image only once the video is actually painting
    // frames. "playing" fires after the user gesture or autoplay has
    // produced its first real frame, so the swap is seamless.
    const onPlaying = () => setImageVisible(false);
    v.addEventListener("playing", onPlaying);

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        if (!userTappedRef.current) setMode("poster");
      });
    }

    return () => v.removeEventListener("playing", onPlaying);
  }, [mode]);

  const handleTap = () => {
    userTappedRef.current = true;
    // Flush both updates in one synchronous render so the click
    // handler still owns the user-gesture context when play() runs
    // AND the still <img> is in the DOM at the moment the <video>
    // mounts (bridging the load gap).
    flushSync(() => {
      setImageVisible(true);
      setMode("video");
    });
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {});
    }
  };

  // Shared base classes so <img> and <video> occupy the same
  // transformed slot; switching between them is invisible to layout.
  const VIDEO_CLASS =
    "pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center";
  // The still poster is shifted an extra 40px up on mobile so the
  // figures in the photo land where the user expects (the standalone
  // still has slightly different framing from the video's first frame).
  // Desktop matches the video exactly.
  const IMG_CLASS =
    "pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[calc(10%_-_40px)] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center";

  return (
    <>
      {mode === "video" && (
        <video
          key="hero-bg-video"
          ref={videoRef}
          src="/hero.mp4"
          poster="/hero.png"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={VIDEO_CLASS}
        />
      )}
      {(mode === "poster" || imageVisible) && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt=""
            aria-hidden="true"
            className={IMG_CLASS}
          />
        </>
      )}
      {mode === "poster" && (
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
