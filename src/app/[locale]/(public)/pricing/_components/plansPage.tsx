"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import AnimatedDashboardPage from "../../../(protected)/dashboard/_components/AnimatedDashboardPage";
import { Link } from "@/i18n/routing";
import { PUBLIC_ROUTES } from "@/constants";

type Plan = {
  id: number;
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  num_of_stores: number;
  createdAt: string;
  updatedAt: string;
};

export default function PricingPage({plans}:{plans:Plan[]}) {
  const t = useTranslations("PricingPage");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  
  // Sort plans by price for display order
  const sortedPlans = plans ? [...plans].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : [];

  const RenderPlan = ({ plan }: { plan: Plan }) => {
    // Determine if this is the middle/premium plan
    const isPro = plan.name === "Premium Plan";
    
    return (
      <div
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow",
          isPro && "border-primary relative"
        )}
      >
        {isPro && (
          <div className="-top-3 right-0 left-0 absolute bg-primary mx-auto px-3 py-1 rounded-full w-fit font-medium text-primary-foreground text-xs">
            {t("plans.professional.recommended")}
          </div>
        )}

        <div className="p-6 pt-8">
          <h3 className="font-bold text-xl">{plan.name}</h3>

          <div className="flex items-baseline mt-4 text-gray-900 dark:text-gray-50">
            <span className="font-extrabold text-4xl tracking-tight">
              ${billingCycle === "monthly" ? plan.price : (parseFloat(plan.price) * 10).toFixed(2)}
            </span>
            <span className="ml-1 font-semibold text-muted-foreground text-xl">
              {t("plans.starter.period")}
            </span>
          </div>

          <p className="mt-2 text-muted-foreground">
            {plan.description}
          </p>
        </div>

        <div className="p-6 pt-0">
          <ul className="space-y-3">
            <li className="flex">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="ml-3 text-muted-foreground">
                Up to {plan.num_of_stores} {plan.num_of_stores === 1 ? "store" : "stores"}
              </span>
            </li>
            {/* Add more features from translation if needed */}
            {(t.raw("plans.starter.features") as string[]).slice(1).map(
              (feature: string, index: number) => (
                <li key={index} className="flex">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="ml-3 text-muted-foreground">{feature}</span>
                </li>
              )
            )}
          </ul>

          <div className="mt-6">
            <Link
              href={PUBLIC_ROUTES.SIGNUP}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full",
                isPro ? "" : "bg-muted-foreground/80 hover:bg-muted-foreground"
              )}
            >
              {t("plans.starter.cta")}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 py-16 container">
      <AnimatedDashboardPage>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="mb-4 font-bold text-4xl">{t("title")}</h1>
          <p className="text-muted-foreground text-xl">{t("description")}</p>

          <div className="flex justify-center items-center space-x-2 mt-10">
            <Label htmlFor="billing-cycle">{t("monthly")}</Label>
            <Switch
              id="billing-cycle"
              checked={billingCycle === "annually"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "annually" : "monthly")
              }
            />
            <Label htmlFor="billing-cycle" className="flex items-center">
              {t("annually")}
              <span className="bg-green-100 dark:bg-green-800 ml-2 px-2 py-0.5 rounded-full font-semibold text-green-800 dark:text-green-100 text-xs">
                {t("savePercent")}
              </span>
            </Label>
          </div>
        </div>

        <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-7xl">
          {sortedPlans && sortedPlans.length > 0 ? (
            sortedPlans.map((plan) => (
              <RenderPlan key={plan.id} plan={plan} />
            ))
          ) : (
            // Fallback if no plans are available
            <>
              <RenderPlan plan={{
                id: 1,
                name: "Basic Plan",
                description: "Basic plan with essential features",
                price: "10.00",
                isActive: false,
                num_of_stores: 1,
                createdAt: "2025-06-09T18:49:52.266Z",
                updatedAt: "2025-06-09T18:49:52.266Z"
              }} />
              <RenderPlan plan={{
                id: 2,
                name: "Premium Plan",
                description: "Premium plan with all features included",
                price: "30.00",
                isActive: false,
                num_of_stores: 10,
                createdAt: "2025-06-09T18:49:52.279Z",
                updatedAt: "2025-06-09T18:49:52.279Z"
              }} />
              <RenderPlan plan={{
                id: 3,
                name: "Pro Plan",
                description: "Pro plan with additional features",
                price: "20.00",
                isActive: false,
                num_of_stores: 5,
                createdAt: "2025-06-09T18:49:52.280Z",
                updatedAt: "2025-06-09T18:49:52.280Z"
              }} />
            </>
          )}
        </div>
      </AnimatedDashboardPage>
    </div>
  );
}
