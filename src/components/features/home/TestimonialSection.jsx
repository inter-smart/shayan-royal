"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import parse from "html-react-parser";

const testimonials = [
  {
    bg: "bg-[#FFF5F5]",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non autem hoc: igitur ne illud quidem. Prave, nequiter, turpiter cenabat; Quibusnam praeteritis? Intrandum est igitur in rerum naturam et penitus quid ea postulet pervidendum; Duo Reges: constructio interrete. An eum discere ea mavis, quae cum plane. printer took a galley of type and scrambled it to make a type specimen book.",
    name: "John George",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#FEF0FF]",
    content: "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam Holidays. Very peaceful.",
    name: "Rahul Krishna",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#FFFDEC]",
    content: "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam holidays. Very peaceful",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#D1DEFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#ECF4DF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#EDEFFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#ECFEFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#FFF5F5]",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non autem hoc: igitur ne illud quidem. Prave, nequiter, turpiter cenabat...",
    name: "John George",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#FEF0FF]",
    content: "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam Holidays. Very peaceful.",
    name: "Rahul Krishna",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#FFFDEC]",
    content: "Very beautiful cottages. A good place to stay when visiting Munnar. I visited there during this Onam holidays. Very peaceful",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#D1DEFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#ECF4DF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#EDEFFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
  {
    bg: "bg-[#ECFEFF]",
    content: "Comfortable and clean cottages. Great hospitality and peaceful surroundings. I will definitely recommend it to my friends and family.",
    name: "Jana Mary",
    location: "UAE",
    image: "/images/avat.png",
  },
];

const testimonialBgColors = [
  "bg-[#FFF5F5]",
  "bg-[#FEF0FF]",
  "bg-[#FFFDEC]",
  "bg-[#D1DEFF]",
  "bg-[#ECF4DF]",
  "bg-[#EDEFFF]",
  "bg-[#ECFEFF]",
  "bg-[#FFF5F5]",
  "bg-[#FEF0FF]",
  "bg-[#FFFDEC]",
  "bg-[#D1DEFF]",
  "bg-[#ECF4DF]",
  "bg-[#EDEFFF]",
  "bg-[#ECFEFF]",
];

export default function TestimonialSection({ title, description, testimonials }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
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
        <section className="relative z-0 py-[30px] xl:py-[45px] 2xl:py-[50px] 3xl:py-[75px] bg-[#F5F9FF] overflow-hidden">
            <div className="container">
                <div className="max-w-[85%] mx-auto text-center mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading size="heading2" as="h2" className="text-black uppercase mb-[10px]">
                        Testimonials
                    </Heading>
                    <Text size="text1" as="p" className="text-[#4B4B4B] mb-[15px]">
                       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                       dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                       It has survived not only five centuries, but also the leap into electronic typesetting, 
                       remaining essentially unchanged. It was popularised in  Lorem Ipsum passages, and more recently with desktop.
                    </Text>
                </div>

                <div className="relative">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={!isMobile ? { clickable: true } : false}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                678: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={800}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = ".testmonial-prev";
                swiper.params.navigation.nextEl = ".testmonial-next";
              }}
              navigation={{
                prevEl: ".testmonial-prev",
                nextEl: ".testmonial-next",
              }}
              className="xs:!pb-[35px] [--swiper-pagination-bullet-width:11px] 
                    [--swiper-pagination-bullet-height:11px] 
                    [--swiper-pagination-bullet-inactive-opacity:1] 
                   [--swiper-pagination-bullet-inactive-color:#D6E1FF] 
                   [--swiper-pagination-color:#2E4C99] 
                    [--swiper-pagination-bullet-active-width:30px"
            >
              {slides.map((slideGroup, index) => {
                if (isMobile) {
                  return (
                    <SwiperSlide key={index}>
                      {slideGroup.map((item, idx) => (
                        <div key={idx} className="p-[20px]">
                          <div
                        className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between overflow-hidden ${testimonialBgColors[idx]}`}
                      >
                            <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                              {item.message}
                            </Text>
                            <div className="flex items-center gap-4">
                              <div className="3xl:w-[65px] w-[45px] 3xl:h-[65px] h-[45px] rounded-full overflow-hidden">
                                <Image
                              src={item.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image}` : "/images/testimonial/1.png"}
                              alt={item.name}
                              width={65}
                              height={65}
                              className="w-full h-full object-cover"
                            />
                              </div>
                              <div className="xl:w-[calc(100%-65px)] w-[calc(100%-45px)] ">
                                <div className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] font-base1 text-black font-semibold capitalize mb-[5px]">
                                  {item.name}
                                </div>
                                <div className="3xl:text-[20px] 2xl:text-[17px] xl:text-[13px] lg:text-[12px] text-[12px] text-black text-sm">
                                  {item.country}
                                </div>
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
                                                    <div className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between overflow-hidden ${item.bg}`}>
                                                        <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                                                            {item.content}
                                                        </Text>
                                                        <div className="flex items-center gap-4">
                                                            <div className="3xl:w-[65px] w-[45px] 3xl:h-[65px] h-[45px] rounded-full overflow-hidden">
                                                                <Image src={item.image} alt={item.name} width={65} height={65} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="xl:w-[calc(100%-65px)] w-[calc(100%-45px)] ">
                                                                <div className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] font-base1 text-black font-semibold capitalize mb-[5px]">
                                                                    {item.name}
                                                                </div>
                                                                <div className="3xl:text-[20px] 2xl:text-[17px] xl:text-[13px] lg:text-[12px] text-[12px] text-black text-sm">
                                                                    {item.location}
                                                                </div>
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
                                                <div key={idx} className="3xl:p-[20px] 2xl:p-[15px] md:p-[10px] p-[5px]  break-inside-avoid w-full ">
                                                    <div className={`h-full p-[25px] w-full rounded-[12px] flex flex-col justify-between overflow-hidden ${item.bg}`}>
                                                        <Text size="text1" as="p" className="text-[#4B4B4B] mb-[20px] leading-[1.6]">
                                                            {item.content}
                                                        </Text>
                                                        <div className="flex items-center gap-4">
                                                            <div className="3xl:w-[65px] w-[45px] 3xl:h-[65px] h-[45px] rounded-full overflow-hidden">
                                                                <Image src={item.image} alt={item.name} width={65} height={65} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="xl:w-[calc(100%-65px)] w-[calc(100%-45px)] ">
                                                                <div className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px]  font-base1 text-black font-semibold capitalize mb-[5px]">
                                                                    {item.name}
                                                                </div>
                                                                <div className="3xl:text-[20px] 2xl:text-[17px] xl:text-[13px] lg:text-[12px] text-[12px] text-black text-sm">
                                                                    {item.location}
                                                                </div>
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
                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center absolute top-0 bottom-0 w-full">
                        <button className="nav-prev  absolute left-[-25px] lg:left-[-35px] -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px] h-[35px] flex items-center justify-center sm:rounded-[30px_0px_0px_30px] cursor-pointer group hover:bg-[#2E4C99]">

                            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]" >
                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                            </svg>
                        </button>
                        <button className=" nav-next  absolute right-[-25px] lg:right-[-35px]  -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px]  h-[35px]   flex items-center justify-center sm:rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99]">

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
