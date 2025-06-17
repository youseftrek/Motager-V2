"use client";

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
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  ShoppingBag,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
  Eye,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { extractThemeColors } from "../theme-utils";
import {  ThemedHeading, ThemedText } from "../theme-components";
import { useDeviceView } from "@/providers/device-view-context";
import { useAppDispatch } from "@/redux/app/hooks";
import { useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

// Add custom CSS for pagination
import "./swiper-custom.css";
import { useGetStoreProductsBySlugQuery } from "@/redux/features/products/productsApi";

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
    slug: "luxury-sofa",
    price: "$299.99",
    originalPrice: "$399.99",
    rating: 4.8,
    sale: true,
    salePercentage: "25%",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    category: "Furniture",
    isBestseller: true,
    description:
      "A premium luxury sofa with high-quality materials and elegant design for your living room.",
  },
  {
    id: 2,
    name: "Modern Chair",
    slug: "modern-chair",
    price: "$149.99",
    originalPrice: "$189.99",
    rating: 4.5,
    sale: true,
    salePercentage: "20%",
    image: "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
    category: "Furniture",
    isBestseller: true,
    description:
      "Contemporary chair design with ergonomic support and durable construction for comfort.",
  },
  {
    id: 3,
    name: "Elegant Lamp",
    slug: "elegant-lamp",
    price: "$79.99",
    originalPrice: "$99.99",
    rating: 4.2,
    sale: false,
    image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
    category: "Lighting",
    isBestseller: false,
    description:
      "Modern lamp with adjustable brightness and stylish design to complement any room decor.",
  },
  {
    id: 4,
    name: "Wooden Table",
    slug: "wooden-table",
    price: "$199.99",
    originalPrice: "$249.99",
    rating: 4.6,
    sale: true,
    salePercentage: "15%",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    category: "Furniture",
    isBestseller: true,
    description:
      "Handcrafted wooden table made from sustainable materials with a natural finish.",
  },
  {
    id: 5,
    name: "Ceramic Vase",
    slug: "ceramic-vase",
    price: "$59.99",
    originalPrice: "$79.99",
    rating: 4.3,
    sale: true,
    salePercentage: "20%",
    image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    category: "Decor",
    isBestseller: false,
    description:
      "Artisan ceramic vase with unique texture and design, perfect for fresh or dried flowers.",
  },
  {
    id: 6,
    name: "Bookshelf Unit",
    slug: "bookshelf-unit",
    price: "$149.99",
    originalPrice: "$179.99",
    rating: 4.7,
    sale: false,
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
    category: "Furniture",
    isBestseller: true,
    description:
      "Versatile bookshelf with adjustable shelves and modern design to organize your collection.",
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

  // Redux
  const dispatch = useAppDispatch();
  const { shopSlug } = useParams();
  const storeSlug = shopSlug as string;
  
  // Check if we're in the builder page
  const [isBuilderPage, setIsBuilderPage] = useState(false);
  
  useEffect(() => {
    // Check if the URL contains '/builder'
    setIsBuilderPage(window.location.pathname.includes('/builder'));
  }, []);
  
  // Only fetch products if not in builder page
  const {data, isLoading} = useGetStoreProductsBySlugQuery(
    {storeSlug},
    { skip: isBuilderPage }
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

  // const handleAddToCart = (product: any) => {
  //   dispatch(
  //     addToCart({
  //       item: {
  //         id: product.id,
  //         name: product.name,
  //         price: product.startPrice,
  //         image: product.main_image_url,
  //         category: product.category.slug,
  //       },
  //       storeSlug,
  //     })
  //   );
  //   toast.success(`${product.name} added to cart`);
  // };

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

  // Function to render product slides based on whether we're in builder mode or not
  const renderProductSlides = () => {
    // Always use placeholder products in builder mode
    if (isBuilderPage) {
      return products.map((product) => (
        <SwiperSlide key={product.id}>
          <Card
            className={cn(
              "h-full overflow-hidden group hover:shadow-lg transition-all duration-300",
              getCardClass()
            )}
          >
            <div className="relative aspect-square overflow-hidden">
              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(product.id);
                      }}
                      style={{
                        backgroundColor: colors.background.primary,
                        borderColor: colors.background.secondary,
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedProducts.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                        style={{
                          color: likedProducts.includes(product.id)
                            ? "#ef4444"
                            : colors.text.secondary,
                        }}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      backgroundColor: colors.background.secondary,
                      color: colors.text.primary,
                    }}
                  >
                    Add to wishlist
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                      style={{
                        backgroundColor: colors.background.primary,
                        borderColor: colors.background.secondary,
                        color: colors.text.secondary,
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      backgroundColor: colors.background.secondary,
                      color: colors.text.primary,
                    }}
                  >
                    Quick view
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Link 
                  className={cn(
                    buttonVariants({
                      variant:"secondary",
                      size:"sm"
                    })
                  )}
                  style={{
                    backgroundColor: colors.buttons.primary.background,
                    color: colors.buttons.primary.text,
                  }} 
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                </Link>
              </div>

              {/* Badges */}
              {product.sale && showSaleTag && (
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
                </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <ThemedHeading
                  level={3}
                  className="font-semibold"
                  colors={colors}
                >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-primary transition-colors duration-200"
                    style={{ color: colors.text.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        colors.buttons.primary.background;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.text.primary;
                    }}
                  >
                    {product.name}
                  </Link>
                </ThemedHeading>
                <Badge
                  variant="outline"
                  className="ml-2 capitalize"
                  style={{
                    borderColor: colors.background.secondary,
                    backgroundColor: colors.buttons.tertiary.background,
                    color: colors.text.secondary,
                  }}
                >
                  {product.category}
                </Badge>
              </div>

              <p
                className="text-sm my-3 line-clamp-2"
                style={{ color: colors.text.secondary }}
              >
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <ThemedText
                    variant="primary"
                    className="text-2xl font-bold"
                    colors={colors}
                  >
                    {product.price}
                  </ThemedText>
                  {product.originalPrice && product.sale && (
                    <ThemedText
                      variant="secondary"
                      className="text-sm line-through ml-2"
                      colors={colors}
                    >
                      {product.originalPrice}
                    </ThemedText>
                  )}
                </div>
                {showRating && (
                  <div>{renderRating(product.rating)}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ));
    }
    
    // Show empty state if no products are available
    if (!data?.products || data.products.length === 0) {
      return (
        <SwiperSlide>
          <Card className={cn("h-full flex flex-col items-center justify-center py-16 px-4 text-center", getCardClass())}>
            <ShoppingBag className="h-16 w-16 mb-4 opacity-20" style={{ color: colors.text.secondary }} />
            <ThemedHeading level={3} className="text-xl mb-2" colors={colors}>
              No Products Available
            </ThemedHeading>
            <ThemedText variant="secondary" className="max-w-sm" colors={colors}>
              There are no products in this collection yet. Products added to your store will appear here.
            </ThemedText>
          </Card>
        </SwiperSlide>
      );
    }
    
    // Use real products from API when not in builder
    return data.products.map((product: any) => (
                <SwiperSlide key={product.id}>
                  <Card
                    className={cn(
                      "h-full overflow-hidden group hover:shadow-lg transition-all duration-300",
                      getCardClass()
                    )}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Link
                        href={`/shop/${storeSlug}/products/${product.id}`}
                      >
                        <Image
                          src={product.main_image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </Link>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleLike(product.id);
                              }}
                              style={{
                                backgroundColor: colors.background.primary,
                                borderColor: colors.background.secondary,
                              }}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  likedProducts.includes(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : ""
                                }`}
                                style={{
                                  color: likedProducts.includes(product.id)
                                    ? "#ef4444"
                                    : colors.text.secondary,
                                }}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            style={{
                              backgroundColor: colors.background.secondary,
                              color: colors.text.primary,
                            }}
                          >
                            Add to wishlist
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full"
                              style={{
                                backgroundColor: colors.background.primary,
                                borderColor: colors.background.secondary,
                                color: colors.text.secondary,
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            style={{
                              backgroundColor: colors.background.secondary,
                              color: colors.text.primary,
                            }}
                          >
                            Quick view
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Link 
                          className={cn(
                            buttonVariants({
                              variant:"secondary",
                              size:"sm"
                            })
                          )}
                          style={{
                            backgroundColor: colors.buttons.primary.background,
                            color: colors.buttons.primary.text,
                          }} href={`/shop/${shopSlug}/products/${product.id}`}>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                        </Link>
                      </div>

                      {/* Badges */}
                      {product.has_variants && (
                        <Badge
                          className="absolute left-2 top-2"
                          style={{
                            backgroundColor: colors.buttons.secondary.background,
                            color: colors.buttons.secondary.text,
                          }}
                        >
                          Has Variants
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <ThemedHeading
                          level={3}
                          className="font-semibold"
                          colors={colors}
                        >
                          <Link
                            href={`/shop/${storeSlug}/products/${product.slug}`}
                            className="hover:text-primary transition-colors duration-200"
                            style={{ color: colors.text.primary }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                colors.buttons.primary.background;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = colors.text.primary;
                            }}
                          >
                            {product.name}
                          </Link>
                        </ThemedHeading>
                        <Badge
                          variant="outline"
                          className="ml-2 capitalize"
                          style={{
                            borderColor: colors.background.secondary,
                            backgroundColor: colors.buttons.tertiary.background,
                            color: colors.text.secondary,
                          }}
                        >
                {product.category?.slug}
                        </Badge>
                      </div>

                      <p
                        className="text-sm my-3 line-clamp-2"
                        style={{ color: colors.text.secondary }}
                      >
                        {product.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <ThemedText
                            variant="primary"
                            className="text-2xl font-bold"
                            colors={colors}
                          >
                            ${product.startPrice}
                          </ThemedText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
    ));
  };

  return (
    <TooltipProvider>
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
              {renderProductSlides()}
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
    </TooltipProvider>
  );
}
