"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const items = [
    {
        title: "Logistic Services",
        image: "/images/service_1.webp",
        description:
            "We provide extensive support for various logistics service and organize timely delivery of the consignment to the desired location with assurance at affordable price.",
        href: "/service-detail",
    },
    {
        title: "Additional Fitments",
        image: "/images/service_2.webp",
        description:
            "We provide extensive support for various logistics service and organize timely delivery of the consignment to the desired location with assurance at affordable price.",
        href: "/service-fitment",
    },
    {
        title: "Procurement",
        image: "/images/service_3.webp",
        description:
            "We provide extensive support for various logistics service and organize timely delivery of the consignment to the desired location with assurance at affordable price.",
        href: "/service",
    }
];

export default function ServiceSection() {
    const [hovered, setHovered] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full h-auto block 3xl:py-[95px_135px] 2xl:py-[70px_100px] sm:py-[50px_60px] py-[40px_30px] 3xl:mb-[120px] 2xl:mb-[90px] lg:mb-[80px] sm:mb-[60px] mb-[40px] bg-[#F5F9FF]">
            <div className="container overflow-hidden">
                <Heading
                    as="h2"
                    className="3xl:text-[50px] 2xl:text-[38px] lg:text-[32px] md:text-[26px] sm:text-[22px] text-[18px] text-center uppercase font-semibold leading-none font-base1 text-black 3xl:mb-[40px] lg:mb-[30px] mb-[20px]"
                >
                    Services
                </Heading>
                <div className="overflow-hidden 2xl:p-[40px_15px] xl:p-[40px_10px] sm:p-[30px_7px] p-[20px_7px]">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Use realIndex for looped Swiper
                        className="serviceSlider !overflow-visible"
                    >
                        {items?.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    zIndex: hovered === index || activeIndex === index ? 30 : 1,
                                }}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div
                                    className={`group w-full h-auto aspect-545/760 3xl:p-[0_45px_50px_45px] 2xl:p-[0_35px_40px_35px] lg:p-[0_30px_35px_30px] sm:p-[0_20px_20px_20px] p-[0_10px_20px_20px] overflow-hidden flex flex-col justify-end relative z-0 before:content-[''] before:absolute before:-z-1 before:bottom-0 before:left-0 before:w-full before:h-[60%] before:bg-gradient-to-b before:from-[rgb(0,0,0,0)] before:to-[rgb(0,0,0,1)] before:pointer-events-none before:transition-all before:duration-500 before:ease-in-out ${hovered === index || activeIndex === index
                                            ? "z-50 scale-105 rounded-[10px] before:from-[rgba(14,29,68,0)] before:to-[rgba(14,29,68,1)]"
                                            : ""
                                        } transition-all duration-500 ease-in-out will-change-transform`}
                                >
                                    <div className="w-full h-full overflow-hidden block absolute -z-2 inset-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className={`${hovered === index || activeIndex === index
                                                    ? "scale-105"
                                                    : ""
                                                } transition-all duration-500 ease-in-out`}
                                        />
                                    </div>
                                    <div
                                        className={`3xl:text-[32px] 2xl:text-[24px] lg:text-[20px] sm:text-[18px] text-[16px] leading-[1] font-semibold font-base1 text-white mb-[15px] ${hovered === index || activeIndex === index
                                                ? "opacity-0"
                                                : ""
                                            } transition-all duration-500 ease-in-out`}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        className={`absolute z-1 bottom-0 left-0 w-full h-auto 3xl:p-[0_45px_50px_45px] 2xl:p-[0_35px_40px_35px] lg:p-[0_30px_35px_30px] sm:p-[0_20px_20px_20px] p-[0_10px_20px_20px] ${hovered === index || activeIndex === index
                                                ? "translate-y-0"
                                                : "translate-y-[100%]"
                                            } transition-all duration-500 ease-in-out`}
                                    >
                                        <div className="3xl:text-[32px] 2xl:text-[24px] lg:text-[20px] sm:text-[18px] text-[16px] leading-[1] font-semibold font-base1 text-white 2xl:mb-[15px] mb-[10px]">
                                            {item.title}
                                        </div>
                                        <p className="3xl:text-[20px] 2xl:text-[16px] lg:text-[14px] sm:text-[13px] text-[12px] leading-[1.2] font-normal font-base1 text-white 3xl:mb-[30px] lg:mb-[20px] sm:mb-[15px] mb-[10px]">
                                            {item.description}
                                        </p>
                                        <Link
                                            href={item.href}
                                            prefetch={true}
                                            aria-label="Learn More"
                                            className="3xl:text-[16px] 2xl:text-[13px] text-[11px] leading-1 font-medium font-base1 text-[#2E4C99] w-fit h-[40px] 3xl:p-[10px_25px] p-[7px_15px] rounded-[50px] bg-white hover:bg-base1 hover:text-white transition-colors duration-200 ease-in-out"
                                        >
                                            LEARN MORE
                                        </Link>
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