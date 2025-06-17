"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";


const carData = [
  {
    brand: "Toyota",
    logo: "/images/toyota.png",
    image: "/images/NewArr1.png",
    title: "Camry Hybrid",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
  {
    brand: "Toyota",
    logo: "/images/toyota.png",
    image: "/images/NewArr2.png",
    title: "Corolla Cross",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
  {
    brand: "Lexus",
    logo: "/images/lexus.png",
    image: "/images/NewArr3.png",
    title: "RX 350h Luxury",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
  {
    brand: "Toyota",
    logo: "/images/toyota.png",
    image: "/images/NewArr4.png",
    title: "Prado",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
  {
    brand: "Lexus",
    logo: "/images/lexus.png",
    image: "/images/NewArr5.png",
    title: "Lexus LC",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
  {
    brand: "Lexus",
    logo: "/images/lexus.png",
    image: "/images/NewArr6.png",
    title: "NX 350h F-Sport",
    specs: ["GCC", "Petrol", "Auto", "2024"],
  },
];



export default function NewarrivalSection() {
    return (
        <section className="relative py-[40px] 2xl:py-[60px] 3xl:py-[105px_130px]">
            <div className="container">
                <div className="max-w-[85%] m-auto">
                    <Heading size="heading2" as="h2" className="text-[#B4BACA] text-center uppercase mb-[10px]" >
                        New Arrivals
                    </Heading>
                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[15px] text-center"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </div>

                <div className="relative ">
                    <Swiper
                        modules={[Navigation, Grid]}
                        navigation
                        spaceBetween={30}
                        slidesPerView={3}
                        grid={{
                            rows: 2,
                            fill: "row",
                        }}
                        className="p-15"
                    >
                        {carData.map((car, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full rounded-[10px] overflow-hidden py-[15px] px-[20px] flex items-end shadow-2xl">
                                    {/* Left Section - Car Info */}
                                    <div className="w-[calc(100%-65px)] h-full min-h-[295px] mr-[20px] relative rounded-[10px] overflow-hidden after:absolute 
                                    after:top-0 after:right-0 after:content-[''] 
                                    after:bg-[linear-gradient(90deg,_rgba(187,192,207,0.00)_0%,_#BBC0CF_100%)] after:w-full after:max-w-[150px] 
                                    after:opacity-[0.22] after:h-full">
                                        {/* Brand Logo */}
                                        <div className="w-full max-w-[50px] absolute top-0 left-0">
                                            <Image
                                                src="/images/toyota.png"
                                                alt="Toyota Logo"
                                                width={350}
                                                height={200}
                                                className="w-full h-full object-contain"
                                            /> 
                                        </div> 
                                        {/* Car Image */}
                                        <div className="w-full max-w-[340px] min-h-[250] flex items-center justify-center m-auto relative">
                                            <Image
                                                src="/images/NewArr1.png"
                                                alt="Camry Hybrid"
                                                width={350}
                                                height={200}
                                                className="w-full h-full object-contain"
                                            />
                                        </div> 
                                        {/* Car Name */}
                                        <div className="py-2">
                                            <div className="text-[20px] font-semibold font-base1 text-black capitalize">
                                                Camry Hybrid
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section - Specs */}
                                    <div className="w-[65px]">
                                        <div className="flex flex-col max-h-[265px] h-full">
                                            {[
                                                { icon: "globe.svg", label: "GCC" },
                                                { icon: "fuel.svg", label: "Petrol" },
                                                { icon: "transmission.svg", label: "Auto" },
                                                { icon: "year.svg", label: "2024" },
                                            ].map((item, index) => (
                                                <div key={index} className="mb-[15px] last:mb-0">
                                                    <div className="text-center w-full h-full rounded-[10px] overflow-hidden bg-[#F5F9FF] min-h-[55px] flex items-center justify-center flex-col">
                                                        <div className="w-[22px] h-[22px] m-auto mb-[3px] flex">
                                                            <Image
                                                                src={`/images/${item.icon}`}
                                                                alt={item.label}
                                                                width={25}
                                                                height={25}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="text-[14px] font-normal font-base1 text-black">
                                                            {item.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </div>
        </section>
    );
}
