"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, X } from "lucide-react";
import ThemedSlider from "./ThemedSlider";
import { Product } from "@/types/product";

interface FiltersContentProps {
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

// Get unique categories from products
const getUniqueCategories = (products: Product[]) => {
  const categories = products.map((product) => product.category);
  return Array.from(new Set(categories.map((cat) => cat.slug)));
};

export default function FiltersContent({
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
}: FiltersContentProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" style={{ color: colors.text.primary }}>
          Search Products
        </Label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={16}
            style={{ color: colors.text.secondary }}
          />
          <Input
            id="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 focus:ring-2"
            style={
              {
                backgroundColor: colors.background.primary,
                borderColor: colors.background.secondary,
                color: colors.text.primary,
                "--tw-ring-color": colors.buttons.primary.background,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <Separator style={{ backgroundColor: colors.background.secondary }} />

      {/* Categories */}
      <div className="space-y-3">
        <Label style={{ color: colors.text.primary }}>Categories</Label>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="all"
              style={{
                borderColor: colors.buttons.primary.background,
                color: colors.buttons.primary.background,
              }}
            />
            <Label htmlFor="all" style={{ color: colors.text.primary }}>
              All Categories
            </Label>
          </div>
          {getUniqueCategories(products).map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category}
                id={category}
                style={{
                  borderColor: colors.buttons.primary.background,
                  color: colors.buttons.primary.background,
                }}
              />
              <Label
                htmlFor={category}
                className="capitalize"
                style={{ color: colors.text.primary }}
              >
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator style={{ backgroundColor: colors.background.secondary }} />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Label className="leading-6" style={{ color: colors.text.primary }}>
            Price Range
          </Label>
          <output
            className="text-sm font-medium tabular-nums"
            style={{ color: colors.text.secondary }}
          >
            ${priceRange[0]} - ${priceRange[1]}
          </output>
        </div>
        <div className="px-1 py-3">
          <ThemedSlider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={300}
            min={0}
            step={5}
            minStepsBetweenThumbs={1}
            themeColors={themeColors}
            aria-label="Price range slider"
            className="w-full"
          />
        </div>
      </div>

      <Separator style={{ backgroundColor: colors.background.secondary }} />

      <Button
        onClick={resetFilters}
        variant="outline"
        className="w-full"
        style={{
          borderColor: colors.buttons.secondary.background,
          backgroundColor: colors.buttons.secondary.background,
          color: colors.buttons.secondary.text,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor =
            colors.buttons.secondary.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor =
            colors.buttons.secondary.background;
        }}
      >
        <X className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
