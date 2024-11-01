import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

function FoodSection({ FoodItems }: { FoodItems: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-10">
      {FoodItems?.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="flex items-center justify-center rounded-2xl bg-[#fff8ee] p-4 text-[#ffd485] transition-colors duration-200 hover:cursor-pointer hover:bg-[#fdc763ac]"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="w-34 h-24 rounded-lg object-cover"
          />
        </Link>
      ))}
      <Link
        href={`/scan`}
        className="flex items-center justify-center rounded-2xl bg-[#fff8ee] p-4 text-[#ffd485] transition-colors duration-200 hover:cursor-pointer hover:bg-[#fdc763ac] hover:text-white"
      >
        <FaPlus className="text-5xl" />
      </Link>
    </div>
  );
}

export default FoodSection;
