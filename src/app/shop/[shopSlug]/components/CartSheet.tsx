"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  removeFromCart,
  updateQuantity,
  setCurrentStore,
} from "@/redux/features/cart/cartSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, X, Trash, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import {
  ThemedButton,
  ThemedHeading,
  ThemedText,
} from "@/components/themes/minimal-theme/theme-components";
import { useEffect, useState } from "react";

interface CartSheetProps {
  themeColors: any;
}

export default function CartSheet({ themeColors }: CartSheetProps) {
  const { shopSlug } = useParams();
  const storeSlug = shopSlug as string;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Set current store when component mounts or store changes
  useEffect(() => {
    dispatch(setCurrentStore(storeSlug));
  }, [dispatch, storeSlug]);

  // Get store-specific cart
  const storeCart = useAppSelector(
    (state) => state.cart.stores[storeSlug] || { items: [], totalItems: 0 }
  );
  const { items, totalItems } = storeCart;

  // Default theme colors
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center justify-center rounded-full w-8 h-8 transition-colors"
          style={{
            color: colors.text.inverted,
            backgroundColor: colors.buttons.primary.background,
          }}
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full"
              style={{
                backgroundColor: colors.buttons.secondary.background,
                color: colors.buttons.secondary.text,
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md" closeButton={false}>
        <SheetHeader className="mb-5">
          <SheetTitle className="flex items-center justify-between">
            <span>Your Cart ({totalItems})</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <Link href={`/shop/${shopSlug}`} onClick={() => setIsOpen(false)}>
              <ThemedButton variant="primary" colors={colors}>
                Continue Shopping
              </ThemedButton>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-[90vh]">
            <div className="flex-grow">
              {items.map((item , index) => (
                <div key={index} className="flex items-start py-4 border-b">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow px-3">
                    <ThemedText
                      variant="secondary"
                      className="text-xs"
                      colors={colors}
                    >
                      {item.category}
                    </ThemedText>
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <ThemedText
                        variant="primary"
                        className="font-semibold text-sm"
                        colors={colors}
                      >
                        {item.price}
                      </ThemedText>

                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded-md hover:bg-gray-100"
                          style={{ color: colors.text.secondary }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded-md hover:bg-gray-100"
                          style={{ color: colors.text.secondary }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-md hover:bg-red-50 ml-1"
                    style={{ color: "#ef4444" }}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold mb-6">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/shop/${shopSlug}/cart`}
                  onClick={() => setIsOpen(false)}
                >
                  <ThemedButton
                    variant="primary"
                    className="w-full"
                    colors={colors}
                  >
                    View Cart
                  </ThemedButton>
                </Link>
                <Link href={`/shop/${shopSlug}/cart/checkout`}>
                  <ThemedButton
                    variant="secondary"
                    className="w-full"
                    colors={colors}
                  >
                    Checkout
                  </ThemedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
