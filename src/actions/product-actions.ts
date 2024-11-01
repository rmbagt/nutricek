"use server";

import { auth } from "@/auth/authOptions";
import { prisma } from "@/lib/db";
import { ClassificationResult } from "@/types/product-types";

export async function getAllProducts() {
  const response = await prisma.product.findMany();

  return response;
}

export async function addProduct(data: ClassificationResult) {
  const session = await auth();

  const response = await prisma.product.create({
    data: {
      users: {
        connect: {
          email: session?.user?.email as string,
        },
      },
      name: data.name,
      image: data.image,
      category: data.category,
      details: data.details,
      grade: data.grade,
      components: data.components ?? {},
      ingredients: data.ingredients,
    },
  });

  return response;
}

export async function getUserProducts() {
  const session = await auth();

  const response = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      products: true,
    },
  });

  return response;
}

export async function getProductById(id: string) {
  const response = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return response;
}

export async function addToFavorites(id: string) {
  const session = await auth();

  const response = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      users: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  return response;
}

export async function removeFromFavorites(id: string) {
  const session = await auth();

  const response = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      users: {
        disconnect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  return response;
}
