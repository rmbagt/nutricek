import React from "react";
import ProductPageClient from "./page.client";
import Loading from "@/components/loading";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    return <Loading />;
  }

  return <ProductPageClient productId={id} />;
}
