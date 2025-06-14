import { Product } from "@/types/product";

// Get unique categories from products
export const getUniqueCategories = (products: Product[]) => {
  const categories = products.map((product) => product.category);
  return Array.from(new Set(categories.map((cat) => cat.slug)));
};

// Get price range from products
export const getPriceRange = (products: Product[]) => {
  const prices = products.map((product) => product.startPrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

// Filter products based on search, category and price range
export const filterProducts = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string,
  priceRange: [number, number]
) => {
  return products.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      selectedCategory !== "all" &&
      product.category.slug !== selectedCategory
    ) {
      return false;
    }

    // Filter by price range
    if (
      product.startPrice < priceRange[0] ||
      product.startPrice > priceRange[1]
    ) {
      return false;
    }

    return true;
  });
};

// Sort products based on selected option
export const sortProducts = (products: Product[], sortOption: string) => {
  return [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.startPrice - b.startPrice;
      case "price-high":
        return b.startPrice - a.startPrice;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default: // featured or any other option
        return 0; // Keep original order
    }
  });
};
