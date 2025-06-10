"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search, ImageIcon, Heart } from "lucide-react";
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

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;

export function ImageSelectDialog({
  onImageSelect,
}: {
  onImageSelect?: (image: PexelsPhoto) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PexelsPhoto[]>([]);
  const [curatedPhotos, setCuratedPhotos] = useState<PexelsPhoto[]>([]);
  const [myLibrary, setMyLibrary] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PexelsPhoto | null>(null);

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

  const handleImageClick = (photo: PexelsPhoto) => {
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
              selectedImage?.id === photo.id
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

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">My Library</TabsTrigger>
            <TabsTrigger value="search">Search in Pexels</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Your Saved Images</h3>
              <Badge variant="secondary">{myLibrary.length} images</Badge>
            </div>
            <ScrollArea className="h-[400px]">
              {myLibrary.length === 0 ? (
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
                <PhotoGrid photos={myLibrary} isLibrary={true} />
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
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
              <img
                src={selectedImage.src.tiny || "/placeholder.svg"}
                alt={selectedImage.alt || selectedImage.photographer}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium text-sm">
                  {selectedImage.alt ||
                    `Photo by ${selectedImage.photographer}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  by {selectedImage.photographer}
                </p>
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
