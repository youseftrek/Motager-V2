"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import EmptyProductsView from "./EmptyProductsView";

interface ProductsGridProps {
  products: Product[];
  storeSlug: string;
  viewMode: "grid" | "list";
  colors: any;
  wishlist: Set<number>;
  toggleWishlist: (productId: number) => void;
  resetFilters: () => void;
}

export default function ProductsGrid({
  products,
  storeSlug,
  viewMode,
  colors,
  wishlist,
  toggleWishlist,
  resetFilters,
}: ProductsGridProps) {
  return (
    <>
      {products.length === 0 ? (
        <EmptyProductsView colors={colors} resetFilters={resetFilters} />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              : "grid grid-cols-1 gap-6"
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              storeSlug={storeSlug}
              viewMode={viewMode}
              colors={colors}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </>
  );
}
