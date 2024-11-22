"use server";

import { auth } from "@/auth/authOptions";
import { prisma } from "@/lib/db";

export async function getAllArticles() {
  const response = await prisma.article.findMany({
    include: {
      author: true,
      likes: true,
    },
  });

  return response;
}

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

export async function getPopularArticle() {
  const response = await prisma.article.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: 5,
    include: {
      author: true,
      likes: true,
    },
  });

  return response;
}

export async function getTrendingArticle() {
  const response = await prisma.article.findMany({
    orderBy: {
      views: "desc",
    },
    take: 5,
    include: {
      author: true,
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

export async function createArticle(data: {
  title: string;
  content: string;
  image: string;
  category: string;
}) {
  const session = await auth();
  const response = await prisma.article.create({
    data: {
      ...data,
      author: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
    include: {
      author: true,
      likes: true,
    },
  });
  return response;
}

export async function updateArticle(
  id: string,
  data: {
    title?: string;
    content?: string;
    image?: string;
    category?: string;
  },
) {
  const response = await prisma.article.update({
    where: { id },
    data,
    include: {
      author: true,
      likes: true,
    },
  });
  return response;
}

export async function deleteArticle(id: string) {
  const response = await prisma.$transaction(async (prisma) => {
    await prisma.like.deleteMany({
      where: { articleId: id },
    });
    return prisma.article.delete({
      where: { id },
    });
  });
  return response;
}
