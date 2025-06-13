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
import MediaUploadModal from "@/components/shared/MediaUpload";
import { useState } from "react";
import Image from "next/image";
import { PlusCircle, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductForm } from "@/providers/product-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { extractProductColors } from "@/data/ai";

const AiFormSchema = z.object({
  images: z.array(z.string()).min(1, {
    message: "At least one image is required",
  }),
});

type FormValues = z.infer<typeof AiFormSchema>;

// Define a type for the AI response
interface GeneratedVariants {
  success: boolean;
  variants: {
    name: string;
    values: string[];
  }[];
}

type AiVariantsFormProps = {
  onGenerationSuccess?: (data: GeneratedVariants) => void;
};

const AiVariantsForm = ({ onGenerationSuccess }: AiVariantsFormProps = {}) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [isExtractingColors, setIsExtractingColors] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Get access to the main form's variant management functions
  const { formData, updateFormData, addVariant, updateVariant } =
    useProductForm();

  const form = useForm<FormValues>({
    resolver: zodResolver(AiFormSchema),
    defaultValues: {
      images: [],
    },
  });

  const selectedImages = form.watch("images");

  // Check if a Color variant already exists in the main form
  const existingColorVariantIndex = formData.variants.findIndex(
    (variant) => variant.name.toLowerCase() === "color"
  );

  const handleAddMedia = (mediaUrls: string[]) => {
    // Combine existing images with newly selected ones
    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages, ...mediaUrls];

    // Update the form value
    form.setValue("images", newImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsMediaModalOpen(false);
  };

  const removeImage = (index: number) => {
    const currentImages = [...form.getValues("images")];
    currentImages.splice(index, 1);

    form.setValue("images", currentImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const extractColors = async () => {
    try {
      setIsExtractingColors(true);
      setExtractedColors([]);

      const images = form.getValues("images");
      if (images.length === 0) {
        toast.error("Please add at least one image first");
        return;
      }

      // Use the actual API call to extract colors
      const response = await extractProductColors({ image_paths: images });

      if (!response.success) {
        toast.error("Failed to extract colors");
        return;
      }

      // Set the extracted colors
      setExtractedColors(response.colors);
      toast.success(`Successfully extracted ${response.colors.length} colors`);
    } catch (error) {
      console.error("Error extracting colors:", error);
      toast.error("Failed to extract colors from images");
    } finally {
      setIsExtractingColors(false);
    }
  };

  const toggleColorSelection = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const removeSelectedColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  // Add selected colors directly to the main form
  const addColorsToMainForm = () => {
    if (selectedColors.length === 0) {
      toast.error("Please select at least one color");
      return false;
    }

    // If a Color variant already exists, update it
    if (existingColorVariantIndex !== -1) {
      // Get existing values
      const existingValues =
        formData.variants[existingColorVariantIndex].values;

      // Add only new values (avoid duplicates)
      const newValues = [...existingValues];

      selectedColors.forEach((color) => {
        if (!newValues.includes(color)) {
          newValues.push(color);
        }
      });

      updateVariant(existingColorVariantIndex, {
        name: "Color",
        values: newValues,
      });
    } else {
      // Otherwise, add a new Color variant
      addVariant({
        name: "Color",
        values: selectedColors,
      });
    }

    toast.success("Colors added to product variants");
    return true;
  };

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      console.log("Submitting with images:", values.images);

      // Check internet connectivity first
      if (!navigator.onLine) {
        toast.error(
          "You appear to be offline. Please check your internet connection."
        );
        return;
      }

      // Add colors to the main form and check result
      const colorsAdded = addColorsToMainForm();
      if (!colorsAdded) return;

      try {
        // Set has_variants flag to true
        updateFormData({ has_variants: true });

        // Create success data structure
        const generatedVariants: GeneratedVariants = {
          success: true,
          variants: [{ name: "Color", values: selectedColors }],
        };

        // Pass the generated data to parent component if callback exists
        if (onGenerationSuccess) {
          onGenerationSuccess(generatedVariants);
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
        console.error("Error generating variants:", error);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper function to determine if a color is light or dark
  function isLightColor(color: string): boolean {
    // Convert hex to RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate perceived brightness using YIQ formula
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128; // Returns true if color is light
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Display selected images */}
                  {selectedImages && selectedImages.length > 0 ? (
                    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="group relative">
                          <div className="relative border rounded-md aspect-square overflow-hidden">
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="-top-2 -right-2 absolute bg-white opacity-0 group-hover:opacity-100 shadow-md p-1 rounded-full transition-opacity"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}

                      {/* Add more images button */}
                      <button
                        type="button"
                        onClick={() => setIsMediaModalOpen(true)}
                        className={cn(
                          "aspect-square flex flex-col items-center justify-center rounded-md border-2 border-dashed",
                          "text-muted-foreground hover:text-foreground transition-colors"
                        )}
                      >
                        <PlusCircle className="mb-1 w-8 h-8" />
                        <span className="text-xs">Add more</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className={cn(
                        "w-full py-8 flex flex-col items-center justify-center rounded-md border-2 border-dashed",
                        "text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      )}
                    >
                      <PlusCircle className="mb-2 w-10 h-10" />
                      <span>Click to add product images</span>
                    </button>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Choose different images where the product is visible and make
                sure your product colors are clear.
                <br />
                <span className="text-yellow-500">Note: </span>For best results,
                try to choose images that show different color variants of your
                product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Extract colors button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            disabled={selectedImages.length === 0 || isExtractingColors}
            onClick={extractColors}
            loading={isExtractingColors}
          >
            {isExtractingColors
              ? "Extracting Colors..."
              : "Extract Colors from Images"}
          </Button>
        </div>

        {/* Display extracted colors */}
        {extractedColors.length > 0 && (
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium text-sm">Extracted Colors</h3>
              <p className="mb-3 text-muted-foreground text-xs">
                Click on colors to select them for your product variants.
              </p>
              <div className="flex flex-wrap gap-3">
                {extractedColors.map((color, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-12 h-12 rounded-md cursor-pointer relative transition-all",
                      "hover:scale-110 border-2",
                      selectedColors.includes(color)
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-200"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => toggleColorSelection(color)}
                  >
                    {selectedColors.includes(color) && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <Check className="drop-shadow-md w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected colors */}
        {selectedColors.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-medium text-sm">Selected Colors</h3>
            <div className="flex flex-wrap gap-2">
              {selectedColors.map((color, index) => (
                <Badge
                  key={index}
                  className="flex items-center gap-1 px-3 py-2"
                  style={{
                    backgroundColor: color,
                    color: isLightColor(color) ? "#000" : "#fff",
                    border: isLightColor(color)
                      ? "1px solid #00000022"
                      : "none",
                  }}
                >
                  {color}
                  <button
                    onClick={() => removeSelectedColor(color)}
                    className="hover:bg-black/10 ml-1 p-1 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Media upload modal */}
        <MediaUploadModal
          open={isMediaModalOpen}
          onOpenChange={setIsMediaModalOpen}
          handleAddMedia={handleAddMedia}
          multiple={true}
          bucketName="product-images"
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={selectedColors.length === 0 || isSubmitting}
            loading={isSubmitting}
          >
            Add Colors to Product
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AiVariantsForm;
