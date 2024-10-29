"use server";

import { auth } from "@/auth/authOptions";
import { prisma } from "@/lib/db";
import { ClassificationResult } from "@/types/product-types";

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

  const response = await prisma.product.findMany({
    where: {
      users: {
        some: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  return response;
}
