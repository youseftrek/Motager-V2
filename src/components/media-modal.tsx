"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Upload, ImageIcon, Check, Loader, Search, Heart } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { addImageToStoreGallary } from "@/data/add-image-to-store-gallary";
import { getStoreMediaGallary } from "@/data/get-store-media-gallary";
import { useAuth } from "@/hooks";
// Define MediaFile type locally to ensure it has all required properties
interface MediaFile {
  id: string;
  imageUrl: string;
}

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
  next_page?: string;
}

import Image from "next/image";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;

interface MediaModalProps {
  storeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (selectedImages: MediaFile[]) => void;
  multiple?: boolean;
  bucketName?: string;
}

export function MediaModal({
  storeId,
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
  const { token } = useAuth();
  
  // Pexels related states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PexelsPhoto[]>([]);
  const [curatedPhotos, setCuratedPhotos] = useState<PexelsPhoto[]>([]);
  const [pexelsLoading, setPexelsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [myPexelsLibrary, setMyPexelsLibrary] = useState<PexelsPhoto[]>([]);

  // Fetch images from Supabase
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const files = await getStoreMediaGallary(storeId, token!);
      
      if (!files || files.length === 0) {
        setImages([]);
        setLoading(false);
        return;
      }

      // Ensure each file has required properties
      const imageFiles: MediaFile[] = files.map((file: any) => {
        // Handle different response formats
        if (typeof file === 'string') {
          return {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2)}`,
            imageUrl: file,
          };
        }
        
        return {
          id:
            file.id ||
            `file-${Date.now()}-${Math.random().toString(36).substring(2)}`,
          imageUrl: typeof file.imageUrl === 'string' ? file.imageUrl : 
            (Array.isArray(file.imageUrl) && file.imageUrl.length > 0 ? file.imageUrl[0] : ""),
        };
      });

      // Filter out any images with empty imageUrl
      const validImageFiles = imageFiles.filter((file) => !!file.imageUrl);

      setImages(validImageFiles);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images from library");
    } finally {
      setLoading(false);
    }
  }, [storeId, token, toast]);

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
          imageUrl: publicUrl,
        });
      }

      // Add to store gallery
      if (uploadedFiles.length > 0) {
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);
        const res = await addImageToStoreGallary(
          storeId,
          imageUrls,
          token!
        );
        console.log("THIS IS THE RES:: ", res);
        
        // Refresh the library after a short delay to ensure the API has processed the upload
        setTimeout(() => {
          fetchImages();
        }, 500);
      }

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

  // Pexels API functions
  const fetchCuratedPhotos = async () => {
    setPexelsLoading(true);
    try {
      const response = await fetch(
        "https://api.pexels.com/v1/curated?per_page=20",
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data: PexelsResponse = await response.json();
      console.log("Curated photos loaded:", data.photos.length);
      setCuratedPhotos(data.photos);
    } catch (error) {
      console.error("Error fetching curated photos:", error);
      toast.error("Failed to fetch curated photos");
    } finally {
      setPexelsLoading(false);
    }
  };

  const searchPexelsPhotos = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=20`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data: PexelsResponse = await response.json();
      console.log("Search results:", data.photos.length);
      setSearchResults(data.photos);
    } catch (error) {
      console.error("Error searching photos:", error);
      toast.error("Failed to search photos");
    } finally {
      setSearchLoading(false);
    }
  };

  // Auto-search as user types (with debounce)
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery) {
        searchPexelsPhotos(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPexelsPhotos(searchQuery);
  };

  const addToLibrary = (photo: PexelsPhoto) => {
    if (!myPexelsLibrary.find((img) => img.id === photo.id)) {
      const newLibrary = [...myPexelsLibrary, photo];
      setMyPexelsLibrary(newLibrary);
      localStorage.setItem("pexels-library", JSON.stringify(newLibrary));
    }
  };

  const removeFromLibrary = (photoId: number) => {
    const newLibrary = myPexelsLibrary.filter((img) => img.id !== photoId);
    setMyPexelsLibrary(newLibrary);
    localStorage.setItem("pexels-library", JSON.stringify(newLibrary));
  };

  // Convert Pexels photo to MediaFile format
  const pexelsPhotoToMediaFile = (photo: PexelsPhoto): MediaFile => {
    return {
      id: `pexels-${photo.id}`,
      imageUrl: photo.src.large || photo.src.medium || photo.src.original,
    };
  };

  // Handle selecting a Pexels image
  const handlePexelsImageSelect = (photo: PexelsPhoto) => {
    const mediaFile = pexelsPhotoToMediaFile(photo);
    
    if (multiple) {
      setSelectedImages((prev) => {
        const isAlreadySelected = prev.some((img) => img.id === mediaFile.id);
        if (isAlreadySelected) {
          return prev.filter((img) => img.id !== mediaFile.id);
        } else {
          return [...prev, mediaFile];
        }
      });
    } else {
      setSelectedImages([mediaFile]);
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
      
      // Load Pexels content
      if (curatedPhotos.length === 0) {
        fetchCuratedPhotos();
      }
      
      // Load saved Pexels library from localStorage
      const savedLibrary = localStorage.getItem("pexels-library");
      if (savedLibrary) {
        try {
          setMyPexelsLibrary(JSON.parse(savedLibrary));
        } catch (e) {
          console.error("Failed to parse saved library", e);
        }
      }
    }
  }, [open, fetchImages, curatedPhotos.length]);

  // Pexels photo grid component
  const PexelsPhotoGrid = ({
    photos,
    isLoading,
    isLibrary = false,
  }: {
    photos: PexelsPhoto[];
    isLoading?: boolean;
    isLibrary?: boolean;
  }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const mediaFile = pexelsPhotoToMediaFile(photo);
          const isSelected = selectedImages.some((img) => img.id === mediaFile.id);
          
          return (
            <div
              key={photo.id}
              className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => handlePexelsImageSelect(photo)}
            >
              <div className="aspect-square relative">
                <Image
                  src={photo.src.medium || "/placeholder.svg"}
                  alt={photo.alt || photo.photographer}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant={isLibrary ? "destructive" : "secondary"}
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      isLibrary ? removeFromLibrary(photo.id) : addToLibrary(photo);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isLibrary ? "fill-current" : ""}`} />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs">
                    {photo.photographer}
                  </Badge>
                </div>
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
          <TabsList className="grid w-full grid-cols-3">
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
            <TabsTrigger value="pexels" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Pexels
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
                          <div className="w-full h-full">
                            <Image
                              src={image.imageUrl || "/images/noImage.png"}
                              alt={image.imageUrl || "Image"}
                              className="w-full h-full rounded-md object-cover"
                              width={300}
                              height={300}
                            />
                          </div>
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="w-4 h-4" />
                              </div>
                            </div>
                          )}
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
                    <Button className="p-0 overflow-hidden">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer w-full h-full flex items-center justify-center px-4 py-2"
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
                          className={`relative p-0 cursor-pointer transition-all hover:shadow-md ${
                            isSelected ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => toggleUploadedImageSelection(image)}
                        >
                          <div className="aspect-square relative overflow-hidden rounded-t-lg">
                            <Image
                              src={image.imageUrl || "/images/noImage.png"}
                              alt={image.imageUrl || "Image"}
                              className="w-full rou h-full rounded-lg object-cover"
                              width={300}
                              height={300}
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="bg-primary text-primary-foreground rounded-full p-1">
                                  <Check className="w-4 h-4" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pexels" className="flex-1">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={searchLoading} size="sm">
                  {searchLoading ? "Searching..." : "Search"}
                </Button>
              </form>

              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved
                    {myPexelsLibrary.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {myPexelsLibrary.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="search">
                  <ScrollArea className="h-[400px]">
                    {searchQuery && searchResults.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Search Results</h3>
                          <Badge variant="secondary">
                            {searchResults.length} results
                          </Badge>
                        </div>
                        <PexelsPhotoGrid photos={searchResults} isLoading={searchLoading} />
                      </div>
                    ) : searchQuery && !searchLoading ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                          Try searching with different keywords
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Curated Photos</h3>
                          <Badge variant="secondary">Featured</Badge>
                        </div>
                        <PexelsPhotoGrid photos={curatedPhotos} isLoading={pexelsLoading} />
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="saved">
                  <ScrollArea className="h-[400px]">
                    {myPexelsLibrary.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No saved images yet
                        </h3>
                        <p className="text-muted-foreground">
                          Save images from Pexels to your library by clicking the
                          heart icon
                        </p>
                      </div>
                    ) : (
                      <PexelsPhotoGrid photos={myPexelsLibrary} isLibrary={true} />
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
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
