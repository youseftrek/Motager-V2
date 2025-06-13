"use client";

import { useTranslations } from "next-intl";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";

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

// Define features for each plan
const planFeatures = {
  basic: [
    "1 store",
    "Basic analytics",
    "Standard support",
    "Mobile app access",
    "Product management",
  ],
  standard: [
    "5 stores",
    "Advanced analytics",
    "Priority support",
    "Mobile app access",
    "Product management",
    "Custom domain",
    "API access",
  ],
  premium: [
    "Unlimited stores",
    "Premium analytics",
    "24/7 dedicated support",
    "Mobile app access",
    "Advanced product management",
    "Custom domain",
    "Full API access",
    "White labeling",
    "Dedicated account manager",
  ],
};

// Define icons for each plan
const planIcons = {
  basic: Zap,
  standard: Shield,
  premium: Sparkles,
};

export default function PricingPage({
  plans,
  user,
}: {
  plans: Plan[];
  user: any;
}) {
  const t = useTranslations("PricingPage");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  // Sort plans by price for display order
  const sortedPlans = plans
    ? [...plans].sort(
        (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
      )
    : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const RenderPlan = ({ plan, index }: { plan: Plan; index: number }) => {
    // Check if this is the user's current plan
    const isUserPlan = user?.plan?.id === plan.id;
    const isPopular = index === 1; // Middle plan is usually the popular one

    // Determine which feature set to use based on index
    const featureSet =
      index === 0
        ? planFeatures.basic
        : index === 1
        ? planFeatures.standard
        : planFeatures.premium;

    // Get the appropriate icon
    const PlanIcon =
      index === 0
        ? planIcons.basic
        : index === 1
        ? planIcons.standard
        : planIcons.premium;

    return (
      <motion.div
        variants={itemVariants}
        className={cn(
          "rounded-2xl border bg-card text-card-foreground relative overflow-hidden",
          isPopular
            ? "border-primary/50 shadow-lg shadow-primary/20 scale-105 z-10"
            : isUserPlan
            ? "border-green-500 shadow-lg shadow-green-500/20"
            : "border-border hover:border-primary/30 hover:shadow-md transition-all"
        )}
      >
        {isPopular && (
          <div className="absolute top-0 left-0 w-full bg-primary py-2 text-center">
            <span className="text-primary-foreground text-xs font-bold uppercase tracking-wider">
              Most Popular
            </span>
          </div>
        )}

        {isUserPlan && (
          <Badge className="absolute top-1 right-1">Current Plan</Badge>
        )}

        <div className={cn("p-8", isPopular && "pt-12")}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                "p-2 rounded-full",
                isPopular ? "bg-primary/10" : "bg-muted"
              )}
            >
              <PlanIcon
                className={cn(
                  "w-5 h-5",
                  isPopular ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
            <h3 className="font-bold text-xl">{plan.name}</h3>
          </div>

          <p className="text-muted-foreground mb-6">{plan.description}</p>

          <div className="flex items-baseline mb-6">
            <span className="font-extrabold text-4xl tracking-tight">
              {billingCycle === "monthly"
                ? plan.price
                : (Number.parseFloat(plan.price) * 10).toFixed(2)}
            </span>
            <span className="ml-1 text-muted-foreground">
              EGP / {billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>

          {isUserPlan ? (
            <Button className="w-full mb-6" disabled>
              Current Plan
            </Button>
          ) : (
            <Link href={`/payment/${plan.id}`} className="block">
              <Button
                className="w-full mb-6"
                variant={isPopular ? "default" : "outline"}
              >
                {t("plans.starter.cta")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          )}

          <div className="space-y-4">
            <p className="text-sm font-medium">What's included:</p>
            <ul className="space-y-3">
              {featureSet.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check
                    className={cn(
                      "w-5 h-5 shrink-0 mt-0.5",
                      isPopular ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span className="ml-3 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mx-auto px-4 py-16 container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <motion.div variants={itemVariants}>
          <h1 className="mb-4 font-bold text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-3 mt-10 bg-muted p-2 rounded-full w-fit mx-auto"
        >
          <Label
            htmlFor="billing-cycle"
            className={cn(
              "cursor-pointer px-4 py-2 rounded-full",
              billingCycle === "monthly" ? "bg-background shadow-sm" : ""
            )}
            onClick={() => setBillingCycle("monthly")}
          >
            {t("monthly")}
          </Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === "annually"}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? "annually" : "monthly")
            }
          />
          <Label
            htmlFor="billing-cycle"
            className={cn(
              "cursor-pointer px-4 py-2 rounded-full flex items-center",
              billingCycle === "annually" ? "bg-background shadow-sm" : ""
            )}
            onClick={() => setBillingCycle("annually")}
          >
            {t("annually")}
            <span className="bg-green-100 dark:bg-green-800/30 ml-2 px-2 py-0.5 rounded-full font-semibold text-green-800 dark:text-green-100 text-xs">
              {t("savePercent")}
            </span>
          </Label>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="gap-6 grid md:grid-cols-3 mx-auto max-w-7xl"
      >
        {sortedPlans && sortedPlans.length > 0 ? (
          sortedPlans.map((plan, index) => (
            <RenderPlan key={plan.id} plan={plan} index={index} />
          ))
        ) : (
          // Fallback if no plans are available
          <>
            <RenderPlan
              plan={{
                id: 1,
                name: "Basic Plan",
                description: "Perfect for individuals just getting started",
                price: "10.00",
                isActive: false,
                num_of_stores: 1,
                createdAt: "2025-06-09T18:49:52.266Z",
                updatedAt: "2025-06-09T18:49:52.266Z",
              }}
              index={0}
            />
            <RenderPlan
              plan={{
                id: 2,
                name: "Standard Plan",
                description:
                  "Great for growing businesses with multiple stores",
                price: "20.00",
                isActive: false,
                num_of_stores: 5,
                createdAt: "2025-06-09T18:49:52.280Z",
                updatedAt: "2025-06-09T18:49:52.280Z",
              }}
              index={1}
            />
            <RenderPlan
              plan={{
                id: 3,
                name: "Premium Plan",
                description: "For enterprises needing unlimited capabilities",
                price: "30.00",
                isActive: false,
                num_of_stores: 10,
                createdAt: "2025-06-09T18:49:52.279Z",
                updatedAt: "2025-06-09T18:49:52.279Z",
              }}
              index={2}
            />
          </>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Contact our sales team for a custom quote or to learn more about our
          plans.
        </p>
        <Button variant="outline">Contact Sales</Button>
      </motion.div>
    </div>
  );
}
