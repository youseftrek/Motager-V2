import React from "react";
import { extractThemeColors, ThemeColors } from "../theme-utils";
import { ThemedHeading, ThemedText } from "../theme-components";
import {
  useResponsiveClasses,
  textSize,
  padding,
} from "@/hooks/use-responsive-classes";

export type AboutProps = {
  title: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
  showDivider?: boolean;
  alignment?: "center" | "left" | "right";
  themeColors?: any;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "About Us",
      default: "About Us",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      placeholder:
        "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
      default:
        "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#e0e0e0",
    },
    textColor: {
      type: "color" as const,
      label: "Text Color",
      default: "#000000",
    },
    showDivider: {
      type: "boolean" as const,
      label: "Show Divider",
      default: true,
    },
    alignment: {
      type: "select" as const,
      label: "Text Alignment",
      options: [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      default: "center",
    },
  },
};

export default function About({
  title = "About Us",
  description = "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
  backgroundColor,
  textColor,
  showDivider = true,
  alignment = "center",
  themeColors,
}: AboutProps) {
  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Use responsive classes
  const paddingClass = useResponsiveClasses(padding.preview, padding.default);
  const headingTextSizeClass = useResponsiveClasses(
    {
      mobile: "text-3xl",
      tablet: "text-4xl",
      desktop: "text-5xl",
    },
    "text-3xl sm:text-4xl md:text-5xl"
  );

  const bodyTextSizeClass = useResponsiveClasses(
    {
      mobile: "text-lg",
      tablet: "text-xl",
      desktop: "text-2xl",
    },
    "text-lg md:text-xl lg:text-2xl"
  );

  // Use theme colors if no explicit colors are provided
  const bgColor = backgroundColor || colors.background.secondary;
  const txtColor = textColor || colors.text.primary;

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden ${getAlignmentClass()}`}
      style={{ backgroundColor: bgColor, color: txtColor }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        className={`z-10 relative mx-auto max-w-4xl container ${paddingClass}`}
      >
        <ThemedHeading
          level={2}
          className={`mb-6 font-bold tracking-tight ${headingTextSizeClass}`}
          colors={colors}
        >
          {title}
        </ThemedHeading>

        {showDivider && (
          <div className="flex justify-center mb-8">
            <div
              className={`h-1 w-24 rounded ${
                alignment === "left"
                  ? "ml-0 mr-auto"
                  : alignment === "right"
                  ? "mr-0 ml-auto"
                  : "mx-auto"
              }`}
              style={{ backgroundColor: colors.buttons.primary.background }}
            />
          </div>
        )}

        <ThemedText
          variant="secondary"
          className={`opacity-90 mx-auto max-w-3xl leading-relaxed ${bodyTextSizeClass}`}
          colors={colors}
        >
          {description}
        </ThemedText>
      </div>
    </section>
  );
}
