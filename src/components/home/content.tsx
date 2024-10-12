import React from 'react';
import Image from 'next/image';
import { MdArrowRight } from "react-icons/md";

const Content = () => {
    return (
        <div className="text-center">

            {/* Header */}
            <h1 className="text-2xl text-[#4cab52] font-signika">Hello Fern,</h1>
            <h3 className="text-base">Find, track and eat healthy food.</h3>

            {/* Article */}
            <div className='flex justify-between bg-[#fff7ef] w-full mt-5 rounded-3xl p-9'>
                <div className='flex flex-col text-left pr-10'>
                    <h1>Article</h1>
                    <h2>The pros and cons of fast food</h2>
                    <div className='flex items-center w-fit bg-[#ff8473] rounded-xl mt-5 justify-center p-2 px-5'>
                        <p className='text-white text-center'>Read Now</p>
                        <MdArrowRight className='w-[30px] h-[30px] text-white'/>
                    </div>
                </div>
                <div className='flex'>
                    <Image src="/assets/FoodCard.png" alt='Food Card' className='w-[10rem] h-full' width={300} height={300}/>
                </div>
            </div>

            {/* Article switch */}
            <div className='pt-5'>
                <p>ITEMS</p>
            </div>

            {/* Track your weekly progress */}
            <div className='flex justify-between items-center bg-[#9e9bc7] w-full mt-5 rounded-3xl p-9'>
                <p className='text-white text-left text-xl'>Track Your Weekly Progress</p>
                <div className='flex text-center items-center justify-center text-[#9e9bc7] bg-white p-2 px-5 w-1/2'>
                    <p className='text-sm'>View Now</p>
                    <MdArrowRight className='w-[20px] h-[20px] text-[#9e9bc7]'/>
                </div>
            </div>

            {/* Choose your favorite */}
            <h2 className='pt-7 text-left text-2xl'>Choose Your Favorites</h2>
            <div className='flex gap-3 items-center text-center pt-5 overflow-x-scroll'>
                <div className='flex flex-col bg-[#fff2f0] w-fit rounded-[2rem] p-5 px-12 justify-center text-center items-center'>
                    <Image src='/assets/Drink.png' alt='Drink' className='w-8 h-14' width={150} height={150}/>
                    <p className='pt-2'>Drinks</p>
                </div>
                <div className='flex flex-col bg-[#eff7ee] w-fit rounded-[2rem] p-5 px-12 justify-center text-center items-center'>
                    <Image src='/assets/Food.png' alt='Food' className='w-8 h-14' width={150} height={150}/>
                    <p className='pt-2'>Meals</p>
                </div>
                <div className='flex flex-col bg-[#eff7ee] w-fit rounded-[2rem] p-5 px-12 justify-center text-center items-center'>
                    <Image src='/assets/Food.png' alt='Food' className='w-8 h-14' width={150} height={150}/>
                    <p className='pt-2'>Meals</p>
                </div>
                <div className='flex flex-col bg-[#eff7ee] w-fit rounded-[2rem] p-5 px-12 justify-center text-center items-center'>
                    <Image src='/assets/Food.png' alt='Food' className='w-8 h-14' width={150} height={150}/>
                    <p className='pt-2'>Meals</p>
                </div>
            </div>
        </div>
    );
}

export default Content;