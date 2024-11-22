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

function HomeModule({ session }: { session: Session | null }) {
  const userProductsQuery = useGetUserProducts();
  const trendingArticlesQuery = useGetTrendingArticles();

  const FavoriteItems = userProductsQuery.data?.products;
  const TrendingArticles = trendingArticlesQuery.data;

  if (userProductsQuery.isLoading || trendingArticlesQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="z-20 text-center">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-[#4cab52]">
        Hello {session?.user?.name}!
      </h1>
      <h3 className="text-base">Find, track and eat healthy food.</h3>

      {/* Article Slider */}
      <div className="my-4">
        <ArticleSlider TrendingArticles={TrendingArticles!} />
      </div>

      {/* Compose your article */}
      <div className="my-4 flex w-full items-center justify-between gap-2 rounded-2xl bg-[#9e9bc7] p-5">
        <p className="w-1/2 text-left text-lg font-semibold text-white">
          Compose your article
        </p>
        <Link href="/article">
          <Button
            variant="secondary"
            className="bg-white text-[#9e9bc7] hover:bg-gray-100"
          >
            Create Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Choose your favorite */}
      <FavoriteSlider FavoriteItems={FavoriteItems!} />
    </div>
  );
}

export default HomeModule;
