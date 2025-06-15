import { Button } from "@/components/ui/button";
import { useProductForm } from "@/providers/product-form";
import { populateFormWithSampleData } from "./test-data";
import { Beaker } from "lucide-react";
import { toast } from "sonner";

export default function TestDataButton() {
  const { updateFormData, addVariant, addVariantValue, updateSku } =
    useProductForm();

  const handlePopulateTestData = () => {
    const { variants, skus } = populateFormWithSampleData(updateFormData);

    // Add variants
    variants.forEach((variant, variantIndex) => {
      addVariant({ name: variant.name, values: [] });

      // Add variant values
      variant.values.forEach((value) => {
        setTimeout(() => {
          addVariantValue(variantIndex, value);
        }, 0);
      });
    });

    // Add SKUs after a short delay to ensure variants are processed
    setTimeout(() => {
      skus.forEach((sku, index) => {
        updateSku(index, sku);
      });

      toast.success("Test data loaded successfully");
    }, 100);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePopulateTestData}
      className="flex items-center gap-1"
    >
      <Beaker className="w-4 h-4" />
      Load Test Data
    </Button>
  );
}
