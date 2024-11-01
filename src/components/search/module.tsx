"use client";

import { useGetAllProducts } from "@/services/product-service";
import { Product } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoAnalyticsOutline, IoCloseOutline } from "react-icons/io5";
import { RiShoppingBasket2Fill } from "react-icons/ri";

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
    name: "Pumpkins",
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SearchModule() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const allProductsQuery = useGetAllProducts();

  React.useEffect(() => {
    if (allProductsQuery.data) {
      setProducts(allProductsQuery.data);
    }
  }, [allProductsQuery.data]);

  const filteredProducts =
    search.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-white pb-16"
    >
      {/* Search Bar */}
      <motion.div className="px-4" variants={fadeInUp}>
        <div className="relative flex items-center rounded-full bg-[#f4f4f4] px-4 py-3">
          <CiSearch className="text-gray-400" />
          <input
            className="flex-1 bg-transparent px-2 text-sm outline-none"
            type="text"
            placeholder="Search recipes, articles, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearch("")}
              >
                <IoCloseOutline className="text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {search.length > 0 && (
          <motion.div
            className="px-4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            {filteredProducts.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center pt-48 text-center"
                variants={fadeInUp}
              >
                <RiShoppingBasket2Fill className="flex h-48 w-48 text-gray-400" />
                <h2 className="text-xl">No Results Found</h2>
                <p className="text-sm">
                  Try searching for a different keyword or tweek your search a
                  little
                </p>
              </motion.div>
            ) : (
              <motion.div className="mt-4 space-y-4" variants={staggerChildren}>
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    className="flex w-full items-center gap-4 rounded-lg p-2 hover:bg-gray-50"
                    onClick={() => handleProductClick(product.id)}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <p className="text-left text-sm">{product.name}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Content */}
      <AnimatePresence>
        {!search && (
          <motion.div initial="initial" animate="animate" exit="exit">
            {/* Hot Now Section */}
            <motion.div className="px-4 pt-6" variants={fadeInUp}>
              <h2 className="mb-4 text-xl font-semibold">Hot Now</h2>
              <motion.div
                className="flex gap-4 overflow-x-auto pb-4"
                variants={staggerChildren}
              >
                {HotNowItems.map((item) => (
                  <motion.div
                    key={item.name}
                    className="relative min-w-[240px] overflow-hidden rounded-2xl"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-[200px] w-full object-cover"
                      width={240}
                      height={200}
                    />
                    <div className="absolute bottom-0 w-full bg-white/95 p-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Trending Section */}
            <motion.div className="px-4 pt-6" variants={fadeInUp}>
              <h2 className="mb-4 text-xl font-semibold">Trending</h2>
              <motion.div className="space-y-4" variants={staggerChildren}>
                {TrendingItems.map((item) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center justify-between border-b border-gray-100 pb-4"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-[#e2782c]">{item.name}</p>
                    <IoAnalyticsOutline className="text-[#e2782c]" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
