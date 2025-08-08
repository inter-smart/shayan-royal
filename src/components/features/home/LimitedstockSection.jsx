"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import ProductCard from "@/components/common/ProductCard";

const carData = [
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/ltd1.png",
        title: "Land Cruiser",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/ltd2.png",
        title: "Urban Cruiser",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/ltd3.png",
        title: "Lexus LS",
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
        <section className="relative z-0 py-[30px] xl:py-[40px] 2xl:py-[40px] 3xl:py-[65px] after:absolute after:content-[''] overflow-hidden
            after:top-0 after:left-[-10%] after:right-0 after:m-auto after:h-full after:3xl:w-[365px] after:2xl:w-[275px] after:w-[220px] after:skew-x-[-16deg]
            after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-20">

            <div className="container">
                <div className="max-w-[85%] m-auto 3xl:mb-[50px] 2xl:mb-[30px] mb-[15px]">
                    <Heading
                        size="heading2"
                        as="h2"
                        className="text-[#B4BACA] text-center uppercase mb-[10px]"
                    >
                        Limited stock
                    </Heading>
                    <Text
                        size="text1"
                        as="p"
                        className="text-[#4B4B4B] mb-[15px] text-center"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                        Lorem Ipsum passages, and more recently with desktop.
                    </Text>
                </div>

                <div className="relative z-1">
                    <Swiper
                        spaceBetween={0}
                        modules={[Navigation]}
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
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1280: {
                                slidesPerView: 3,
                            },
                            1661: {
                                slidesPerView: 3,
                            },
                        }}
                        className=""
                    >
                        {carData.map((car, index) => (
                            <SwiperSlide key={index} className="!h-auto">
                                <ProductCard car={car} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center absolute top-0 bottom-0 w-full">
                         <button className="btn-prev  absolute left-[-25px] lg:left-[-35px] -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px] h-[35px] flex items-center justify-center sm:rounded-[30px_0px_0px_30px] cursor-pointer group hover:bg-[#2E4C99]">

                            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className="btn-next  absolute right-[-25px] lg:right-[-35px]  -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px]  h-[35px]   flex items-center justify-center sm:rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99]">

                            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]" >
                                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
