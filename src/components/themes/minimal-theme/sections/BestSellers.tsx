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
import { useState, useEffect, useRef } from "react";
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";
import {
  useResponsiveClasses,
  padding,
  textSize,
} from "@/hooks/use-responsive-classes";
import { useDeviceView } from "@/providers/device-view-context";

// Add custom CSS for pagination
import "./swiper-custom.css";

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
  themeColors?: any;
};

// This config structure matches what ThemeEditor expects
export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Section Title",
      default: "Best Sellers",
      placeholder: "Enter section title",
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
  bulletColor,
  showBullets = true,
  showNavigation = true,
  showRating = true,
  showAddToCart = true,
  showLikeButton = true,
  showSaleTag = true,
  effect = "slide",
  backgroundColor,
  textColor,
  themeColors,
}: BestSellersSliderProps) {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const deviceView = useDeviceView();
  const swiperRef = useRef<any>(null);
  const [slidesPerView, setSlidesPerView] = useState<number | undefined>(
    undefined
  );

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Extract specific colors for backward compatibility
  const primaryText = colors.text.primary;
  const secondaryText = colors.text.secondary;
  const primaryBg = colors.background.primary;
  const secondaryBg = colors.background.secondary;

  // Use theme colors if no explicit colors are provided
  const bgColor = backgroundColor || primaryBg;
  const txtColor = textColor || primaryText;
  const bulletClr = bulletColor || colors.buttons.primary.background;

  // Update slides per view when device changes
  useEffect(() => {
    if (deviceView?.isPreviewMode) {
      let newSlidesPerView: number;

      switch (deviceView.activeDevice) {
        case "mobile":
          newSlidesPerView = 1;
          break;
        case "tablet":
          newSlidesPerView = 2;
          break;
        case "desktop":
        default:
          newSlidesPerView = 4;
          break;
      }

      setSlidesPerView(newSlidesPerView);

      // Force swiper to update
      if (swiperRef.current && swiperRef.current.swiper) {
        setTimeout(() => {
          swiperRef.current.swiper.params.slidesPerView = newSlidesPerView;
          swiperRef.current.swiper.update();
        }, 0);
      }
    } else {
      setSlidesPerView(undefined);
    }
  }, [deviceView?.activeDevice, deviceView?.isPreviewMode]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getCardClass = () => {
    switch (cardStyle) {
      case "minimal":
        return "border-0 bg-transparent shadow-none";
      case "bordered":
        return "border shadow-none";
      case "gradient":
        return "border-0 bg-gradient-to-br from-primary/20 to-secondary/20 shadow-md";
      case "elevated":
      default:
        return "border shadow-md";
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < Math.floor(rating) ? "fill-current" : "fill-none",
              "mr-0.5"
            )}
            style={{ color: colors.buttons.primary.background }}
          />
        ))}
        <span className="ml-1 text-xs" style={{ color: secondaryText }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const getSwiperEffect = () => {
    switch (effect) {
      case "creative":
        return {
          effect: "creative",
          creativeEffect: {
            prev: {
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
      className="py-12"
      style={{ backgroundColor: bgColor, color: txtColor }}
    >
      <div className="container mx-auto px-4">
        <ThemedHeading
          level={2}
          className="text-3xl font-bold text-center mb-8"
          colors={colors}
        >
          {title}
        </ThemedHeading>

        <div className="relative">
          {showNavigation && (
            <>
              <div
                className="swiper-button-prev absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md"
                style={{ color: colors.buttons.primary.background }}
              >
                <ChevronLeft size={20} />
              </div>
              <div
                className="swiper-button-next absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md"
                style={{ color: colors.buttons.primary.background }}
              >
                <ChevronRight size={20} />
              </div>
            </>
          )}

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCreative]}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={
              showBullets
                ? {
                    clickable: true,
                    el: ".swiper-pagination",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                  }
                : false
            }
            autoplay={
              swipeSpeed > 0
                ? {
                    delay: swipeSpeed * 1000,
                    disableOnInteraction: false,
                  }
                : false
            }
            breakpoints={
              !deviceView?.isPreviewMode
                ? {
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }
                : undefined
            }
            {...getSwiperEffect()}
            className="mb-8"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card className={cn("h-full overflow-hidden", getCardClass())}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {showSaleTag && product.sale && (
                      <Badge
                        className="absolute left-2 top-2"
                        style={{
                          backgroundColor: colors.buttons.secondary.background,
                          color: colors.buttons.secondary.text,
                        }}
                      >
                        Sale {product.salePercentage}
                      </Badge>
                    )}
                    {product.isBestseller && (
                      <Badge
                        className="absolute right-2 top-2"
                        style={{
                          backgroundColor: colors.buttons.primary.background,
                          color: colors.buttons.primary.text,
                        }}
                      >
                        Best Seller
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <ThemedText
                      variant="secondary"
                      className="mb-1 text-sm font-medium opacity-70"
                      colors={colors}
                    >
                      {product.category}
                    </ThemedText>
                    <ThemedHeading
                      level={3}
                      className="mb-2 font-semibold"
                      colors={colors}
                    >
                      {product.name}
                    </ThemedHeading>
                    <div className="flex items-center justify-between">
                      <div>
                        <ThemedText
                          variant="primary"
                          className="font-medium"
                          colors={colors}
                        >
                          {product.price}
                        </ThemedText>
                        {product.originalPrice && (
                          <ThemedText
                            variant="secondary"
                            className="ml-2 text-sm line-through opacity-70"
                            colors={colors}
                          >
                            {product.originalPrice}
                          </ThemedText>
                        )}
                      </div>
                      {showRating && renderRating(product.rating)}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full gap-2">
                      {showAddToCart && (
                        <ThemedButton
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          colors={colors}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          Add
                        </ThemedButton>
                      )}
                      {showLikeButton && (
                        <ThemedButton
                          variant={
                            likedProducts.includes(product.id)
                              ? "primary"
                              : "tertiary"
                          }
                          size="sm"
                          onClick={() => toggleLike(product.id)}
                          colors={colors}
                        >
                          <Heart
                            size={16}
                            className={cn(
                              likedProducts.includes(product.id) &&
                                "fill-current"
                            )}
                          />
                        </ThemedButton>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination bullets */}
        {showBullets && (
          <div
            className="swiper-pagination custom-pagination"
            style={
              {
                "--swiper-pagination-color": bulletClr,
                "--swiper-pagination-bullet-inactive-color": "#ccc",
                "--swiper-pagination-bullet-size": "10px",
                "--swiper-pagination-bullet-horizontal-gap": "6px",
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </div>
  );
}
