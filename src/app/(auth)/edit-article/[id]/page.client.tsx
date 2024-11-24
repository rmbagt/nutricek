"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  useUpdateArticle,
  useGetArticleById,
} from "@/services/article-service";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { IoIosArrowBack } from "react-icons/io";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  content: z.string().min(50, "Content must be at least 50 characters long"),
  image: z.string(),
  category: z.string().min(1, "Please select a category"),
});

export default function EditArticlePageClient({
  articleId,
}: {
  articleId: string;
}) {
  const router = useRouter();
  const updateArticleMutation = useUpdateArticle();
  const { data: article, isLoading: isLoadingArticle } =
    useGetArticleById(articleId);

  const [file, setFile] = React.useState<File>();
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      category: "",
    },
  });

  // Set form values when article data is loaded
  React.useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        content: article.content,
        image: article.image,
        category: article.category,
      });
      setPreviewUrl(article.image);
    }
  }, [article, form]);

  React.useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith("/api/")) {
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

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleImageReplace = () => {
    setFile(undefined);
    setPreviewUrl("");
    setError("");
    form.setValue("image", "");

    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (file) {
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

        // Update the image URL in the form values
        values.image = `/api/download?key=${uploadData.key}`;
      }

      await updateArticleMutation.mutateAsync({
        id: articleId,
        ...values,
      });

      toast.success("Article updated successfully!");
      router.push("/article");
    } catch (error) {
      toast.error("Failed to update article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingArticle) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="left-0 bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
        >
          <IoIosArrowBack />
        </Button>
        <h1 className="text-center text-3xl font-bold text-[#4cab52]">
          Edit Article
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter article title" {...field} />
                </FormControl>
                <FormDescription>
                  Choose a catchy title for your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Article Image</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {previewUrl && (
                      <div className="mb-4 flex flex-col items-center justify-center gap-4">
                        <Image
                          src={previewUrl}
                          alt="Selected Image"
                          width={400}
                          height={400}
                          className="h-[400px] w-[400px] rounded-lg border object-scale-down shadow-md"
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
                        previewUrl ? "hidden" : ""
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
                        {error && (
                          <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}
                        <p className="text-xs leading-5 text-gray-400">
                          {file?.name || "No file selected"}
                        </p>
                      </div>
                    </label>
                    <Input type="hidden" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Upload an image for your article (JPG, JPEG, or PNG, max
                  10MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your article content here..."
                    className="h-40"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Write the main content of your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the most appropriate category for your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#4cab52] font-semibold text-white hover:bg-[#3a8a3e]"
            disabled={updateArticleMutation.isPending || loading}
          >
            {updateArticleMutation.isPending || loading
              ? "Updating..."
              : "Update Article"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
