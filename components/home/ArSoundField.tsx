"use client";

import { useEffect, useState, type CSSProperties } from "react";

const bars = [38, 72, 54, 86, 46, 92, 62, 78, 42, 96, 68, 50, 82, 58, 90, 44, 74, 62, 88, 52, 80, 40, 70, 94, 56, 84, 48, 76, 60, 91, 45, 68, 55, 83, 50, 73, 39];

export function ArSoundField() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    function syncState(event: Event) {
      setIsPlaying((event as CustomEvent<{ playing: boolean }>).detail.playing);
    }

    window.addEventListener("soundia-audio-state", syncState);
    return () => window.removeEventListener("soundia-audio-state", syncState);
  }, []);

  return (
    <div
      className={`ar-field ${isPlaying ? "is-live" : "is-paused"}`}
      style={{ "--scan-x": "62%", "--scan-y": "50%" } as CSSProperties}
    >
      <div className="ar-field__equalizer" aria-hidden="true">
        {bars.map((height, index) => (
          <span key={index} style={{ "--bar-height": `${height}%`, "--delay": `${index * -90}ms` } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
