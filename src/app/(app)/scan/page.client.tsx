"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { ClassificationResult } from "@/types/product-types";
import Result from "@/components/scan/result";
import { ScanBarcode } from "lucide-react";
import { useAddProduct } from "@/services/product-service";

export default function ScanPageClient() {
  const [file, setFile] = React.useState<File>();
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imageKey, setImageKey] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [classificationResult, setClassificationResult] =
    React.useState<ClassificationResult | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const addProductMutation = useAddProduct();

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.match(/^image\/(jpeg|jpg|png)$/)) {
        setError("Only JPG, JPEG, and PNG files are allowed");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setError("");
      setFile(selectedFile);
      setClassificationResult(null);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      // Upload the file to R2
      const { data: uploadData } = await axios.post("/api/upload", {
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      await axios.put(uploadData.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setImageKey(uploadData.key);
      setImageUrl(`/api/download?key=${uploadData.key}`);

      // Classify the image
      const { data: classificationData } = await axios.post("/api/classify", {
        imageKey: uploadData.key,
      });

      setClassificationResult(classificationData);
      setIsDrawerOpen(true);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan image");
    } finally {
      setLoading(false);
    }
  };

  const handleImageReplace = () => {
    setFile(undefined);
    setPreviewUrl("");
    setError("");
    setClassificationResult(null);

    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  function handleAddToFavorites(data: ClassificationResult) {
    addProductMutation.mutate({
      name: data.name,
      image: imageUrl,
      category: data.category,
      details: data.details,
      grade: data.grade,
      components: data.components,
      ingredients: data.ingredients,
    });

    setIsDrawerOpen(false);
  }

  const displayedImage = previewUrl || imageUrl;

  return (
    <div className="min-h-screen space-y-6">
      <div className="mx-auto max-w-2xl space-y-2">
        <h2 className="text-xl font-bold">Scan Product</h2>
        <p className="text-sm text-gray-400">
          Upload an image of a food or drink product (JPG, JPEG, or PNG, max
          10MB)
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            {displayedImage && (
              <div className="mb-4 flex flex-col items-center justify-center gap-4">
                <Image
                  src={displayedImage}
                  alt="Selected Image"
                  width={400}
                  height={400}
                  className="h-[400px] w-[400px] rounded-lg object-scale-down"
                />
                <Button
                  type="button"
                  onClick={handleImageReplace}
                  className="bg-gray-500 text-sm font-medium hover:bg-gray-600"
                >
                  Replace Image
                </Button>
              </div>
            )}
            <label
              htmlFor="file-upload"
              className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 hover:cursor-pointer ${
                displayedImage ? "hidden" : ""
              }`}
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
        <div className="mt-6 flex w-full items-center justify-between gap-2">
          <Button
            type="button"
            className="w-full bg-green-500 text-lg font-semibold transition-colors duration-200 hover:bg-green-600 disabled:bg-gray-400"
            onClick={handleScan}
            disabled={!file || loading || !!classificationResult}
          >
            {loading ? "Scanning..." : "Scan"}
          </Button>
          {
            // Display the classification result if available
            classificationResult && (
              <Button
                type="button"
                className="flex w-full items-center justify-center gap-1 bg-blue-500 text-lg font-semibold transition-colors duration-200 hover:bg-blue-600"
                onClick={() => setIsDrawerOpen(true)}
              >
                <ScanBarcode />
                <p>View Result</p>
              </Button>
            )
          }
        </div>

        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            {classificationResult && (
              <Result
                classificationResult={classificationResult}
                handleAddToFavorites={handleAddToFavorites}
                onClose={() => setIsDrawerOpen(false)}
                loading={addProductMutation.isPending}
              />
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
