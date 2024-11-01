"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { IoMdPerson, IoIosArrowBack } from "react-icons/io";
import LoadingSkeleton from "../skeleton/loading-skeleton";

function ProfileModule() {
  const { data: session } = useSession();

  if (!session) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="items-center justify-center text-center">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="flex justify-center py-5">
          <Image
            src={`${session?.user?.image} `}
            alt="Profile"
            className="flex h-40 w-40 items-center justify-center rounded-full"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-2xl">{`${session?.user?.name}`}</h1>
        <p>Food Blogger</p>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div
          className="flex w-full cursor-pointer items-center rounded-lg bg-[#fcf3e6] p-4 transition-colors duration-200 hover:bg-[#fadeb6]"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <div className="rounded-lg bg-[#fff8ee]">
            <IoMdPerson className="h-5 w-5 text-[#ff9385]" />
          </div>
          <div className="flex w-full items-center justify-between pl-5">
            <p>Log Out</p>
            <IoIosArrowBack className="rotate-180" />
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}

export default ProfileModule;
