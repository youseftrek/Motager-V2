import Image from "next/image";

export type ImageWithTextProps = {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition?: "left" | "right";
  overlayColor?: string;
  overlayOpacity?: number;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "Our Story",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      placeholder:
        "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
    },
    imageUrl: {
      type: "text" as const,
      label: "Image URL",
      placeholder: "https://example.com/image.jpg",
    },
    imagePosition: {
      type: "select" as const,
      label: "Image Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      default: "left",
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
      default: 0,
    },
  },
};

export default function ImageWithText({
  title = "Our Story",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  imageUrl = "https://images.pexels.com/photos/9186213/pexels-photo-9186213.jpeg?auto=compress&cs=tinysrgb&w=3000",
  imagePosition = "left",
  overlayColor = "#000000",
  overlayOpacity = 0,
}: ImageWithTextProps) {
  return (
    <section className="py-12">
      <div
        className={`container mx-auto flex flex-col lg:flex-row ${
          imagePosition === "right" ? "lg:flex-row-reverse" : ""
        } items-start gap-8`}
      >
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={700}
            height={700}
            className="bg-center rounded-lg w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100,
            }}
          />
        </div>

        {/* Text Section */}
        <div className="p-3 md:pl-8 w-full lg:w-1/2 lg:text-left text-center">
          <h2 className="mb-4 font-bold text-3xl">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </section>
  );
}
