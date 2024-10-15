import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";

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
        <div className="flex gap-4 overflow-x-scroll pt-4">
          <div className="relative flex flex-col">
            <Image
              src="/assets/Pumpkin.png"
              alt="Pumpkin"
              className="h-56 min-w-52 rounded-2xl"
              width={100}
              height={100}
            />
            <div className="absolute bottom-0 w-full rounded-b-xl bg-gray-100 p-2">
              <p>The Pumpkins Secrets</p>
              <p className="text-sm font-light">The Pumpkins Secrets</p>
            </div>
          </div>
          <div className="relative flex flex-col">
            <Image
              src="/assets/Lettuce.webp"
              alt="Lettuce"
              className="h-56 min-w-52 rounded-2xl"
              width={100}
              height={100}
            />
            <div className="absolute bottom-0 w-full rounded-b-xl bg-gray-100 p-2">
              <p>The Pumpkins Secrets</p>
              <p className="text-sm font-light">The Pumpkins Secrets</p>
            </div>
          </div>
          <div className="relative flex flex-col">
            <Image
              src="/assets/Pumpkin.png"
              alt="Pumpkin"
              className="h-56 min-w-52"
              width={100}
              height={100}
            />
            <div className="absolute bottom-0 w-full rounded-b-xl bg-gray-100 p-2">
              <p>The Pumpkins Secrets</p>
              <p className="text-sm font-light">The Pumpkins Secrets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div>
        <h2 className="pt-14 text-2xl">Trending</h2>
        <div className="flex items-center border-b border-b-gray-200 py-4 text-[#e2782c]">
          <p>best vegetable recipes</p>
          <IoAnalyticsOutline className="h-6 w-6 pl-2" />
        </div>
        <div className="flex items-center border-b border-b-gray-200 py-4 text-[#e2782c]">
          <p>cool season vegetables</p>
          <IoAnalyticsOutline className="h-6 w-6 pl-2" />
        </div>
        <div className="flex items-center border-b border-b-gray-200 py-4 text-[#e2782c]">
          <p>chicken recipes with eggs</p>
          <IoAnalyticsOutline className="h-6 w-6 pl-2" />
        </div>
        <div className="flex items-center border-b border-b-gray-200 py-4 text-[#e2782c]">
          <p>soups</p>
          <IoAnalyticsOutline className="h-6 w-6 pl-2" />
        </div>
      </div>
    </>
  );
}

export default SearchModule;
