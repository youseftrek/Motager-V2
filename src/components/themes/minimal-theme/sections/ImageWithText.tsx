/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useDeviceView } from "@/providers/device-view-context";
import { useResponsiveClasses } from "@/hooks/use-responsive-classes";

export type ImageObject = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type ImageWithTextProps = {
  // Content
  imageUrl: string | ImageObject;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;

  // Style Options
  layout?: "left" | "right" | "overlay" | "parallax" | "stacked";
  imageHeight?: "small" | "medium" | "large" | "full";
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: boolean;
  overlayGradientDirection?: "top" | "bottom" | "left" | "right" | "diagonal";
  textAlignment?: "left" | "center" | "right";

  // Theme colors
  themeColors?: any;
};

export const config = {
  inputs: {
    imageUrl: {
      type: "image" as const,
      label: "Image URL",
      default:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    },
    title: {
      type: "text" as const,
      label: "Title",
      default: "Discover Our Story",
    },
    subtitle: {
      type: "text" as const,
      label: "Subtitle",
      default: "ABOUT US",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      default:
        "We believe in creating exceptional experiences that blend innovation with timeless design. Our journey began with a simple idea: to make quality products accessible to everyone.",
    },
    ctaText: {
      type: "text" as const,
      label: "Primary Button Text",
      default: "Learn More",
    },
    ctaUrl: {
      type: "text" as const,
      label: "Primary Button URL",
      default: "#",
    },
    secondaryCtaText: {
      type: "text" as const,
      label: "Secondary Button Text",
      default: "View Collection",
    },
    secondaryCtaUrl: {
      type: "text" as const,
      label: "Secondary Button URL",
      default: "#",
    },
    layout: {
      type: "select" as const,
      label: "Layout Style",
      default: "right",
      options: [
        { value: "left", label: "Image Left" },
        { value: "right", label: "Image Right" },
        { value: "overlay", label: "Text Overlay" },
        { value: "parallax", label: "Parallax Effect" },
        { value: "stacked", label: "Stacked (Image Top)" },
      ],
    },
    imageHeight: {
      type: "select" as const,
      label: "Image Height",
      default: "medium",
      options: [
        { value: "small", label: "Small (300px)" },
        { value: "medium", label: "Medium (400px)" },
        { value: "large", label: "Large (500px)" },
        { value: "full", label: "Full Height" },
      ],
    },
    overlayColor: {
      type: "color" as const,
      label: "Overlay Color",
      default: "#000000",
    },
    overlayOpacity: {
      type: "slider" as const,
      label: "Overlay Opacity",
      min: 0,
      max: 100,
      default: 40,
    },
    overlayGradient: {
      type: "boolean" as const,
      label: "Use Gradient Overlay",
      default: true,
    },
    overlayGradientDirection: {
      type: "select" as const,
      label: "Gradient Direction",
      default: "diagonal",
      options: [
        { value: "top", label: "Top to Bottom" },
        { value: "bottom", label: "Bottom to Top" },
        { value: "left", label: "Left to Right" },
        { value: "right", label: "Right to Left" },
        { value: "diagonal", label: "Diagonal" },
      ],
    },
    textAlignment: {
      type: "select" as const,
      label: "Text Alignment",
      default: "left",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
    },
  },
};

