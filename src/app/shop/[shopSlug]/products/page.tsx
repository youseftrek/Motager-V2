"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import { getStore } from "@/actions/getTheme";
import { Product } from "@/types/product";
import { Loader } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import components
import {
  ProductsHeader,
  ProductsControlBar,
  ProductsGrid,
  SidebarFilters,
} from "./components";

// Import utilities
import {
  getPriceRange,
  filterProducts,
  sortProducts,
} from "./utils/productUtils";

// Default theme colors to use if store data isn't available
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

// Mock products data (replace with API call when available)
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    description:
      "A sleek, adjustable desk lamp with minimalist design and premium materials.",
    slug: "modern-desk-lamp",
    published: true,
    startPrice: 79.99,
    main_image_url:
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    ],
    category: { id: 1, slug: "lighting" },
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description:
      "Comfortable office chair with lumbar support and breathable mesh.",
    slug: "ergonomic-office-chair",
    published: true,
    startPrice: 199.99,
    main_image_url:
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg",
    ],
    category: { id: 2, slug: "furniture" },
  },
  {
    id: 3,
    name: "Minimalist Coffee Table",
    description:
      "Simple yet elegant coffee table for your living room made from sustainable oak.",
    slug: "minimalist-coffee-table",
    published: true,
    startPrice: 149.99,
    main_image_url:
      "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg",
    images_url: [
      "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg",
    ],
    category: { id: 2, slug: "furniture" },
  },
  {
    id: 4,
    name: "Ceramic Plant Pot",
    description:
      "Modern ceramic pot perfect for indoor plants with drainage system.",
    slug: "ceramic-plant-pot",
    published: true,
    startPrice: 24.99,
    main_image_url:
      "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    images_url: [
      "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    ],
    category: { id: 3, slug: "decor" },
  },
  {
    id: 5,
    name: "Wall Art Canvas",
    description:
      "Beautiful abstract art to brighten up any room with museum-quality printing.",
    slug: "wall-art-canvas",
    published: true,
    startPrice: 89.99,
    main_image_url:
      "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg",
    images_url: [
      "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg",
    ],
    category: { id: 3, slug: "decor" },
  },
  {
    id: 6,
    name: "Wooden Bookshelf",
    description:
      "Sturdy wooden bookshelf with multiple compartments and adjustable shelves.",
    slug: "wooden-bookshelf",
    published: true,
    startPrice: 129.99,
    main_image_url:
      "https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg",
    images_url: [
      "https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg",
    ],
    category: { id: 2, slug: "furniture" },
  },
];

export default function ProductsPage() {
  const { shopSlug } = useParams();
  const storeSlug = shopSlug as string;
  const [themeColors, setThemeColors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Fetch theme colors for the store
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

        setProducts(mockProducts);
        const productPriceRange = getPriceRange(mockProducts);
        setPriceRange([productPriceRange.min, productPriceRange.max]);
        setError(null);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
        setError("Could not load store theme data. Using default theme.");
        setThemeColors(defaultColors);
        setProducts(mockProducts);
        const productPriceRange = getPriceRange(mockProducts);
        setPriceRange([productPriceRange.min, productPriceRange.max]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeColors();
  }, [storeSlug]);

  // Extract theme colors
  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;

  // Add CSS variables for slider
  React.useEffect(() => {
    if (colors) {
      document.documentElement.style.setProperty(
        "--slider-track-background",
        colors.background.secondary
      );
      document.documentElement.style.setProperty(
        "--slider-range-background",
        colors.buttons.primary.background
      );
      document.documentElement.style.setProperty(
        "--slider-thumb-background",
        colors.background.primary
      );
      document.documentElement.style.setProperty(
        "--slider-thumb-border",
        colors.buttons.primary.background
      );
    }

    return () => {
      document.documentElement.style.removeProperty(
        "--slider-track-background"
      );
      document.documentElement.style.removeProperty(
        "--slider-range-background"
      );
      document.documentElement.style.removeProperty(
        "--slider-thumb-background"
      );
      document.documentElement.style.removeProperty("--slider-thumb-border");
    };
  }, [colors]);

  // Filter and sort products
  const filteredProducts = filterProducts(
    products,
    searchQuery,
    selectedCategory,
    priceRange
  );
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  // Toggle wishlist
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

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    const productPriceRange = getPriceRange(products);
    setPriceRange([productPriceRange.min, productPriceRange.max]);
    setSortOption("featured");
  };

  if (isLoading) {
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
            Loading products...
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

          {/* Header */}
          <ProductsHeader
            colors={colors}
            sortedProductsCount={sortedProducts.length}
            totalProductsCount={products.length}
          />

          {/* Controls Bar */}
          <ProductsControlBar
            colors={colors}
            themeColors={themeColors}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
            resetFilters={resetFilters}
            products={products}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block">
              <SidebarFilters
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

            {/* Products Grid/List */}
            <div className="lg:col-span-3">
              <ProductsGrid
                products={sortedProducts}
                storeSlug={storeSlug}
                viewMode={viewMode}
                colors={colors}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
