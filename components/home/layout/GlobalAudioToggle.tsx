"use client";

import { useEffect, useRef, useState } from "react";

type AudioStateEvent = CustomEvent<{ playing: boolean }>;

const notes = [196, 233.08, 261.63, 311.13, 349.23, 311.13, 261.63, 233.08];

function emitAudioState(playing: boolean) {
  window.dispatchEvent(new CustomEvent("soundia-audio-state", { detail: { playing } }));
}

export function GlobalAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; master: GainNode; timer: number } | null>(null);

  function stopMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    window.clearInterval(audio.timer);
    audio.master.gain.exponentialRampToValueAtTime(0.0001, audio.context.currentTime + 0.08);
    window.setTimeout(() => void audio.context.close(), 130);
    audioRef.current = null;
    setIsPlaying(false);
    emitAudioState(false);
  }

  function playMusic() {
    const context = new AudioContext();
    const master = context.createGain();
    master.gain.value = 0.045;
    master.connect(context.destination);

    const drone = context.createOscillator();
    const droneGain = context.createGain();
    drone.type = "sine";
    drone.frequency.value = 65.41;
    droneGain.gain.value = 0.2;
    drone.connect(droneGain).connect(master);
    drone.start();

    let step = 0;
    const playNote = () => {
      const now = context.currentTime;
      const voice = context.createOscillator();
      const envelope = context.createGain();
      voice.type = step % 3 === 0 ? "triangle" : "sine";
      voice.frequency.value = notes[step % notes.length];
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(0.34, now + 0.025);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
      voice.connect(envelope).connect(master);
      voice.start(now);
      voice.stop(now + 0.56);
      step += 1;
    };

    playNote();
    const timer = window.setInterval(playNote, 610);
    audioRef.current = { context, master, timer };
    setIsPlaying(true);
    emitAudioState(true);
  }

  function toggleMusic() {
    if (audioRef.current) stopMusic();
    else playMusic();
  }

  useEffect(() => {
    function syncState(event: Event) {
      setIsPlaying((event as AudioStateEvent).detail.playing);
    }

    window.addEventListener("soundia-audio-state", syncState);
    return () => {
      window.removeEventListener("soundia-audio-state", syncState);
      stopMusic();
    };
  }, []);

  return (
    <button className="global-audio-toggle" type="button" onClick={toggleMusic} aria-pressed={isPlaying} aria-label={isPlaying ? "Пауза" : "Включить музыку"}>
      <span className="global-audio-toggle__icon" aria-hidden="true" />
    </button>
  );
}
