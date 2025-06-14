"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filter } from "lucide-react";
import FiltersContent from "./FiltersContent";
import { Product } from "@/types/product";

interface SidebarFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  resetFilters: () => void;
  products: Product[];
  colors: any;
  themeColors: any;
}

export default function SidebarFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  resetFilters,
  products,
  colors,
  themeColors,
}: SidebarFiltersProps) {
  return (
    <Card
      style={{
        backgroundColor: colors.background.primary,
        borderColor: colors.background.secondary,
      }}
    >
      <CardHeader>
        <h3
          className="font-semibold flex items-center gap-2"
          style={{ color: colors.text.primary }}
        >
          <Filter
            className="h-4 w-4"
            style={{ color: colors.buttons.primary.background }}
          />
          Filters
        </h3>
      </CardHeader>
      <CardContent>
        <FiltersContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          resetFilters={resetFilters}
          products={products}
          colors={colors}
          themeColors={themeColors}
        />
      </CardContent>
    </Card>
  );
}
