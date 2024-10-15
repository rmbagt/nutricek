"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import {
  IoMdHome,
  IoIosSearch,
  IoIosCamera,
  IoIosHeartEmpty,
} from "react-icons/io";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const newPath = `${pathname.split("/")[1]}`;
    setActiveLink(newPath || "home");
  }, [pathname]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="sticky bottom-0 p-5 z-100 bg-white">
      <div className="flex items-center justify-between">
        <Link href="/" onClick={() => handleLinkClick("home")}>
          <IoMdHome
            className={`text-4xl ${activeLink === "home" ? "text-[#4cab52]" : "text-black"}`}
          />
        </Link>
        <Link href="/search" onClick={() => handleLinkClick("search")}>
          <IoIosSearch
            className={`text-4xl ${activeLink === "search" ? "text-[#4cab52]" : "text-black"}`}
          />
        </Link>
        <Link href="#">
          <div className="rounded-full bg-[#4cab52] p-1">
            <IoIosCamera className="text-4xl text-white" />
          </div>
        </Link>
        <Link href="/favorite" onClick={() => handleLinkClick("favorite")}>
          <IoIosHeartEmpty
            className={`text-4xl ${activeLink === "favorite" ? "text-[#4cab52]" : "text-black"}`}
          />
        </Link>
        <Link href="/profile" onClick={() => handleLinkClick("profile")}>
          <IoPersonOutline
            className={`text-4xl ${activeLink === "profile" ? "text-[#4cab52]" : "text-black"}`}
          />
        </Link>
      </div>
    </div>
  );
}
