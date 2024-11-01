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
        <h2>Profile</h2>
        <div className="flex justify-center pt-10">
          <Image
            src={`${session?.user?.image} `}
            alt="Profile"
            className="flex h-40 w-40 items-center justify-center rounded-full"
            width={100}
            height={100}
          />
        </div>
        <h1 className="pt-5 text-2xl">{`${session?.user?.name}`}</h1>
        <p>Food Blogger</p>
      </div>
      <div>
        <div
          className="mt-10 flex w-full cursor-pointer items-center rounded-lg p-2 transition-colors duration-200 hover:bg-[#fff8ee]"
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
