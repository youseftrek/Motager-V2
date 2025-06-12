import Image from "next/image";
import Link from "next/link";
import { extractThemeColors, ThemeColors } from "../theme-utils";
import { ThemedHeading, ThemedText } from "../theme-components";

export type Collection = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

const collections: Collection[] = [
  {
    id: "1",
    title: "Summer Essentials",
    description: "Lightweight and breathable styles for the sunny days.",
    imageUrl:
      "https://images.pexels.com/photos/9186213/pexels-photo-9186213.jpeg?auto=compress&cs=tinysrgb&w=3000",
    link: "/collections/summer",
  },
  {
    id: "2",
    title: "Winter Warmers",
    description: "Cozy and comfortable outfits for the chilly season.",
    imageUrl:
      "https://images.pexels.com/photos/30055347/pexels-photo-30055347/free-photo-of-portrait-of-woman-in-winter-earmuffs-outdoors.jpeg?auto=compress&cs=tinysrgb&w=3000",
    link: "/collections/winter",
  },
  {
    id: "3",
    title: "Streetwear Vibes",
    description: "Urban styles that make a statement.",
    imageUrl:
      "https://images.pexels.com/photos/12890036/pexels-photo-12890036.jpeg?auto=compress&cs=tinysrgb&w=3000",
    link: "/collections/streetwear",
  },
  {
    id: "4",
    title: "Formal Elegance",
    description: "Timeless pieces for every occasion.",
    imageUrl:
      "https://images.pexels.com/photos/25985695/pexels-photo-25985695/free-photo-of-woman-in-suit-portrait.jpeg?auto=compress&cs=tinysrgb&w=3000",
    link: "/collections/formal",
  },
];

export type FeaturedCollectionsProps = {
  title: string;
  description: string;
  overlayOpacity?: number;
  overlayColor?: string;
  themeColors?: any;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "Featured Collections",
      default: "Featured Collections",
    },
    description: {
      type: "text" as const,
      label: "Description",
      placeholder:
        "Explore our curated collections for every season and style.",
      default: "Explore our curated collections for every season and style.",
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
      default: 30,
    },
  },
};

export default function FeaturedCollections({
  title = "Featured Collections",
  description = "Explore our curated collections for every season and style.",
  overlayColor,
  overlayOpacity = 30,
  themeColors,
}: FeaturedCollectionsProps) {
  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Use theme colors if no explicit colors are provided
  const overlay = overlayColor || colors.main;

  return (
    <section className="py-12">
      <div className="mx-auto px-4 container">
        <ThemedHeading
          level={2}
          className="mb-4 font-bold text-3xl text-center"
          colors={colors}
        >
          {title}
        </ThemedHeading>
        <ThemedText
          variant="secondary"
          className="mb-8 text-center"
          colors={colors}
        >
          {description}
        </ThemedText>
        <div className="gap-6 grid grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.link}
              className="group/collection block relative shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={collection.imageUrl}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover/collection:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{
                    backgroundColor: overlay,
                    opacity: overlayOpacity / 100,
                  }}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="mb-2 font-bold sm:text-xl">
                  {collection.title}
                </h3>
                <p className="opacity-90 text-xs sm:text-sm">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
