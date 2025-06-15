"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Variant = {
  name: string;
  values: string[];
};

export type VariantCombination = {
  id: string;
  combination: Record<string, string>; // e.g., { "Color": "Red", "Size": "Large" }
  stock: number;
  price: number;
  compare_at_price: number;
  cost_per_item: number;
  profit: number;
  margin: number;
  image_url?: string;
};

export type ProductFormData = {
  store_id: number;
  name: string;
  description: string;
  published: boolean;
  startPrice: number;
  main_image_url: string;
  images_url: string[];
  category: {
    id: number;
    slug: string;
  };
  has_variants: boolean;
  variants: Variant[];
  skus: {
    stock: number;
    price: number;
    compare_at_price: number;
    cost_per_item: number;
    profit: number;
    margin: number;
    image_url?: string;
    variants: {
      name: string;
      value: string;
    }[];
  }[];
};

const initialFormData: ProductFormData = {
  store_id: 1,
  name: "",
  description: "",
  published: true,
  startPrice: 0,
  main_image_url: "",
  images_url: [],
  category: {
    id: 0,
    slug: "",
  },
  has_variants: false,
  variants: [],
  skus: [],
};

type ProductFormContextType = {
  formData: ProductFormData;
  currentStep: number;
  updateFormData: (data: Partial<ProductFormData>) => void;
  addVariant: (variant: Variant) => void;
  updateVariant: (index: number, variant: Variant) => void;
  removeVariant: (index: number) => void;
  addVariantValue: (variantIndex: number, value: string) => void;
  removeVariantValue: (variantIndex: number, valueIndex: number) => void;
  updateVariantValue: (
    variantIndex: number,
    valueIndex: number,
    newValue: string
  ) => void;
  generateSkus: () => void;
  updateSku: (index: number, data: Partial<ProductFormData['skus'][0]>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(
  undefined
);

export function ProductFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4; // Basic Info, Variants, SKUs, Review

  const updateFormData = (data: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const addVariant = (variant: Variant) => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, variant],
    }));
  };

  const updateVariant = (index: number, variant: Variant) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = variant;
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants.splice(index, 1);
      return { ...prev, variants: newVariants };
    });
  };

  const addVariantValue = (variantIndex: number, value: string) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      if (!newVariants[variantIndex].values.includes(value)) {
        newVariants[variantIndex] = {
          ...newVariants[variantIndex],
          values: [...newVariants[variantIndex].values, value],
        };
      }
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariantValue = (variantIndex: number, valueIndex: number) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      const newValues = [...newVariants[variantIndex].values];
      newValues.splice(valueIndex, 1);
      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        values: newValues,
      };
      return { ...prev, variants: newVariants };
    });
  };

  const updateVariantValue = (
    variantIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      if (
        newVariants[variantIndex] &&
        newVariants[variantIndex].values &&
        newVariants[variantIndex].values[valueIndex] !== undefined
      ) {
        const newValues = [...newVariants[variantIndex].values];
        newValues[valueIndex] = newValue;
        newVariants[variantIndex] = {
          ...newVariants[variantIndex],
          values: newValues,
        };
      }
      return { ...prev, variants: newVariants };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      // If we're on step 1 (variants) and has_variants is false, skip to step 3 (review)
      if (currentStep === 0 && !formData.has_variants) {
        // Ensure we have at least one SKU for non-variant products
        if (formData.skus.length === 0) {
          setFormData((prev) => ({
            ...prev,
            skus: [
              {
                stock: 0,
                price: prev.startPrice,
                compare_at_price: 0,
                cost_per_item: 0,
                profit: 0,
                margin: 0,
                variants: [],
              },
            ],
          }));
        }
        setCurrentStep(2);
      } else if (currentStep === 1) {
        // Generate SKUs when moving from variants to SKUs step
        generateSkus();
        setCurrentStep(2);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  // Generate SKUs based on variants
  const generateSkus = () => {
    if (formData.variants.length === 0) return;

    // Helper function to generate combinations
    const generateCombinations = (
      variants: Variant[],
      current: Record<string, string> = {},
      index = 0
    ): Record<string, string>[] => {
      if (index === variants.length) {
        return [current];
      }

      const variant = variants[index];
      const combinations: Record<string, string>[] = [];

      for (const value of variant.values) {
        const newCurrent = { ...current, [variant.name]: value };
        combinations.push(
          ...generateCombinations(variants, newCurrent, index + 1)
        );
      }

      return combinations;
    };

    const combinations = generateCombinations(formData.variants);

    // Create SKUs with default values
    const skus = combinations.map((combination) => {
      const variantPairs = Object.entries(combination).map(([name, value]) => ({
        name,
        value,
      }));

      return {
        stock: 0,
        price: formData.startPrice,
        compare_at_price: 0,
        cost_per_item: 0,
        profit: 0,
        margin: 0,
        variants: variantPairs,
      };
    });

    setFormData((prev) => ({
      ...prev,
      skus,
    }));
  };

  const updateSku = (index: number, data: Partial<ProductFormData['skus'][0]>) => {
    setFormData((prev) => {
      const newSkus = [...prev.skus];
      newSkus[index] = {
        ...newSkus[index],
        ...data,
      };

      // Recalculate profit and margin if price or cost changed
      if (data.price !== undefined || data.cost_per_item !== undefined) {
        const price = data.price ?? newSkus[index].price;
        const cost = data.cost_per_item ?? newSkus[index].cost_per_item;
        newSkus[index].profit = price - cost;
        newSkus[index].margin = price > 0 ? ((price - cost) / price) * 100 : 0;
      }

      return { ...prev, skus: newSkus };
    });
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // If we're on step 3 (SKUs) and has_variants is false, skip back to step 1 (basic info)
      if (currentStep === 2 && !formData.has_variants) {
        setCurrentStep(0);
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <ProductFormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        addVariant,
        updateVariant,
        removeVariant,
        addVariantValue,
        removeVariantValue,
        updateVariantValue,
        generateSkus,
        updateSku,
        nextStep,
        prevStep,
        goToStep,
        isLastStep: currentStep === totalSteps - 1,
        isFirstStep: currentStep === 0,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
}

export function useProductForm() {
  const context = useContext(ProductFormContext);
  if (context === undefined) {
    throw new Error("useProductForm must be used within a ProductFormProvider");
  }
  return context;
}
