"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import { useGetUserProducts } from "@/services/product-service";
import LoadingSkeleton from "../skeleton/loading-skeleton";
import { ArticleSlider } from "./article-slider";
import { Button } from "@/components/ui/button";
import FavoriteSlider from "./favorite-slider";
import { useGetTrendingArticles } from "@/services/article-service";
import Link from "next/link";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function HomeModule({ session }: { session: Session | null }) {
  const userProductsQuery = useGetUserProducts();
  const trendingArticlesQuery = useGetTrendingArticles();

  const FavoriteItems = userProductsQuery.data?.products;
  const TrendingArticles = trendingArticlesQuery.data;

  if (userProductsQuery.isLoading || trendingArticlesQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      className="z-20 mx-auto max-w-7xl text-center"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ staggerChildren: 0.3 }}
    >
      <motion.div variants={variants}>
        <h1 className="text-2xl font-semibold text-[#4cab52] md:text-3xl">
          Hello {session?.user?.name}!
        </h1>
        <h3 className="text-sm md:text-base">
          Find, track and eat healthy food.
        </h3>
      </motion.div>

      <motion.div variants={variants} className="my-4">
        <ArticleSlider TrendingArticles={TrendingArticles!} />
      </motion.div>

      <motion.div
        variants={variants}
        className="my-4 flex w-full items-center justify-between gap-2 rounded-2xl bg-[#9e9bc7] p-3 md:p-5"
      >
        <p className="w-full text-left text-base font-semibold text-white md:text-lg">
          Compose your article
        </p>
        <Link href="/article">
          <Button
            variant="secondary"
            className="bg-white text-[#9e9bc7] hover:bg-gray-100"
          >
            <span>Create Now</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={variants}>
        <FavoriteSlider FavoriteItems={FavoriteItems!} />
      </motion.div>
    </motion.div>
  );
}

export default HomeModule;
