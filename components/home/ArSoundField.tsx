"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

const bars = [38, 72, 54, 86, 46, 92, 62, 78, 42, 96, 68, 50, 82, 58, 90, 44, 74, 62, 88, 52, 80, 40, 70, 94, 56, 84, 48, 76, 60, 91, 45, 68, 55, 83, 50, 73, 39];
// C natural minor: every point in the musical field resolves inside this scale.
const cMinor = [130.81, 146.83, 155.56, 174.61, 196, 207.65, 233.08, 261.63, 293.66, 311.13, 349.23];

export function ArSoundField() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [point, setPoint] = useState({ x: 66, y: 44 });
  const [beacons, setBeacons] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [activeBeaconId, setActiveBeaconId] = useState<number | null>(null);
  const beaconsRef = useRef<Array<{ id: number; x: number; y: number }>>([]);
  const audioRef = useRef<{ context: AudioContext; master: GainNode; filter: BiquadFilterNode; timer: number } | null>(null);

  function playMusic() {
    const context = new AudioContext();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    master.gain.value = 0.045;
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.Q.value = 1.4;
    master.connect(filter).connect(context.destination);

    const drone = context.createOscillator();
    const droneGain = context.createGain();
    drone.type = "sine";
    drone.frequency.value = 65.41;
    droneGain.gain.value = 0.28;
    drone.connect(droneGain).connect(master);
    drone.start();

    const notes = [196, 233.08, 261.63, 311.13, 349.23, 311.13, 261.63, 233.08];
    let step = 0;
    const playNote = () => {
      const now = context.currentTime;
      const track = beaconsRef.current;
      const beacon = track.length ? track[step % track.length] : null;
      const voice = context.createOscillator();
      const envelope = context.createGain();
      const scaleStep = beacon ? Math.min(cMinor.length - 1, Math.max(0, Math.floor(((100 - beacon.y) / 100) * cMinor.length))) : 0;
      voice.type = beacon && step % 3 === 0 ? "triangle" : "sine";
      voice.frequency.value = beacon ? cMinor[scaleStep] : notes[step % notes.length];
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(beacon ? 0.44 : 0.34, now + 0.025);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
      voice.connect(envelope).connect(master);
      voice.start(now);
      voice.stop(now + 0.56);
      setActiveBeaconId(beacon?.id ?? null);
      step += 1;
    };

    playNote();
    const timer = window.setInterval(playNote, 610);
    audioRef.current = { context, master, filter, timer };
    setIsPlaying(true);
  }

  function stopMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(audio.timer);
    audio.master.gain.exponentialRampToValueAtTime(0.0001, audio.context.currentTime + 0.08);
    window.setTimeout(() => void audio.context.close(), 120);
    audioRef.current = null;
    setIsPlaying(false);
  }

  function toggleMusic() {
    if (audioRef.current) stopMusic();
    else playMusic();
  }

  useEffect(() => () => stopMusic(), []);

  function trackPointer(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextPoint = {
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100
    };
    setPoint(nextPoint);
    const audio = audioRef.current;
    if (audio) {
      const tone = 450 + nextPoint.x * 36;
      const volume = 0.028 + (100 - nextPoint.y) * 0.00043;
      audio.filter.frequency.setTargetAtTime(tone, audio.context.currentTime, 0.08);
      audio.master.gain.setTargetAtTime(volume, audio.context.currentTime, 0.08);
    }
  }

  function placeBeacon(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const beacon = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100
    };
    const nextTrack = [...beaconsRef.current, beacon]
      .slice(-12)
      .sort((left, right) => left.x - right.x);
    beaconsRef.current = nextTrack;
    setBeacons(nextTrack);
    const audio = audioRef.current;
    if (!audio) return;
    const tone = audio.context.createOscillator();
    const envelope = audio.context.createGain();
    const now = audio.context.currentTime;
    tone.type = "sine";
    const clickScaleStep = Math.min(cMinor.length - 1, Math.max(0, Math.floor(((100 - beacon.y) / 100) * cMinor.length)));
    tone.frequency.setValueAtTime(cMinor[clickScaleStep] * 2, now);
    tone.frequency.exponentialRampToValueAtTime(cMinor[Math.max(0, clickScaleStep - 2)], now + 0.68);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.2, now + 0.018);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
    tone.connect(envelope).connect(audio.master);
    tone.start(now);
    tone.stop(now + 0.75);
  }

  return (
    <div
      className={`ar-field ${isPlaying ? "is-live" : "is-paused"}`}
      onMouseMove={trackPointer}
      onClick={placeBeacon}
      style={{ "--scan-x": `${point.x}%`, "--scan-y": `${point.y}%` } as CSSProperties}
    >
      <div className="ar-field__horizon" aria-hidden="true" />
      <div className="ar-field__rings" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
      </div>
      <div className="ar-field__grid" aria-hidden="true" />
      <div className="ar-field__scan" aria-hidden="true" />
      <div className="ar-field__core" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="ar-field__beacons" aria-hidden="true">
        {beacons.map((beacon) => (
          <span key={beacon.id} className={activeBeaconId === beacon.id ? "is-active" : undefined} style={{ "--beacon-x": `${beacon.x}%`, "--beacon-y": `${beacon.y}%` } as CSSProperties} />
        ))}
      </div>
      <div className="ar-field__equalizer" aria-hidden="true">
        {bars.map((height, index) => (
          <span key={index} style={{ "--bar-height": `${height}%`, "--delay": `${index * -90}ms` } as CSSProperties} />
        ))}
      </div>
      <div className="ar-field__readout" aria-hidden="true">
        <span>AR AUDIO FIELD / 01</span>
        <span>TONALITY / C MINOR</span>
      </div>
      <button className="ar-field__toggle" type="button" onClick={toggleMusic} aria-pressed={isPlaying}>
        <span className="ar-field__toggle-icon" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isPlaying ? "Музыка играет" : "Включить музыку"}</span>
      </button>
      <p className="ar-field__hint">Клик создаёт ноту · слева направо — порядок · выше — тон</p>
    </div>
  );
}
