"use client";

import { ProductFormProvider } from "@/providers/product-form";
import { useEffect, useState } from "react";
import { checkAiStatus } from "@/data/ai";
import ProductForm from "./ProductForm";
import AnimatedDashboardPage from "@/app/[locale]/(protected)/dashboard/_components/AnimatedDashboardPage";
import { Category } from "@/types/category";
import { Loader } from "lucide-react";

type Props = {
  categories: Category[];
};

export default function ClientForm({ categories }: Props) {
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
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <Loader size={30} className="animate-spin text-primary"/>
          <p>Loading...</p>
        </div>
      </AnimatedDashboardPage>
    );
  }

  return (
    <AnimatedDashboardPage>
      <ProductFormProvider>
        <ProductForm isModelReady={isModelReady} categories={categories} />
      </ProductFormProvider>
    </AnimatedDashboardPage>
  );
}
