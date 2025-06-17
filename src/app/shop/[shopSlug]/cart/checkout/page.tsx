"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import { getStore } from "@/actions/getTheme";
import { cn } from "@/lib/utils";
import * as z from "zod";
import {
  CreditCard,
  ChevronDown,
  Loader,
  Lock,
  AlertCircle,
  ShoppingBag,
  Wallet,
  Smartphone,
  Globe,
  Check,
  Shield,
  Truck,
  Gift,
  Plus,
  Minus,
  X,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Custom components
import {
  OrderSummary,
  CheckoutSteps,
  CustomerInfoStep,
  PaymentStep,
  ConfirmationStep,
} from "./components";
import { useAppSelector } from "@/redux/app/hooks";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useGetStoreBySlugQuery } from "@/redux/features/stores/storesApi";
import { getSession } from "@/actions/getSession";
import { useAuth } from "@/hooks";

// Define validation schema with Zod
const customerInfoSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  customer_name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  governorate: z.string().min(1, "Governorate is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  shipping_method: z.string().min(1, "Please select a shipping method"),
  newsletter: z.boolean().optional(),
});

const paymentSchema = z.object({
  payment_method: z.string().min(1, "Please select a payment method"),
});

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  customer_name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  governorate: z.string().min(1, "Governorate is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  payment_method: z.string().min(1, "Please select a payment method"),
  shipping_method: z.string().min(1, "Please select a shipping method"),
  note: z.string().optional(),
  newsletter: z.boolean().optional(),
});

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

// Mock cart data with SKU
const mockCartItems = [
  {
    id: 1,
    sku_id: 1,
    name: "Premium Wireless Headphones",
    price: "$299.99",
    quantity: 1,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    variant: "Midnight Black",
    category: "electronics",
  },
  {
    id: 2,
    sku_id: 2,
    name: "Ergonomic Office Chair",
    price: "$199.99",
    quantity: 1,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg",
    variant: "Gray",
    category: "office",
  },
  {
    id: 3,
    sku_id: 3,
    name: "Ceramic Plant Pot",
    price: "$49.98",
    quantity: 1,
    image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    variant: "White",
    category: "garden",
  },
];

// Checkout steps
const checkoutSteps = [
  { id: 1, name: "Information", completed: false, current: true },
  { id: 2, name: "Payment", completed: false, current: false },
  { id: 3, name: "Confirmation", completed: false, current: false },
];

// Payment methods
const paymentMethods = [
  {
    id: "tap",
    name: "Tap Payment",
    description: "Fast and secure payment with Tap.",
    accepted: ["VISA", "Mastercard", "Google Pay", "Apple Pay", "Fawry"],
    icon: CreditCard,
    color: "#2196f3",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal account.",
    icon: Wallet,
    color: "#0070ba",
  },
  {
    id: "stripe",
    name: "Credit/Debit Card",
    description: "Secure payment via Stripe.",
    icon: CreditCard,
    color: "#635bff",
  },
];

