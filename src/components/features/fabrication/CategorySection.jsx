"use client";

import { useState } from "react";
import { Heading } from "@/components/layout/Heading";
import { mediaUrl } from "@/lib/constants";
import Image from "next/image";

const categoryData = [
  {
    title: "Engine Parts",
    icon: "/images/cat_icon1.png",
  },
  {
    title: "Transmission Parts",
    icon: "/images/cat_icon2.png",
  },
  {
    title: "Suspension & Steering  ",
    icon: "/images/cat_icon3.png",
  },
  {
    title: "Body Parts",
    icon: "/images/cat_icon4.png",
  },
  {
    title: "Breaking System",
    icon: "/images/cat_icon5.png",
  },
  {
    title: "Electrical & Electronics",
    icon: "/images/cat_icon6.png",
  },
  {
    title: "Filters & Lubricants",
    icon: "/images/cat_icon7.png",
  },
  {
    title: "Cooling System",
    icon: "/images/cat_icon8.png",
  },
];



export default function CategorySection({ title, categoryData = categoryData }) {
  return (
    <section className="relative 3xl:py-[120px_65px] 2xl:py-[80px_40px] xl:py-[40px] py-[30px]">
      <div className="container">
        <div className="3xl:mb-[60px] 2xl:mb-[50px] xl:mb-[30px] mb-[20px] text-center">
          <Heading size="heading2" as="h2" className="text-black uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] mb-[15px]">
            {title ? title : "Categories"}
          </Heading>
        </div>
        <div className="flex flex-wrap ">
          {categoryData.map((Item, index) => (
            <div className="lg:w-1/4  2xs:w-1/3 w-1/2 p-[5px]" key={index}>
              <div
                className="relative w-full h-full rounded-[10px] overflow-hidden bg-[#F5F9FF] 3xl:p-[20px] p-[15px] transition-all 
                                group hover:bg-[linear-gradient(180deg,#2D4A95_0%,#0E1D44_100%)]"
              >
                <div className="flex items-center flex-wrap">
                  <div
                    className="3xl:w-[95px] 2xl:w-[75px] xl:w-[65px] w-[45px] 3xl:h-[95px] 2xl:h-[75px] xl:h-[65px] h-[45px] 
                                        rounded-full flex items-center justify-center xl:p-[20px] p-[12px] max-sm:m-auto max-sm:mb-[15px]
                                        overflow-hidden bg-[#E7F0FD] transition-all group-hover:bg-white"
                  >
                    <Image
                      src={Item.icon ? `${mediaUrl}${Item.icon}` : "/images/cat_icon1.png"}
                      width={68}
                      height={68}
                      alt={Item.title}
                      className="w-full h-full object-contain transition-all group-hover:scale-75"
                    />
                  </div>
                  <div className="3xl:w-[calc(100%-95px)] 2xl:w-[calc(100%-75px)] xl:w-[calc(100%-65px)] sm:w-[calc(100%-45px)] w-full 3xl:pl-[25px] 2xl:pl-[15px] sm:pl-[10px]">
                    <div className="3xl:text-[25px] 2xl:text-[21px] xl:text-[16px] lg:text-[14px] text-[12px] font-medium font-base1 sm:max-w-[80%] max-sm:text-center text-black group-hover:text-white transition-all">
                      {Item.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
