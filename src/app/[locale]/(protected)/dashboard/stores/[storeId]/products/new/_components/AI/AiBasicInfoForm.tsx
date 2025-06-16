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
import { PlusCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { generateProductNameAndDescription } from "@/data/ai";
import { useProductForm } from "@/providers/product-form";

const AiFormSchema = z.object({
  Brand_name: z.string().min(2, {
    message: "Enter your brand or store name",
  }),
  image_paths: z.array(z.string()).min(1, {
    message: "At least one image is required",
  }),
});

type FormValues = z.infer<typeof AiFormSchema>;

// Define a type for the generated product data
interface GeneratedProductData {
  product_name: string;
  description: string;
}

type AiBasicInfoFormProps = {
  onGenerationSuccess?: (data: GeneratedProductData) => void;
};

const AiBasicInfoForm = ({ onGenerationSuccess }: AiBasicInfoFormProps) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { updateFormData , formData } = useProductForm();

  const form = useForm<FormValues>({
    resolver: zodResolver(AiFormSchema),
    defaultValues: {
      Brand_name: "",
      image_paths: [],
    },
  });

  const selectedImages = form.watch("image_paths");

  const handleAddMedia = (mediaUrls: string[]) => {
    // Combine existing images with newly selected ones
    const currentImages = form.getValues("image_paths") || [];
    const newImages = [...currentImages, ...mediaUrls];

    // Update the form value
    form.setValue("image_paths", newImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsMediaModalOpen(false);
  };

  const removeImage = (index: number) => {
    const currentImages = [...form.getValues("image_paths")];
    currentImages.splice(index, 1);

    form.setValue("image_paths", currentImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      console.log(values);

      // Check internet connectivity first
      if (!navigator.onLine) {
        toast.error(
          "You appear to be offline. Please check your internet connection."
        );
        return;
      }

      try {
        const res = await generateProductNameAndDescription(values);

        if (!res.success) {
          toast.error("Failed to generate product information");
          return;
        }

        toast.success("Product information generated successfully");

        // Update the main form with the generated data
        updateFormData({
          name: res.product_name,
          description: res.description,
        });

        // Pass the generated data to parent component if callback exists
        if (onGenerationSuccess) {
          onGenerationSuccess({
            product_name: res.product_name,
            description: res.description,
          });
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
        console.error("Error generating product information:", error);
      }
    } catch (error) {
      console.error("Error generating product information:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Brand_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Apple" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_paths"
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
                Choose one or more images where the product is visible to
                generate the product name, and description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media upload modal */}
        <MediaUploadModal
        storeId={formData.store_id}
          open={isMediaModalOpen}
          onOpenChange={setIsMediaModalOpen}
          handleAddMedia={handleAddMedia}
          multiple={true}
          bucketName="product-images"
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={selectedImages.length === 0 || isSubmitting}
            loading={isSubmitting}
          >
            Generate Product Info
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AiBasicInfoForm;
