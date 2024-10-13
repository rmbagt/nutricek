"use client";

import { useState } from "react";
import FoodSection from "./food-section";
import DrinkSection from "./drink-section";

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
        <div className="grid grid-cols-2 text-center">
          <div
            className={`rounded-l-2xl p-4 px-5 ${activeSection === "food" ? "bg-[#ff9385] text-white" : "bg-[#fff8ee] text-[#ff9385]"}`}
            onClick={() => handleSectionClick("food")}
          >
            <p>Food</p>
          </div>
          <div
            className={`rounded-r-2xl p-4 px-5 ${activeSection === "drink" ? "bg-[#ff9385] text-white" : "bg-[#fff8ee] text-[#ff9385]"}`}
            onClick={() => handleSectionClick("drink")}
          >
            <p>Drink</p>
          </div>
        </div>
      </div>
      {activeSection === "food" ? <FoodSection /> : <DrinkSection />}
    </>
  );
}

export default FavoriteModule;
