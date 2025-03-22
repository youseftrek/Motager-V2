import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

export type BestSellersSliderProps = {
  title?: string;
  cardStyle?: "minimal" | "bordered" | "elevated" | "gradient";
  swipeSpeed?: number;
  bulletColor?: string;
  showBullets?: boolean;
  showNavigation?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  showLikeButton?: boolean;
  showSaleTag?: boolean;
  effect?: "slide" | "creative" | "fade";
  backgroundColor?: string;
  textColor?: string;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Section Title",
      default: "Best Sellers",
    },
    cardStyle: {
      type: "select" as const,
      label: "Card Style",
      default: "elevated",
      options: [
        { value: "minimal", label: "Minimal" },
        { value: "bordered", label: "Bordered" },
        { value: "elevated", label: "Elevated" },
        { value: "gradient", label: "Gradient" },
      ],
    },
    swipeSpeed: {
      type: "slider" as const,
      label: "Swipe Speed (sec)",
      min: 0,
      max: 10,
      default: 4,
    },
    bulletColor: {
      type: "color" as const,
      label: "Bullet Color",
      default: "#22c55e",
    },
    showBullets: {
      type: "toggle" as const,
      label: "Show Bullets",
      default: true,
    },
    showNavigation: {
      type: "toggle" as const,
      label: "Show Navigation Arrows",
      default: true,
    },
    showRating: {
      type: "toggle" as const,
      label: "Show Ratings",
      default: true,
    },
    showAddToCart: {
      type: "toggle" as const,
      label: "Show Add to Cart Button",
      default: true,
    },
    showLikeButton: {
      type: "toggle" as const,
      label: "Show Like Button",
      default: true,
    },
    showSaleTag: {
      type: "toggle" as const,
      label: "Show Sale Tags",
      default: true,
    },
    effect: {
      type: "select" as const,
      label: "Slide Effect",
      default: "slide",
      options: [
        { value: "slide", label: "Normal Slide" },
        { value: "creative", label: "Creative" },
        { value: "fade", label: "Fade" },
      ],
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "",
    },
    textColor: {
      type: "color" as const,
      label: "Text Color",
      default: "",
    },
  },
};

// Enhanced product data with more details
const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: "$299.99",
    originalPrice: "$399.99",
    rating: 4.8,
    sale: true,
    salePercentage: "25%",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    category: "Furniture",
    isBestseller: true,
  },
  {
    id: 2,
    name: "Modern Chair",
    price: "$149.99",
    originalPrice: "$189.99",
    rating: 4.5,
    sale: true,
    salePercentage: "20%",
    image: "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
    category: "Furniture",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Elegant Lamp",
    price: "$79.99",
    originalPrice: "$99.99",
    rating: 4.2,
    sale: false,
    image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
    category: "Lighting",
    isBestseller: false,
  },
  {
    id: 4,
    name: "Wooden Table",
    price: "$199.99",
    originalPrice: "$249.99",
    rating: 4.6,
    sale: true,
    salePercentage: "15%",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    category: "Furniture",
    isBestseller: true,
  },
  {
    id: 5,
    name: "Ceramic Vase",
    price: "$59.99",
    originalPrice: "$79.99",
    rating: 4.3,
    sale: true,
    salePercentage: "20%",
    image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    category: "Decor",
    isBestseller: false,
  },
  {
    id: 6,
    name: "Bookshelf Unit",
    price: "$149.99",
    originalPrice: "$179.99",
    rating: 4.7,
    sale: false,
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
    category: "Furniture",
    isBestseller: true,
  },
];

