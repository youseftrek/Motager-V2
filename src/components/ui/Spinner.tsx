"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SpinnerProps {
  size?: number;
  color?: string; // Tailwind color class (e.g., "text-blue-500")
  speed?: number;
  className?: string;
}

export const Spinner = ({
  size = 24,
  color = "text-black", // Default to black
  speed = 1.5,
  className,
}: SpinnerProps) => {
  const animationDuration = `${1 / Math.max(0.5, Math.min(speed, 2))}s`;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <Loader className={cn("animate-spin", color)} size={size} />
    </div>
  );
};

export default Spinner;
