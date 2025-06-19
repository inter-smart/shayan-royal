"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        bg: "bg-[#FFF5F5]",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non autem hoc: igitur ne illud quidem. Prave, nequiter, turpiter cenabat...",
        name: "John George",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#FEF0FF]",
        content:
            "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam Holidays. Very peaceful.",
        name: "Rahul Krishna",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#FFFDEC]",
        content:
            "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam holidays. Very peaceful",
        name: "Jana Mary",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#D1DEFF]",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
        name: "Jana Mary",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#ECF4DF]",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings.",
        name: "Jana Mary",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#EDEFFF]",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
        name: "Jana Mary",
        location: "UAE",
        image: "/images/avat.png",
    },
    {
        bg: "bg-[#ECFEFF]",
        content:
            "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
        name: "Jana Mary",
        location: "UAE",
        image: "/images/avat.png",
    },
];

export default function TestimonialSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 575);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let slides = [];

    if (isMobile) {
        // Mobile: 1 per slide
        slides = testimonials.map((item) => [item]);
    } else {
        // Desktop/tablet: alternate 3 and 4 layout
        let i = 0;
        while (i < testimonials.length) {
            const isOdd = slides.length % 2 === 0;
            const chunkSize = isOdd ? 3 : 4;
            slides.push(testimonials.slice(i, i + chunkSize));
            i += chunkSize;
        }
    }

    return (
        <section className="relative z-0 py-[40px] 2xl:py-[60px] 3xl:py-[105px_130px] bg-[#F5F9FF]">
            <div className="container mx-auto px-4">
                <div className="max-w-[85%] mx-auto text-center mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading size="heading2" as="h2" className="text-black uppercase mb-[10px]">
                        Testimonials
                    </Heading>
                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[15px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                    </Text>
                </div>

                <Swiper
                    modules={[Pagination]}

                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                    }}
                >
                    {slides.map((slideGroup, index) => {
                        if (isMobile) {
                            return (
                                <SwiperSlide key={index}>
                                    {slideGroup.map((item, idx) => (
                                        <div key={idx} className="p-[20px]">
                                            <div className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between ${item.bg}`}>
                                                <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                                                    {item.content}
                                                </Text>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                                        <Image src={item.image} alt={item.name} width={65} height={65} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <Heading size="heading5" as="div" className="text-black font-semibold capitalize mb-[5px]">
                                                            {item.name}
                                                        </Heading>
                                                        <Text size="text4" as="div" className="text-black text-sm">
                                                            {item.location}
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </SwiperSlide>
                            );
                        }

                        const isLayoutA = index % 2 === 0;
                        return (
                            <SwiperSlide key={index} className="!h-auto">
                                {isLayoutA ? (
                                    // first slide
                                    <div className="flex flex-wrap w-full h-full">
                                        {slideGroup.map((item, idx) => (
                                            <div key={idx} className={`3xl:p-[20px] 2xl:p-[15px] md:p-[10px] p-[5px] ${idx === 0 ? "w-full" : "w-1/2"} flex-grow`}>
                                                <div className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between ${item.bg}`}>
                                                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                                                        {item.content}
                                                    </Text>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                                            <Image src={item.image} alt={item.name} width={65} height={65} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <Heading size="heading5" as="div" className="text-black font-semibold capitalize mb-[5px]">
                                                                {item.name}
                                                            </Heading>
                                                            <Text size="text4" as="div" className="text-black text-sm">
                                                                {item.location}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    //    second Slide 
                                    <div className="columns-2 max-lg:gap-2 w-full h-full">
                                        {slideGroup.map((item, idx) => (
                                            <div key={idx} className="3xl:p-[20px] 2xl:p-[15px] md:p-[10px] p-[5px]  break-inside-avoid w-full">
                                                <div className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between ${item.bg}`}>
                                                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                                                        {item.content}
                                                    </Text>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                                            <Image src={item.image} alt={item.name} width={65} height={65} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <Heading size="heading5" as="div" className="text-black font-semibold capitalize mb-[5px]">
                                                                {item.name}
                                                            </Heading>
                                                            <Text size="text4" as="div" className="text-black text-sm">
                                                                {item.location}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
