import { Button } from "@/components/ui/button";
import Image from "next/image";

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
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "All The Future Between Your Hands.",
    },
    subtitle: {
      type: "text" as const,
      label: "Subtitle",
      placeholder: "Welcome to our Store",
    },
    button1Text: {
      type: "text" as const,
      label: "Button Text",
      placeholder: "View More",
    },
    button2Text: {
      type: "text" as const,
      label: "Button Text",
      placeholder: "Collections",
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
    },
    overlayOpacity: {
      type: "slider" as const,
      label: "Overlay Opacity",
      min: 0,
      max: 100,
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
}: HeroProps) {
  // Handle both string URLs and image objects
  const imageUrl = typeof imgUrl === "string" ? imgUrl : imgUrl.src;
  const imageAlt =
    typeof imgUrl === "string"
      ? "Hero background"
      : imgUrl.alt || "Hero background";

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
          <p className="font-medium text-white text-sm tracking-widest">
            {subtitle}
          </p>
          <h1 className="max-w-3xl font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
            {title}
          </h1>
          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-white/90 min-w-[150px] text-black"
            >
              {button1Text}
            </Button>
            <Button variant="outline" size="lg" className="min-w-[150px]">
              {button2Text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
