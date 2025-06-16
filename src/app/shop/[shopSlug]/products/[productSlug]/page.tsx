"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import { getStore } from "@/actions/getTheme";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
  ZoomIn,
  Loader,
} from "lucide-react";

// Import RelatedProducts component
import { RelatedProducts } from "./components";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetStoreBySlugQuery } from "@/redux/features/stores/storesApi";
import { useGetSingleProductQuery, useGetStoreProductsBySlugQuery } from "@/redux/features/products/productsApi";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

// Default theme colors
const defaultColors = {
  main: "#0070f3",
  text: { primary: "#333", secondary: "#666", inverted: "#fff" },
  background: { primary: "#fff", secondary: "#f5f5f5" },
  buttons: {
    primary: { background: "#0070f3", hover: "#0060df", text: "#fff" },
    secondary: { background: "#f5f5f5", hover: "#e5e5e5", text: "#333" },
    tertiary: {
      background: "transparent",
      hover: "rgba(0,0,0,0.05)",
      text: "#0070f3",
    },
  },
};

// Mock product data


// Mock related products
const relatedProducts: Product[] = [
  {
    id: 101,
    name: "Wireless Earbuds",
    description:
      "Premium wireless earbuds with noise cancellation and long battery life.",
    slug: "wireless-earbuds",
    published: true,
    startPrice: 149.99,
    main_image_url:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    ],
    category: { id: 1, slug: "electronics" },
  },
  {
    id: 102,
    name: "Portable Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound and 20-hour battery life.",
    slug: "portable-speaker",
    published: true,
    startPrice: 99.99,
    main_image_url:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    ],
    category: { id: 1, slug: "electronics" },
  },
  {
    id: 103,
    name: "Smart Watch",
    description:
      "Feature-rich smartwatch with health tracking and smartphone notifications.",
    slug: "smart-watch",
    published: true,
    startPrice: 249.99,
    main_image_url:
      "https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg",
    ],
    category: { id: 1, slug: "electronics" },
  },
  {
    id: 104,
    name: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    slug: "wireless-charger",
    published: true,
    startPrice: 39.99,
    main_image_url:
      "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg",
    images_url: [
      "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg",
    ],
    category: { id: 1, slug: "electronics" },
  },
];

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface ProductWithDetails extends Product {
  images_url: string[];
  reviews?: Review[];
  features?: string[];
  specifications?: Record<string, string>;
  skus: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
    cost_per_item: number;
    profit: number;
    margin: number;
    compare_at_price: number;
    image_url: string;
    variants: any[];
  }>;
  review_statistics:{
    "total_reviews": number,
    "average_rating": number,
    "rating_5_count": number,
    "rating_4_count": number,
    "rating_3_count": number,
    "rating_2_count": number,
    "rating_1_count": number
  }
}

// Helper to extract all variant types and values from skus
function getVariantOptions(skus: ProductWithDetails['skus']) {
  const variantMap: Record<string, Set<string>> = {};
  skus.forEach((sku) => {
    sku.variants.forEach((variant: { name: string; value: string }) => {
      if (!variantMap[variant.name]) variantMap[variant.name] = new Set();
      variantMap[variant.name].add(variant.value);
    });
  });
  // Convert sets to arrays
  return Object.fromEntries(
    Object.entries(variantMap).map(([k, v]) => [k, Array.from(v)])
  );
}

