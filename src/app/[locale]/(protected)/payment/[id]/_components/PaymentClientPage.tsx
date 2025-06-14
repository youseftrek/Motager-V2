"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Lock,
  CreditCard,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { createPayment } from "@/actions/payment";
import { Link } from "@/i18n/routing";

export default function PaymentClientPage({
  id,
  user,
  plans,
}: {
  id: string;
  user: any;
  plans: any[];
}) {
  const searchParams = useSearchParams();
  const billingCycle = searchParams.get("billing") || "monthly";
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const planId = Number.parseInt(id) || 1;
  const selectedPlan = plans.find((plan) => plan.id === planId) || plans[0];

  // Define features based on the number of stores
  const getFeatures = (numStores: any) => {
    const features = [
      `Up to ${numStores} store${numStores > 1 ? "s" : ""}`,
      "Basic analytics",
      "24/7 support",
      "Mobile optimization",
    ];

    if (numStores >= 5) {
      features.push("Priority support");
    }

    if (numStores >= 10) {
      features.push("Custom branding", "API access");
    }

    return features;
  };

  const features = getFeatures(selectedPlan.num_of_stores);
  const isPopular = selectedPlan.id === 3; // Assuming Pro plan (id=3) is popular
  const planColor = getPlanColor(selectedPlan.id);

  // Helper function to get color based on plan id
  function getPlanColor(id: any) {
    const colors: any = {
      1: "bg-gray-600", // Free
      2: "bg-blue-600", // Basic
      3: "bg-emerald-600", // Pro
      4: "bg-purple-600", // Premium
      5: "bg-amber-600", // Custom/Other plans
    };
    return colors[id] || "bg-primary";
  }

  const price = Number.parseFloat(selectedPlan.price);
  const monthlyPrice = price;
  const annualPrice = price * 12 * 0.8; // 20% discount for annual
  const isAnnual = billingCycle === "annually";
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  const savings = isAnnual ? monthlyPrice * 12 - annualPrice : 0;

  const handlePayment = async () => {
    setIsProcessing(true);
    console.log(user.user);

    const data = await createPayment(
      {
        plan_id: Number(id),
        user_id: Number(user.user?.user_id),
      },
      String(user.token)
    );
    if (data) {
      window.location.assign(data.transaction.url);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-transparent via-secondary from-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/pricing"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-all duration-200 hover:translate-x-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to pricing plans
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/50 to-foreground bg-clip-text text-transparent mb-2">
                Complete Your Purchase
              </h1>
              <p className="text-muted-foreground text-lg">
                Secure checkout powered by Tap Payments
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="backdrop-blur-sm shadow-2xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-primary" />
                        Payment Details
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-1">
                        You're subscribing to the {selectedPlan.name}
                      </CardDescription>
                    </div>
                    {isPopular && (
                      <Badge className="bg-primary hover:bg-primary/90 text-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 border border-primary/20">
                    <h3 className="font-semibold mb-4 text-lg">
                      Order Summary
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${planColor} mt-2`}
                          ></div>
                          <div>
                            <p className="font-medium text-lg">
                              {selectedPlan.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {isAnnual
                                ? "Annual subscription"
                                : "Monthly subscription"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-xl">
                            {currentPrice.toFixed(2)} EGP
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isAnnual ? "per year" : "per month"}
                          </p>
                        </div>
                      </div>

                      {isAnnual && savings > 0 && (
                        <div className="bg-primary/20 border border-primary/50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-medium">
                              Annual Discount (20%)
                            </span>
                            <span className="text-emerald-400 font-semibold">
                              -{savings.toFixed(2)} EGP
                            </span>
                          </div>
                        </div>
                      )}

                      <Separator className="bg-primary/20" />

                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total</span>
                        <div className="text-right">
                          <span>{currentPrice.toFixed(2)} EGP</span>
                          <p className="text-sm text-gray-400 font-normal">
                            {isAnnual ? "billed annually" : "billed monthly"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <div className="space-y-4">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      loading={isProcessing}
                      className="w-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary/70 hover:to-primary/80 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-200 transform hover:scale-[1.005]"
                    >
                      {isProcessing ? (
                        "Processing"
                      ) : (
                        <div className="flex items-center gap-2">
                          {!isProcessing && <Lock className="h-5 w-5" />}
                          Pay {currentPrice.toFixed(2)} EGP Securely
                        </div>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        SSL Encrypted
                      </div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Secure Payment
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="backdrop-blur-sm shadow-2xl sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${planColor}`}></div>
                    {selectedPlan.name}
                  </CardTitle>
                  <CardDescription>
                    {isAnnual ? "Annual subscription" : "Monthly subscription"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price Display */}
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {currentPrice.toFixed(2)} EGP
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {isAnnual ? "per year" : "per month"}
                    </div>
                    {isAnnual && (
                      <div className="text-primary text-sm mt-1">
                        Save {savings.toFixed(2)} EGP annually
                      </div>
                    )}
                  </div>

                  <Separator className="bg-border" />

                  {/* Features List */}
                  <div>
                    <h4 className="font-semibold mb-3 text-muted-foreground">
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust Indicators */}
                  <div className="pt-4 border-t border-border">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Cancel anytime
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        24/7 customer support
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        30-day money-back guarantee
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-2">
              Need help with your purchase?
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <a
                href="mailto:support@motager.com"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Email Support
              </a>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <a
                href="/help"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Help Center
              </a>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <a
                href="/contact"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
