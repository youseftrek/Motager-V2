"use client";

import { ProductFormProvider } from "@/providers/product-form";
import AnimatedDashboardPage from "../../../../_components/AnimatedDashboardPage";
import ProductForm from "./_components/ProductForm";
import { useEffect, useState } from "react";
import { checkAiStatus } from "@/data/ai";

export default function ProductPage() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAiStatus() {
      try {
        const res = await checkAiStatus();
        setIsModelReady(res.success);
      } catch (error) {
        console.error("Error checking AI status:", error);
        setIsModelReady(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAiStatus();
  }, []);

  if (isLoading) {
    return (
      <AnimatedDashboardPage>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AnimatedDashboardPage>
    );
  }

  return (
    <AnimatedDashboardPage>
      <ProductFormProvider>
        <ProductForm isModelReady={isModelReady} />
      </ProductFormProvider>
    </AnimatedDashboardPage>
  );
}
