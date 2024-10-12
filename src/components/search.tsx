import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";

const Search = () => {
    return (
        <>
            {/* Search */}
            <a href="/search/find">
                <div className="flex items-center text-left bg-[#f4f4f4] p-5 rounded-3xl">
                    <CiSearch />
                    <p className="pl-2 w-full bg-[#f4f4f4]">Search recipes, articles, people...</p>
                </div>
            </a>

            {/* Hot now section */}
            <div className="pt-6">
                <h1 className="pl-2 text-2xl">Hot now</h1>
                <div className="flex overflow-x-scroll pt-4 gap-4">
                    <div className="flex flex-col relative">
                        <Image src="/assets/Pumpkin.png" alt='Pumpkin' className="min-w-52 h-56 rounded-2xl" width={100} height={100}/>
                        <div className="absolute bg-gray-100 bottom-0 w-full rounded-b-xl p-2">
                            <p>The Pumpkins Secrets</p>
                            <p className="text-sm">The Pumpkins Secrets</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <Image src="/assets/Lettuce.webp" alt='Lettuce' className="min-w-52 h-56 rounded-2xl" width={100} height={100}/>
                        <div className="absolute bg-gray-100 bottom-0 w-full rounded-b-xl p-2">
                            <p>The Pumpkins Secrets</p>
                            <p className="text-sm">The Pumpkins Secrets</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <Image src="/assets/Pumpkin.png" alt='Pumpkin' className="min-w-52 h-56" width={100} height={100}/>
                        <div className="absolute bg-gray-100 bottom-0 w-full rounded-b-xl p-2">
                            <p>The Pumpkins Secrets</p>
                            <p className="text-sm">The Pumpkins Secrets</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending */}
            <div>
                <h2 className="pt-14 text-2xl">Trending</h2>
                <div className="flex items-center text-[#e2782c] py-4 border-b border-b-gray-200">
                    <p>best vegetable recipes</p>
                    <IoAnalyticsOutline className="pl-2 w-6 h-6"/>
                </div>
                <div className="flex items-center text-[#e2782c] py-4 border-b border-b-gray-200">
                    <p>cool season vegetables</p>
                    <IoAnalyticsOutline className="pl-2 w-6 h-6"/>
                </div>
                <div className="flex items-center text-[#e2782c] py-4 border-b border-b-gray-200">
                    <p>chicken recipes with eggs</p>
                    <IoAnalyticsOutline className="pl-2 w-6 h-6"/>
                </div>
                <div className="flex items-center text-[#e2782c] py-4 border-b border-b-gray-200">
                    <p>soups</p>
                    <IoAnalyticsOutline className="pl-2 w-6 h-6"/>
                </div>
            </div>
        </>
    );
};

export default Search;