import React from "react";
import ProductPageClient from "./page.client";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    return <LoadingSkeleton />;
  }

  return <ProductPageClient productId={id} />;
}
