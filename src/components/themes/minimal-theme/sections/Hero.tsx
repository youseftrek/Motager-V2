import { Button } from "@/components/ui/button";
import Image from "next/image";

export type HeroProps = {
  title: string;
  subtitle: string;
  button1Text?: string;
  button2Text?: string;
  imgUrl: string;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "Welcome to Our Store",
    },
    subtitle: {
      type: "text" as const,
      label: "Subtitle",
      placeholder: "Discover our products",
    },
    button1Text: {
      type: "text" as const,
      label: "Button Text",
      placeholder: "Shop Now",
    },
    button2Text: {
      type: "text" as const,
      label: "Button Text",
      placeholder: "Shop Now",
    },
    imgUrl: {
      type: "test" as const,
      label: "Background Image",
      placeholder: "",
    },
  },
};

export default function Hero({
  title = "All The Future Between Your Hands.",
  subtitle = "Welcome to our Store",
  button1Text = "View More",
  button2Text = "Collections",
  imgUrl,
}: HeroProps) {
  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
      <Image
        src={imgUrl || "/images/hero.jpg"}
        alt="Men's beauty care"
        fill
        className="object-center object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <div className="space-y-6 px-4">
          <p className="font-medium text-sm text-white tracking-widest">
            {subtitle}
          </p>
          <h1 className="max-w-3xl font-bold text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
            {title}
          </h1>
          <div className="flex sm:flex-row flex-col sm:justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-white/90 min-w-[140px] text-black"
            >
              {button1Text}
            </Button>
            <Button variant="outline" size="lg">
              {button2Text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