export default function BestSellersSlider({
  title = "Best Sellers",
  cardStyle = "elevated",
  swipeSpeed = 4,
  bulletColor = "#22c55e",
  showBullets = true,
  showNavigation = true,
  showRating = true,
  showAddToCart = true,
  showLikeButton = true,
  showSaleTag = true,
  effect = "slide",
  backgroundColor = "",
  textColor = "",
}: BestSellersSliderProps) {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Generate card class based on selected style
  const getCardClass = () => {
    switch (cardStyle) {
      case "minimal":
        return "border-0 shadow-none hover:bg-muted/40";
      case "bordered":
        return "border-2 border-primary/20 shadow-none hover:border-primary/70";
      case "gradient":
        return "border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/10 hover:from-primary/10 hover:to-secondary/20";
      case "elevated":
      default:
        return "shadow-lg hover:shadow-xl";
    }
  };

  // Generate rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              "fill-current",
              i < Math.floor(rating)
                ? "text-yellow-500"
                : i < rating
                ? "text-yellow-500 opacity-50"
                : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-1 text-muted-foreground text-xs">({rating})</span>
      </div>
    );
  };

  // Get Swiper effect settings
  const getSwiperEffect = () => {
    switch (effect) {
      case "creative":
        return {
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          },
        };
      case "fade":
        return {
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        };
      default:
        return {};
    }
  };

  return (
    <div
      className="relative mx-auto py-8 w-full max-w-7xl"
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
    >
      <h2 className="mb-6 font-bold text-2xl text-center">{title}</h2>

      <div className="relative px-8">
        {showNavigation && (
          <>
            <button className="top-1/2 left-0 z-10 absolute bg-background/80 hover:bg-background shadow-md backdrop-blur-sm p-2 border rounded-full transition-all -translate-y-1/2 swiper-button-prev">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="top-1/2 right-0 z-10 absolute bg-background/80 hover:bg-background shadow-md backdrop-blur-sm p-2 border rounded-full transition-all -translate-y-1/2 swiper-button-next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCreative]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={
            showBullets
              ? {
                  clickable: true,
                  el: ".custom-pagination",
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          autoplay={
            swipeSpeed > 0
              ? { delay: swipeSpeed * 1000, disableOnInteraction: false }
              : false
          }
          className="pb-10"
          {...getSwiperEffect()}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                className={cn(
                  "overflow-hidden transition-all duration-300 h-full flex flex-col",
                  getCardClass()
                )}
              >
                <div className="group relative overflow-hidden">
                  <div className="z-10 absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Sale tag */}
                  {showSaleTag && product.sale && (
                    <Badge
                      variant="destructive"
                      className="top-2 right-2 z-20 absolute"
                    >
                      {product.salePercentage} OFF
                    </Badge>
                  )}

                  {/* Bestseller tag */}
                  {product.isBestseller && (
                    <Badge
                      variant="secondary"
                      className="top-2 left-2 z-20 absolute bg-amber-500 hover:bg-amber-500/90 text-white"
                    >
                      Bestseller
                    </Badge>
                  )}

                  {/* Category tag */}
                  <Badge
                    variant="outline"
                    className="bottom-2 left-2 z-20 absolute bg-background/80 backdrop-blur-sm"
                  >
                    {product.category}
                  </Badge>

                  {/* Quick action buttons that appear on hover */}
                  {showLikeButton && (
                    <button
                      onClick={() => toggleLike(product.id)}
                      className="top-2 right-2 z-20 absolute bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 backdrop-blur-sm p-2 rounded-full transition-opacity"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          likedProducts.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-foreground"
                        )}
                      />
                    </button>
                  )}
                </div>

                <CardContent className="flex flex-col flex-grow items-start p-4">
                  <h3 className="font-semibold text-lg leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating stars */}
                  {showRating && renderRating(product.rating)}

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium">{product.price}</span>
                    {product.sale && (
                      <span className="text-muted-foreground text-sm line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>

                {showAddToCart && (
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2 mt-2 w-full"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom pagination bullets */}
      {showBullets && (
        <div className="flex justify-center items-center gap-1 mx-auto mt-6 w-full custom-pagination"></div>
      )}

      <style jsx>{`
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          margin-top: 0;
          color: currentColor;
        }

        :global(.swiper-button-prev::after),
        :global(.swiper-button-next::after) {
          display: none;
        }

        :global(.swiper-pagination) {
          position: relative !important;
          bottom: -10px !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          background-color: ${bulletColor} !important;
          opacity: 0.5;
          transition: all 0.3s ease-in-out;
        }

        :global(.swiper-pagination-bullet-active) {
          background-color: ${bulletColor} !important;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
