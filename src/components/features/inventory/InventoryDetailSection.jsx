
"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const carImages = [
    "/images/carDetails1.png",
    "/images/carDetails2.png",
    "/images/carDetails3.png",
    "/images/carDetails4.png",
    "/images/carDetails4.png",
    "/images/carDetails4.png",
];
const specIcons = [
    { label: "GCC", icon: "/images/globe.svg" },
    { label: "Auto", icon: "/images/transmission.svg" },
    { label: "2024", icon: "/images/year.svg" },
    { label: "4", icon: "/images/door.png" },
    { label: "5", icon: "/images/seat.png" },
    { label: "Petrol", icon: "/images/fuel.svg" },
];
export default function InventoryDetailSection() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <section className="w-full h-auto block 3xl:py-[90px_130px] lg:py-[60px_90px] sm:py-[50px_70px] py-[40px_50px]">
            <div className="container">
                <div className="flex flex-wrap w-full -m-[25px]">
                    <div className="w-[calc(100%-400px)] p-[25px]">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Main Slider Section */}
                            <div className="w-full lg:w-[calc(100%-110px)] pr-[50px] overflow-hidden">
                                <Swiper
                                    modules={[Thumbs, EffectFade]}
                                    spaceBetween={10}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    speed={800}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    className="border border-[rgba(46,76,153,0.3)] rounded-[10px] mb-[30px]"
                                >
                                    {carImages.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative w-full h-[300px] md:h-[590px] bg-white">
                                                <Image
                                                    src={img}
                                                    alt={`car-${index}`}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    className="max-w-[900px] w-full h-full object-contain m-auto"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Thumbnail Swiper */}
                                <div className="relative">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        watchSlidesProgress
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        onBeforeInit={(swiper) => {
                                            if (typeof swiper.params.navigation !== "boolean") {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }
                                        }}
                                        className="!overflow-visible relative"
                                    >
                                        {carImages.map((img, index) => (
                                            <SwiperSlide key={`thumb-${index}`} className="group">
                                                <div className="relative w-full h-[150px] cursor-pointer bg-[#F5F9FF] rounded-[10px] overflow-hidden shadow transition-opacity duration-300 opacity-50 group-[.swiper-slide-thumb-active]:opacity-100">
                                                    <Image
                                                        src={img}
                                                        alt={`thumb-${index}`}
                                                        layout="fill"
                                                        objectFit="contain"
                                                        className="max-w-[180px] m-auto"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* Custom Navigation Buttons */}
                                    <button
                                        ref={prevRef}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-10 bg-[rgba(46,76,153,0.8)] shadow flex items-center justify-center text-xl text-white hover:bg-[#2E4C99] hover:cursor-pointer transition disabled:pointer-events-none disabled:opacity-[0.2]"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        ref={nextRef}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-10 bg-[rgba(46,76,153,0.8)] shadow flex items-center justify-center text-xl text-white hover:bg-[#2E4C99] hover:cursor-pointer transition disabled:pointer-events-none disabled:opacity-[0.2]"
                                    >
                                        ›
                                    </button>

                                </div>
                            </div>

                            {/* Vertical Side Icon Slider */}

                            <div className="w-full lg:w-[110px] flex justify-center">
                                <div className="md:h-[590px] w-full py-[40px]">
                                    <Swiper
                                        direction="vertical"
                                        slidesPerView={5}
                                        spaceBetween={10}
                                        className="h-full"
                                    >
                                        {specIcons.map((feature, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="text-center w-full h-full rounded-[10px] overflow-hidden bg-[#F5F9FF] flex items-center justify-center flex-col">

                                                    <div className="w-full">
                                                        <div className="3xl:w-[40px] w-[40px] m-auto mb-[3px] flex">
                                                            <Image
                                                                src={feature.icon}
                                                                alt={feature.label}
                                                                width={25}
                                                                height={25}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="3xl:text-[24px] text-[10px] font-normal font-base1 text-black">
                                                            {feature.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 