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
import { ImageIcon, X, Sparkles, Upload, Eye } from "lucide-react";
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { storeId } = useParams();
  const router = useRouter();
  
  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      image_url: "",
    },
  });

  const watchedValues = form.watch();

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
    const { token } = await getSession();
    const response = await createStoreCollection(Number(storeId), data, token);
    if (response) {
      toast.success("Collection created successfully");
      router.push(`/dashboard/stores/${storeId}/collections`);
    } else {
      toast.error("Failed to create collection");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-medium text-black backdrop-blur-sm border border-blue-200/50 mb-4">
            <Sparkles className="h-4 w-4" />
            Create Collection
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Build Your Collection
          </h1>
          <p className="text-gray-600 text-lg">Craft beautiful collections that captivate your customers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                  {/* Collection Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          Collection Name
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter an inspiring collection name..."
                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 bg-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-600">
                          Choose a memorable name that reflects your collection's essence
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
                      <FormItem className="group">
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          Description
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell your story... What makes this collection special?"
                            className="min-h-[140px] text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl transition-all duration-200 bg-white/50 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-600">
                          Paint a picture with words that will inspire your customers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload Section */}
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          Collection Image
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {field.value ? (
                              <div className="relative group/image">
                                <div className="aspect-video w-full overflow-hidden rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                                  <img
                                    src={field.value}
                                    alt="Collection preview"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute right-3 top-3 h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 opacity-80 hover:opacity-100"
                                    onClick={handleClearImage}
                                  >
                                    <X className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => setIsMediaModalOpen(true)}
                                className="group/upload flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-4 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-gray-500 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300"
                              >
                                <div className="relative">
                                  <ImageIcon className="h-16 w-16 transition-transform duration-300 group-hover/upload:scale-110" />
                                  <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-all duration-300">
                                    <Upload className="h-3 w-3 text-white" />
                                  </div>
                                </div>
                                <div className="text-center">
                                  <p className="text-xl font-semibold mb-1">Upload Your Vision</p>
                                  <p className="text-sm opacity-75">Click to browse your media library</p>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsMediaModalOpen(true)}
                                className="flex-1 h-12 rounded-xl border-2 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                              >
                                <ImageIcon className="mr-2 h-5 w-5" />
                                {field.value ? "Change Image" : "Select Image"}
                              </Button>
                              {field.value && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                                  className="h-12 px-6 rounded-xl border-2 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                                >
                                  <Eye className="h-5 w-5" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-gray-600">
                          Choose an image that captures the essence of your collection
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Form Actions */}
                  <div className="flex justify-between gap-4 pt-6 border-t border-gray-200">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="h-12 px-8 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Creating Magic...
                        </>
                      ) : (
                        <>
                          Create Collection
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-6 lg:h-fit">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <h3 className="text-xl font-semibold text-gray-800">Live Preview</h3>
              </div>
              
              <div className="space-y-6">
                {/* Preview Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                  {watchedValues.image_url ? (
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={watchedValues.image_url}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full flex items-center justify-center rounded-lg mb-4 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {watchedValues.name || "Your Collection Name"}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {watchedValues.description || "Your collection description will appear here..."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500 font-medium">COLLECTION</span>
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      Use high-quality images for better customer engagement
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      Keep collection names short and memorable
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      Write descriptions that tell a story
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Upload Modal */}
        <MediaUploadModal
          storeId={Number(storeId)}
          open={isMediaModalOpen}
          onOpenChange={setIsMediaModalOpen}
          handleAddMedia={handleMediaSelect}
        />
      </div>
    </div>
  );
}