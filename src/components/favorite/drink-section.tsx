import { Product } from "@prisma/client";
import Image from "next/image";
import { IoHeart } from "react-icons/io5";

function DrinkSection({ DrinkItems }: { DrinkItems: Product[] }) {
  return (
    <div className="flex flex-col gap-4 pt-10">
      {DrinkItems?.map((item) => (
        <div
          key={item.name}
          className="relative flex w-full gap-2 rounded-2xl bg-[#eff7ee] p-3"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            className="h-24 w-20"
          />
          <div className="flex flex-col justify-center gap-1">
            <p className="text-sm text-[#6cb663]">
              {(item.components as { calories: number }).calories} Kcal
            </p>
            <p className="font-semibold md:text-xl">{item.name}</p>
            <p className="text-sm">{item.details.slice(0, 50)}...</p>
          </div>
          <IoHeart className="absolute right-5 text-[#4cab52]" />
        </div>
      ))}
    </div>
  );
}

export default DrinkSection;
