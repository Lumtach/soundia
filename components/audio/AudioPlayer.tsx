"use client";

import { useMemo, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const totalSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const restSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
};

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
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

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
        key={src}
        ref={audioRef}
        src={src}
        preload="none"
        onLoadedMetadata={(event) => {
          setPlaying(false);
          setProgress(0);
          setCurrentTime(0);
          setAudioDuration(event.currentTarget.duration || 0);
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setCurrentTime(audio.currentTime);
          setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }}
      />
      <button className="audio-player__button" type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play}>
        {playing ? "Ⅱ" : "▶"}
      </button>
      <span className="audio-player__time">{formatTime(currentTime)}</span>
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
      <span className="audio-player__time">{audioDuration ? formatTime(audioDuration) : duration}</span>
    </div>
  );
}
