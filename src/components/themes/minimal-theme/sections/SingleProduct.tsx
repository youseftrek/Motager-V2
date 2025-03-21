"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
}

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
}: Partial<ProductProps>) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({
    Color: variants?.[0]?.options[0]?.id || "",
    Size: variants?.[1]?.options[1]?.id || "",
  });
  const [quantity, setQuantity] = useState(1);

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
            <h1 className="font-bold text-3xl">{name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-muted-foreground text-sm">
                {rating} ({reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl">${finalPrice.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {originalPrice && finalPrice < originalPrice && (
              <Badge className="bg-green-100 hover:bg-green-100 ml-2 text-green-800">
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
                <div key={variant.type} className="space-y-3">
                  <h3 className="font-medium">{variant.type}</h3>
                  <RadioGroup
                    defaultValue={selectedVariants[variant.type]}
                    onValueChange={(value) =>
                      handleVariantChange(variant.type, value)
                    }
                  >
                    <div className="flex flex-wrap gap-3">
                      {variant.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.id}
                            id={`${variant.type}-${option.id}`}
                            disabled={!option.inStock}
                          />
                          <Label
                            htmlFor={`${variant.type}-${option.id}`}
                            className={`${
                              !option.inStock
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {option.name}
                            {option.additionalPrice !== undefined &&
                              option.additionalPrice !== 0 && (
                                <span className="ml-1 text-sm">
                                  {option.additionalPrice > 0
                                    ? `+$${option.additionalPrice.toFixed(2)}`
                                    : `-$${Math.abs(
                                        option.additionalPrice
                                      ).toFixed(2)}`}
                                </span>
                              )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
              <Separator />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1"
              disabled={!currentInStock}
              onClick={() => alert(`Added ${quantity} ${name} to cart`)}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              disabled={!currentInStock}
              onClick={() =>
                alert(`Proceeding to checkout with ${quantity} ${name}`)
              }
            >
              Buy Now
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="max-w-none prose">
                <p>{description}</p>
                <h3 className="mt-4 font-medium text-lg">Product Details</h3>
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
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="max-w-none prose">
                <p>{shippingInfo}</p>
                <h3 className="mt-4 font-medium text-lg">Shipping Options</h3>
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
                  <div className="flex justify-between items-center bg-primary/5 p-3 border border-primary rounded-md">
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}
