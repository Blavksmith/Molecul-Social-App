"use client";

import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
      }}
      onUploadError={(error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
export default ImageUpload;