"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, GripVertical, ImageIcon } from "lucide-react";
import { useState } from "react";

import { Reorder, useDragControls } from "framer-motion";
import { useProductForm } from "@/providers/product-form";
import Image from "next/image";
import MediaUploadModal from "@/components/shared/MediaUpload";
import ImagePreviewModal from "@/components/shared/ImagePreview";

export default function BasicInfoStep() {
  const { formData, updateFormData } = useProductForm();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dragControls = useDragControls();

  // Mock data for categories
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Smartphones" },
    { id: 3, name: "Accessories" },
  ];

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...formData.images_url];
    newMedia.splice(index, 1);
    updateFormData({ images_url: newMedia });
  };

  const handleAddMedia = (mediaUrls: string[]) => {
    const newMedia = [...formData.images_url, ...mediaUrls];
    updateFormData({ images_url: newMedia , main_image_url: newMedia[0] || "" });
  };

  const handleReorderMedia = (newOrder: string[]) => {
    updateFormData({ images_url: newOrder , main_image_url: newOrder[0] || "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-2xl">Basic Information</h2>

      <div className="flex items-center space-x-4">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => updateFormData({ published: checked })}
        />
        <Label htmlFor="published">
          {formData.published ? "Published" : "Draft"}
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Product Title</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Enter product title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Media</Label>
          {formData.images_url.length > 0 && (
            <p className="text-muted-foreground text-sm">
              Drag to reorder. First image is the main product image.
            </p>
          )}
        </div>

        <div className="gap-4 grid grid-cols-1 mt-2">
          {formData.images_url.length > 0 ? (
            <Reorder.Group
              axis="y"
              values={formData.images_url}
              onReorder={handleReorderMedia}
              className="space-y-2"
            >
              {formData.images_url.map((media, index) => (
                <Reorder.Item
                  key={media}
                  value={media}
                  dragListener={false}
                  dragControls={dragControls}
                  className={`flex select-none items-center gap-3 p-2 rounded-lg border bg-background ${
                    index === 0 ? "border-primary" : "border-border"
                  }`}
                >
                  <div
                    className="touch-none cursor-grab"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div
                    className="relative rounded-md w-12 h-12 overflow-hidden cursor-pointer shrink-0"
                    onClick={() => setPreviewImage(media)}
                  >
                    <Image
                      width={250}
                      height={250}
                      src={media || "/images/noImage.png"}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="bg-primary/10 px-2 py-0.5 rounded-full font-medium text-primary text-xs">
                          Main Image
                        </span>
                      )}
                      <span className="font-medium text-sm">
                        Image {index + 1}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs truncate">
                      {media.split("/").pop()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMedia(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <div className="p-8 border border-dashed rounded-lg text-center">
              <ImageIcon className="mx-auto w-10 h-10 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground text-sm">
                No images added yet
              </p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setIsMediaModalOpen(true)}
            className="mt-2"
          >
            <ImagePlus className="mr-2 w-4 h-4" />
            Add Images
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category.id.toString()}
          onValueChange={(value) =>
            updateFormData({ category:{ id:Number.parseInt(value) }})
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="starting_at_price">Starting Price ($)</Label>
        <Input
          id="starting_at_price"
          type="number"
          step="0.01"
          value={formData.startPrice || ""}
          onChange={(e) =>
            updateFormData({
              startPrice: Number.parseFloat(e.target.value) || 0,
            })
          }
          placeholder="0.00"
        />
      </div>

      <div className="flex items-center space-x-4 pt-4 border-t">
        <Switch
          id="has_variants"
          checked={formData.has_variants}
          onCheckedChange={(checked) =>
            updateFormData({ has_variants: checked })
          }
        />
        <Label htmlFor="has_variants" className="font-medium">
          This product has multiple options, like different sizes or colors
        </Label>
      </div>

      <MediaUploadModal
        open={isMediaModalOpen}
        onOpenChange={setIsMediaModalOpen}
        handleAddMedia={handleAddMedia}
      />

      <ImagePreviewModal
        open={!!previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
        imageUrl={previewImage || ""}
      />
    </div>
  );
}
