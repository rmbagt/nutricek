import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const FoodSection = () => {
    return (
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
    );
};

export default FoodSection;