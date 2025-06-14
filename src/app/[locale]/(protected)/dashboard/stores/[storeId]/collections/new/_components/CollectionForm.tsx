"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaModal } from "@/components/media-modal";
import { ImageIcon, X } from "lucide-react";
import MediaUploadModal from "@/components/shared/MediaUpload";
import { useParams } from "next/navigation";
import { getSession } from "@/actions/getSession";
import { createStoreCollection } from "@/data/collection";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

// Define the collection schema
const collectionSchema = z.object({
  name: z.string().min(1, { message: "Collection name is required" }),
  description: z.string().optional(),
  image_url: z.string().min(1, { message: "Collection image is required" }),
});

type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  initialData?: CollectionFormValues;
  isSubmitting?: boolean;
}

export default function CollectionForm({
  initialData,
  isSubmitting = false,
}: CollectionFormProps) {
  const t = useTranslations();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const {storeId} = useParams();  // Initialize form with default values or initial data
  const router = useRouter();
  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      image_url: "",
    },
  });

  // Handle media selection
  const handleMediaSelect = (selectedImages: any[]) => {
    if (selectedImages.length > 0) {
      form.setValue("image_url", selectedImages[0], { shouldValidate: true });
    }
  };

  // Clear the selected image
  const handleClearImage = () => {
    form.setValue("image_url", "", { shouldValidate: true });
  };

  // Handle form submission
  const handleFormSubmit = async (data: CollectionFormValues) => {
    const {token} = await getSession();
    const response = await createStoreCollection(Number(storeId), data, token);
    if(response){
      toast.success("Collection created successfully");
      router.push(`/dashboard/stores/${storeId}/collections`);
    }else{
      toast.error("Failed to create collection");
    }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Collection Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter collection name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your collection as it will appear to customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Collection Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter collection description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of this collection.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value ? (
                        <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-md border border-border"> 
                          <img
                            src={field.value}
                            alt="Collection image"
                            className="h-full w-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={handleClearImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsMediaModalOpen(true)}
                          className="flex aspect-square w-full max-w-[300px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/40 p-4 text-muted-foreground hover:bg-muted/60 transition-colors"
                        >
                          <ImageIcon className="h-8 w-8" />
                          <p className="text-sm font-medium">Upload Image</p>
                          <p className="text-xs">Click to browse media library</p>
                        </div>
                      )}
                      <input
                        type="hidden"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsMediaModalOpen(true)}
                      >
                        {field.value ? "Change Image" : "Select Image"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This image will represent your collection in the store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Collection"}
          </Button>
        </div>

        {/* Media Upload Modal */}
        <MediaUploadModal
        open={isMediaModalOpen}
        onOpenChange={setIsMediaModalOpen}
        handleAddMedia={handleMediaSelect}
      />
      </form>
    </Form>
  );
}