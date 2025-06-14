"use client";

import { useState } from "react";
import { ProductCard } from "../../components";
import { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  storeSlug: string;
  colors: any;
}

export default function RelatedProducts({
  products,
  storeSlug,
  colors,
}: RelatedProductsProps) {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Toggle wishlist function
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  return (
    <div className="mt-16">
      <h2
        className="text-2xl font-bold mb-8"
        style={{ color: colors.text.primary }}
      >
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            storeSlug={storeSlug}
            viewMode="grid"
            colors={colors}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
