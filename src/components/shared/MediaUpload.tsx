"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ImageIcon } from "lucide-react";
import { MediaModal } from "../media-modal";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  created_at: string;
}

interface MediaUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddMedia: (urls: string[]) => void;
  multiple?: boolean;
  bucketName?: string;
}

export default function MediaUploadModal({
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
    const imageUrls = images.map((img) => img.url);

    // Pass the URLs to the parent component
    handleAddMedia(imageUrls);
  };

  return (
    <MediaModal
      open={open}
      onOpenChange={onOpenChange}
      onSelect={handleImageSelect}
      multiple={multiple}
      bucketName={bucketName}
    />
  );
}
