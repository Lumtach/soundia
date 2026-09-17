"use client";

import { useEffect, useRef } from "react";

export function Waveform({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({
    active: false,
    x: 0.5,
    y: 0.5,
    energy: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.active = true;
      pointerRef.current.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerRef.current.y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      pointerRef.current.energy = Math.min(1, pointerRef.current.energy + 0.34);
    };

    const releasePointer = () => {
      pointerRef.current.active = false;
    };

    canvas.addEventListener("pointermove", syncPointer);
    canvas.addEventListener("pointerdown", syncPointer);
    canvas.addEventListener("pointerleave", releasePointer);
    canvas.addEventListener("pointerup", releasePointer);

    const pointAt = (x: number, width: number, height: number, amp: number, energy: number) => {
      const t = x / width;
      const pointer = pointerRef.current;
      const distance = Math.abs(t - pointer.x);
      const pull = Math.exp(-distance * distance * 68) * energy;
      const beat = 0.5 + Math.sin(frame * 0.095 + t * 18) * 0.5;

      return (
        height / 2 +
        Math.sin(t * 24 + frame * 0.036) * amp * (0.36 + pull * 0.48) +
        Math.sin(t * 77 - frame * 0.024) * amp * (0.2 + beat * 0.12) +
        Math.sin(t * 13 + frame * 0.05) * amp * 0.22 -
        (pointer.y - 0.5) * amp * pull * 1.95
      );
    };

    const drawWave = (from: number, to: number, color: string, alpha: number, width: number, height: number, amp: number, energy: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      for (let x = from; x <= to; x += 5 * window.devicePixelRatio) {
        const y = pointAt(x, width, height, amp, energy);
        if (x === from) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const draw = () => {
      const width = canvas.clientWidth * window.devicePixelRatio;
      const height = canvas.clientHeight * window.devicePixelRatio;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const pointer = pointerRef.current;
      pointer.energy += (pointer.active ? 1 : 0) * 0.08;
      pointer.energy *= reduceMotion ? 0.82 : 0.94;
      pointer.energy = Math.min(pointer.energy, 1);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.35 * window.devicePixelRatio;
      const amp = height * 0.26;

      const baseColor = dark ? "#F2F0EA" : "#111111";
      drawWave(0, width, baseColor, dark ? 0.58 : 0.54, width, height, amp, pointer.energy);

      ctx.save();
      ctx.shadowColor = "#3157FF";
      ctx.shadowBlur = 18 * window.devicePixelRatio;
      ctx.lineWidth = 2.1 * window.devicePixelRatio;
      const head = width * ((frame * 0.0032) % 1);
      const windowSize = width * (0.2 + pointer.energy * 0.14);
      const start = Math.max(0, head - windowSize);
      drawWave(start, head, "#3157FF", 1, width, height, amp, pointer.energy);
      if (head < windowSize) {
        drawWave(width - (windowSize - head), width, "#3157FF", 1, width, height, amp, pointer.energy);
      }
      ctx.restore();

      ctx.globalAlpha = 0.26 + pointer.energy * 0.44;
      ctx.fillStyle = "#3157FF";
      for (let i = 0; i < 18; i += 1) {
        const drift = (frame * (0.002 + i * 0.0002) + i * 0.071) % 1;
        const x = width * drift;
        const y = pointAt(x, width, height, amp, pointer.energy);
        const size = (1.1 + (i % 4) * 0.45 + pointer.energy * 1.2) * window.devicePixelRatio;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += reduceMotion ? 0 : 1;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", syncPointer);
      canvas.removeEventListener("pointerdown", syncPointer);
      canvas.removeEventListener("pointerleave", releasePointer);
      canvas.removeEventListener("pointerup", releasePointer);
    };
  }, [dark]);

  return <canvas className="waveform-canvas" ref={canvasRef} aria-label="Interactive sound wave" role="img" />;
}
