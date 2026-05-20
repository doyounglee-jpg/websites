"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero phone video with a time-synced glass-morphism notification.
 *
 * The notification card sits behind the phone (lower z-index), tilted and
 * partly overlapped, and fades in only when the video reaches
 * `notificationStart` seconds, staying visible for `notificationDuration`.
 *
 * Listens for the video's `timeupdate` event (fires ~4x/sec) to drive the
 * visibility state. Since the video loops, the card naturally re-appears
 * on every loop iteration.
 */
interface Props {
  src: string;
  notificationStart: number;
  notificationDuration: number;
}

export function HeroPhoneVideo({
  src,
  notificationStart,
  notificationDuration,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      const t = video.currentTime;
      setShowNotification(
        t >= notificationStart && t < notificationStart + notificationDuration,
      );
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [notificationStart, notificationDuration]);

  return (
    <>
      {/* Ambient-mode halo - YouTube-style. The same video plays here
          scaled up, heavily blurred, and at low opacity, so the area
          around the phone takes on the dominant tones of the current
          frame. -z-10 places it below the phone within the flex parent's
          stacking context but still above the section gradient bg. */}
      <video
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[122%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-25 lg:h-full lg:opacity-15"
        style={{ filter: "blur(90px) saturate(1.2)" }}
        autoPlay
        muted
        loop
        playsInline
        // poster matches the phone video's first frame - painted
        // immediately and blurred/scaled into the ambient halo so the
        // area around the phone is warm-toned before the video starts.
        poster="/v-t3-poster.jpg"
        preload="auto"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Phone-shaped video container - overflow-hidden serves double duty:
         it clips the video to the rounded corners AND clips the notification
         card while it sits above its target position, so the card slides in
         from above as a fully-opaque object instead of fading. This keeps
         the glass effect at full strength throughout the animation. */}
      <div className="relative z-10 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)] lg:aspect-[10/19.5] lg:h-[68vh] lg:w-auto lg:max-w-none lg:max-h-[760px]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        // poster shows the first frame instantly as a JPEG so the
        // phone-shaped slot doesn't read as an empty dark container
        // while the video is still buffering on first page load.
        poster="/v-t3-poster.jpg"
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Glass-morphism notification - always at opacity 1; only its
          position animates. When hidden it sits above the phone top edge
          (clipped by the container's overflow-hidden) and slides into the
          visible top-[8%] slot. Glass material at full strength always. */}
      <div
        className={`pointer-events-none absolute left-1/2 top-[8%] z-20 w-[80%] -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:w-[220px] ${
          showNotification ? "translate-y-0" : "-translate-y-[180%]"
        }`}
        aria-hidden="true"
      >
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 backdrop-blur-3xl">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold tracking-[0.02em] text-white/95">
              Clerkie
            </span>
            <span className="text-[10px] font-medium text-white/55">
              10:24 AM
            </span>
          </div>
          <p className="text-[13px] leading-[1.4] text-white/90">
            You paid off another account 🎉
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
