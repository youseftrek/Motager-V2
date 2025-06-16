"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Search, ImageIcon, Heart, Upload, Loader, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { addImageToStoreGallary } from "@/data/add-image-to-store-gallary";
import { getStoreMediaGallary } from "@/data/get-store-media-gallary";
import { useAuth } from "@/hooks";
import { useParams } from "next/navigation";

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

interface MediaFile {
  id: string;
  imageUrl: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
  next_page?: string;
}

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;

export function ImageSelectDialog({
  onImageSelect,
  bucketName = "product-images",
}: {
  onImageSelect?: (image: PexelsPhoto | MediaFile) => void;
  bucketName?: string;
}) {
  const params = useParams();
  const storeId = params.storeId ? Number(params.storeId) : undefined;

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PexelsPhoto[]>([]);
  const [curatedPhotos, setCuratedPhotos] = useState<PexelsPhoto[]>([]);
  const [myLibrary, setMyLibrary] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PexelsPhoto | MediaFile | null>(null);
  
  // Upload related states
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<MediaFile[]>([]);
  const [storeImages, setStoreImages] = useState<MediaFile[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const { token } = useAuth();

  // Fetch curated photos on component mount and when dialog opens
  useEffect(() => {
    if (open && curatedPhotos.length === 0) {
      fetchCuratedPhotos();
    }
  }, [open, curatedPhotos.length]);

  // Load saved library from localStorage
  useEffect(() => {
    const savedLibrary = localStorage.getItem("pexels-library");
    if (savedLibrary) {
      try {
        setMyLibrary(JSON.parse(savedLibrary));
      } catch (e) {
        console.error("Failed to parse saved library", e);
      }
    }
  }, []);

  // Save library to localStorage when it changes
  useEffect(() => {
    if (myLibrary.length > 0) {
      localStorage.setItem("pexels-library", JSON.stringify(myLibrary));
    }
  }, [myLibrary]);

  // Fetch store images when dialog opens and storeId is available
  useEffect(() => {
    if (open && storeId) {
      fetchStoreImages();
    }
  }, [open, storeId]);

  // Fetch store images
  const fetchStoreImages = useCallback(async () => {
    if (!storeId || !token) return;
    
    setLibraryLoading(true);
    try {
      const files = await getStoreMediaGallary(storeId, token);
      
      // Ensure each file has required properties
      const imageFiles: MediaFile[] = files.map((file: any) => ({
        id: file.id || `file-${Date.now()}-${Math.random().toString(36).substring(2)}`,
        imageUrl: file.imageUrl || "",
      }));

      // Filter out any images with empty imageUrl
      const validImageFiles = imageFiles.filter((file) => !!file.imageUrl);
      setStoreImages(validImageFiles);
    } catch (error) {
      console.error("Error fetching store images:", error);
      toast.error("Failed to fetch images from library");
    } finally {
      setLibraryLoading(false);
    }
  }, [storeId, token]);

  const fetchCuratedPhotos = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const searchPhotos = async (query: string) => {
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
    } finally {
      setSearchLoading(false);
    }
  };

  // Upload files to Supabase
  const handleFileUpload = async (files: FileList) => {
    if (!files.length || !storeId || !token) return;

    setUploading(true);
    const uploadedFiles: MediaFile[] = [];

    try {
      for (const file of Array.from(files)) {
        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

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

      // Add images to store gallery using the bulk endpoint
      if (uploadedFiles.length > 0) {
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);
        await addImageToStoreGallary(
          storeId,
          imageUrls,
          token
        );
      }

      // Refresh the library
      await fetchStoreImages();

      toast.success(`${uploadedFiles.length} file(s) uploaded successfully`);

      // After successful upload, store uploaded files and auto-select them
      setUploadedImages(uploadedFiles);
      setSelectedImage(uploadedFiles[0]);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
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

  // Auto-search as user types (with debounce)
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery) {
        searchPhotos(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPhotos(searchQuery);
  };

  const handleImageClick = (photo: PexelsPhoto | MediaFile) => {
    setSelectedImage(photo);
  };

  const handleSelectImage = () => {
    if (selectedImage) {
      onImageSelect?.(selectedImage);
      setOpen(false);
      setSelectedImage(null);
    }
  };

  const addToLibrary = (photo: PexelsPhoto) => {
    if (!myLibrary.find((img) => img.id === photo.id)) {
      setMyLibrary((prev) => [...prev, photo]);
    }
  };

  const removeFromLibrary = (photoId: number) => {
    setMyLibrary((prev) => prev.filter((img) => img.id !== photoId));
  };

  const PhotoGrid = ({
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
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage && 'id' in selectedImage && selectedImage.id === photo.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => handleImageClick(photo)}
          >
            <div className="aspect-square relative">
              <img
                src={photo.src.medium || "/placeholder.svg"}
                alt={photo.alt || photo.photographer}
                className="w-full h-full object-cover"
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
                    isLibrary
                      ? removeFromLibrary(photo.id)
                      : addToLibrary(photo);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${isLibrary ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="secondary" className="text-xs">
                  {photo.photographer}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const MediaGrid = ({
    media,
    isLoading,
  }: {
    media: MediaFile[];
    isLoading?: boolean;
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
      <div className="grid grid-cols-2 m-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <Card
            key={item.id}
            className={`relative cursor-pointer transition-all hover:shadow-md ${
              selectedImage && 'imageUrl' in selectedImage && selectedImage.imageUrl === item.imageUrl
                ? "ring-2 ring-primary"
                : ""
            }`}
            onClick={() => handleImageClick(item)}
          >
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={item.imageUrl || "/images/noImage.png"}
                alt="Uploaded image"
                className="w-full h-full object-cover"
              />
              {selectedImage && 'imageUrl' in selectedImage && selectedImage.imageUrl === item.imageUrl && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" size="sm">
          <ImageIcon className="h-4 w-4" />
          Select Image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="library">My Library</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="pexels">Pexels</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Your Store Images</h3>
              <Badge variant="secondary">{storeImages.length} images</Badge>
            </div>
            <ScrollArea className="h-[400px]">
              {libraryLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
              ) : storeImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No images in your library
                  </h3>
                  <p className="text-muted-foreground">
                    Upload some images to get started
                  </p>
                </div>
              ) : (
                <MediaGrid media={storeImages} isLoading={libraryLoading} />
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
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
                    id="file-upload-dialog"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFileUpload(e.target.files);
                      }
                    }}
                  />
                  <Button className="p-0 overflow-hidden">
                    <label
                      htmlFor="file-upload-dialog"
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
                <ScrollArea className="h-[250px]">
                  <MediaGrid media={uploadedImages} />
                </ScrollArea>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pexels" className="space-y-4">
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

            <ScrollArea className="h-[400px]">
              {searchQuery && searchResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Search Results</h3>
                    <Badge variant="secondary">
                      {searchResults.length} results
                    </Badge>
                  </div>
                  <PhotoGrid photos={searchResults} isLoading={searchLoading} />
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
                  <PhotoGrid photos={curatedPhotos} isLoading={loading} />
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {selectedImage && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              {'src' in selectedImage ? (
                <img
                  src={selectedImage.src.tiny || "/placeholder.svg"}
                  alt={selectedImage.alt || selectedImage.photographer}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <img
                  src={selectedImage.imageUrl || "/images/noImage.png"}
                  alt="Selected image"
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div>
                {'src' in selectedImage ? (
                  <>
                    <p className="font-medium text-sm">
                      {selectedImage.alt || `Photo by ${selectedImage.photographer}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {selectedImage.photographer}
                    </p>
                  </>
                ) : (
                  <p className="font-medium text-sm">Uploaded Image</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedImage(null)}>
                Cancel
              </Button>
              <Button onClick={handleSelectImage} size="sm">
                Select Image
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
