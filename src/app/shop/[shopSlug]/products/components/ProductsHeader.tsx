"use client";

import { Badge } from "@/components/ui/badge";

interface ProductsHeaderProps {
  colors: any;
  sortedProductsCount: number;
  totalProductsCount: number;
}

export default function ProductsHeader({
  colors,
  sortedProductsCount,
  totalProductsCount,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: colors.text.primary }}
        >
          Products
        </h1>
        <p className="mt-1" style={{ color: colors.text.secondary }}>
          Discover our curated collection of premium items
        </p>
      </div>
      <Badge
        variant="secondary"
        className="text-sm"
        style={{
          backgroundColor: colors.buttons.secondary.background,
          color: colors.buttons.secondary.text,
        }}
      >
        {sortedProductsCount} of {totalProductsCount} products
      </Badge>
    </div>
  );
}
