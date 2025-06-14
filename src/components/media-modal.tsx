"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Upload, ImageIcon, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  created_at: string;
}

interface MediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (selectedImages: MediaFile[]) => void;
  multiple?: boolean;
  bucketName?: string;
}

export function MediaModal({
  open,
  onOpenChange,
  onSelect,
  multiple = true,
  bucketName = "product-images",
}: MediaModalProps) {
  const [activeTab, setActiveTab] = useState("library");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<MediaFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<MediaFile[]>([]);
  const [uploadedImages, setUploadedImages] = useState<MediaFile[]>([]);

  // Fetch images from Supabase
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list("", {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) throw error;

      const imageFiles: MediaFile[] = [];

      for (const file of files || []) {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(file.name);

        console.log(imageFiles);
        
        imageFiles.push({
          id: file.id || file.name,
          name: file.name,
          url: publicUrl,
          size: file.metadata?.size || 0,
          created_at: file.created_at || new Date().toISOString(),
        });
      }

      setImages(imageFiles);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images from library");
    } finally {
      setLoading(false);
    }
  }, [bucketName, toast]);

  // Upload files to Supabase
  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return;

    setUploading(true);
    const uploadedFiles: MediaFile[] = [];

    try {
      for (const file of Array.from(files)) {
        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
          console.log(fileName);
          
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        uploadedFiles.push({
          id: fileName,
          name: fileName,
          url: publicUrl,
          size: file.size,
          created_at: new Date().toISOString(),
        });
      }

      // Refresh the library
      await fetchImages();

      toast.success(`${uploadedFiles.length} file(s) uploaded successfully`);

      // After successful upload, store uploaded files and auto-select them
      setUploadedImages(uploadedFiles);
      if (multiple) {
        setSelectedImages((prev) => [...prev, ...uploadedFiles]);
      } else {
        setSelectedImages(uploadedFiles);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  // Handle image selection
  const toggleImageSelection = (image: MediaFile) => {
    if (multiple) {
      setSelectedImages((prev) => {
        const isSelected = prev.some((img) => img.id === image.id);
        if (isSelected) {
          return prev.filter((img) => img.id !== image.id);
        } else {
          return [...prev, image];
        }
      });
    } else {
      setSelectedImages([image]);
    }
  };

  const toggleUploadedImageSelection = (image: MediaFile) => {
    if (multiple) {
      setSelectedImages((prev) => {
        const isSelected = prev.some((img) => img.id === image.id);
        if (isSelected) {
          return prev.filter((img) => img.id !== image.id);
        } else {
          return [...prev, image];
        }
      });
    } else {
      setSelectedImages([image]);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Load images when modal opens
  useEffect(() => {
    if (open) {
      fetchImages();
      setSelectedImages([]);
      setUploadedImages([]);
    }
  }, [open, fetchImages]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Library
              {images.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {images.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 overflow-auto">
            <div className="flex flex-col h-full">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mb-4" />
                  <p>No images in your library</p>
                  <p className="text-sm">Upload some images to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-96 p-1">
                  {images.map((image) => {
                    const isSelected = selectedImages.some(
                      (img) => img.id === image.id
                    );
                    return (
                      <Card
                        key={image.id}
                        className={`relative cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => toggleImageSelection(image)}
                      >
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium truncate">
                            {image.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(image.size)}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="flex-1">
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader className="w-8 h-8 animate-spin" />
                    <p>Uploading files...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">
                        Drop files here or click to upload
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports: JPG, PNG, GIF, WebP (Max 10MB each)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFileUpload(e.target.files);
                        }
                      }}
                    />
                    <Button>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer w-full h-full flex items-center justify-center"
                      >
                        Choose Files
                      </label>
                    </Button>
                  </div>
                )}
              </div>

              {uploadedImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Recently Uploaded</h3>
                    <Badge variant="secondary">{uploadedImages.length}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto p-1">
                    {uploadedImages.map((image) => {
                      const isSelected = selectedImages.some(
                        (img) => img.id === image.id
                      );
                      return (
                        <Card
                          key={image.id}
                          className={`relative cursor-pointer transition-all hover:shadow-md ${
                            isSelected ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => toggleUploadedImageSelection(image)}
                        >
                          <div className="aspect-square relative overflow-hidden rounded-t-lg">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="bg-primary text-primary-foreground rounded-full p-1">
                                  <Check className="w-4 h-4" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-medium truncate">
                              {image.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(image.size)}
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedImages.length > 0 && (
              <span>{selectedImages.length} image(s) selected</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSelect(selectedImages);
                onOpenChange(false);
              }}
              disabled={selectedImages.length === 0}
            >
              Select {selectedImages.length > 0 && `(${selectedImages.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
