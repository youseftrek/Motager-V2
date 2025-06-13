"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ImageIcon } from "lucide-react";
import { MediaModal } from "./media-modal";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  created_at: string;
}

export default function MediaModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<MediaFile[]>([]);

  const handleImageSelect = (images: MediaFile[]) => {
    setSelectedImages(images);
  };

  const removeImage = (imageId: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Modal Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={() => setIsModalOpen(true)}>
              <ImageIcon className="w-4 h-4 mr-2" />
              Open Media Library
            </Button>
          </div>

          {selectedImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Selected Images</h3>
                <Badge variant="secondary">{selectedImages.length}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <MediaModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSelect={handleImageSelect}
            multiple={true}
            bucketName="product-images"
          />
        </CardContent>
      </Card>
    </div>
  );
}
