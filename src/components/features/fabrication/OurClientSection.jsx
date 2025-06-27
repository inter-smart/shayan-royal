"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
    {
        name: "John George",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non autem hoc: igitur ne illud quidem. Prave, nequiter, turpiter cenabat...",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        name: "Rahul Krishna",
        content:
            "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam Holidays. Very peaceful.",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        name: "Jana Mary",
        content:
            "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam holidays. Very peaceful",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        name: "Jana Mary",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        name: "Jana Mary",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings.",
        location: "UAE",
        image: "/images/avat.png",
    },
];

export default function ClientSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative 3xl:py-[120px_65px] 2xl:py-[80px_40px] xl:py-[40px] py-[30px]">
            <div className="container">
                <div className="3xl:mb-[60px] 2xl:mb-[50px] xl:mb-[30px] mb-[20px] text-center">
                    <Heading
                        size="heading2"
                        as="h2"
                        className="text-black uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] mb-[15px]"
                    >
                        Our client Loves Us
                    </Heading>
                </div>
                <div className="relative">
                    <Swiper
                        spaceBetween={15}
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
                                slidesPerView: 1.3,
                            },
                            420: {
                                slidesPerView: 2,
                            },
                            5780: {
                                slidesPerView: 2,
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
                        className="!pb-[20px]"
                    >
                        {testimonials.map((item, idx) => (
                            <SwiperSlide key={idx} className="!h-auto">

                                <div className="h-full w-full flex flex-col justify-between overflow-hidden bg-white">
                                    <div className="bg-[#F5F9FF] p-[30px] rounded-[10px] mb-[30px] relative after:absolute after:bottom-[-30px] after:left-[40px] after:w-[65px] after:h-[55px] after:border-l-[65px] after:border-b-[55px] after:border-b-transparent after:border-l-[#F5F9FF]">
                                        <Text
                                            size="text1"
                                            as="p"
                                            className="text-[#4B4B4B] mb-[20px] leading-[1.6]"
                                        >
                                            {item.content}
                                        </Text>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="3xl:w-[65px] w-[45px] 3xl:h-[65px] h-[45px] rounded-full overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={65}
                                                height={65}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="xl:w-[calc(100%-65px)] w-[calc(100%-45px)]">
                                            <div className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] font-base1 text-black font-semibold capitalize mb-[5px]">
                                                {item.name}
                                            </div>
                                            <div className="3xl:text-[20px] 2xl:text-[17px] xl:text-[13px] lg:text-[12px] text-[12px] text-black text-sm">
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center lg:absolute lg:top-0 lg:bottom-0 lg:w-full">
                        <button className="btn-prev relative lg:absolute left-0 lg:left-[-45px] lg:top-1/2 lg:-translate-y-1/2 z-10
                            bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                            shadow w-[34px] h-[38px] flex items-center justify-center rounded-[30px_0px_0px_30px] cursor-pointer group
                            hover:bg-[#2E4C99] disabled:pointer-events-none disabled:opacity-[0.2]">
                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className="btn-next relative lg:absolute right-0 lg:right-[-45px] lg:top-1/2 lg:-translate-y-1/2 z-10 
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
