"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Shield, CreditCard } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  accepted?: string[];
  icon: any;
  color: string;
}

interface PaymentStepProps {
  formData: {
    payment_method: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
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
      newsletter: boolean;
    }>
  >;
  colors: any;
  onContinue: () => void;
  onBack: () => void;
  paymentMethods: PaymentMethod[];
  errors?: Record<string, string>;
}

export default function PaymentStep({
  formData,
  setFormData,
  colors,
  onContinue,
  onBack,
  paymentMethods,
  errors = {},
}: PaymentStepProps) {
  // Find the Tap Payment method
  const tapPayment = paymentMethods.find((method) => method.id === "tap");

  // Set Tap Payment as the default
  useEffect(() => {
    if (tapPayment && formData.payment_method !== tapPayment.id) {
      setFormData((prev) => ({
        ...prev,
        payment_method: tapPayment.id,
      }));
    }
  }, [tapPayment, formData.payment_method, setFormData]);

  // Filter to only show Tap Payment and PayPal
  const filteredPaymentMethods = paymentMethods.filter(
    (method) => method.id === "tap" || method.id === "paypal"
  );

  return (
    <div className="space-y-6">
      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.payment_method}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                payment_method: value,
              }))
            }
          >
            <div className="space-y-4">
              {filteredPaymentMethods.map((method) => {
                const isTapPayment = method.id === "tap";
                const isDisabled = !isTapPayment;

                return (
                  <div
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg transition-all duration-200 ${
                      isDisabled
                        ? "opacity-60"
                        : "cursor-pointer hover:bg-opacity-50"
                    } ${
                      errors.payment_method && !isDisabled
                        ? "border-red-500"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        formData.payment_method === method.id
                          ? colors.buttons.primary.background
                          : errors.payment_method && !isDisabled
                          ? "#ef4444"
                          : colors.background.secondary,
                      backgroundColor:
                        formData.payment_method === method.id
                          ? `${colors.buttons.primary.background}10`
                          : "transparent",
                    }}
                    onClick={() => {
                      if (!isDisabled) {
                        setFormData((prev) => ({
                          ...prev,
                          payment_method: method.id,
                        }));
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        disabled={isDisabled}
                      />
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${method.color}15`,
                        }}
                      >
                        <method.icon
                          className="w-6 h-6"
                          style={{ color: method.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor={method.id}
                          className={`font-medium ${
                            isDisabled ? "" : "cursor-pointer"
                          } text-base`}
                          style={{ color: colors.text.primary }}
                        >
                          {method.name}
                          {isDisabled && (
                            <span
                              className="ml-2 text-xs font-normal px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: `${colors.text.secondary}20`,
                                color: colors.text.secondary,
                              }}
                            >
                              Unavailable
                            </span>
                          )}
                        </Label>
                        <p
                          className="text-sm mt-1"
                          style={{ color: colors.text.secondary }}
                        >
                          {isDisabled
                            ? "This payment method is currently not available."
                            : method.description}
                        </p>
                        {method.accepted && method.accepted.length > 0 && (
                          <p
                            className="text-[12px] mt-1"
                            style={{ color: colors.text.secondary }}
                          >
                            {method.accepted
                              .map(
                                (accepted) =>
                                  accepted.charAt(0).toUpperCase() +
                                  accepted.slice(1)
                              )
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    {formData.payment_method === method.id && (
                      <Check
                        className="w-5 h-5"
                        style={{
                          color: colors.buttons.primary.background,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </RadioGroup>
          {errors.payment_method && (
            <p className="text-sm text-red-500 mt-2">{errors.payment_method}</p>
          )}
        </CardContent>
      </Card>

      <div
        className="p-4 rounded-lg border-l-4"
        style={{
          backgroundColor: `${colors.buttons.primary.background}10`,
          borderLeftColor: colors.buttons.primary.background,
        }}
      >
        <div className="flex items-start space-x-3">
          <Shield
            className="w-5 h-5 mt-0.5"
            style={{ color: colors.buttons.primary.background }}
          />
          <div>
            <h4 className="font-medium" style={{ color: colors.text.primary }}>
              Secure Payment
            </h4>
            <p
              className="text-sm mt-1"
              style={{ color: colors.text.secondary }}
            >
              Your payment information is encrypted and secure. We currently
              only accept payments through Tap Payment.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          style={{
            borderColor: colors.background.secondary,
            color: colors.text.primary,
          }}
        >
          Back to Information
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1"
          style={{
            backgroundColor: colors.buttons.primary.background,
            color: colors.buttons.primary.text,
          }}
          disabled={formData.payment_method !== "tap"}
        >
          Review Order
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
          <p className="text-sm text-red-600 font-medium">
            Please select a valid payment method to continue
          </p>
        </div>
      )}
    </div>
  );
}
