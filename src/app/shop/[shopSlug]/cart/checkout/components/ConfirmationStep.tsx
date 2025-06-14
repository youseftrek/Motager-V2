"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader, Lock } from "lucide-react";

interface CartItem {
  id: number;
  sku_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

interface ConfirmationStepProps {
  formData: {
    email: string;
    customer_name: string;
    phone_number: string;
    address: string;
    city: string;
    governorate: string;
    postal_code: string;
    payment_method: string;
    note: string;
    shipping_method: string;
  };
  colors: any;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
  cartItems: CartItem[];
  paymentMethods: PaymentMethod[];
  errors?: Record<string, string>;
}

export default function ConfirmationStep({
  formData,
  colors,
  onBack,
  onPlaceOrder,
  isProcessing,
  cartItems,
  paymentMethods,
  errors = {},
}: ConfirmationStepProps) {
  // Find the selected payment method
  const selectedPaymentMethod = paymentMethods.find(
    (m) => m.id === formData.payment_method
  );

  return (
    <div className="space-y-6">
      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Order Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3
                className="font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                Contact Information
              </h3>
              <div style={{ color: colors.text.secondary }}>
                <p>{formData.customer_name}</p>
                <p>{formData.email}</p>
                <p>{formData.phone_number}</p>
              </div>
            </div>
            <div>
              <h3
                className="font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                Shipping Address
              </h3>
              <div style={{ color: colors.text.secondary }}>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.governorate}
                </p>
                <p>{formData.postal_code}</p>
              </div>
            </div>
          </div>

          <Separator style={{ backgroundColor: colors.background.secondary }} />

          {/* Shipping & Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3
                className="font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                Shipping Method
              </h3>
              <p style={{ color: colors.text.secondary }}>
                {formData.shipping_method === "standard"
                  ? "Standard Shipping (5-7 days)"
                  : formData.shipping_method === "express"
                  ? "Express Shipping (2-3 days)"
                  : "Overnight Shipping (1 day)"}
              </p>
            </div>
            <div>
              <h3
                className="font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                Payment Method
              </h3>
              {selectedPaymentMethod && (
                <div className="flex items-center space-x-2">
                  <selectedPaymentMethod.icon
                    className="w-4 h-4"
                    style={{ color: selectedPaymentMethod.color }}
                  />
                  <span style={{ color: colors.text.secondary }}>
                    {selectedPaymentMethod.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {formData.note && (
            <>
              <Separator
                style={{ backgroundColor: colors.background.secondary }}
              />
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  Delivery Notes
                </h3>
                <p style={{ color: colors.text.secondary }}>{formData.note}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Order Items Summary */}
      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className="font-medium"
                    style={{ color: colors.text.primary }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {item.variant} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isProcessing}
          style={{
            borderColor: colors.background.secondary,
            color: colors.text.primary,
          }}
        >
          Back to Payment
        </Button>
        <Button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="flex-1"
          style={{
            backgroundColor: colors.buttons.primary.background,
            color: colors.buttons.primary.text,
          }}
        >
          {isProcessing ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Complete Order
            </>
          )}
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
          <p className="text-sm text-red-600 font-medium">
            There was a problem with your order. Please review your information.
          </p>
        </div>
      )}
    </div>
  );
}
