/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type ImageWithTextProps = {
  // Content
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;

  // Layout & Style Options
  layout?: "left" | "right" | "overlay" | "card";
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "auto";
  imageObjectFit?: "cover" | "contain" | "fill";
  roundedCorners?: boolean;
  imageBorderWidth?: number;
  darkOverlay?: boolean;
  overlayOpacity?: number;
  variant?: "default" | "muted" | "primary" | "secondary" | "accent";

  // Additional optional props
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imageClassName?: string;
  ctaClassName?: string;
};

export const config = {
  inputs: {
    imageUrl: {
      type: "text" as const,
      label: "Image URL",
      placeholder: "/images/example.jpg",
      default: "/placeholder.jpg",
    },
    imageAlt: {
      type: "text" as const,
      label: "Image Alt Text",
      placeholder: "Descriptive text for the image",
      default: "Featured image",
    },
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "Your title here",
      default: "Section Title",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      placeholder: "Enter content description here",
      default:
        "This is a description of the section. You can customize this text to provide more information about your content.",
    },
    ctaText: {
      type: "text" as const,
      label: "CTA Text",
      placeholder: "Learn More",
      default: "Learn More",
    },
    ctaUrl: {
      type: "text" as const,
      label: "CTA URL",
      placeholder: "/learn-more",
      default: "#",
    },
    layout: {
      type: "select" as const,
      label: "Layout",
      default: "left",
      options: [
        { value: "left", label: "Image Left" },
        { value: "right", label: "Image Right" },
        { value: "overlay", label: "Text Overlay" },
        { value: "card", label: "Card Style" },
      ],
    },
    aspectRatio: {
      type: "select" as const,
      label: "Image Aspect Ratio",
      default: "square",
      options: [
        { value: "square", label: "Square (1:1)" },
        { value: "video", label: "Video (16:9)" },
        { value: "wide", label: "Wide (2:1)" },
        { value: "portrait", label: "Portrait (3:4)" },
        { value: "auto", label: "Automatic" },
      ],
    },
    imageObjectFit: {
      type: "select" as const,
      label: "Image Fit",
      default: "cover",
      options: [
        { value: "cover", label: "Cover" },
        { value: "contain", label: "Contain" },
        { value: "fill", label: "Fill" },
      ],
    },
    roundedCorners: {
      type: "boolean" as const,
      label: "Rounded Corners",
      default: true,
    },
    imageBorderWidth: {
      type: "number" as const,
      label: "Image Border Width",
      default: 0,
      min: 0,
      max: 10,
    },
    darkOverlay: {
      type: "boolean" as const,
      label: "Overlay (for Text Overlay layout)",
      default: true,
    },
    overlayOpacity: {
      type: "slider" as const,
      label: "Overlay Opacity",
      default: 40,
      min: 0,
      max: 100,
    },
    variant: {
      type: "select" as const,
      label: "Color Variant",
      default: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "muted", label: "Muted" },
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "accent", label: "Accent" },
      ],
    },
  },
};

