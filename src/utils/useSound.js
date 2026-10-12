import { useCallback, useRef } from 'react';

/**
 * High-performance Web Audio API tactile click sound generator.
 * Produces a realistic mechanical switch / metallic snap sound.
 * Zero external audio file dependency, zero lag, 100% offline reliability.
 */
export function useTactileSound(isSoundEnabled = true) {
  const audioCtxRef = useRef(null);

  const playClick = useCallback((pitch = 1.0) => {
    if (!isSoundEnabled) return;

    try {
      // Lazy initialize AudioContext on user gesture to obey browser autoplay policies
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. High-frequency metallic mechanical 'clack' transient
      const oscHigh = ctx.createOscillator();
      const gainHigh = ctx.createGain();
      
      oscHigh.type = 'triangle';
      oscHigh.frequency.setValueAtTime(1800 * pitch, now);
      oscHigh.frequency.exponentialRampToValueAtTime(300, now + 0.035);

      gainHigh.gain.setValueAtTime(0.25, now);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      oscHigh.connect(gainHigh);
      gainHigh.connect(ctx.destination);

      // 2. Low-frequency tactile bottom-out thud
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();

      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(160 * pitch, now);
      oscLow.frequency.exponentialRampToValueAtTime(40, now + 0.05);

      gainLow.gain.setValueAtTime(0.35, now);
      gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      oscLow.connect(gainLow);
      gainLow.connect(ctx.destination);

      // Start & Stop
      oscHigh.start(now);
      oscHigh.stop(now + 0.035);

      oscLow.start(now);
      oscLow.stop(now + 0.05);
    } catch (err) {
      // Silently fall back if audio hardware or permission is restricted
      console.warn("Web Audio click unavailable:", err);
    }
  }, [isSoundEnabled]);

  return { playClick };
}
