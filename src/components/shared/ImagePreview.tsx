"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

type ImagePreviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
};

export default function ImagePreviewModal({
  open,
  onOpenChange,
  imageUrl,
}: ImagePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-4xl">
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt="product image"
            height={1000}
            width={1000}
            className="w-full h-full object-contain"
            style={{ border: "none" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
