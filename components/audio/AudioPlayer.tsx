"use client";

import { useMemo, useRef, useState } from "react";

export function AudioPlayer({
  src,
  duration = "00:38",
  labels
}: {
  src?: string;
  duration?: string;
  labels: { play: string; pause: string };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const bars = useMemo(
    () => Array.from({ length: 42 }, (_, index) => 18 + ((index * 13) % 34)),
    []
  );

  if (!src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play().catch(() => undefined);
      setPlaying(!audio.paused);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
        }}
        onEnded={() => setPlaying(false)}
      />
      <button className="audio-player__button" type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play}>
        {playing ? "Ⅱ" : "▶"}
      </button>
      <span className="audio-player__time">00:{String(Math.round(progress * 38)).padStart(2, "0")}</span>
      <div className="audio-player__wave" aria-hidden="true">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{
              height: `${height}%`,
              background: index / bars.length < progress ? "#3157FF" : "currentColor"
            }}
          />
        ))}
      </div>
      <span className="audio-player__time">{duration}</span>
    </div>
  );
}