export default function CheckoutPage() {
  const { shopSlug } = useParams();
  const storeSlug = shopSlug as string;
  const [themeColors, setThemeColors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {data:store} = useGetStoreBySlugQuery(storeSlug);
  const {token} = useAuth();

  // Checkout state
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

    const storeCart = useAppSelector(
      (state) => state.cart.stores[storeSlug] || { items: [], totalItems: 0 }
    );
      const { items, totalItems } = storeCart;


  // Form state matching required structure
  const [formData, setFormData] = useState({
    email: "",
    customer_name: "",
    phone_number: "",
    address: "",
    city: "",
    governorate: "",
    postal_code: "",
    payment_method: "tap",
    note: "",
    shipping_method: "standard",
    newsletter: false,
  });
  
  // Fetch theme colors
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
        setError(null);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
        setError("Could not load store theme data. Using default theme.");
        setThemeColors(defaultColors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeColors();
  }, [storeSlug]);

  const [createOrder] = useCreateOrderMutation()

  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );
  const shipping =
    formData.shipping_method === "express"
      ? 15.0
      : formData.shipping_method === "overnight"
      ? 25.0
      : 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping + tax - discount;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const validateStep = (step: number) => {
    setValidationErrors({});

    try {
      if (step === 1) {
        // Validate customer information fields
        customerInfoSchema.parse(formData);
        return true;
      } else if (step === 2) {
        // Validate payment fields
        paymentSchema.parse(formData);
        return true;
      } else if (step === 3) {
        // Validate entire form before placing order
        checkoutSchema.parse(formData);
        return true;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleStepComplete = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (validateStep(3) && !isProcessing) {
      setIsProcessing(true);
      try {
        const orderData = {
          total_price: parseFloat(total.toFixed(2)),
          email: formData.email,
          customer_name: formData.customer_name,
          phone_number: formData.phone_number,
          address: formData.address,
          payment_method: formData.payment_method,
          note: formData.note,
          city: formData.city,
          governorate: formData.governorate,
          postal_code: formData.postal_code,
          shipping_method: formData.shipping_method,
          order_items: items.map((item) => ({
            sku_id: item.sku_id,
            price: Number(item.price.replace(/[^0-9.]/g, "")),
            quantity: item.quantity,
          })),
          store_id: store?.data?.id,
          token
        };
        
        const result = await createOrder(orderData).unwrap();
        
        if (result?.data?.payment?.transaction?.url) {
          console.log("Order created successfully:", result.data);
          localStorage.removeItem('cart');
          window.location.assign(result.data.payment.transaction.url);
        } else {
          console.error("No payment URL received");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error creating order:", error);
        setIsProcessing(false);
      }
    }
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
            Loading checkout...
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
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1
              className="text-3xl font-bold"
              style={{ color: colors.text.primary }}
            >
              Checkout
            </h1>

            <Badge
              variant="outline"
              style={{
                borderColor: colors.buttons.primary.background,
                color: colors.buttons.primary.background,
              }}
            >
              <Lock className="w-3 h-3 mr-1" />
              Secure Checkout
            </Badge>
          </div>

          {/* Progress Steps */}
          <CheckoutSteps
            steps={checkoutSteps}
            currentStep={currentStep}
            colors={colors}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Checkout Form */}
            <div className="space-y-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <CustomerInfoStep
                  formData={formData}
                  setFormData={setFormData}
                  colors={colors}
                  onContinue={handleStepComplete}
                  errors={validationErrors}
                />
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <PaymentStep
                  formData={formData}
                  setFormData={setFormData}
                  colors={colors}
                  onContinue={handleStepComplete}
                  onBack={handleStepBack}
                  paymentMethods={paymentMethods}
                  errors={validationErrors}
                />
              )}

              {/* Step 3: Order Confirmation */}
              {currentStep === 3 && (
                <ConfirmationStep
                  formData={formData}
                  colors={colors}
                  onBack={handleStepBack}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                  cartItems={cartItems}
                  paymentMethods={paymentMethods}
                  errors={validationErrors}
                />
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              {/* Mobile Order Summary Toggle */}
              <div className="lg:hidden mb-6">
                <Collapsible
                  open={isOrderSummaryOpen}
                  onOpenChange={setIsOrderSummaryOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      style={{
                        borderColor: colors.background.secondary,
                        backgroundColor: colors.background.primary,
                        color: colors.text.primary,
                      }}
                    >
                      <span className="flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Show order summary
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          ${total.toFixed(2)}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isOrderSummaryOpen && "rotate-180"
                          )}
                        />
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4">
                      <OrderSummary
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        discount={discount}
                        total={total}
                        colors={colors}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Desktop Order Summary */}
              <div className="hidden lg:block">
                <OrderSummary
                  cartItems={items}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                  colors={colors}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
