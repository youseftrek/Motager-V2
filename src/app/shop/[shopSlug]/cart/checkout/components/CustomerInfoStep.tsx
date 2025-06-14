"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomerInfoStepProps {
  formData: {
    email: string;
    customer_name: string;
    phone_number: string;
    address: string;
    city: string;
    governorate: string;
    postal_code: string;
    note: string;
    shipping_method: string;
    newsletter: boolean;
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
  errors?: Record<string, string>;
}

export default function CustomerInfoStep({
  formData,
  setFormData,
  colors,
  onContinue,
  errors = {},
}: CustomerInfoStepProps) {
  return (
    <div className="space-y-6">
      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" style={{ color: colors.text.primary }}>
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              style={{
                backgroundColor: colors.background.primary,
                borderColor: errors.email
                  ? "#ef4444"
                  : colors.background.secondary,
                color: colors.text.primary,
              }}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="customer_name"
              style={{ color: colors.text.primary }}
            >
              Full Name *
            </Label>
            <Input
              id="customer_name"
              required
              value={formData.customer_name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customer_name: e.target.value,
                }))
              }
              className={`mt-1 ${errors.customer_name ? "border-red-500" : ""}`}
              style={{
                backgroundColor: colors.background.primary,
                borderColor: errors.customer_name
                  ? "#ef4444"
                  : colors.background.secondary,
                color: colors.text.primary,
              }}
            />
            {errors.customer_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.customer_name}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="phone_number"
              style={{ color: colors.text.primary }}
            >
              Phone Number *
            </Label>
            <Input
              id="phone_number"
              type="tel"
              required
              value={formData.phone_number}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }))
              }
              className={`mt-1 ${errors.phone_number ? "border-red-500" : ""}`}
              style={{
                backgroundColor: colors.background.primary,
                borderColor: errors.phone_number
                  ? "#ef4444"
                  : colors.background.secondary,
                color: colors.text.primary,
              }}
            />
            {errors.phone_number && (
              <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  newsletter: checked as boolean,
                }))
              }
            />
            <Label
              htmlFor="newsletter"
              className="text-sm"
              style={{ color: colors.text.secondary }}
            >
              Email me with news and offers
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address" style={{ color: colors.text.primary }}>
              Address *
            </Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
              style={{
                backgroundColor: colors.background.primary,
                borderColor: errors.address
                  ? "#ef4444"
                  : colors.background.secondary,
                color: colors.text.primary,
              }}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" style={{ color: colors.text.primary }}>
                City *
              </Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className={`mt-1 ${errors.city ? "border-red-500" : ""}`}
                style={{
                  backgroundColor: colors.background.primary,
                  borderColor: errors.city
                    ? "#ef4444"
                    : colors.background.secondary,
                  color: colors.text.primary,
                }}
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="governorate"
                style={{ color: colors.text.primary }}
              >
                Governorate *
              </Label>
              <Input
                id="governorate"
                required
                value={formData.governorate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    governorate: e.target.value,
                  }))
                }
                className={`mt-1 ${errors.governorate ? "border-red-500" : ""}`}
                style={{
                  backgroundColor: colors.background.primary,
                  borderColor: errors.governorate
                    ? "#ef4444"
                    : colors.background.secondary,
                  color: colors.text.primary,
                }}
              />
              {errors.governorate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.governorate}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="postal_code" style={{ color: colors.text.primary }}>
              Postal Code *
            </Label>
            <Input
              id="postal_code"
              required
              value={formData.postal_code}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              className={`mt-1 ${errors.postal_code ? "border-red-500" : ""}`}
              style={{
                backgroundColor: colors.background.primary,
                borderColor: errors.postal_code
                  ? "#ef4444"
                  : colors.background.secondary,
                color: colors.text.primary,
              }}
            />
            {errors.postal_code && (
              <p className="text-sm text-red-500 mt-1">{errors.postal_code}</p>
            )}
          </div>

          <div>
            <Label htmlFor="note" style={{ color: colors.text.primary }}>
              Delivery Notes (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="e.g., Please deliver between 10 AM - 12 PM"
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  note: e.target.value,
                }))
              }
              className="mt-1"
              style={{
                backgroundColor: colors.background.primary,
                borderColor: colors.background.secondary,
                color: colors.text.primary,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card style={{ borderColor: colors.background.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text.primary }}>
            Shipping Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.shipping_method}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                shipping_method: value,
              }))
            }
          >
            <div className="space-y-4">
              <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-opacity-50 transition-all duration-200 ${
                  errors.shipping_method ? "border-red-500" : ""
                }`}
                style={{
                  borderColor:
                    formData.shipping_method === "standard"
                      ? colors.buttons.primary.background
                      : errors.shipping_method
                      ? "#ef4444"
                      : colors.background.secondary,
                  backgroundColor:
                    formData.shipping_method === "standard"
                      ? `${colors.buttons.primary.background}10`
                      : "transparent",
                }}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_method: "standard",
                  }))
                }
              >
                <div className="flex items-center space-x-4 flex-1">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="flex-1">
                    <Label
                      htmlFor="standard"
                      className="font-medium cursor-pointer text-base"
                      style={{ color: colors.text.primary }}
                    >
                      Standard Shipping
                    </Label>
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.text.secondary }}
                    >
                      Free • Estimated delivery: 5-7 business days
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-opacity-50 transition-all duration-200"
                style={{
                  borderColor:
                    formData.shipping_method === "express"
                      ? colors.buttons.primary.background
                      : colors.background.secondary,
                  backgroundColor:
                    formData.shipping_method === "express"
                      ? `${colors.buttons.primary.background}10`
                      : "transparent",
                }}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_method: "express",
                  }))
                }
              >
                <div className="flex items-center space-x-4 flex-1">
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex-1">
                    <Label
                      htmlFor="express"
                      className="font-medium cursor-pointer text-base"
                      style={{ color: colors.text.primary }}
                    >
                      Express Shipping
                    </Label>
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.text.secondary }}
                    >
                      $15.00 • Estimated delivery: 2-3 business days
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-opacity-50 transition-all duration-200"
                style={{
                  borderColor:
                    formData.shipping_method === "overnight"
                      ? colors.buttons.primary.background
                      : colors.background.secondary,
                  backgroundColor:
                    formData.shipping_method === "overnight"
                      ? `${colors.buttons.primary.background}10`
                      : "transparent",
                }}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_method: "overnight",
                  }))
                }
              >
                <div className="flex items-center space-x-4 flex-1">
                  <RadioGroupItem value="overnight" id="overnight" />
                  <div className="flex-1">
                    <Label
                      htmlFor="overnight"
                      className="font-medium cursor-pointer text-base"
                      style={{ color: colors.text.primary }}
                    >
                      Overnight Shipping
                    </Label>
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.text.secondary }}
                    >
                      $25.00 • Estimated delivery: Next business day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
          {errors.shipping_method && (
            <p className="text-sm text-red-500 mt-2">
              {errors.shipping_method}
            </p>
          )}
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="note" style={{ color: colors.text.primary }}>
          Order Notes (Optional)
        </Label>
        <Textarea
          id="note"
          value={formData.note}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              note: e.target.value,
            }))
          }
          className="mt-1"
          placeholder="Special instructions for your order"
          style={{
            backgroundColor: colors.background.primary,
            borderColor: colors.background.secondary,
            color: colors.text.primary,
          }}
        />
      </div>

      <Button
        onClick={onContinue}
        className="w-full"
        style={{
          backgroundColor: colors.buttons.primary.background,
          color: colors.buttons.primary.text,
        }}
      >
        Continue to Payment
      </Button>

      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 font-medium">
            Please fix the errors above to continue
          </p>
        </div>
      )}
    </div>
  );
}
