"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function UploadPage() {
  const [file, setFile] = React.useState<File>();
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imageKey, setImageKey] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.match(/^image\/(jpeg|jpg|png)$/)) {
        setError("Only JPG, JPEG, and PNG files are allowed");
        return;
      }

      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setError("");
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      // First, get the signed URL
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get upload URL");
      }

      const { url, key } = await response.json();

      // Upload the file to R2
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Set the image URL and key for display and future reference
      setImageKey(key);
      setImageUrl(`/api/download?key=${key}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6">
      <div className="mx-auto max-w-2xl px-4 py-5">
        <h2 className="text-base font-semibold leading-7">Upload Image</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Upload an image (JPG, JPEG, or PNG, max 10MB)
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            {imageUrl && (
              <div className="mb-4 flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt="Uploaded Image"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <label
              htmlFor="file-upload"
              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 hover:cursor-pointer"
            >
              <div className="text-center">
                <div className="mt-4 text-sm leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="inline-flex cursor-pointer items-center gap-x-2"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      id="file-upload"
                      name="file-upload"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <p className="text-xs leading-5 text-gray-400">
                  {file?.name || "No file selected"}
                </p>
              </div>
            </label>
          </div>
        </div>
        <div className="mt-6 flex w-full items-center justify-center">
          <Button
            type="button"
            className="w-full bg-green-500 text-lg font-semibold transition-colors duration-200 hover:bg-green-600"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
}
