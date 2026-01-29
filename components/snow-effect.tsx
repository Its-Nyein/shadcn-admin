"use client";

import { useSnow } from "@/contexts/snow-context";
import { Snowflake } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const SNOWFLAKES = Array.from({ length: 50 }, (_, i) => {
  const seed = (i * 7919) % 100;
  const seed2 = (i * 6271) % 100;
  const seed3 = (i * 4973) % 100;

  return {
    id: i,
    left: seed,
    duration: 10 + (seed2 % 15),
    delay: -(seed3 % 25),
    drift: (seed % 40) - 20,
    size: seed % 3,
    opacity: 0.3 + (seed2 % 50) / 100,
  };
});

export function SnowEffect() {
  const { isSnowing } = useSnow();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  React.useEffect(() => {
    if (isSnowing) {
      setIsVisible(true);
      setIsFadingOut(false);
    } else if (isVisible) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsFadingOut(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSnowing, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden z-9999 transition-opacity duration-1000",
        isFadingOut ? "opacity-0" : "opacity-100",
      )}
    >
      {SNOWFLAKES.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snow-fall"
          style={
            {
              left: `${flake.left}%`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              "--snow-drift": `${flake.drift}px`,
              opacity: flake.opacity,
            } as React.CSSProperties
          }
        >
          <Snowflake
            className={`
              ${flake.size === 0 ? "w-1.5 h-1.5" : flake.size === 1 ? "w-2 h-2" : "w-2.5 h-2.5"}
              text-sky-400 dark:text-white
            `}
          />
        </div>
      ))}
    </div>
  );
}
