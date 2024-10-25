"use client";

import { useState } from "react";
import FoodSection from "./food-section";
import DrinkSection from "./drink-section";
import { motion, AnimatePresence } from "framer-motion";

function FavoriteModule() {
  const [activeSection, setActiveSection] = useState("food");

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-center text-center">
        <h2>Favorites</h2>
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col">
        <div className="relative grid grid-cols-2 text-center bg-[#fff8ee] rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-[#ff9385] rounded-2xl"
            initial={{ x: activeSection === "food" ? 0 : "100%" }}
            animate={{ x: activeSection === "food" ? 0 : "100%" }}
            transition={{ duration: 0.3 }}
          />
          <div
            className={`relative z-10 p-4 px-5 cursor-pointer ${
              activeSection === "food" ? "text-white" : "text-[#ff9385]"
            }`}
            onClick={() => handleSectionClick("food")}
          >
            <p>Food</p>
          </div>
          <div
            className={`relative z-10 p-4 px-5 cursor-pointer ${
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
            <FoodSection />
          </motion.div>
        ) : (
          <motion.div
            key="drink"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <DrinkSection />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default FavoriteModule;
