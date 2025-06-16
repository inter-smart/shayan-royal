"use client";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const item = {
    title: "Core Values",
    description: "Our core values are the guiding principles that shape our culture and decision-making.",
}

const coreValues = [
    {
        title: "Integrity",
        image: "/images/values_1.svg"
    },
    {
        title: "Innovation",
        image: "/images/values_2.svg"
    },
    {
        title: "Customer Focus",
        image: "/images/values_3.svg"
    }
];

export default function CorevalueSection() {
    return (
        <section className="w-full h-auto 3xl:py-[140px] xl:py-[90px] block">
            <div className="container">
                <div className="flex flex-wrap items-center">
                    <div className="3xl:w-[370px] 2xl:w-[280px] xl:w-[250px] lg:w-[180px] h-auto">
                        <Heading
                            size={"heading4"}
                            as="h2"
                            className=" text-black uppercase font-semibold leading-none 2xl:mb-[20px] mb-[20px]"
                        >
                            {item.title}
                        </Heading>
                        <Text
                            size="text1"
                            as="p"
                            className="text-[20px] leading-[1.5] font-normal text-black"
                        >
                            {item.description}
                        </Text>
                    </div>
                    <div className="3xl:w-[calc(100%-370px)] 2xl:w-[calc(100%-280px)] xl:w-[calc(100%-250px)] lg:w-[calc(100%-180px)] 2xl:pl-[100px] xl:pl-[70px]">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={8}
                            slidesPerView={1.3}
                            breakpoints={{
                                576: {
                                    slidesPerView: 3,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1536: {
                                    slidesPerView: 3,
                                    spaceBetween: 60,
                                },
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            className="corevalueSlider"
                        >
                            {coreValues?.map((item, index) => (
                                <SwiperSlide key={"coreValues" + index}>
                                    <div className="w-full h-full p-[40px_20px] bg-[#F5F9FF] rounded-[10px] overflow-hidden block relative z-0 group">
                                        <div className="absolute -z-1 inset-0 pointer-events-none bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                                        <div className="2xl:w-[80px] xl:w-[55px] h-auto aspect-80/80 2xl:m-[0_auto_25px_auto] xl:m-[0_auto_15px_auto] flex items-center justify-center">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={80}
                                                height={80}
                                                style={{ objectFit: "contain" }}
                                                className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="3xl:text-[30px] 2xl:text-[24px] xl:text-[20px] md:text-[14px] text-[12px] font-normal leading-normal text-black transition-all duration-300 ease-in-out group-hover:text-white">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}