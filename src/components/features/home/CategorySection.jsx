"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

const carCategories = [
    { name: "Sedan", img: "/images/cat1.png" },
    { name: "SUV", img: "/images/cat2.png" },
    { name: "Crossover", img: "/images/cat3.png" },
    { name: "Hatchback", img: "/images/cat4.png" },
    { name: "Pickup", img: "/images/cat5.png" },
    { name: "Pickup", img: "/images/cat5.png" },
];


export default function AboutSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="relative py-[30px] md:py-[40px ] 2xl:py-[50px] 3xl:py-[60px_45px] bg-[#F5F9FF]">
            <div className="container">
                <div className="max-w-[85%] m-auto">
                    <Heading size="heading2" as="h2" className="text-[#B4BACA] text-center uppercase mb-[10px]" >
                        Browse by category
                    </Heading>
                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[15px] text-center"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in  Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.
                    </Text>
                </div>

                <div className="relative mt-[45px]">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={5}
                        spaceBetween={30}
                        centeredSlides
                        autoplay={{
                            delay: 3000, // 3 seconds between slides
                            disableOnInteraction: false,
                        }}
                        speed={800} // transition duration (ms) for smoothness
                        loop
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        onBeforeInit={(swiper) => setActiveIndex(swiper.realIndex)}
                        navigation={{
                            prevEl: ".nav-prev",
                            nextEl: ".nav-next",
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            420: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 25,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                        className="px-10 overflow-hidden mb-3"
                    >
                        {carCategories.map((car, index) => (
                            <SwiperSlide key={index} >
                                <div
                                    className="flex flex-col items-center cursor-pointer group transition-all duration-300"
                                    onClick={() => setSelected(car.name)}
                                >
                                    <div className="w-full max-w-[180px] xs:max-w-[110px] md:max-w-[120px] lg:max-w-[145px] 2xl:max-w-[185px] 3xl:max-w-[250px] 
                                    h-[100px] flex items-center justify-center">
                                        <Image
                                            src={car.img}
                                            alt={car.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className={`3xl:text-[25px] 2xl:text-[22px] text-[18px] font-base1 mt-1 md:mt-2 ${index === activeIndex ? "text-[#2E4C99] font-semibold" : "text-black font-normal"}`}
                                    > {car.name}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* center Arrow */}
                    <div className="realtive 3xl:max-w-[20px] 2xl:max-w-[15px] m-auto mb-[25px] flex justify-center">
                        <svg className="3xl:-w-[20px] 2xl:w-[15px] w-[12px] h-[12px]" viewBox="0 0 21 18" fill="none">
                            <path d="M1 10.6404L11.3019 1.64038L20.5 10.6404" stroke="black" />
                            <path d="M1 16.6404L11.3019 7.64038L20.5 16.6404" stroke="black" />
                        </svg>
                    </div>
                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center max-md:top-[20px] md:absolute md:top-0 md:bottom-0 md:w-full  ">
                        <button className="nav-prev relative md:absolute left-0 lg:left-[-35px] sm:top-1/2 sm:-translate-y-1/2 z-10 bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                        shadow 3xl:w-[34px] 2xl:w-[25px] w-[20px] 3xl:h-[38px] 2xl:h-[30px] h-[25px]  flex items-center justify-center rounded-[30px_0px_0px_30px] cursor-pointer group hover:bg-[#2E4C99]">

                            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className=" nav-next relative md:absolute right-0 lg:right-[-35px] sm:top-1/2 sm:-translate-y-1/2 z-10 bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]
                        shadow 3xl:w-[34px] 2xl:w-[25px] w-[20px] 3xl:h-[38px] 2xl:h-[30px] h-[25px]  flex items-center justify-center rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99]">

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
