"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

const socialMedia = [
    {
        title: "instagram",
        video: "/videos/social1.mp4",
        icon: "/images/insta.png",
    },
    {
        title: "ticktop",
        video: "/videos/social2.mp4",
        icon: "/images/tik-tok.png",
    },
    {
        title: "facebook",
        video: "/videos/social3.mp4",
        icon: "/images/facebook.png",
    },
    {
        title: "youtube",
        video: "/videos/social4.mp4",
        icon: "/images/utube.png",
    },

];

export default function SocialSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="relative z-0 bg-[#F5F9FF] py-[40px] xl:py-[70px_95px] 2xl:py-[40px] 3xl:py-[50px] after:absolute after:content-[''] overflow-hidden
        after:top-0 after:left-0 after:right-0 after:m-auto after:h-full after:3xl:w-[365px] after:2xl:w-[275px] after:w-[220px] after:skew-x-[15deg]
        after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-10">
            <div className="container">
                <div className="max-w-[85%] m-auto text-center mb-[25px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading size="heading2" as="h2" className="text-black uppercase mb-[10px]">
                        SOCIAL MEDIA POSTS
                    </Heading>
                    <Text size="text1" as="p" className="text-black mb-[15px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in  Lorem Ipsum passages, and more recently with desktop.
                    </Text>
                </div>
                <div className="relative">
                    <Swiper
                        spaceBetween={10}
                        modules={[Navigation, Autoplay]}
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
                                slidesPerView: 1.5,
                            },
                            420: {
                                slidesPerView: 2,
                            },
                            578: {
                                slidesPerView: 2.5,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1661: {
                                spaceBetween: 30,
                                slidesPerView: 4,
                            },
                        }}
                        className=""
                    >
                        {socialMedia.map((item, keyindex) => (
                            <SwiperSlide key={keyindex} >
                                <a
                                    href="#"
                                    className="w-full h-full block overflow-hidden rounded-[10px] relative aspect-square 2xl:min-h-[350px] xl:min-h-[275px] sm:min-h-[250px] min-h-[220px]" >
                                    <video
                                        autoPlay
                                        muted
                                        playsInline
                                        preload="metadata"
                                        loop
                                        width={390}
                                        height={390}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={item.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute bottom-[10px] right-[10px] w-[24px] h-[24px]">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={24}
                                            height={24}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}



                    </Swiper>

                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center absolute top-0 bottom-0 w-full">
                        <button className="btn-prev absolute left-[-30px] lg:left-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10
                        lg:bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                        lg:shadow w-[34px] h-[38px] flex items-center justify-center rounded-[30px_0px_0px_30px] cursor-pointer group
                         hover:bg-[#2E4C99] disabled:pointer-events-none disabled:opacity-[0.2]">

                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 flex" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className="btn-next absolute right-[-30px] lg:right-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10 
                        lg:bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                        lg:shadow w-[34px] h-[38px] flex items-center justify-center
                         rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99] 
                        disabled:pointer-events-none disabled:opacity-[0.2] ">

                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 flex" >
                                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
