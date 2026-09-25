"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JobClip } from "@/data/gallery";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * One real job, filmed in five short clips, shown as a numbered sequence (it is a sequence:
 * the clips are the same boiler from bare wall to finished cupboard).
 *
 * The clips are silent loops. Each one plays only while it is on screen and stops when it
 * scrolls away, so a phone is never decoding five videos at once, and nothing downloads
 * until it is needed (`preload="none"` with a still poster frame standing in). Every clip has
 * its own pause button, because moving pictures that start by themselves must be stoppable.
 * With reduced motion nothing starts by itself: the poster shows, and the button plays it.
 */
export function JobFilm({ clips }: { clips: JobClip[] }) {
  return (
    <ol className="film">
      {clips.map((clip, i) => (
        <li key={clip.id} className="film__step">
          <Clip clip={clip} />
          <p className="film__title">
            <span className="film__num" aria-hidden="true">
              {i + 1}
            </span>
            {clip.title}
          </p>
          <p className="film__text">{clip.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Clip({ clip }: { clip: JobClip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Once somebody has pressed pause, scrolling the clip back into view must not restart it
  const stoppedByHand = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !stoppedByHand.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      stoppedByHand.current = false;
      video.play().catch(() => {});
    } else {
      stoppedByHand.current = true;
      video.pause();
    }
  };

  return (
    <div className="film__frame">
      <video
        ref={ref}
        className="film__video"
        src={clip.src}
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="film__toggle" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} clip: ${clip.title}`}>
        {playing ? <Pause size={18} strokeWidth={2} aria-hidden="true" /> : <Play size={18} strokeWidth={2} aria-hidden="true" />}
      </button>
    </div>
  );
}
