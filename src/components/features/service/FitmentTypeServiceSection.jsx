"use client";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const items = [
    {
        image: "/images/fitment_type_1.webp",
        title: "AMBULANCE"
    },
    {
        image: "/images/fitment_type_2.webp",
        title: "OFF-ROADING VEHICLES"
    },
    {
        image: "/images/fitment_type_3.webp",
        title: "TRUCK FABRICATION"
    }
]

export default function FitmentTypeServiceSection() {
    return (
        <section className="w-full h-auto block py-[90px] bg-[#F5F9FF]">
            <div className="container">
                <div className="w-full h-full flex items-center">
                    <Heading
                        as="h2"
                        className="3xl:text-[40px] 2xl:text-[30px] lg:text-[26px] sm:text-[20px] text-[18px] leading-none font-semibold font-base1 text-[#262626] max-sm:mb-[10px]"
                    >
                        SERVICES
                    </Heading>
                </div>
                <div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        className="fitmentTypeSlider"
                    >
                        {items?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full h-[750px] gap-[35px]">
                                    <div className="w-[50%] h-full block">
                                        <div className="w-full h-full rounded-[10px] overflow-hidden block relative z-0">
                                            <div className="w-full h-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                />
                                            </div>
                                            <div>
                                                <h2>{item.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[50%] h-full block">
                                        <div className="w-full h-[50%] rounded-[10px] overflow-hidden block relative z-0">
                                            <div className="w-full h-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                />
                                            </div>
                                            <div>
                                                <h2>{item.title}</h2>
                                            </div>
                                        </div>
                                        <div className="w-full h-[50%] rounded-[10px] overflow-hidden block relative z-0">
                                            <div className="w-full h-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                />
                                            </div>
                                            <div>
                                                <h2>{item.title}</h2>
                                            </div>
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