export default function ImageWithText({
  // Content
  imageUrl = "/placeholder.jpg",
  imageAlt = "Featured image",
  title = "Section Title",
  description = "This is a description of the section. You can customize this text to provide more information about your content.",
  ctaText = "Learn More",
  ctaUrl = "#",

  // Layout & Style
  layout = "left",
  aspectRatio = "square",
  imageObjectFit = "cover",
  roundedCorners = true,
  imageBorderWidth = 0,
  darkOverlay = true,
  overlayOpacity = 40,
  variant = "default",

  // Additional classNames
  className,
  titleClassName,
  descriptionClassName,
  imageClassName,
  ctaClassName,
}: ImageWithTextProps) {
  // Calculate aspect ratio CSS
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "wide":
        return "aspect-[2/1]";
      case "portrait":
        return "aspect-[3/4]";
      case "auto":
        return "";
      default:
        return "aspect-square";
    }
  };

  // Get variant classes for background, text, etc.
  const getVariantClasses = () => {
    switch (variant) {
      case "muted":
        return {
          bg: "bg-muted",
          text: "text-muted-foreground",
          button: "bg-primary hover:bg-primary/90",
          buttonText: "text-primary-foreground",
        };
      case "primary":
        return {
          bg: "bg-primary",
          text: "text-primary-foreground",
          button: "bg-secondary hover:bg-secondary/90",
          buttonText: "text-secondary-foreground",
        };
      case "secondary":
        return {
          bg: "bg-secondary",
          text: "text-secondary-foreground",
          button: "bg-primary hover:bg-primary/90",
          buttonText: "text-primary-foreground",
        };
      case "accent":
        return {
          bg: "bg-accent",
          text: "text-accent-foreground",
          button: "bg-primary hover:bg-primary/90",
          buttonText: "text-primary-foreground",
        };
      default:
        return {
          bg: "bg-background",
          text: "text-foreground",
          button: "bg-primary hover:bg-primary/90",
          buttonText: "text-primary-foreground",
        };
    }
  };

  const variantClasses = getVariantClasses();

  // Render different layouts
  const renderContent = () => {
    switch (layout) {
      case "overlay":
        return (
          <div
            className={cn(
              "relative overflow-hidden group",
              roundedCorners && "rounded-md",
              getAspectRatioClass(),
              className
            )}
          >
            {/* Image */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className={cn(
                "absolute inset-0 w-full h-full",
                imageObjectFit,
                imageClassName
              )}
              style={{
                borderWidth: imageBorderWidth,
                borderStyle: imageBorderWidth > 0 ? "solid" : "none",
              }}
            />

            {/* Overlay */}
            {darkOverlay && (
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity / 100 }}
              ></div>
            )}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h2
                className={cn(
                  "text-2xl md:text-3xl font-bold mb-3",
                  titleClassName
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mb-4 text-sm md:text-base",
                  descriptionClassName
                )}
              >
                {description}
              </p>
              {ctaText && ctaUrl && (
                <a href={ctaUrl}>
                  <Button
                    variant="default"
                    className={cn("w-fit", ctaClassName)}
                  >
                    {ctaText}
                  </Button>
                </a>
              )}
            </div>
          </div>
        );

      case "card":
        return (
          <Card
            className={cn(
              "overflow-hidden",
              roundedCorners ? "rounded-md" : "rounded-none",
              "flex flex-col h-full",
              variantClasses.bg,
              variantClasses.text,
              className
            )}
          >
            {/* Image Container */}
            <div className={cn("overflow-hidden", getAspectRatioClass())}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className={cn("w-full h-full", imageObjectFit, imageClassName)}
                style={{
                  borderWidth: imageBorderWidth,
                  borderStyle: imageBorderWidth > 0 ? "solid" : "none",
                }}
              />
            </div>

            {/* Content */}
            <CardContent className="flex flex-col flex-grow p-6">
              <h2
                className={cn(
                  "text-xl md:text-2xl font-bold mb-3",
                  titleClassName
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mb-4 text-sm md:text-base opacity-80 flex-grow",
                  descriptionClassName
                )}
              >
                {description}
              </p>
              {ctaText && ctaUrl && (
                <a href={ctaUrl}>
                  <Button
                    variant="default"
                    className={cn(
                      "mt-auto w-fit",
                      variantClasses.button,
                      variantClasses.buttonText,
                      ctaClassName
                    )}
                  >
                    {ctaText}
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>
        );

      case "right":
      case "left":
      default:
        return (
          <div
            className={cn(
              "grid md:grid-cols-2 gap-6 md:gap-12 items-center",
              layout === "right" && "md:[grid-template-areas:_'content_image']",
              variantClasses.bg,
              variantClasses.text,
              className
            )}
          >
            {/* Image Container */}
            <div
              className={cn(
                "overflow-hidden",
                roundedCorners && "rounded-md",
                getAspectRatioClass(),
                layout === "right" && "md:[grid-area:_image]"
              )}
            >
              <img
                src={imageUrl}
                alt={imageAlt}
                className={cn("w-full h-full", imageObjectFit, imageClassName)}
                style={{
                  borderWidth: imageBorderWidth,
                  borderStyle: imageBorderWidth > 0 ? "solid" : "none",
                }}
              />
            </div>

            {/* Content */}
            <div
              className={cn(
                "flex flex-col px-4",
                layout === "right" && "md:[grid-area:_content]"
              )}
            >
              <h2
                className={cn(
                  "text-2xl md:text-3xl font-bold mb-4",
                  titleClassName
                )}
              >
                {title}
              </h2>
              <p className={cn("mb-6 opacity-80", descriptionClassName)}>
                {description}
              </p>
              {ctaText && ctaUrl && (
                <a href={ctaUrl}>
                  <Button
                    variant="default"
                    className={cn(
                      "w-fit",
                      variantClasses.button,
                      variantClasses.buttonText,
                      ctaClassName
                    )}
                  >
                    {ctaText}
                  </Button>
                </a>
              )}
            </div>
          </div>
        );
    }
  };

  return renderContent();
}
