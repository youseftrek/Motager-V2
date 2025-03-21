"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";

export default function UploadThing({
  handleAddMedia,
}: {
  handleAddMedia: (urls: string[]) => void;
}) {
  return (
    <UploadDropzone
      className="hover:bg-muted/50 p-8 border-2 border-secondary border-dashed rounded-lg text-center transition-colors cursor-pointer"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        handleAddMedia(res.map((file) => file.ufsUrl));
        toast.success("Files uploaded successfully");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        toast.error(`ERROR! ${error.message}`);
      }}
      content={{
        uploadIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        ),
        label: ({ isDragActive }) => (
          <span className="font-semibold text-foreground text-lg">
            {isDragActive
              ? "Drop your files here"
              : "Drag & drop or click to upload images"}
          </span>
        ),
        allowedContent: () => (
          <span className="mt-2 text-muted-foreground text-sm">
            Supported formats: JPEG, PNG, GIF
          </span>
        ),
      }}
    />
  );
}
