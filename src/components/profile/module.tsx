import Image from "next/image";
import { IoMdPerson, IoIosArrowBack } from "react-icons/io";


function ProfileModule() {
    return (
        <>
            <div className="items-center justify-center text-center">
                <h2>Profile</h2>
                <div className="flex justify-center pt-10">
                    <Image src='/assets/Profile.png' alt='Profile' className="flex justify-center items-center w-40 h-40" width={100} height={100}/>
                </div>
                <h1 className="pt-5 text-2xl">Fern</h1>
                <p>Food Blogger</p>
            </div>
            <div>
                <div className="flex items-center w-full pt-10">
                    <div className="bg-[#fff8ee] rounded-lg p-2">
                        <IoMdPerson className="w-5 h-5 text-[#ff9385]"/>
                    </div>
                    <div className="flex items-center pl-5 justify-between w-full">
                        <p>Log Out</p>
                        <IoIosArrowBack className="rotate-180"/>
                    </div>

                </div>
            </div>

            <div></div>
        </>
    );
}

export default ProfileModule;