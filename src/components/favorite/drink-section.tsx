import Image from "next/image";
import { IoHeart } from "react-icons/io5";

function DrinkSection() {
  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="relative flex w-full rounded-2xl bg-[#eff7ee] p-5 px-8">
        <Image
          src="/assets/Cola.png"
          alt="Cola"
          width={100}
          height={100}
          className="h-24 w-12"
        />
        <div className="flex flex-col justify-center gap-1 pl-10">
          <p className="text-sm text-[#6cb663]">170 Kcal</p>
          <p className="text-xl">Coca-Cola</p>
          <p className="text-sm">Carbonated drinks</p>
        </div>
        <IoHeart className="absolute right-5 text-[#4cab52]" />
      </div>
      <div className="relative flex w-full rounded-2xl bg-[#eff7ee] p-5 px-8">
        <Image
          src="/assets/Coffee.png"
          alt="Coffee"
          width={100}
          height={100}
          className="h-24 w-12"
        />
        <div className="flex flex-col justify-center gap-1 pl-10">
          <p className="text-sm text-[#6cb663]">90 Kcal</p>
          <p className="text-xl">Coffee</p>
          <p className="text-sm">Luwak white coffee</p>
        </div>
        <IoHeart className="absolute right-5 text-[#4cab52]" />
      </div>
    </div>
  );
}

export default DrinkSection;
