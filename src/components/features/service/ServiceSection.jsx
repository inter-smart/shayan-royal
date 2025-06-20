"use client";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const items = [
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

export default function ServiceSection() {
    return (
        <section className="w-full h-auto block py-[95px_135px] bg-[#F5F9FF]">
            <div className="container">
                <Heading
                    size={"heading2"}
                    as="h2"
                    className="text-center uppercase font-semibold leading-none font-base1 text-black 2xl:mb-[20px] lg:mb-[20px] mb-[15px]"
                >
                    Services
                </Heading>
                <div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
                        slidesPerView={2}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        className="serviceSlider"
                    >
                        {items?.map((item, index) => (
                            <SwiperSlide key={index} >
                                <div className="w-full h-full relative z-0 group">
                                    <div className="">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div>
                                        <p>{item.description}</p>
                                        <Link
                                            href={href}
                                            prefetch={active ? null : false}
                                            onMouseEnter={() => setActive(true)}
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