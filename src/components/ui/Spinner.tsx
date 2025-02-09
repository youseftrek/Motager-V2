"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export default function Spinner({
  size = 24,
  color = "bg-white",
  speed = 0.6,
  className,
}: SpinnerProps) {
  // Clamp speed between 0.5 and 2
  const validatedSpeed = Math.max(0.5, Math.min(speed, 2));
  const bars = [...Array(20)];

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      {bars.map((_, i) => (
        <div
          key={i}
          className={cn(`absolute rounded-full w-[10%]`, color)}
          style={{
            height: "24%",
            left: "46%",
            top: "38%",
            opacity: 0.25 + i * 0.0625,
            transform: `rotate(${i * 30}deg) translate(0, -130%)`,
            animation: `spinner ${validatedSpeed}s linear infinite`,
            animationDelay: `${(i / 12) * validatedSpeed}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes spinner {
          0% {
            opacity: 0.25;
          }
          100% {
            opacity: 0.875;
          }
        }
      `}</style>
    </div>
  );
}
