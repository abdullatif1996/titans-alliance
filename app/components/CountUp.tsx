"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 900,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return <>{display}</>;
}
