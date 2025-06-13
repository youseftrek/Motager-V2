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
};

export type ProductFormData = {
  store_id: number;
  name: string;
  description: string;
  published: boolean;
  startPrice: number;
  category: {
    id:number;
  };
  has_variants: boolean;
  main_image_url:string;
  images_url: string[]; // URLs to media files
  variants: Variant[];
  variant_combinations: VariantCombination[];
};

const initialFormData: ProductFormData = {
  store_id: 1,
  name: "",
  description: "",
  published: true,
  startPrice: 0,
  main_image_url:"",
  category: {
    id: 0, 
  },
  has_variants: false,
  images_url: [],
  variants: [],
  variant_combinations: [],
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
  generateVariantCombinations: () => void;
  updateVariantCombination: (
    id: string,
    data: Partial<VariantCombination>
  ) => void;
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

  // Generate all possible combinations of variants
  const generateVariantCombinations = () => {
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

    // Create variant combinations with default values
    const variantCombinations = combinations.map((combination) => {
      const id = Object.entries(combination)
        .map(([key, value]) => `${key}-${value}`)
        .join("-");

      return {
        id,
        combination,
        stock: 0,
        price: formData.startPrice,
        compare_at_price: 0,
        cost_per_item: 0,
        profit: 0,
        margin: 0,
      };
    });

    setFormData((prev) => ({
      ...prev,
      variant_combinations: variantCombinations,
    }));
  };

  const updateVariantCombination = (
    id: string,
    data: Partial<VariantCombination>
  ) => {
    setFormData((prev) => {
      const index = prev.variant_combinations.findIndex((vc) => vc.id === id);
      if (index === -1) return prev;

      const newCombinations = [...prev.variant_combinations];
      newCombinations[index] = {
        ...newCombinations[index],
        ...data,
      };

      // Recalculate profit and margin if price or cost changed
      if (data.price !== undefined || data.cost_per_item !== undefined) {
        const price = data.price ?? newCombinations[index].price;
        const cost = data.cost_per_item ?? newCombinations[index].cost_per_item;
        newCombinations[index].profit = price - cost;
        newCombinations[index].margin =
          price > 0 ? ((price - cost) / price) * 100 : 0;
      }

      return { ...prev, variant_combinations: newCombinations };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      // If we're on step 1 (variants) and has_variants is false, skip to step 3 (review)
      if (currentStep === 0 && !formData.has_variants) {
        setCurrentStep(2);
      } else if (currentStep === 1) {
        // Generate variant combinations when moving from variants to SKUs step
        generateVariantCombinations();
        setCurrentStep(2);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
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
        generateVariantCombinations,
        updateVariantCombination,
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
