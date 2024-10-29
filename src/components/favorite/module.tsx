"use client";

import { useState } from "react";
import FoodSection from "./food-section";
import DrinkSection from "./drink-section";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserProducts } from "@/services/product-service";
import Loading from "../loading";

function FavoriteModule() {
  const [activeSection, setActiveSection] = useState("food");

  const userProductQueries = useGetUserProducts();

  const FoodItems = userProductQueries.data?.filter(
    (product) => product.category === "food",
  );

  const DrinkItems = userProductQueries.data?.filter(
    (product) => product.category === "drink",
  );

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  if (userProductQueries.isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Header */}
      <div className="flex justify-center text-center">
        <h2>Favorites</h2>
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col">
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

        {activeSection === "food" ? (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <FoodSection FoodItems={FoodItems!} />
          </motion.div>
        ) : (
          <motion.div
            key="drink"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <DrinkSection DrinkItems={DrinkItems!} />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default FavoriteModule;
