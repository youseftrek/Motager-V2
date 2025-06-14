"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import { Slider } from "../../components/slider";

// Default theme colors to use if store data isn't available
const defaultColors = {
  main: "#0070f3",
  text: { primary: "#333", secondary: "#666", inverted: "#fff" },
  background: { primary: "#fff", secondary: "#f5f5f5" },
  buttons: {
    primary: { background: "#0070f3", hover: "#0060df", text: "#fff" },
    secondary: { background: "#f5f5f5", hover: "#e5e5e5", text: "#333" },
    tertiary: {
      background: "transparent",
      hover: "rgba(0,0,0,0.05)",
      text: "#0070f3",
    },
  },
};

// Custom styled slider component that accepts theme colors
const ThemedSlider = React.forwardRef<
  React.ElementRef<typeof Slider>,
  React.ComponentPropsWithoutRef<typeof Slider> & { themeColors?: any }
>(({ className, themeColors, ...props }, ref) => {
  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;

  return (
    <Slider
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
      style={
        {
          "--slider-track-background": colors.background.secondary,
          "--slider-range-background": colors.buttons.primary.background,
          "--slider-thumb-background": colors.background.primary,
          "--slider-thumb-border": colors.buttons.primary.background,
        } as React.CSSProperties
      }
    />
  );
});
ThemedSlider.displayName = "ThemedSlider";

export default ThemedSlider;
