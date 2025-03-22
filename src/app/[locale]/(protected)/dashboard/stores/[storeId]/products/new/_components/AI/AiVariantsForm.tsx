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

const AiFormSchema = z.object({
  images: z.array(z.string()).min(1, {
    message: "At least one image is required",
  }),
});

type FormValues = z.infer<typeof AiFormSchema>;

const AiVariantsForm = () => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(AiFormSchema),
    defaultValues: {
      images: [],
    },
  });

  const selectedImages = form.watch("images");

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

  function onSubmit(values: FormValues) {
    console.log("Submitted images:", values);
    // Here you would handle the AI generation based on the uploaded images
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
                try not to choose an image that contains the same color twice.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media upload modal */}
        <MediaUploadModal
          open={isMediaModalOpen}
          onOpenChange={setIsMediaModalOpen}
          handleAddMedia={handleAddMedia}
        />

        <DialogFooter>
          <Button type="submit" disabled={selectedImages.length === 0}>
            Generate Product Info
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AiVariantsForm;
