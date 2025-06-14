"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20"
      style={{
        backgroundColor: "var(--slider-track-background, var(--primary-20))",
      }}
    >
      <SliderPrimitive.Range
        className="absolute h-full bg-primary"
        style={{
          backgroundColor: "var(--slider-range-background, var(--primary))",
        }}
      />
    </SliderPrimitive.Track>
    {Array.isArray(props.value) ? (
      props.value.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-5 w-5 rounded-full border-2 border-primary/50 bg-background shadow-md hover:cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{
            backgroundColor:
              "var(--slider-thumb-background, var(--background))",
            borderColor: "var(--slider-thumb-border, var(--primary-50))",
            zIndex: 10,
          }}
        />
      ))
    ) : (
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full border-2 border-primary/50 bg-background shadow-md hover:cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{
          backgroundColor: "var(--slider-thumb-background, var(--background))",
          borderColor: "var(--slider-thumb-border, var(--primary-50))",
          zIndex: 10,
        }}
      />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
