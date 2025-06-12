"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { extractThemeColors, ThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";

interface ProductReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProductVariant {
  type: string;
  options: Array<{
    id: string;
    name: string;
    inStock: boolean;
    additionalPrice?: number;
  }>;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  inStock: boolean;
  reviews: ProductReview[];
  shippingInfo: string;
  variants?: ProductVariant[];
  themeColors?: any;
}

export const config = {
  inputs: {
    name: {
      type: "text" as const,
      label: "Product Name",
      default: "Minimal Desk Lamp",
    },
    price: {
      type: "number" as const,
      label: "Price",
      default: 129.99,
    },
    originalPrice: {
      type: "number" as const,
      label: "Original Price (for sale items)",
      default: 159.99,
    },
    rating: {
      type: "number" as const,
      label: "Rating (1-5)",
      min: 0,
      max: 5,
      default: 4.5,
    },
    reviewCount: {
      type: "number" as const,
      label: "Number of Reviews",
      default: 42,
    },
    description: {
      type: "textarea" as const,
      label: "Product Description",
      default:
        "A sleek, adjustable desk lamp with minimalist design. Features touch-sensitive controls and multiple brightness settings. Perfect for your home office or reading nook.",
    },
    inStock: {
      type: "boolean" as const,
      label: "In Stock",
      default: true,
    },
    shippingInfo: {
      type: "textarea" as const,
      label: "Shipping Information",
      default:
        "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). All orders are processed within 24 hours. International shipping is available for select countries.",
    },
  },
};

