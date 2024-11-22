"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoMdEye, IoMdHeart } from "react-icons/io";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { formatDate } from "@/lib/utils";
import {
  useAddArticleLikes,
  useGetArticleById,
  useRemoveArticleLikes,
} from "@/services/article-service";
import parse from "html-react-parser";

export default function ArticlePageClient({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) {
  const router = useRouter();
  const articleQuery = useGetArticleById(articleId);
  const addLikeMutation = useAddArticleLikes();
  const removeLikeMutation = useRemoveArticleLikes();

  if (articleQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  const article = articleQuery.data;

  const handleLikeClick = () => {
    const hasLiked = article?.likes.some((like) => like.userId === userId);
    if (hasLiked) {
      removeLikeMutation.mutate({ articleId, userId });
    } else {
      addLikeMutation.mutate({ articleId, userId });
    }
  };

  return (
    <div className="min-h-svh overflow-y-auto p-4">
      <Button
        onClick={() => router.back()}
        className="mb-6 bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
      >
        <IoIosArrowBack />
      </Button>

      <div className="mb-6">
        <Image
          src={article?.image || "/placeholder-image.jpg"}
          alt={article?.title || "Article image"}
          className="h-64 w-full rounded-lg object-cover"
          width={1200}
          height={630}
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {formatDate(article?.createdAt)} • {article?.category}
          </p>
          <p className="flex items-center text-sm text-gray-500">
            <IoMdEye className="mr-1" /> {article?.views || 0} views
          </p>
        </div>
        <h2 className="mt-2 text-3xl font-bold">{article?.title}</h2>
        <p className="mt-2 text-lg text-gray-700">{article?.author.name}</p>
      </div>

      <div className="prose max-w-none">
        {article?.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent p-2 hover:bg-gray-100"
            onClick={handleLikeClick}
            disabled={addLikeMutation.isPending || removeLikeMutation.isPending}
          >
            {article?.likes.some((like) => like.userId === userId) ? (
              <IoMdHeart className="text-2xl text-red-500" />
            ) : (
              <IoMdHeart className="text-2xl text-gray-400" />
            )}
          </Button>
          <span className="text-gray-500">{article?.likes.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