export default function SingleProductPage() {
  const { shopSlug, productSlug } = useParams();
  const storeSlug = shopSlug as string;
  const [themeColors, setThemeColors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {data:data} = useGetStoreBySlugQuery(storeSlug)
  const { data: productData, isLoading:IsProductloading, isError } = useGetSingleProductQuery(
    { id: Number(productSlug), storeId: data?.data?.id ?? 0 },
    { skip: !data?.data?.id }
  );

  // Product state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch()
  
  // Fetch theme colors
  useEffect(() => {
    const fetchThemeColors = async () => {
      setIsLoading(true);
      try {
        const response = await getStore(storeSlug);
        if (response.data?.theme?.themeSettings?.colors) {
          setThemeColors(response.data.theme.themeSettings.colors);
        } else {
          setThemeColors(defaultColors);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
        setError("Could not load store theme data. Using default theme.");
        setThemeColors(defaultColors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeColors();
  }, [storeSlug]);

  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;
  // Add CSS variables for styling
  useEffect(() => {
    if (colors) {
      document.documentElement.style.setProperty(
        "--ring",
        colors.buttons.primary.background
      );
    }

    return () => {
      document.documentElement.style.removeProperty("--ring");
    };
  }, [colors]);

  const product = productData as ProductWithDetails;
  const averageRating = product?.review_statistics?.average_rating || 0;
  const totalReviews = product?.review_statistics?.total_reviews || 0;

  // State for selected variants
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    Object.keys(getVariantOptions(product?.skus ?? [])).forEach((type) => {
      initial[type] = getVariantOptions(product?.skus ?? [])[type][0];
    });
    return initial;
  });

  // Find the SKU that matches the selected variants
  const selectedSKU = product?.skus.find((sku) =>
    sku.variants.every(
      (variant: { name: string; value: string }) =>
        selectedVariants[variant.name] === variant.value
    )
  ) || product?.skus[0];

  // Update handleQuantityChange and handleAddToCart to use selectedSKU
  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(quantity + delta, selectedSKU?.stock || 0)));
  };

  const handleAddToCart = () => {
    if (!selectedSKU) return;
    
    dispatch(
      addToCart({
        item: {
          id: product.id,
          name: product.name,
          price: `$${selectedSKU.price.toFixed(2)}`,
          image: selectedSKU.image_url || product.main_image_url,
          category: product.category.slug,
          sku_id: selectedSKU.id
        },
        storeSlug,
      })
    );
    
    toast.success(`${product.name} added to cart`);
  };

  const variantOptions = getVariantOptions(product?.skus ?? []);
  const variantTypes = Object.keys(variantOptions);

  if (isLoading || IsProductloading) {
    return (
      <div
        className="flex items-center justify-center min-h-[90vh]"
        style={{ backgroundColor: colors?.background?.primary || "#fff" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <Loader
            className="animate-spin w-8 h-8"
            size={32}
            style={{ color: colors?.text?.secondary || "#666" }}
          />
          <p
            className="font-medium"
            style={{ color: colors?.text?.secondary || "#666" }}
          >
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !productData) {
    return (
      <div
        className="flex items-center justify-center min-h-[90vh]"
        style={{ backgroundColor: colors?.background?.primary || "#fff" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <p
            className="font-medium text-red-500"
            style={{ color: colors?.text?.secondary || "#666" }}
          >
            Error loading product. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        className="min-h-screen"
        style={{ backgroundColor: colors.background.primary }}
      >
        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 mb-8">
            <Link
              href={`/shop/${storeSlug}/products`}
              className="flex items-center text-sm hover:underline"
              style={{ color: colors.text.secondary }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
            <span style={{ color: colors.text.secondary }}>/</span>
            <span
              className="text-sm capitalize"
              style={{ color: colors.text.secondary }}
            >
              {product.category.slug}
            </span>
            <span style={{ color: colors.text.secondary }}>/</span>
            <span
              className="text-sm font-medium"
              style={{ color: colors.text.primary }}
            >
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={selectedSKU?.image_url || product.images_url[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Zoom Overlay */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: colors.background.primary,
                        borderColor: colors.background.secondary,
                      }}
                    >
                      <ZoomIn
                        className="w-4 h-4"
                        style={{ color: colors.text.primary }}
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="relative aspect-square">
                      <Image
                        src={selectedSKU?.image_url || product.images_url[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Navigation Arrows */}
                {product.images_url.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage(Math.max(0, selectedImage - 1))
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: colors.background.primary,
                        borderColor: colors.background.secondary,
                      }}
                      disabled={selectedImage === 0}
                    >
                      <ChevronLeft
                        className="w-4 h-4"
                        style={{ color: colors.text.primary }}
                      />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage(
                          Math.min(product.images_url.length - 1, selectedImage + 1)
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: colors.background.primary,
                        borderColor: colors.background.secondary,
                      }}
                      disabled={selectedImage === product.images_url.length - 1}
                    >
                      <ChevronRight
                        className="w-4 h-4"
                        style={{ color: colors.text.primary }}
                      />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {product.images_url.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200",
                      selectedImage === index
                        ? "ring-2 ring-primary"
                        : "opacity-70 hover:opacity-100"
                    )}
                    style={{
                      borderColor:
                        selectedImage === index
                          ? colors.buttons.primary.background
                          : colors.background.secondary,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="capitalize"
                    style={{
                      backgroundColor: colors.buttons.secondary.background,
                      color: colors.buttons.secondary.text,
                    }}
                  >
                    {product.category.slug}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          style={{
                            borderColor: colors.background.secondary,
                            backgroundColor: isWishlisted
                              ? colors.buttons.primary.background
                              : colors.background.primary,
                            color: isWishlisted
                              ? colors.buttons.primary.text
                              : colors.text.secondary,
                          }}
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4",
                              isWishlisted && "fill-current"
                            )}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add to wishlist</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          style={{
                            borderColor: colors.background.secondary,
                            backgroundColor: colors.background.primary,
                            color: colors.text.secondary,
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share product</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <h1
                  className="text-3xl font-bold mb-3"
                  style={{ color: colors.text.primary }}
                >
                  {product.name}
                </h1>

                {/* Rating */}
                {totalReviews > 0 ? (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(averageRating) ? "fill-current" : ""
                          }
                          style={{
                            color:
                              i < Math.floor(averageRating)
                                ? colors.buttons.primary.background
                                : colors.background.secondary,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.text.primary }}
                    >
                      {averageRating.toFixed(1)}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      ({totalReviews} reviews)
                    </span>
                  </div>
                ) : (
                  <p style={{ color: colors.text.secondary }}>No reviews yet</p>
                )}

                <p
                  className="text-lg leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div
                className="border-t border-b py-6"
                style={{ borderColor: colors.background.secondary }}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    ${selectedSKU?.price?.toFixed(2) || product.startPrice?.toFixed(2) || "0.00"}
                  </span>
                  {selectedSKU?.compare_at_price && selectedSKU.compare_at_price > selectedSKU.price && (
                    <span
                      className="text-lg line-through"
                      style={{ color: colors.text.secondary }}
                    >
                      ${selectedSKU.compare_at_price.toFixed(2)}
                    </span>
                  )}
                  {selectedSKU?.stock > 0 ? (
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: colors.buttons.primary.background,
                        color: colors.buttons.primary.background,
                      }}
                    >
                      In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: "red",
                        color: "red",
                      }}
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div
                      className="flex items-center border rounded-lg"
                      style={{ borderColor: colors.background.secondary }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        style={{ color: colors.text.primary }}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span
                        className="px-4 py-2 min-w-[3rem] text-center"
                        style={{ color: colors.text.primary }}
                      >
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (selectedSKU?.stock ?? 0)}
                        style={{ color: colors.text.primary }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      {selectedSKU?.stock || 0} in stock
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full text-lg"
                  disabled={!selectedSKU?.stock}
                  style={{
                    backgroundColor: selectedSKU?.stock ? colors.buttons.primary.background : colors.background.secondary,
                    color: selectedSKU?.stock ? colors.buttons.primary.text : colors.text.secondary,
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSKU?.stock) {
                      e.currentTarget.style.backgroundColor = colors.buttons.primary.hover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSKU?.stock) {
                      e.currentTarget.style.backgroundColor = colors.buttons.primary.background;
                    }
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {selectedSKU?.stock ? (
                    <>Add to Cart - ${((selectedSKU?.price || 0) * quantity).toFixed(2)}</>
                  ) : (
                    "Out of Stock"
                  )}
                </Button>
              </div>

              {/* Product Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Truck,
                    title: "Free Shipping",
                    subtitle: "On orders over $50",
                  },
                  {
                    icon: Shield,
                    title: "2 Year Warranty",
                    subtitle: "Full coverage",
                  },
                  {
                    icon: RotateCcw,
                    title: "30-Day Returns",
                    subtitle: "Easy returns",
                  },
                ].map((benefit, index) => (
                  <Card
                    key={index}
                    style={{ borderColor: colors.background.secondary }}
                  >
                    <CardContent className="flex items-center space-x-3 p-4">
                      <benefit.icon
                        className="w-8 h-8 flex-shrink-0"
                        style={{ color: colors.buttons.primary.background }}
                      />
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: colors.text.primary }}
                        >
                          {benefit.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: colors.text.secondary }}
                        >
                          {benefit.subtitle}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Variants */}
              {variantTypes.length > 0 && (
                <div className="space-y-4">
                  {variantTypes.map((type) => (
                    <div key={type}>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.text.primary }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variantOptions[type].map((value: string) => (
                          <button
                            key={value}
                            onClick={() =>
                              setSelectedVariants((prev) => ({ ...prev, [type]: value }))
                            }
                            className={cn(
                              "px-4 py-2 text-sm border rounded-lg transition-all duration-200",
                              selectedVariants[type] === value
                                ? "ring-2 ring-primary"
                                : "hover:border-opacity-60"
                            )}
                            style={{
                              backgroundColor:
                                selectedVariants[type] === value
                                  ? colors.buttons.primary.background
                                  : colors.background.primary,
                              color:
                                selectedVariants[type] === value
                                  ? colors.buttons.primary.text
                                  : colors.text.primary,
                              borderColor:
                                selectedVariants[type] === value
                                  ? colors.buttons.primary.background
                                  : colors.background.secondary,
                            }}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="features" className="w-full">
              <TabsList
                className="grid w-full grid-cols-3"
                style={{ backgroundColor: colors.background.secondary }}
              >
                <TabsTrigger
                  value="features"
                  style={
                    {
                      color: colors.text.primary,
                      "&[dataState=active]": {
                        backgroundColor: colors.buttons.primary.background,
                        color: colors.buttons.primary.text,
                      },
                    } as any
                  }
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  style={
                    {
                      color: colors.text.primary,
                      "&[dataState=active]": {
                        backgroundColor: colors.buttons.primary.background,
                        color: colors.buttons.primary.text,
                      },
                    } as any
                  }
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  style={
                    {
                      color: colors.text.primary,
                      "&[dataState=active]": {
                        backgroundColor: colors.buttons.primary.background,
                        color: colors.buttons.primary.text,
                      },
                    } as any
                  }
                >
                  Reviews ({totalReviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-8">
                <Card style={{ borderColor: colors.background.secondary }}>
                  <CardContent className="p-6">
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Key Features
                    </h3>
                    <div className="grid gap-3">
                      {product.features?.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                            style={{ color: colors.buttons.primary.background }}
                          />
                          <span style={{ color: colors.text.secondary }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-8">
                <Card style={{ borderColor: colors.background.secondary }}>
                  <CardContent className="p-6">
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Technical Specifications
                    </h3>
                    <div className="grid gap-4">
                      {product.specifications && Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b last:border-b-0"
                            style={{ borderColor: colors.background.secondary }}
                          >
                            <span
                              className="font-medium"
                              style={{ color: colors.text.primary }}
                            >
                              {key}
                            </span>
                            <span style={{ color: colors.text.secondary }}>
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <Card style={{ borderColor: colors.background.secondary }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: colors.text.primary }}
                          >
                            Customer Reviews
                          </h3>
                          {totalReviews > 0 ? (
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={
                                      i < Math.floor(averageRating)
                                        ? "fill-current"
                                        : ""
                                    }
                                    style={{
                                      color:
                                        i < Math.floor(averageRating)
                                          ? colors.buttons.primary.background
                                          : colors.background.secondary,
                                    }}
                                  />
                                ))}
                              </div>
                              <span
                                className="font-semibold"
                                style={{ color: colors.text.primary }}
                              >
                                {averageRating.toFixed(1)} out of 5
                              </span>
                              <span style={{ color: colors.text.secondary }}>
                                ({totalReviews} reviews)
                              </span>
                            </div>
                          ) : (
                            <p style={{ color: colors.text.secondary }}>
                              No reviews yet
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          style={{
                            borderColor: colors.buttons.primary.background,
                            color: colors.buttons.primary.background,
                          }}
                        >
                          Write a Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  {product.reviews && product.reviews.length > 0 && (
                    <div className="space-y-4">
                      {product.reviews.map((review: Review) => (
                        <Card
                          key={review.id}
                          style={{ borderColor: colors.background.secondary }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={review.avatar} />
                                <AvatarFallback
                                  style={{
                                    backgroundColor: colors.background.secondary,
                                  }}
                                >
                                  {review.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4
                                    className="font-semibold"
                                    style={{ color: colors.text.primary }}
                                  >
                                    {review.name}
                                  </h4>
                                  <span
                                    className="text-sm"
                                    style={{ color: colors.text.secondary }}
                                  >
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={
                                        i < review.rating ? "fill-current" : ""
                                      }
                                      style={{
                                        color:
                                          i < review.rating
                                            ? colors.buttons.primary.background
                                            : colors.background.secondary,
                                      }}
                                    />
                                  ))}
                                </div>
                                <p style={{ color: colors.text.secondary }}>
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <RelatedProducts
            products={relatedProducts as Product[]}
            storeSlug={storeSlug}
            colors={colors}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
