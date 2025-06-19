"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import ProductCard from "@/components/common/ProductCard";

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
        logo: "/images/toyota.png",
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
        logo: "/images/toyota.png",
        image: "/images/NewArr5.png",
        title: "Lexus LC",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
];

export default function NewarrivalSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="relative z-0 py-[40px] 2xl:py-[60px] 3xl:py-[105px_130px] after:absolute after:content-[''] overflow-hidden
            after:top-0 after:left-0 after:right-0 after:m-auto after:h-full after:w-[220px] after:skew-x-[-16deg]
            after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-20">

            <div className="container">
                <div className="max-w-[85%] m-auto 3xl:mb-[50px] 2xl:mb-[30px] mb-[15px]">
                    <Heading
                        size="heading2"
                        as="h2"
                        className="text-[#B4BACA] text-center uppercase mb-[10px]"
                    >
                        New Arrivals
                    </Heading>
                    <Text
                        size="text1"
                        as="p"
                        className="text-[#4B4B4B] mb-[15px] text-center"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book.
                    </Text>
                </div>

                <div className="relative z-1">
                    <Swiper
                        modules={[Navigation, Grid]}
                        spaceBetween={0}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        onBeforeInit={(swiper) => setActiveIndex(swiper.realIndex)}
                        navigation={{
                            prevEl: ".btn-prev",
                            nextEl: ".btn-next",
                        }}

                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                
                            },
                            420: {
                                slidesPerView: 1.3, 
                            },
                            5780: {
                                slidesPerView: 1.5, 
                            },
                            768: {
                                slidesPerView: 2, 
                                grid: { rows: 2, fill: "row" },
                            },
                            1024: {
                                slidesPerView: 2, 
                                grid: { rows: 2, fill: "row" },
                            },
                            1280: {
                                slidesPerView: 3, 
                                grid: { rows: 2, fill: "row" },
                            },
                            1661: {
                                slidesPerView: 3, 
                                grid: { rows: 2, fill: "row" },
                            },
                        }}
                        className=""
                    >
                        {carData.map((car, index) => (
                            <SwiperSlide key={index}>
                               <ProductCard car={car} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center lg:absolute lg:top-0 lg:bottom-0 lg:w-full">
                        <button className="btn-prev relative lg:absolute left-0 lg:left-[-65px] lg:top-1/2 lg:-translate-y-1/2 z-10
                        bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                        shadow w-[34px] h-[38px] flex items-center justify-center rounded-[30px_0px_0px_30px] cursor-pointer group
                         hover:bg-[#2E4C99] disabled:pointer-events-none disabled:opacity-[0.2]">

                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className="btn-next relative lg:absolute right-0 lg:right-[-65px] lg:top-1/2 lg:-translate-y-1/2 z-10 
                        bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]
                        shadow w-[34px] h-[38px] flex items-center justify-center rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99] 
                        disabled:pointer-events-none disabled:opacity-[0.2] ">

                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100" >
                                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
