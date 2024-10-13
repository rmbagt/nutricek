import Image from "next/image";
import { IoHeart } from "react-icons/io5";

const DrinkSection = () => {
    return (
        <div className="flex flex-col pt-10 gap-4">
            <div className="flex w-full rounded-2xl bg-[#eff7ee] p-5 px-8 relative">
                <Image src='/assets/Cola.png' alt='Cola' width={100} height={100} className="w-12 h-24"/>
                <div className="flex flex-col pl-10 justify-center gap-1">
                    <p className="text-sm text-[#6cb663]">170 Kcal</p>
                    <p className="text-xl">Coca-Cola</p>
                    <p className="text-sm">Carbonated drinks</p>
                </div>
                <IoHeart className="text-[#4cab52] absolute right-5"/>
            </div>
            <div className="flex w-full rounded-2xl bg-[#eff7ee] p-5 px-8 relative">
                <Image src='/assets/Coffee.png' alt='Coffee' width={100} height={100} className="w-12 h-24"/>
                <div className="flex flex-col pl-10 justify-center gap-1">
                    <p className="text-sm text-[#6cb663]">90 Kcal</p>
                    <p className="text-xl">Coffee</p>
                    <p className="text-sm">Luwak white coffee</p>
                </div>
                <IoHeart className="text-[#4cab52] absolute right-5"/>
            </div>
        </div>
    );
};

export default DrinkSection;