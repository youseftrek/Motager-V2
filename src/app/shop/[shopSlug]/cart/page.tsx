"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  removeFromCart,
  updateQuantity,
  setCurrentStore,
} from "@/redux/features/cart/cartSlice";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Trash,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingCart,
  Loader,
} from "lucide-react";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import {
  ThemedButton,
  ThemedHeading,
  ThemedText,
} from "@/components/themes/minimal-theme/theme-components";
import { useEffect, useState } from "react";
import { getStore } from "@/actions/getTheme";

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

export default function CartPage() {
  const { shopSlug } = useParams();
  const storeSlug = shopSlug as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [themeColors, setThemeColors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set current store when component mounts or store changes
  useEffect(() => {
    dispatch(setCurrentStore(storeSlug));
  }, [dispatch, storeSlug]);

  // Get store-specific cart
  const storeCart = useAppSelector(
    (state) => state.cart.stores[storeSlug] || { items: [], totalItems: 0 }
  );
  const { items, totalItems } = storeCart;

  // Fetch theme colors for the store
  useEffect(() => {
    const fetchThemeColors = async () => {
      setIsLoading(true);
      try {
        const response = await getStore(storeSlug);
        if (response.data?.theme?.themeSettings?.colors) {
          setThemeColors(response.data.theme.themeSettings.colors);
        } else {
          // Use default colors if theme settings aren't available
          setThemeColors(defaultColors);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
        setError("Could not load store theme data. Using default theme.");
        // Use default colors on error
        setThemeColors(defaultColors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeColors();
  }, [storeSlug]);

  // Extract theme colors
  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;

  // Calculate total price
  const calculateTotal = () => {
    return items
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Handle quantity changes
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity, storeSlug }));
  };

  // Handle item removal
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart({ id, storeSlug }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="flex flex-col items-center space-y-3">
          <Loader className="animate-spin w-8 h-8 text-gray-600" size={32} />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 mb-6">
            {error}
          </div>
        )}

        <ThemedHeading
          level={1}
          className="text-3xl font-bold mb-8"
          colors={colors}
        >
          Your Shopping Cart
        </ThemedHeading>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto mb-6 text-gray-300" />
            <ThemedText
              variant="secondary"
              className="text-xl mb-6"
              colors={colors}
            >
              Your cart is empty
            </ThemedText>
            <Link href={`/shop/${shopSlug}`}>
              <ThemedButton variant="primary" colors={colors}>
                <ArrowLeft className="mr-2" size={16} />
                Continue Shopping
              </ThemedButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm border">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center p-4 border-b last:border-b-0"
                  >
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow px-4">
                      <ThemedText
                        variant="secondary"
                        className="text-sm mb-1"
                        colors={colors}
                      >
                        {item.category}
                      </ThemedText>
                      <ThemedHeading
                        level={3}
                        className="font-medium mb-1"
                        colors={colors}
                      >
                        {item.name}
                      </ThemedHeading>
                      <ThemedText
                        variant="primary"
                        className="font-semibold"
                        colors={colors}
                      >
                        {item.price}
                      </ThemedText>
                    </div>

                    <div className="flex items-center">
                      <div
                        className="flex items-center border rounded-md"
                        style={{ borderColor: colors.background.secondary }}
                      >
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1"
                          style={{ color: colors.text.secondary }}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1"
                          style={{ color: colors.text.secondary }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 p-2 rounded-md hover:bg-red-50"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href={`/shop/${shopSlug}`}>
                  <ThemedButton variant="tertiary" colors={colors}>
                    <ArrowLeft className="mr-2" size={16} />
                    Continue Shopping
                  </ThemedButton>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="bg-white rounded-lg shadow-sm border p-6"
                style={{ backgroundColor: colors.background.secondary }}
              >
                <ThemedHeading
                  level={2}
                  className="text-xl font-bold mb-6"
                  colors={colors}
                >
                  Order Summary
                </ThemedHeading>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <ThemedText variant="secondary" colors={colors}>
                      Items ({totalItems})
                    </ThemedText>
                    <ThemedText
                      variant="primary"
                      className="font-medium"
                      colors={colors}
                    >
                      ${calculateTotal()}
                    </ThemedText>
                  </div>

                  <div className="flex justify-between">
                    <ThemedText variant="secondary" colors={colors}>
                      Shipping
                    </ThemedText>
                    <ThemedText
                      variant="primary"
                      className="font-medium"
                      colors={colors}
                    >
                      Free
                    </ThemedText>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <ThemedText
                        variant="primary"
                        className="font-bold"
                        colors={colors}
                      >
                        Total
                      </ThemedText>
                      <ThemedText
                        variant="primary"
                        className="font-bold"
                        colors={colors}
                      >
                        ${calculateTotal()}
                      </ThemedText>
                    </div>
                  </div>
                </div>

                <ThemedButton
                  variant="primary"
                  className="w-full"
                  colors={colors}
                >
                  Proceed to Checkout
                </ThemedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
