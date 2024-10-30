"use client";

import { Button } from "@/components/ui/button";
import {
  useAddToFavorites,
  useGetProductById,
  useGetUserProducts,
  useRemoveFromFavorites,
} from "@/services/product-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";

export default function ProductPageClient({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [readMore, setReadMore] = React.useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = React.useState(false);

  const productByIdQuery = useGetProductById(productId);
  const userProductQueries = useGetUserProducts();
  const addToFavoritesMutation = useAddToFavorites();
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  React.useEffect(() => {
    if (userProductQueries.data?.products) {
      const isAdded = userProductQueries.data?.products.find(
        (product) => product.id === productId,
      );

      if (isAdded) {
        setIsAddedToFavorites(true);
      }
    }
  }, [userProductQueries.data?.products, productId]);

  function handleAddToFavorites(productId: string) {
    addToFavoritesMutation.mutate(productId);
  }

  function handleRemoveFromFavorites(productId: string) {
    removeFromFavoritesMutation.mutate(productId);
  }

  console.log(productByIdQuery);

  return (
    <div className="min-h-svh overflow-y-auto p-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="left-0 bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
        >
          <IoIosArrowBack />
        </Button>
        <h1 className="text-xl font-bold">{productByIdQuery.data?.name}</h1>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Image
          src={productByIdQuery.data?.image as string}
          alt={productByIdQuery.data?.name as string}
          className="h-80 rounded-lg object-cover md:h-full"
          width={600}
          height={600}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-4 text-4xl font-bold">
          Grade:{" "}
          <span className="text-green-500">{productByIdQuery.data?.grade}</span>
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-rose-400">Protein</p>
          <p className="text-2xl font-bold">
            {
              (productByIdQuery.data?.components as { protein: number })
                ?.protein
            }
            g
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Calories</p>
          <p className="text-2xl font-bold">
            {
              (productByIdQuery.data?.components as { calories: number })
                ?.calories
            }
            cal
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Fat</p>
          <p className="text-2xl font-bold">
            {(productByIdQuery.data?.components as { fat: number })?.fat}g
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Carbs</p>
          <p className="text-2xl font-bold">
            {(productByIdQuery.data?.components as { carbs: number })?.carbs}g
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Details</h3>
        <p className="mt-2 text-gray-600">{productByIdQuery.data?.details}</p>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Ingredients</h3>
        <p className="mt-2 text-gray-600">
          {productByIdQuery.data?.ingredients.join(", ")}
        </p>
      </div>
      {isAddedToFavorites ? (
        <Button
          className="mt-8 w-full bg-red-500 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-700"
          onClick={() => {
            handleRemoveFromFavorites(productId);
            toast("Product has been removed from favorite!");
            setIsAddedToFavorites(false);
          }}
          disabled={productByIdQuery.isLoading}
        >
          Remove from Favorites
        </Button>
      ) : (
        <Button
          className="mt-8 w-full bg-green-500 text-lg font-semibold text-white transition-colors duration-200 hover:bg-green-700"
          onClick={() => {
            handleAddToFavorites(productId);
            toast("Product has been added to favorite!");
            setIsAddedToFavorites(true);
          }}
          disabled={productByIdQuery.isLoading}
        >
          Add to Favorites
        </Button>
      )}
    </div>
  );
}
