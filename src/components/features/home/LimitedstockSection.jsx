"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

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
                       Limited stock
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
                        spaceBetween= {0}
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
                            <SwiperSlide key={index}>
                                <div className="w-full h-full px-[10px] py-[25px] ">
                                    <div className="w-full h-full rounded-[10px] bg-white overflow-hidden 3xl:py-[15px] py-[10px] 3xl:px-[20px] px-[15px] flex items-end shadow-xl">
                                        {/* Left Section - Car Info */}
                                        <div className="3xl:w-[calc(100%-65px)] w-[calc(100%-45px)] h-full min-h-[200px] 3xs:min-h-[230px] 3xl:min-h-[295px] mr-[20px] 
                                    relative flex flex-col rounded-[10px]  overflow-hidden after:absolute 
                                    after:top-0 after:right-0 after:content-[''] 
                                    after:bg-[linear-gradient(90deg,_rgba(187,192,207,0.00)_0%,_#BBC0CF_100%)] after:w-full after:max-w-[150px] 
                                    after:opacity-[0.22] after:h-full">
                                            {/* Brand Logo */}
                                            <div className="w-full 3xl:max-w-[50px] max-w-[40px] absolute top-0 left-0">
                                                <Image
                                                    src={car.logo}
                                                    alt={`${car.brand} Logo`}
                                                    width={350}
                                                    height={200}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            {/* Car Image */}
                                            <div className="w-full 3xl:max-w-[340px] 2xl:max-w-[290px] 3xs:max-w-[200px] max-w-[150px] 3xl:min-h-[250px] 2xl:min-h-[170px]
                                        min-h-[140px] flex items-center justify-center m-auto relative">
                                                <Image
                                                    src={car.image}
                                                    alt={car.title}
                                                    width={350}
                                                    height={200}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            {/* Car Name */}
                                            <div className="py-2">
                                                <div className="3xl:text-[20px] 2xl:text-[18px] text-[14px] font-semibold font-base1 text-black capitalize">
                                                    {car.title}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Right Section - Specs */}
                                        <div className="3xl:w-[65px] w-[45px]">
                                            <div className="flex flex-col 3xl:max-h-[265px] max-h-[200px] h-full">
                                                {car.specs.map((spec, i) => {
                                                    const iconMap = {
                                                        GCC: "globe.svg",
                                                        Petrol: "fuel.svg",
                                                        Auto: "transmission.svg",
                                                        "2024": "year.svg",
                                                    };
                                                    return (
                                                        <div key={i} className="3xl:mb-[15px] mb-[10px] last:mb-0">
                                                            <div className="text-center w-full h-full rounded-[10px] overflow-hidden bg-[#F5F9FF] 3xl:min-h-[55px] min-h-[40px] flex items-center justify-center flex-col">
                                                                <div>
                                                                    <div className="3xl:w-[22px] w-[15px] 3xl:h-[22px] h-[15px] m-auto mb-[3px] flex">
                                                                        <Image
                                                                            src={`/images/${iconMap[spec]}`}
                                                                            alt={spec}
                                                                            width={25}
                                                                            height={25}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <div className="3xl:text-[14px] text-[10px] font-normal font-base1 text-black">
                                                                        {spec}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
