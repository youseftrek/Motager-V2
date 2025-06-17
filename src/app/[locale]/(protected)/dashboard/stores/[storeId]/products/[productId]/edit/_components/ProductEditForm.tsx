"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProductForm } from "@/providers/product-form";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import BasicInfoStep from "../../../new/_components/BasicInfoStep";
import VariantsStep from "../../../new/_components/VariantsStep";
import SkusStep from "../../../new/_components/SkuStep";
import ReviewStep from "../../../new/_components/ReviewStep";
import AiDialogForm from "../../../new/_components/AiDialogForm";
import { useUpdateProductMutation } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { Category } from "@/types/category";

type Props = {
  isModelReady: boolean;
  categories: Category[];
};

export default function ProductEditForm({ isModelReady, categories }: Props) {
  const { currentStep, nextStep, prevStep, isLastStep, isFirstStep, formData } =
    useProductForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { storeId, productId } = useParams();
  const [updateProduct, { data, isLoading, isError }] =
    useUpdateProductMutation();
  const router = useRouter();
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      formData.skus = formData.skus.map((sku) => {
        return {
          ...sku,
          image_url: formData.main_image_url,
        };
      });
      console.log("Updating product data:", formData);
      await updateProduct({ 
        storeId: Number(storeId), 
        productId: Number(productId), 
        data: formData 
      });
      if (!isError) {
        toast.success("Product updated successfully");
        router.push(`/dashboard/stores/${storeId}/products`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the step labels based on whether the product has variants
  const getStepLabel = (step: number) => {
    if (formData.has_variants) {
      switch (step) {
        case 0:
          return "Basic Info";
        case 1:
          return "Variants";
        case 2:
          return "SKUs";
        case 3:
          return "Review";
        default:
          return "";
      }
    } else {
      switch (step) {
        case 0:
          return "Basic Info";
        case 2:
          return "SKUs";
        case 3:
          return "Review";
        default:
          return "";
      }
    }
  };

  // Calculate the active steps based on whether the product has variants
  const activeSteps = formData.has_variants ? [0, 1, 2, 3] : [0, 2, 3];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {activeSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className="mt-2 text-sm">{getStepLabel(step)}</span>
            </div>
          ))}
        </div>
        <div className="bg-muted mt-4 rounded-full w-full h-1">
          <div
            className="bg-primary rounded-full h-1 transition-all duration-1000"
            style={{
              width: formData.has_variants
                ? `${(currentStep / 3) * 100}%`
                : `${(activeSteps.indexOf(currentStep) / 2) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <Card styled className="relative p-6">
        {currentStep === 0 && <BasicInfoStep categories={categories} />}
        {currentStep === 1 && <VariantsStep />}
        {currentStep === 2 && <SkusStep />}
        {currentStep === 3 && <ReviewStep />}

        <div className="top-3 ltr:right-3 rtl:left-3 absolute w-fit h-fit">
          <AiDialogForm
            isModelReady={isModelReady}
            currStep={currentStep as 0 | 1 | 2 | 3}
          />
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
            className={isFirstStep ? "invisible" : ""}
          >
            <ChevronLeft className="mr-2 w-4 h-4" /> Previous
          </Button>

          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
} 