export default function SingleProduct({
  id = "1",
  name = "Minimal Desk Lamp - Test Product",
  price = 129.99,
  originalPrice = 159.99,
  rating = 4.5,
  reviewCount = 42,
  description = "A sleek, adjustable desk lamp with minimalist design. Features touch-sensitive controls and multiple brightness settings. Perfect for your home office or reading nook.",
  images = [
    "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.pexels.com/photos/7439757/pexels-photo-7439757.jpeg?auto=compress&cs=tinysrgb&w=2000",
  ],
  inStock = true,
  reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      rating: 5,
      date: "2023-11-15",
      comment:
        "Absolutely love this lamp! The design is sleek and modern, and the adjustable brightness is perfect for my home office.",
    },
    {
      id: 2,
      author: "Sam Taylor",
      rating: 4,
      date: "2023-10-28",
      comment:
        "Great quality and looks fantastic on my desk. The only reason I'm giving 4 stars is because the touch controls are a bit sensitive.",
    },
    {
      id: 3,
      author: "Jamie Smith",
      rating: 5,
      date: "2023-10-05",
      comment:
        "Excellent product. The minimalist design fits perfectly with my decor, and the light quality is superb.",
    },
  ],
  shippingInfo = "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). All orders are processed within 24 hours. International shipping is available for select countries.",
  variants = [
    {
      type: "Color",
      options: [
        { id: "black", name: "Matte Black", inStock: true },
        { id: "white", name: "White", inStock: true },
        { id: "metal", name: "Brushed Metal", inStock: true },
      ],
    },
    {
      type: "Size",
      options: [
        { id: "small", name: "Small", inStock: true, additionalPrice: -20 },
        { id: "medium", name: "Medium", inStock: true },
        { id: "large", name: "Large", inStock: false, additionalPrice: 30 },
      ],
    },
  ],
  themeColors,
}: Partial<ProductProps>) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({
    Color: variants?.[0]?.options[0]?.id || "",
    Size: variants?.[1]?.options[1]?.id || "",
  });
  const [quantity, setQuantity] = useState(1);

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Calculate final price based on selected variants
  const calculateFinalPrice = () => {
    let finalPrice = price;

    variants?.forEach((variant) => {
      const selectedOption = variant.options.find(
        (opt) => opt.id === selectedVariants[variant.type]
      );
      if (selectedOption?.additionalPrice) {
        finalPrice += selectedOption.additionalPrice;
      }
    });

    return finalPrice;
  };

  const finalPrice = calculateFinalPrice();

  // Check if currently selected variant combination is in stock
  const isCurrentSelectionInStock = () => {
    let result = inStock;

    variants?.forEach((variant) => {
      const selectedOption = variant.options.find(
        (opt) => opt.id === selectedVariants[variant.type]
      );
      if (selectedOption && !selectedOption.inStock) {
        result = false;
      }
    });

    return result;
  };

  const currentInStock = isCurrentSelectionInStock();

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="mx-auto px-4 py-12 container">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative border border-border rounded-lg aspect-square overflow-hidden">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div
            className="flex space-x-2 overflow-x-auto snap-x scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 snap-center ${
                  selectedImage === image ? "border-primary" : "border-border"
                }`}
                style={{
                  borderColor:
                    selectedImage === image
                      ? colors.buttons.primary.background
                      : "#e0e0e0",
                }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <ThemedHeading
              level={1}
              className="font-bold text-3xl"
              colors={colors}
            >
              {name}
            </ThemedHeading>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4`}
                    style={{
                      color:
                        i < Math.floor(rating)
                          ? colors.buttons.primary.background
                          : "#e0e0e0",
                      fill:
                        i < Math.floor(rating)
                          ? colors.buttons.primary.background
                          : "none",
                    }}
                  />
                ))}
                <ThemedText
                  variant="secondary"
                  className="ml-2 text-sm font-medium"
                  colors={colors}
                >
                  {rating} ({reviewCount} reviews)
                </ThemedText>
              </div>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <ThemedHeading
              level={3}
              className="text-3xl font-bold"
              colors={colors}
            >
              ${finalPrice.toFixed(2)}
            </ThemedHeading>
            {originalPrice && originalPrice > finalPrice && (
              <ThemedText
                variant="secondary"
                className="text-lg line-through opacity-70"
                colors={colors}
              >
                ${originalPrice.toFixed(2)}
              </ThemedText>
            )}
            {originalPrice && originalPrice > finalPrice && (
              <Badge
                className="ml-2"
                style={{
                  backgroundColor: colors.buttons.secondary.background,
                  color: colors.buttons.secondary.text,
                }}
              >
                {Math.round(
                  ((originalPrice - finalPrice) / originalPrice) * 100
                )}
                % OFF
              </Badge>
            )}
          </div>

          <div>
            <Badge
              variant={currentInStock ? "default" : "outline"}
              className={
                currentInStock
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : ""
              }
            >
              {currentInStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <Separator />

          {/* Product Variants */}
          {variants && variants.length > 0 && (
            <div className="space-y-4">
              {variants.map((variant) => (
                <div key={variant.type} className="space-y-2">
                  <Label htmlFor={variant.type}>
                    <ThemedText variant="primary" colors={colors}>
                      {variant.type}:
                    </ThemedText>
                  </Label>
                  <RadioGroup
                    id={variant.type}
                    value={selectedVariants[variant.type]}
                    onValueChange={(value) =>
                      handleVariantChange(variant.type, value)
                    }
                    className="flex flex-wrap gap-2"
                  >
                    {variant.options.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          disabled={!option.inStock}
                          style={{
                            borderColor: colors.buttons.primary.background,
                            backgroundColor:
                              selectedVariants[variant.type] === option.id
                                ? colors.buttons.primary.background
                                : "transparent",
                          }}
                        />
                        <Label
                          htmlFor={option.id}
                          className={`ml-2 ${
                            !option.inStock ? "opacity-50" : ""
                          }`}
                        >
                          <ThemedText variant="secondary" colors={colors}>
                            {option.name}
                            {option.additionalPrice &&
                              option.additionalPrice !== 0 && (
                                <span>
                                  {" "}
                                  ({option.additionalPrice > 0 ? "+" : ""}$
                                  {Math.abs(option.additionalPrice).toFixed(2)})
                                </span>
                              )}
                            {!option.inStock && " (Out of Stock)"}
                          </ThemedText>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Separator />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <Label htmlFor="quantity">
              <ThemedText variant="primary" colors={colors}>
                Quantity:
              </ThemedText>
            </Label>
            <div className="flex items-center border rounded-md">
              <button
                type="button"
                className="px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ color: colors.text.primary }}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                type="button"
                className="px-3 py-1 border-l"
                onClick={() => setQuantity(quantity + 1)}
                style={{ color: colors.text.primary }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <ThemedButton
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={!currentInStock}
              colors={colors}
            >
              {currentInStock ? "Add to Cart" : "Out of Stock"}
            </ThemedButton>
            <ThemedButton
              variant="tertiary"
              size="lg"
              className="flex-1"
              colors={colors}
            >
              Add to Wishlist
            </ThemedButton>
          </div>

          <Separator />

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="w-full">
              <TabsTrigger
                value="description"
                className="flex-1"
                style={
                  {
                    color: colors.text.primary,
                    "--tab-accent": colors.buttons.primary.background,
                  } as React.CSSProperties
                }
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="flex-1"
                style={
                  {
                    color: colors.text.primary,
                    "--tab-accent": colors.buttons.primary.background,
                  } as React.CSSProperties
                }
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex-1"
                style={
                  {
                    color: colors.text.primary,
                    "--tab-accent": colors.buttons.primary.background,
                  } as React.CSSProperties
                }
              >
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="max-w-none prose">
                <ThemedText variant="secondary" colors={colors}>
                  {description}
                </ThemedText>
                <ThemedHeading
                  level={3}
                  className="mt-4 font-medium text-lg"
                  colors={colors}
                >
                  Product Details
                </ThemedHeading>
                <ul className="space-y-1 mt-2 pl-5 list-disc">
                  <li>Adjustable arm with 3 pivot points</li>
                  <li>Touch-sensitive controls</li>
                  <li>5 brightness levels</li>
                  <li>Energy-efficient LED bulb included</li>
                  <li>
                    Available in matte black, white, and brushed metal finishes
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="max-w-none prose">
                <ThemedText variant="secondary" colors={colors}>
                  {shippingInfo}
                </ThemedText>
                <ThemedHeading
                  level={3}
                  className="mt-4 font-medium text-lg"
                  colors={colors}
                >
                  Shipping Options
                </ThemedHeading>
                <div className="space-y-3 mt-2">
                  <div className="flex justify-between items-center p-3 border border-border rounded-md">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        3-5 business days
                      </p>
                    </div>
                    <p className="font-medium">$4.99</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-border rounded-md">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        1-2 business days
                      </p>
                    </div>
                    <p className="font-medium">$12.99</p>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 border rounded-md"
                    style={{
                      backgroundColor: `${colors.buttons.primary.background}10`,
                      borderColor: colors.buttons.primary.background,
                    }}
                  >
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        On orders over $50
                      </p>
                    </div>
                    <p className="font-medium">$0.00</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex justify-between">
                      <ThemedText
                        variant="primary"
                        className="font-semibold"
                        colors={colors}
                      >
                        {review.author}
                      </ThemedText>
                      <ThemedText
                        variant="secondary"
                        className="text-sm"
                        colors={colors}
                      >
                        {review.date}
                      </ThemedText>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4`}
                          style={{
                            color:
                              i < review.rating
                                ? colors.buttons.primary.background
                                : "#e0e0e0",
                            fill:
                              i < review.rating
                                ? colors.buttons.primary.background
                                : "none",
                          }}
                        />
                      ))}
                    </div>
                    <ThemedText variant="secondary" colors={colors}>
                      {review.comment}
                    </ThemedText>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
