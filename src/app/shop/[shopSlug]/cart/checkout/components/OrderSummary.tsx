"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Truck, Gift, Plus, Minus, X } from "lucide-react";
import { CartItem } from "@/redux/features/cart/cartSlice";


interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  colors: any;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  colors,
  updateQuantity,
  removeItem,
}: OrderSummaryProps) {
  const calculatedSubtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );
  

  return (
    <div className="space-y-6">
      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle
            className="flex items-center justify-between"
            style={{ color: colors.text.primary }}
          >
            Order Summary
            <Badge
              variant="secondary"
              style={{
                backgroundColor: colors.buttons.secondary.background,
                color: colors.buttons.secondary.text,
              }}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item , index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: colors.buttons.primary.background,
                      color: colors.buttons.primary.text,
                    }}
                  >
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-medium text-sm truncate"
                    style={{ color: colors.text.primary }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: colors.text.secondary }}
                  >
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          borderColor: colors.background.secondary,
                          color: colors.text.secondary,
                        }}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span
                        className="text-sm font-medium min-w-[20px] text-center"
                        style={{ color: colors.text.primary }}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          borderColor: colors.background.secondary,
                          color: colors.text.secondary,
                        }}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: colors.text.primary }}
                      >
                        {`$${(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}`}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.id)}
                        style={{ color: colors.text.secondary }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Separator style={{ backgroundColor: colors.background.secondary }} />

          {/* Order Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: colors.text.secondary }}>Subtotal</span>
              <span style={{ color: colors.text.primary }}>
                ${calculatedSubtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: colors.text.secondary }}>Shipping</span>
              <span style={{ color: colors.text.primary }}>
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: colors.text.secondary }}>Tax</span>
              <span style={{ color: colors.text.primary }}>
                ${isNaN(tax) ? "0.00" : tax.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.text.secondary }}>Discount</span>
                <span style={{ color: colors.buttons.primary.background }}>
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}
            <Separator
              style={{ backgroundColor: colors.background.secondary }}
            />
            <div className="flex justify-between font-semibold text-lg">
              <span style={{ color: colors.text.primary }}>Total</span>
              <span style={{ color: colors.text.primary }}>
                ${calculatedSubtotal + shipping}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Signals */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { icon: Shield, text: "Secure" },
          { icon: Truck, text: "Fast Ship" },
          { icon: Gift, text: "Free Returns" },
        ].map((signal, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <signal.icon
              className="w-5 h-5"
              style={{ color: colors.buttons.primary.background }}
            />
            <span className="text-xs" style={{ color: colors.text.secondary }}>
              {signal.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
