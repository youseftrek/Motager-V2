"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { Product } from "@/types/product";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/redux/app/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  storeSlug: string;
  viewMode: "grid" | "list";
  colors: any;
  wishlist: Set<number>;
  toggleWishlist: (productId: number) => void;
}

export default function ProductCard({
  product,
  storeSlug,
  viewMode,
  colors,
  wishlist,
  toggleWishlist,
}: ProductCardProps) {
  // Redux
  const dispatch = useAppDispatch();

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link

    dispatch(
      addToCart({
        item: {
          id: product.id,
          name: product.name,
          price: `$${product.startPrice.toFixed(2)}`,
          image: product.main_image_url,
          category: product.category.slug,
        },
        storeSlug,
      })
    );
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card
      key={product.id}
      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
      style={{
        backgroundColor: colors.background.primary,
        borderColor: colors.background.secondary,
      }}
    >
      <div className={viewMode === "list" ? "flex flex-col sm:flex-row" : ""}>
        <div
          className={`relative ${
            viewMode === "list"
              ? "w-full sm:w-48 md:w-64 lg:w-72 flex-shrink-0"
              : "aspect-square"
          }`}
        >
          <div
            className={
              viewMode === "list"
                ? "aspect-video sm:aspect-square"
                : "aspect-square"
            }
          >
            <Image
              src={product.main_image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  style={{
                    backgroundColor: colors.background.primary,
                    borderColor: colors.background.secondary,
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                    style={{
                      color: wishlist.has(product.id)
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
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              className="rounded-full"
              onClick={handleAddToCart}
              style={{
                backgroundColor: colors.buttons.primary.background,
                color: colors.buttons.primary.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.buttons.primary.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.buttons.primary.background;
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className={viewMode === "list" ? "flex-1" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Link href={`/shop/${storeSlug}/products/${product.slug}`}>
                <h3
                  className="font-semibold hover:text-primary transition-colors duration-200"
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
                </h3>
              </Link>
              <Badge
                variant="outline"
                className="ml-2 capitalize"
                style={{
                  borderColor: colors.background.secondary,
                  backgroundColor: colors.buttons.tertiary.background,
                  color: colors.text.secondary,
                }}
              >
                {product.category.slug}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p
              className={`text-sm mb-3 ${
                viewMode === "list"
                  ? "line-clamp-3 md:line-clamp-4"
                  : "line-clamp-2"
              }`}
              style={{ color: colors.text.secondary }}
            >
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < 4 ? "fill-current" : ""}
                    style={{
                      color:
                        i < 4
                          ? colors.buttons.primary.background
                          : colors.background.secondary,
                    }}
                  />
                ))}
              </div>
              <span
                className="text-xs"
                style={{ color: colors.text.secondary }}
              >
                (4.0)
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <div className="flex justify-between items-center w-full">
              <div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: colors.text.primary }}
                >
                  ${product.startPrice.toFixed(2)}
                </span>
              </div>
              {viewMode === "list" && (
                <Button
                  onClick={handleAddToCart}
                  style={{
                    backgroundColor: colors.buttons.primary.background,
                    color: colors.buttons.primary.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.buttons.primary.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.buttons.primary.background;
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
