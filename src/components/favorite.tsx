"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";


const Favorite = () => {
    const [activeSection, setActiveSection] = useState("food");

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
    };

    return(
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

                {activeSection === "food" ? (
                    <div className="grid grid-cols-3 pt-10 gap-4">
                        <div className="rounded-2xl bg-[#fff8ee] p-4">
                            <Image src='/assets/Cupcake.png' alt='Cupcake' width={100} height={100} className="w-34 h-24"/>
                        </div>
                        <div className="rounded-2xl bg-[#fff8ee] p-4">
                            <Image src='/assets/Burger.png' alt='Burger' width={100} height={100} className="w-34 h-24"/>
                        </div>
                        <div className="rounded-2xl bg-[#fff8ee] p-4">
                            <Image src='/assets/Pizza.png' alt='Pizza' width={100} height={100} className="w-34 h-24"/>
                        </div>
                        <div className="rounded-2xl bg-[#fff8ee] p-4">
                            <Image src='/assets/Cookie.png' alt='Cookie' width={100} height={100} className="w-34 h-24"/>
                        </div>
                        <div className="rounded-2xl bg-[#fff8ee] p-4">
                            <Image src='/assets/Hotdog.png' alt='Hot Dog' width={100} height={100} className="w-34 h-24"/>
                        </div>
                        <div className="flex rounded-2xl bg-[#fff8ee] p-4 items-center justify-center">
                            <FaPlus className="text-[#ffd485] flex w-3/6 h-auto"/>
                        </div>
                    </div>
                    
                ) : <h2>Nothing here</h2>}
            </div>
        </>
    );
};

export default Favorite;