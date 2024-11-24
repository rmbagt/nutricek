"use client";

import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
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
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductPageClient({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [isAddedToFavorites, setIsAddedToFavorites] = React.useState(false);

  const productByIdQuery = useGetProductById(productId);
  const userProductsQuery = useGetUserProducts();
  const addToFavoritesMutation = useAddToFavorites();
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  React.useEffect(() => {
    if (userProductsQuery.data?.products) {
      const isAdded = userProductsQuery.data?.products.find(
        (product) => product.id === productId,
      );

      if (isAdded) {
        setIsAddedToFavorites(true);
      }
    }
  }, [userProductsQuery.data?.products, productId]);

  function handleAddToFavorites(productId: string) {
    addToFavoritesMutation.mutate(productId);
  }

  function handleRemoveFromFavorites(productId: string) {
    removeFromFavoritesMutation.mutate(productId);
  }

  if (productByIdQuery.isLoading || userProductsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      className="container mx-auto h-full min-h-svh overflow-y-auto md:h-svh"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="left-0 bg-green-600 p-2 text-xl font-bold transition-colors duration-200 hover:bg-green-800"
        >
          <IoIosArrowBack />
        </Button>
        <motion.h1 className="text-xl font-bold" variants={textVariants}>
          {productByIdQuery.data?.name}
        </motion.h1>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <motion.div variants={imageVariants}>
          <Image
            src={productByIdQuery.data?.image as string}
            alt={productByIdQuery.data?.name as string}
            className="h-80 rounded-xl object-cover shadow-lg md:h-72 md:object-contain"
            width={600}
            height={600}
          />
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <motion.h2 className="mt-4 text-4xl font-bold" variants={textVariants}>
          Grade:{" "}
          <span
            className={
              productByIdQuery.data?.grade.toLowerCase() === "a"
                ? "text-green-700"
                : productByIdQuery.data?.grade.toLowerCase() === "b"
                  ? "text-green-500"
                  : productByIdQuery.data?.grade.toLowerCase() === "c"
                    ? "text-yellow-500"
                    : "text-red-500"
            }
          >
            {productByIdQuery.data?.grade}
          </span>
        </motion.h2>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <motion.div variants={textVariants}>
          <p className="text-lg font-semibold text-rose-400">Protein</p>
          <p className="text-2xl font-bold">
            {
              (productByIdQuery.data?.components as { protein: number })
                ?.protein
            }
            g
          </p>
        </motion.div>
        <motion.div variants={textVariants}>
          <p className="text-lg font-semibold text-rose-400">Calories</p>
          <p className="text-2xl font-bold">
            {
              (productByIdQuery.data?.components as { calories: number })
                ?.calories
            }
            cal
          </p>
        </motion.div>
        <motion.div variants={textVariants}>
          <p className="text-lg font-semibold text-rose-400">Fat</p>
          <p className="text-2xl font-bold">
            {(productByIdQuery.data?.components as { fat: number })?.fat}g
          </p>
        </motion.div>
        <motion.div variants={textVariants}>
          <p className="text-lg font-semibold text-rose-400">Carbs</p>
          <p className="text-2xl font-bold">
            {(productByIdQuery.data?.components as { carbs: number })?.carbs}g
          </p>
        </motion.div>
      </div>
      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-2xl font-bold">Details</h3>
        <p className="mt-2 text-gray-600">{productByIdQuery.data?.details}</p>
      </motion.div>
      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-2xl font-bold">Ingredients</h3>
        <p className="mt-2 text-gray-600">
          {productByIdQuery.data?.ingredients.join(", ")}
        </p>
      </motion.div>
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
    </motion.div>
  );
}
