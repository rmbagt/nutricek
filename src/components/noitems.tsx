"use client";
import { useState } from "react";
import FoodSection from "./nofood";
import DrinkSection from "./nodrink";

const NoItems = () => {
    const [activeSection, setActiveSection] = useState("food");

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
    };

    return (
        <>
            {/* Header */}
            <div className="flex text-center justify-center">
                <h2>Favorites</h2>
            </div>

            {/* Content */}
            <div className="flex flex-col mt-8">
                <div className="grid grid-cols-2 text-center">
                    <div className={`p-4 px-5 rounded-l-2xl ${activeSection === "food" ? "bg-[#ff9385] text-white" : "bg-[#fff8ee] text-[#ff9385]"}`} onClick={() => handleSectionClick("food")}>
                        <p>Food</p>
                    </div>
                    <div className={`p-4 px-5 rounded-r-2xl ${activeSection === "drink" ? "bg-[#ff9385] text-white" : "bg-[#fff8ee] text-[#ff9385]"}`} onClick={() => handleSectionClick("drink")}>
                        <p>Drink</p>
                    </div>
                </div>
            </div>
            {activeSection === "food" ? (
                <FoodSection />
            ) : <DrinkSection />
            }
        </>
    );
};

export default NoItems;