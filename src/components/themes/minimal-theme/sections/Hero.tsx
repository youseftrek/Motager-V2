import Image from "next/image";
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";

export type ImageObject = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  photographer?: string;
  photographer_url?: string;
  pexels_url?: string;
};

export type HeroProps = {
  title: string;
  subtitle: string;
  button1Text?: string;
  button2Text?: string;
  imgUrl: string | ImageObject;
  overlayOpacity?: number;
  overlayColor?: string;
  themeColors?: any;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "All The Future Between Your Hands.",
      default: "All The Future Between Your Hands.",
    },
    subtitle: {
      type: "text" as const,
      label: "Subtitle",
      placeholder: "Welcome to our Store",
      default: "Welcome to our Store",
    },
    button1Text: {
      type: "text" as const,
      label: "Primary Button Text",
      placeholder: "View More",
      default: "View More",
    },
    button2Text: {
      type: "text" as const,
      label: "Secondary Button Text",
      placeholder: "Collections",
      default: "Collections",
    },
    imgUrl: {
      type: "image" as const,
      label: "Background Image",
      placeholder: "https://your-image-url.com",
      default:
        "https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg",
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
      default: 0,
    },
  },
};

export default function Hero({
  title = "All The Future Between Your Hands.",
  subtitle = "Welcome to our Store",
  button1Text = "View More",
  button2Text = "Collections",
  imgUrl = "https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg",
  overlayOpacity = 0,
  overlayColor = "#000000",
  themeColors,
}: HeroProps) {
  // Handle both string URLs and image objects
  const imageUrl = typeof imgUrl === "string" ? imgUrl : imgUrl.src;
  const imageAlt =
    typeof imgUrl === "string"
      ? "Hero background"
      : imgUrl.alt || "Hero background";

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-center object-cover"
        priority
        unoptimized={imageUrl.startsWith("http")}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity / 100,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <div className="space-y-6 px-4">
          <ThemedText
            variant="inverted"
            className="font-medium text-sm tracking-widest"
            colors={colors}
          >
            {subtitle}
          </ThemedText>

          <ThemedHeading
            level={1}
            className="max-w-3xl font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
            style={{ color: colors.text.inverted }}
            colors={colors}
          >
            {title}
          </ThemedHeading>

          <div className="flex justify-center gap-4">
            <ThemedButton
              variant="primary"
              size="lg"
              className="min-w-[150px]"
              colors={colors}
            >
              {button1Text}
            </ThemedButton>

            <ThemedButton
              variant="tertiary"
              size="lg"
              className="min-w-[150px]"
              colors={colors}
            >
              {button2Text}
            </ThemedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
