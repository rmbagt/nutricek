import Image from "next/image";
import { IoHeart } from "react-icons/io5";

const DrinkItem = [
  {
    name: "Coca-Cola",
    image: "/assets/Cola.png",
    calorie: "170 Kcal",
    description: "Carbonated drinks",
  },
  {
    name: "Coffee",
    image: "/assets/Coffee.png",
    calorie: "90 Kcal",
    description: "Luwak white coffee",
  },
];

function DrinkSection() {
  return (
    <div className="flex flex-col gap-4 pt-10">
      {DrinkItem.map((item) => (
        <div
          key={item.name}
          className="relative flex w-full rounded-2xl bg-[#eff7ee] p-5 px-8"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="h-24 w-12"
          />
          <div className="flex flex-col justify-center gap-1 pl-10">
            <p className="text-sm text-[#6cb663]">{item.calorie}</p>
            <p className="text-xl">{item.name}</p>
            <p className="text-sm">{item.description}</p>
          </div>
          <IoHeart className="absolute right-5 text-[#4cab52]" />
        </div>
      ))}
    </div>
  );
}

export default DrinkSection;
