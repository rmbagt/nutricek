import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";

const HotNowItems = [
  {
    name: "Pumpkin",
    image: "/assets/Pumpkin.png",
    description: "The Pumpkins Secrets",
  },
  {
    name: "Lettuce",
    image: "/assets/Lettuce.webp",
    description: "The Pumpkins Secrets",
  },
  {
    name: "Pumpkin",
    image: "/assets/Pumpkin.png",
    description: "The Pumpkins Secrets",
  },
];

const TrendingItems = [
  {
    name: "best vegetable recipes",
    icon: <IoAnalyticsOutline />,
  },
  {
    name: "cool season vegetables",
    icon: <IoAnalyticsOutline />,
  },
  {
    name: "chicken recipes with eggs",
    icon: <IoAnalyticsOutline />,
  },
  {
    name: "soups",
    icon: <IoAnalyticsOutline />,
  },
];

function SearchModule() {
  return (
    <>
      {/* Search */}
      <a href="/search/find">
        <div className="flex items-center rounded-3xl bg-[#f4f4f4] p-5 text-left">
          <CiSearch />
          <p className="w-full bg-[#f4f4f4] pl-2">
            Search recipes, articles, people...
          </p>
        </div>
      </a>

      {/* Hot now section */}
      <div className="pt-6">
        <h1 className="pl-2 text-2xl">Hot now</h1>
        <div className="flex gap-4 overflow-x-scroll px-4">
          {HotNowItems.map((item) => (
            <div key={item.name} className="relative my-4 flex flex-col">
              <Image
                src={item.image}
                alt={item.name}
                className="h-56 min-w-52 rounded-2xl"
                width={100}
                height={100}
              />
              <div className="absolute bottom-0 w-full rounded-b-xl bg-gray-100 p-2">
                <p>{item.name}</p>
                <p className="text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <h2 className="pt-14 text-2xl">Trending</h2>
        {TrendingItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 border-b border-b-gray-200 py-4 text-[#e2782c]"
          >
            <p>{item.name}</p>
            {item.icon}
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchModule;
