"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import FiltersContent from "./FiltersContent";
import { Product } from "@/types/product";

interface ProductsControlBarProps {
  colors: any;
  themeColors: any;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
  resetFilters: () => void;
  products: Product[];
}

export default function ProductsControlBar({
  colors,
  themeColors,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  resetFilters,
  products,
}: ProductsControlBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        {/* Mobile Filters */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              style={{
                borderColor: colors.buttons.secondary.background,
                backgroundColor: colors.buttons.secondary.background,
                color: colors.buttons.secondary.text,
              }}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent
            style={{ backgroundColor: colors.background.primary }}
            className="max-h-[80vh]"
          >
            <DrawerHeader>
              <DrawerTitle style={{ color: colors.text.primary }}>
                Filters
              </DrawerTitle>
              <DrawerDescription style={{ color: colors.text.secondary }}>
                Refine your product search
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
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
            </div>
          </DrawerContent>
        </Drawer>

        {/* Active Filters */}
        <div className="flex gap-2">
          {searchQuery && (
            <Badge
              variant="secondary"
              className="gap-1"
              style={{
                backgroundColor: colors.buttons.tertiary.background,
                color: colors.buttons.tertiary.text,
                borderColor: colors.background.secondary,
              }}
            >
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
                style={{ color: colors.text.secondary }}
              />
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge
              variant="secondary"
              className="gap-1 capitalize"
              style={{
                backgroundColor: colors.buttons.tertiary.background,
                color: colors.buttons.tertiary.text,
                borderColor: colors.background.secondary,
              }}
            >
              {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedCategory("all")}
                style={{ color: colors.text.secondary }}
              />
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger
            className="w-[180px] focus:ring-2"
            style={
              {
                backgroundColor: colors.background.primary,
                borderColor: colors.background.secondary,
                color: colors.text.primary,
                "--tw-ring-color": colors.buttons.primary.background,
              } as React.CSSProperties
            }
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent style={{ backgroundColor: colors.background.primary }}>
            <SelectItem value="featured" style={{ color: colors.text.primary }}>
              Featured
            </SelectItem>
            <SelectItem
              value="price-low"
              style={{ color: colors.text.primary }}
            >
              Price: Low to High
            </SelectItem>
            <SelectItem
              value="price-high"
              style={{ color: colors.text.primary }}
            >
              Price: High to Low
            </SelectItem>
            <SelectItem value="name-asc" style={{ color: colors.text.primary }}>
              Name: A to Z
            </SelectItem>
            <SelectItem
              value="name-desc"
              style={{ color: colors.text.primary }}
            >
              Name: Z to A
            </SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex">
          <Toggle
            pressed={viewMode === "grid"}
            onPressedChange={() => setViewMode("grid")}
            size="sm"
            style={{
              backgroundColor:
                viewMode === "grid"
                  ? colors.buttons.primary.background
                  : colors.buttons.tertiary.background,
              color:
                viewMode === "grid"
                  ? colors.buttons.primary.text
                  : colors.buttons.tertiary.text,
            }}
          >
            <Grid3X3 className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={viewMode === "list"}
            onPressedChange={() => setViewMode("list")}
            size="sm"
            style={{
              backgroundColor:
                viewMode === "list"
                  ? colors.buttons.primary.background
                  : colors.buttons.tertiary.background,
              color:
                viewMode === "list"
                  ? colors.buttons.primary.text
                  : colors.buttons.tertiary.text,
            }}
          >
            <List className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
