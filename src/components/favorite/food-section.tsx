import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const FoodItems = [
  {
    name: "Cupcake",
    image: "/assets/Cupcake.png",
  },
  {
    name: "Burger",
    image: "/assets/Burger.png",
  },
  {
    name: "Pizza",
    image: "/assets/Pizza.png",
  },
  {
    name: "Cookie",
    image: "/assets/Cookie.png",
  },
  {
    name: "Hot Dog",
    image: "/assets/Hotdog.png",
  },
];

function FoodSection() {
  return (
    <div className="grid grid-cols-3 gap-4 pt-10">
      {FoodItems.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-center rounded-2xl bg-[#fff8ee] p-4"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="w-34 h-24"
          />
        </div>
      ))}
      <div className="flex items-center justify-center rounded-2xl bg-[#fff8ee] p-4">
        <FaPlus className="text-5xl text-[#ffd485]" />
      </div>
    </div>
  );
}

export default FoodSection;
