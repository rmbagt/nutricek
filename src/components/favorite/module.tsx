"use client";

import { useState } from "react";
import FoodSection from "./food-section";
import DrinkSection from "./drink-section";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserProducts } from "@/services/product-service";
import LoadingSkeleton from "../skeleton/loading-skeleton";
import Image from "next/image";

function FavoriteModule() {
  const [activeSection, setActiveSection] = useState("food");

  const userProductsQuery = useGetUserProducts();

  const FoodItems = userProductsQuery.data?.products.filter(
    (product) => product.category === "food",
  );

  const DrinkItems = userProductsQuery.data?.products.filter(
    (product) => product.category === "drink",
  );

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  if (userProductsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Header */}
      <div className="flex justify-center text-center text-xl font-bold">
        <h2>Favorites</h2>
      </div>

      {/* Content */}
      <div className="my-4 flex flex-col">
        <div className="relative grid grid-cols-2 rounded-2xl bg-[#fff8ee] text-center">
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 rounded-2xl bg-[#ff9385]"
            initial={{ x: activeSection === "food" ? 0 : "100%" }}
            animate={{ x: activeSection === "food" ? 0 : "100%" }}
            transition={{ duration: 0.3 }}
          />
          <div
            className={`relative z-10 cursor-pointer p-4 px-5 ${
              activeSection === "food" ? "text-white" : "text-[#ff9385]"
            }`}
            onClick={() => handleSectionClick("food")}
          >
            <p>Food</p>
          </div>
          <div
            className={`relative z-10 cursor-pointer p-4 px-5 ${
              activeSection === "drink" ? "text-white" : "text-[#ff9385]"
            }`}
            onClick={() => handleSectionClick("drink")}
          >
            <p>Drink</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === "food" ? (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {FoodItems?.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 pt-28 text-center">
                  <Image
                    src="/assets/Ingredients.png"
                    alt="Ingredients"
                    width={300}
                    height={300}
                    className="h-32 w-32"
                  />
                  <h1 className="text-lg font-semibold">No Foods Found</h1>
                  <p>
                    You don&apos;t have any foods. Go ahead, search and save
                    your favorite food.
                  </p>
                </div>
              ) : (
                <FoodSection FoodItems={FoodItems!} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="drink"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {DrinkItems?.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 pt-28 text-center">
                  <Image
                    src="/assets/Ingredients.png"
                    alt="Ingredients"
                    width={300}
                    height={300}
                    className="h-32 w-32"
                  />
                  <h1 className="text-lg font-semibold">No Drinks Found</h1>
                  <p>
                    You don&apos;t have any drinks. Go ahead, search and save
                    your favorite drink.
                  </p>
                </div>
              ) : (
                <DrinkSection DrinkItems={DrinkItems!} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default FavoriteModule;
