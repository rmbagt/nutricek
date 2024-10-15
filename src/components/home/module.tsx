import React from "react";
import Image from "next/image";
import { MdArrowRight } from "react-icons/md";

function HomeModule() {
  return (
    <div className="text-center z-20">
      {/* Header */}
      <h1 className="text-2xl text-[#4cab52] font-semibold">Hello Fern,</h1>
      <h3 className="text-base">Find, track and eat healthy food.</h3>

      {/* Article */}
      <div className="mt-5 flex w-full justify-between rounded-3xl bg-[#fff7ef] p-9">
        <div className="flex flex-col pr-10 text-left">
          <h1 className="font-semibold">Article</h1>
          <h2 className="font-semibold">The pros and cons of fast food</h2>
          <div className="mt-5 flex w-fit items-center justify-center rounded-xl bg-[#ff8473] p-2 px-5">
            <p className="text-center text-white font-semibold">Read Now</p>
            <MdArrowRight className="h-[30px] w-[30px] text-white" />
          </div>
        </div>
        <div className="flex">
          <Image
            src="/assets/FoodCard.png"
            alt="Food Card"
            className="h-full w-[10rem]"
            width={300}
            height={300}
          />
        </div>
      </div>

      {/* Article switch */}
      <div className="pt-5">
        <p>ITEMS</p>
      </div>

      {/* Track your weekly progress */}
      <div className="mt-5 flex w-full items-center justify-between rounded-3xl bg-[#9e9bc7] p-9">
        <p className="text-left text-xl text-white font-semibold">
          Track Your Weekly Progress
        </p>
        <div className="flex w-1/2 items-center justify-center bg-white p-2 px-5 text-center text-[#9e9bc7]">
          <p className="text-sm font-semibold">View Now</p>
          <MdArrowRight className="h-[20px] w-[20px] text-[#9e9bc7]" />
        </div>
      </div>

      {/* Choose your favorite */}
      <h2 className="pt-7 text-left text-2xl">Choose Your Favorites</h2>
      <div className="flex items-center gap-3 overflow-x-scroll pt-5 text-center">
        <div className="flex w-fit flex-col items-center justify-center rounded-[2rem] bg-[#fff2f0] p-5 px-12 text-center">
          <Image
            src="/assets/Drink.png"
            alt="Drink"
            className="h-14 w-8"
            width={150}
            height={150}
          />
          <p className="pt-2">Drinks</p>
        </div>
        <div className="flex w-fit flex-col items-center justify-center rounded-[2rem] bg-[#eff7ee] p-5 px-12 text-center">
          <Image
            src="/assets/Food.png"
            alt="Food"
            className="h-14 w-8"
            width={150}
            height={150}
          />
          <p className="pt-2">Meals</p>
        </div>
        <div className="flex w-fit flex-col items-center justify-center rounded-[2rem] bg-[#eff7ee] p-5 px-12 text-center">
          <Image
            src="/assets/Food.png"
            alt="Food"
            className="h-14 w-8"
            width={150}
            height={150}
          />
          <p className="pt-2">Meals</p>
        </div>
        <div className="flex w-fit flex-col items-center justify-center rounded-[2rem] bg-[#eff7ee] p-5 px-12 text-center">
          <Image
            src="/assets/Food.png"
            alt="Food"
            className="h-14 w-8"
            width={150}
            height={150}
          />
          <p className="pt-2">Meals</p>
        </div>
      </div>
    </div>
  );
}

export default HomeModule;
