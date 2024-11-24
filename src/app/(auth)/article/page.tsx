"use client";

import React from "react";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { useGetUserArticles } from "@/services/article-service";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import ArticleList from "@/components/acticle/article-list";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ArticlesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const userArticlesQuery = useGetUserArticles();
  const UserArticles = userArticlesQuery.data;

  if (userArticlesQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  const articles =
    UserArticles?.articles.map((article) => ({
      ...article,
      likes: UserArticles.likes.filter((like) => like.articleId === article.id),
    })) || [];

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="container mx-auto h-full min-h-svh"
    >
      <motion.div
        variants={itemVariants}
        className="mb-8 flex flex-col justify-center gap-4"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Button
            onClick={() => router.back()}
            className="bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
          >
            <IoIosArrowBack />
          </Button>
          <h1 className="text-3xl font-bold text-[#4cab52]">Your Articles</h1>
        </motion.div>
        <motion.div variants={itemVariants} className="flex w-full justify-end">
          <Link href="/create-article">
            <Button className="bg-[#4cab52] font-semibold text-white hover:bg-[#3a8a3e]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Article
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {articles.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center md:p-12"
        >
          <h2 className="mb-4 text-xl font-semibold">No articles yet</h2>
          <p className="mb-4 text-gray-600">
            Start writing and sharing your knowledge!
          </p>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <ArticleList UserArticles={paginatedArticles} />
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
