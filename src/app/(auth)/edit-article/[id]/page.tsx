import React from "react";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import EditArticlePageClient from "./page.client";

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id: articleId } = params;

  if (!articleId) {
    return <LoadingSkeleton />;
  }

  return <EditArticlePageClient articleId={articleId} />;
}
