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
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
};

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
    <motion.div
      className="container mx-auto h-full min-h-svh overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button
        onClick={() => router.back()}
        className="mb-6 bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
      >
        <IoIosArrowBack />
      </Button>

      <motion.div className="mb-6" variants={imageVariants}>
        <Image
          src={article?.image || "/placeholder-image.jpg"}
          alt={article?.title || "Article image"}
          className="h-64 w-full rounded-lg object-cover"
          width={1200}
          height={630}
        />
      </motion.div>

      <motion.div className="mb-6" variants={contentVariants}>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {formatDate(article?.createdAt)} • {article?.category}
          </p>
          <p className="flex items-center text-sm text-gray-500">
            <IoMdEye className="mr-1" /> {article?.views || 0} views
          </p>
        </div>
        <h2 className="mt-2 text-3xl font-bold">{article?.title}</h2>
        <p className="mt-2 text-lg text-gray-700">By: {article?.author.name}</p>
      </motion.div>

      <motion.div className="prose max-w-none" variants={contentVariants}>
        {article?.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex items-center justify-between"
        variants={contentVariants}
      >
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
      </motion.div>
    </motion.div>
  );
}
