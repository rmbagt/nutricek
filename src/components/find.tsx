import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { RiShoppingBasket2Fill } from "react-icons/ri";

const Find = () => {
    return(
        <>
            {/* Menu */}
            <div className="flex w-full justify-center items-center">
                <a href="/search" className="absolute left-5">
                    <IoIosArrowBack className="w-8 h-8"/>
                </a>
                <h2 className="">Search</h2>
            </div>
            <div className="flex items-center text-left bg-[#f4f4f4] p-5 rounded-3xl mt-8">
                <CiSearch />
                <input className="pl-2 w-full bg-[#f4f4f4] outline-none" type="text" placeholder="Search recipes, articles, people..."></input>
            </div>

            {/* No Results */}
            <div className="flex flex-col justify-center text-center items-center pt-48">
                <RiShoppingBasket2Fill className="flex w-48 h-48"/>
                <h2 className="text-xl">No Results Found</h2>
                <p className="text-sm">Try searching for a different keyword or tweek your search a little</p>
            </div>
        </>
    );
}
export default Find;