import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { RiShoppingBasket2Fill } from "react-icons/ri";

function FindModule() {
  return (
    <>
      {/* Menu */}
      <div className="flex w-full items-center justify-center">
        <a href="/search" className="absolute left-5">
          <IoIosArrowBack className="h-8 w-8" />
        </a>
        <h2 className="">Search</h2>
      </div>
      <div className="mt-8 flex items-center rounded-3xl bg-[#f4f4f4] p-5 text-left">
        <CiSearch />
        <input
          className="w-full bg-[#f4f4f4] pl-2 outline-none"
          type="text"
          placeholder="Search recipes, articles, people..."
        ></input>
      </div>

      {/* No Results */}
      <div className="flex flex-col items-center justify-center pt-48 text-center">
        <RiShoppingBasket2Fill className="flex h-48 w-48" />
        <h2 className="text-xl">No Results Found</h2>
        <p className="text-sm">
          Try searching for a different keyword or tweek your search a little
        </p>
      </div>
    </>
  );
}

export default FindModule;
