"use server";

import { auth } from "@/auth/authOptions";
import { prisma } from "@/lib/db";

export async function getUserArticles() {
  const session = await auth();

  const response = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      articles: true,
      likes: true,
    },
  });

  return response;
}

export async function getArticleById(id: string) {
  const response = await prisma.article.update({
    where: {
      id: id,
    },
    include: {
      author: true,
      likes: true,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return response;
}

export async function addArticleLikes(articleId: string, userId: string) {
  const response = await prisma.like.create({
    data: {
      article: {
        connect: {
          id: articleId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return response;
}

export async function removeArticleLikes(articleId: string, userId: string) {
  const response = await prisma.like.deleteMany({
    where: {
      articleId: articleId,
      userId: userId,
    },
  });

  return response;
}
