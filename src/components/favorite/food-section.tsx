import Image from "next/image";
import { FaPlus } from "react-icons/fa";

function FoodSection() {
  return (
    <div className="grid grid-cols-3 gap-4 pt-10">
      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <Image
          src="/assets/Cupcake.png"
          alt="Cupcake"
          width={100}
          height={100}
          className="w-34 h-24"
        />
      </div>
      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <Image
          src="/assets/Burger.png"
          alt="Burger"
          width={100}
          height={100}
          className="w-34 h-24"
        />
      </div>
      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <Image
          src="/assets/Pizza.png"
          alt="Pizza"
          width={100}
          height={100}
          className="w-34 h-24"
        />
      </div>
      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <Image
          src="/assets/Cookie.png"
          alt="Cookie"
          width={100}
          height={100}
          className="w-34 h-24"
        />
      </div>
      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <Image
          src="/assets/Hotdog.png"
          alt="Hot Dog"
          width={100}
          height={100}
          className="w-34 h-24"
        />
      </div>
      <div className="flex items-center justify-center rounded-2xl bg-[#fff8ee] p-4">
        <FaPlus className="flex h-auto w-3/6 text-[#ffd485]" />
      </div>
    </div>
  );
}

export default FoodSection;
