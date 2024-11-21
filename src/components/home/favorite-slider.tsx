import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FavoriteSlider({
  FavoriteItems,
}: {
  FavoriteItems: Product[];
}) {
  return (
    <div>
      <h2 className="mb-4 text-left text-2xl font-semibold text-[#4cab52]">
        Choose Your Favorites
      </h2>
      {FavoriteItems?.length ? (
        <div className="overflow-x-scroll">
          <div className="flex w-max items-center gap-4 p-4 text-center">
            {FavoriteItems?.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="flex h-40 w-36 flex-col items-center justify-between gap-2 rounded-2xl bg-[#eff7ee] p-4 text-center transition-all duration-200 hover:cursor-pointer hover:bg-[#bcfab1]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col justify-start">
                  <p className="text-xs font-bold">
                    {item.name.length > 25
                      ? `${item.name.slice(0, 25)}...`
                      : item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <p className="text-xl font-semibold">No favorite items</p>
          <p className="text-sm">Add your favorite items to track them</p>
        </div>
      )}
    </div>
  );
}
