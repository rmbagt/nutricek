"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoPersonSharp } from "react-icons/io5";
import {
  IoIosCamera,
} from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const getXPosition = (link: string) => {
    switch (link) {
      case "home":
        return 0;
      case "search":
        return "20%";
      case "camera":
        return "40%";
      case "favorite":
        return "60%";
      case "profile":
        return "80%";
      default:
        return 0;
    }
  };

  return (
    <div className="sticky bottom-0 p-5 z-100 bg-white">
      <div className="relative flex items-center justify-between">
        <motion.div
          className="absolute top-0 left-0 w-1/5 h-full"
          initial={{ x: getXPosition(activeLink) }}
          animate={{ x: getXPosition(activeLink) }}
          transition={{ duration: 0.1 }}
        />
        <Link href="/" onClick={() => handleLinkClick("home")}>
          <motion.div
            className="relative z-10 text-4xl"
            initial={{ color: activeLink === "home" ? "#4cab52" : "#000000" }}
            animate={{ color: activeLink === "home" ? "#4cab52" : "#000000" }}
            transition={{ duration: 0.1 }}
          >
            <TiHome />
          </motion.div>
        </Link>
        <Link href="/search" onClick={() => handleLinkClick("search")}>
          <motion.div
            className="relative z-10 text-4xl"
            initial={{ color: activeLink === "search" ? "#4cab52" : "#000000" }}
            animate={{ color: activeLink === "search" ? "#4cab52" : "#000000" }}
            transition={{ duration: 0.1 }}
          >
            <FiSearch />
          </motion.div>
        </Link>
        <Link href="#">
          <div className="relative z-10 rounded-full bg-[#4cab52] p-1">
            <IoIosCamera className="text-4xl text-white" />
          </div>
        </Link>
        <Link href="/favorite" onClick={() => handleLinkClick("favorite")}>
          <motion.div
            className="relative z-10 text-4xl"
            initial={{ color: activeLink === "favorite" ? "#4cab52" : "#000000" }}
            animate={{ color: activeLink === "favorite" ? "#4cab52" : "#000000" }}
            transition={{ duration: 0.1 }}
          >
            <GoHeart />
          </motion.div>
        </Link>
        <Link href="/profile" onClick={() => handleLinkClick("profile")}>
          <motion.div
            className="relative z-10 text-4xl"
            initial={{ color: activeLink === "profile" ? "#4cab52" : "#000000" }}
            animate={{ color: activeLink === "profile" ? "#4cab52" : "#000000" }}
            transition={{ duration: 0.1 }}
          >
            <IoPersonSharp />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
