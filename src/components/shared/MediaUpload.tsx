"use client";

import { useState } from "react";
import { MediaModal } from "../media-modal";

export interface MediaFile {
  id: string;
  imageUrl: string;
}

interface MediaUploadModalProps {
  storeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddMedia: (urls: string[]) => void;
  multiple?: boolean;
  bucketName?: string;
}

export default function MediaUploadModal({
  storeId,
  open,
  onOpenChange,
  handleAddMedia,
  multiple = true,
  bucketName = "product-images",
}: MediaUploadModalProps) {
  const [selectedImages, setSelectedImages] = useState<MediaFile[]>([]);

  const handleImageSelect = (images: MediaFile[]) => {
    setSelectedImages(images);

    // Extract URLs from the selected images
    const imageUrls = images.map((img) => img.imageUrl);

    // Pass the URLs to the parent component
    handleAddMedia(imageUrls);
  };

  return (
    <MediaModal
      storeId={storeId}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={handleImageSelect}
      multiple={multiple}
      bucketName={bucketName}
    />
  );
}
