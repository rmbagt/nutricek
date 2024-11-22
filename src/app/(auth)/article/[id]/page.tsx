import React from "react";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import ArticlePageClient from "./page.client";
import { auth } from "@/auth/authOptions";
import { prisma } from "@/lib/db";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id: articleId } = params;
  const session = await auth();
  const userId = await prisma.user
    .findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        id: true,
      },
    })
    .then((res) => res?.id);

  if (!articleId || !userId) {
    return <LoadingSkeleton />;
  }

  return <ArticlePageClient articleId={articleId} userId={userId} />;
}