export default function ImageWithText({
  // Content
  imageUrl = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  imageAlt = "Featured image",
  title = "Discover Our Story",
  subtitle = "ABOUT US",
  description = "We believe in creating exceptional experiences that blend innovation with timeless design. Our journey began with a simple idea: to make quality products accessible to everyone.",
  ctaText = "Learn More",
  ctaUrl = "#",
  secondaryCtaText = "View Collection",
  secondaryCtaUrl = "#",

  // Style Options
  layout = "right",
  imageHeight = "medium",
  overlayColor = "#000000",
  overlayOpacity = 40,
  overlayGradient = true,
  overlayGradientDirection = "diagonal",
  textAlignment = "left",

  // Theme colors
  themeColors,
}: ImageWithTextProps) {
  // Get device view context
  const deviceView = useDeviceView();
  const [currentLayout, setCurrentLayout] = useState(layout);

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Handle both string URLs and image objects
  const imageSrc = typeof imageUrl === "string" ? imageUrl : imageUrl.src;
  const imageAltText =
    typeof imageUrl === "string" ? imageAlt : imageUrl.alt || imageAlt;

  // Use responsive classes
  const titleSizeClass = useResponsiveClasses(
    {
      mobile: "text-2xl",
      tablet: "text-3xl",
      desktop: "text-4xl",
    },
    "text-2xl md:text-3xl lg:text-4xl"
  );

  const descriptionSizeClass = useResponsiveClasses(
    {
      mobile: "text-base",
      tablet: "text-lg",
      desktop: "text-lg",
    },
    "text-base md:text-lg"
  );

  // Update layout based on device view in preview mode
  useEffect(() => {
    if (deviceView?.isPreviewMode) {
      // For mobile devices, force stacked layout for better mobile experience
      if (
        deviceView.activeDevice === "mobile" &&
        layout !== "overlay" &&
        layout !== "parallax"
      ) {
        setCurrentLayout("stacked");
      } else {
        setCurrentLayout(layout);
      }
    } else {
      setCurrentLayout(layout);
    }
  }, [deviceView?.activeDevice, deviceView?.isPreviewMode, layout]);

  // Get image height class
  const getImageHeightClass = () => {
    // Adjust height based on device in preview mode
    if (deviceView?.isPreviewMode && deviceView.activeDevice === "mobile") {
      return "h-[250px]";
    }

    switch (imageHeight) {
      case "small":
        return "h-[300px]";
      case "medium":
        return "h-[400px]";
      case "large":
        return "h-[500px]";
      case "full":
        return "h-[70vh]";
      default:
        return "h-[400px]";
    }
  };

  // Get text alignment class
  const getTextAlignmentClass = () => {
    switch (textAlignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "left":
      default:
        return "text-left";
    }
  };

  // Get gradient style
  const getGradientStyle = () => {
    if (!overlayGradient) return {};

    let gradient = "";
    switch (overlayGradientDirection) {
      case "top":
        gradient = `linear-gradient(to bottom, ${overlayColor} 0%, transparent 100%)`;
        break;
      case "bottom":
        gradient = `linear-gradient(to top, ${overlayColor} 0%, transparent 100%)`;
        break;
      case "left":
        gradient = `linear-gradient(to right, ${overlayColor} 0%, transparent 100%)`;
        break;
      case "right":
        gradient = `linear-gradient(to left, ${overlayColor} 0%, transparent 100%)`;
        break;
      case "diagonal":
      default:
        gradient = `linear-gradient(135deg, ${overlayColor} 0%, transparent 100%)`;
        break;
    }

    return { backgroundImage: gradient };
  };

  // Render the image with overlay
  const ImageWithOverlay = ({ className = "" }) => (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg group",
        getImageHeightClass(),
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAltText}
        fill
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
      />

      {/* Color Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={
          overlayGradient
            ? { ...getGradientStyle(), opacity: overlayOpacity / 100 }
            : { backgroundColor: overlayColor, opacity: overlayOpacity / 100 }
        }
      />

      {/* Subtle pattern overlay for texture */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')",
        }}
      />
    </div>
  );

  // Content section with title, description and CTAs
  const ContentSection = ({ isOverlay = false }) => (
    <div
      className={cn(
        "space-y-6",
        getTextAlignmentClass(),
        isOverlay ? "text-white" : ""
      )}
    >
      {subtitle && (
        <ThemedText
          variant={isOverlay ? "inverted" : "secondary"}
          className="font-medium tracking-widest uppercase text-sm mb-2"
          colors={colors}
        >
          {subtitle}
        </ThemedText>
      )}

      <ThemedHeading
        level={2}
        className={`font-bold ${titleSizeClass}`}
        colors={colors}
        style={isOverlay ? { color: "#ffffff" } : {}}
      >
        {title}
      </ThemedHeading>

      <ThemedText
        variant={isOverlay ? "inverted" : "secondary"}
        className={`leading-relaxed max-w-xl ${descriptionSizeClass}`}
        colors={colors}
      >
        {description}
      </ThemedText>

      <div className="flex flex-wrap gap-4 pt-2">
        {ctaText && (
          <ThemedButton
            variant="primary"
            href={ctaUrl}
            colors={colors}
            className="group"
          >
            <span>{ctaText}</span>
            <span className="inline-block ml-2">
              <ArrowRight size={16} />
            </span>
          </ThemedButton>
        )}

        {secondaryCtaText && (
          <ThemedButton
            variant="tertiary"
            href={secondaryCtaUrl}
            colors={colors}
            className="group"
          >
            <span>{secondaryCtaText}</span>
            <ChevronRight size={16} className="ml-1" />
          </ThemedButton>
        )}
      </div>
    </div>
  );

  // Render different layouts
  const renderLayout = () => {
    switch (currentLayout) {
      case "overlay":
        return (
          <div className="relative w-full overflow-hidden rounded-lg">
            <div className={cn("w-full", getImageHeightClass(), "md:h-[70vh]")}>
              <Image
                src={imageSrc}
                alt={imageAltText}
                fill
                className="object-cover w-full h-full"
                priority
              />

              {/* Color Overlay */}
              <div
                className="absolute inset-0"
                style={
                  overlayGradient
                    ? { ...getGradientStyle(), opacity: overlayOpacity / 100 }
                    : {
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity / 100,
                      }
                }
              />
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-2xl">
                  <ContentSection isOverlay={true} />
                </div>
              </div>
            </div>
          </div>
        );

      case "parallax":
        return (
          <div className="relative overflow-hidden">
            <div
              className={cn("w-full", getImageHeightClass(), "md:h-[80vh]")}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Color Overlay */}
              <div
                className="absolute inset-0"
                style={
                  overlayGradient
                    ? { ...getGradientStyle(), opacity: overlayOpacity / 100 }
                    : {
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity / 100,
                      }
                }
              />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl">
                    <ContentSection isOverlay={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "stacked":
        return (
          <div className="flex flex-col gap-12">
            <ImageWithOverlay className="w-full md:h-[50vh]" />
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto">
                <ContentSection />
              </div>
            </div>
          </div>
        );

      case "left":
        return (
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="w-full md:w-1/2">
                <ImageWithOverlay />
              </div>
              <div className="w-full md:w-1/2">
                <ContentSection />
              </div>
            </div>
          </div>
        );

      // Default is "right"
      default:
        return (
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center">
              <div className="w-full md:w-1/2">
                <ImageWithOverlay />
              </div>
              <div className="w-full md:w-1/2">
                <ContentSection />
              </div>
            </div>
          </div>
        );
    }
  };

  return <section className="py-16 md:py-24">{renderLayout()}</section>;
}
