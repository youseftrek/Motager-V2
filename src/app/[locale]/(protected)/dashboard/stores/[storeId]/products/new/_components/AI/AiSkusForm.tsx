"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  useProductForm,
  type VariantCombination,
} from "@/providers/product-form";
import { toast } from "sonner";

// Form schema definition
const AiFormSchema = z.object({
  starting_price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Please enter a valid positive number" }
  ),
});

type FormValues = z.infer<typeof AiFormSchema>;

// Define a type for the AI response
interface GeneratedSkus {
  success: boolean;
  variant_combinations: VariantCombination[];
}

type AiSkusFormProps = {
  onGenerationSuccess?: (data: GeneratedSkus) => void;
};

const AiSkusForm = ({ onGenerationSuccess }: AiSkusFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { formData, updateFormData } = useProductForm();

  const form = useForm<FormValues>({
    resolver: zodResolver(AiFormSchema),
    defaultValues: {
      starting_price:
        formData.starting_at_price > 0
          ? formData.starting_at_price.toString()
          : "19.99",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      // Check internet connectivity first
      if (!navigator.onLine) {
        toast.error(
          "You appear to be offline. Please check your internet connection."
        );
        return;
      }

      try {
        // Parse the starting price
        const startingPrice = parseFloat(values.starting_price);

        // If the product doesn't have variants, we can't generate SKUs
        if (!formData.has_variants || formData.variants.length === 0) {
          toast.error("The product must have variants to generate SKUs");
          return;
        }

        // In a real application, you would call the AI service here
        // const res = await axios.post(API_URLS.AI_GENERATE_SKUS, {...values, variants: formData.variants});

        // For now, we'll mock a response that generates prices and inventory for each variant combination
        const mockVariantCombinations: VariantCombination[] =
          formData.variant_combinations.map((vc) => {
            // Generate a random price around the starting price
            const price = startingPrice + (Math.random() * 10 - 5);
            const cost = price * 0.6; // 60% of the price
            const profit = price - cost;
            const margin = (profit / price) * 100;

            return {
              ...vc,
              stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10 and 109
              price: Math.max(1, Math.round(price * 100) / 100),
              compare_at_price: Math.round(price * 1.2 * 100) / 100, // 20% higher
              cost_per_item: Math.round(cost * 100) / 100,
              profit: Math.round(profit * 100) / 100,
              margin: Math.round(margin * 100) / 100,
            };
          });

        const mockResponse: GeneratedSkus = {
          success: true,
          variant_combinations: mockVariantCombinations,
        };

        if (!mockResponse.success) {
          toast.error("Failed to generate SKUs");
          return;
        }

        toast.success("SKUs generated successfully");

        // Update the main form with the generated variant combinations
        updateFormData({
          variant_combinations: mockResponse.variant_combinations,
          starting_at_price: startingPrice,
        });

        // Pass the generated data to parent component if callback exists
        if (onGenerationSuccess) {
          onGenerationSuccess(mockResponse);
        }
      } catch (error: unknown) {
        // Handle specific network errors
        if (error instanceof Error && error.message === "Network Error") {
          toast.error(
            "Cannot connect to AI service. The service might be temporarily unavailable. Please try again later."
          );
        } else {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";
          toast.error(`Error: ${errorMessage}`);
        }
        console.error("Error generating SKUs:", error);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-4 text-sm">
          Generate SKUs (stock, prices, costs) for{" "}
          {formData.variant_combinations.length} variant combinations based on
          your target starting price.
        </div>

        <FormField
          control={form.control}
          name="starting_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price ($)</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Set your desired starting price, and we&apos;ll generate
                appropriate prices for all variants.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.has_variants ||
              formData.variants.length === 0
            }
            loading={isSubmitting}
          >
            Generate SKUs
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AiSkusForm;
