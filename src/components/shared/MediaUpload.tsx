"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Check, Trash2 } from "lucide-react";
import Image from "next/image";
import ImagePreviewModal from "./ImagePreview";
import UploadThing from "./UploadThing";

type MediaUploadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddMedia: (urls: string[]) => void;
};

type UploadingFile = {
  id: string;
  file: File;
  progress: number;
  previewUrl: string;
  status: "uploading" | "complete" | "error";
};

export default function MediaUploadModal({
  open,
  onOpenChange,
  handleAddMedia,
}: MediaUploadModalProps) {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [selectedLibraryImages, setSelectedLibraryImages] = useState<string[]>(
    []
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Mock library images
  const libraryImages = [
    "/placeholder.svg?height=200&width=200&text=Product+1",
    "/placeholder.svg?height=200&width=200&text=Product+2",
    "/placeholder.svg?height=200&width=200&text=Product+3",
    "/placeholder.svg?height=200&width=200&text=Product+4",
    "/placeholder.svg?height=200&width=200&text=Product+5",
    "/placeholder.svg?height=200&width=200&text=Product+6",
    "/placeholder.svg?height=200&width=200&text=Product+7",
    "/placeholder.svg?height=200&width=200&text=Product+8",
  ];

  const removeUploadingFile = (fileId: string) => {
    setUploadingFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((file) => file.id !== fileId);
    });
  };

  const toggleLibraryImage = (imageUrl: string) => {
    setSelectedLibraryImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  const handleAddSelectedMedia = () => {
    const uploadedImages = uploadingFiles
      .filter((file) => file.status === "complete")
      .map((file) => file.previewUrl);

    handleAddMedia([...uploadedImages, ...selectedLibraryImages]);

    // Reset state
    setUploadingFiles([]);
    setSelectedLibraryImages([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Media</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="upload"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="library">My Library</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <UploadThing handleAddMedia={handleAddMedia} />

            {uploadingFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">
                  Uploading {uploadingFiles.length} files
                </h3>
                <div className="gap-4 grid grid-cols-1">
                  {uploadingFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-3 border rounded-md"
                    >
                      <div
                        className="relative rounded-md w-16 h-16 overflow-hidden cursor-pointer shrink-0"
                        onClick={() => setPreviewImage(file.previewUrl)}
                      >
                        <Image
                          src={file.previewUrl || "/placeholder.svg"}
                          alt={file.file.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {file.file.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress
                            value={file.progress}
                            className="flex-1 h-2"
                          />
                          <span className="w-8 text-xs">{file.progress}%</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === "complete" ? (
                          <div className="flex gap-2">
                            <Check className="w-5 h-5 text-green-500" />
                            <button
                              onClick={() => removeUploadingFile(file.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => removeUploadingFile(file.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="library">
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {libraryImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-md border-2 overflow-hidden cursor-pointer ${
                    selectedLibraryImages.includes(image)
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/20"
                  }`}
                >
                  <div
                    className="absolute inset-0"
                    onClick={() => setPreviewImage(image)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Library image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                    onClick={() => toggleLibraryImage(image)}
                  >
                    <Check
                      className={`h-6 w-6 ${
                        selectedLibraryImages.includes(image)
                          ? "text-primary"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSelectedMedia}
            disabled={
              (activeTab === "upload" &&
                !uploadingFiles.some((f) => f.status === "complete")) ||
              (activeTab === "library" && selectedLibraryImages.length === 0)
            }
          >
            Add Selected
          </Button>
        </div>
      </DialogContent>

      <ImagePreviewModal
        open={!!previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
        imageUrl={previewImage || ""}
      />
    </Dialog>
  );
}
