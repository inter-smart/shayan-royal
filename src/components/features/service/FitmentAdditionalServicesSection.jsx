'use client';
import { useState, useRef } from "react"; 
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

import { Heading } from '@/components/layout/Heading';

const items = [
  {
    sectionTitle: 'Why choose our Additional Fitment services?',
  },
  {
    image: '/images/fitment1.webp',
    title: '30+ Years of Industry Experience',
  },
  {
    image: '/images/fitment2.webp',
    title: 'Fully Certified Conversions',
  },

  {
    image: '/images/fitment4.webp',
    title: 'Global Logistics Support',
  },
  {
    image: '/images/fitment5.webp',
    title: 'Tailor-Made Solutions',
  },
];

export default function FitmentAdditionalServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="w-full h-auto block 3xl:py-[90px_120px] 2xl:py-[70px_90px] lg:py-[60px_80px] sm:py-[50px_60px] py-[40px_40px]">
      <div className="container">
        <Heading
          as="h2"
          className="text-center 3xl:text-[50px] 2xl:text-[40px] xl:text-[32px] lg:text-[28px] 2xs:text-[24px] text-[18px] text-[#262626] uppercase font-semibold font-base1 2xl:mb-[45px] mb-[30px] 3xl:max-w-[880px] 2xl:max-w-[650px] xl:max-w-[550px] max-w-[450px] mx-auto leading-[1.2]"
        >
          {items[0].sectionTitle}
        </Heading>
        <div className='relative'>
          <Swiper
            spaceBetween={0}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1 },
              430: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
            }}
            speed={800}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = ".navBtn-prev";
              swiper.params.navigation.nextEl = ".navBtn-next";
            }}
            navigation={{
              prevEl: ".navBtn-prev",
              nextEl: ".navBtn-next",
            }}
            className="additional_fitment_Slider"
          >
            {items.slice(1).map((item, index) => (
              <SwiperSlide key={index} className="flex !h-auto">
                <div
                  className={`w-full h-full text-center 3xl:pt-[55px] 2xl:pt-[35px] xl:pt-[25px] pt-[20px] 3xl:pr-[50px] 2xl:pr-[40px] xl:pr-[30px] pr-[15px] 3xl:pb-[80px] 2xl:pb-[50px] xl:pb-[30px] pb-[20px] 3xl:pl-[50px] 2xl:pl-[40px] xl:pl-[30px] pl-[15px] flex flex-col items-center justify-start 3xl:min-h-[340px] 2xl:min-h-[265px] xl:min-h-[220px] min-h-[180px] transition-all duration-800 ease-in-out bg-[#F5F9FF] group hover:bg-gradient-to-b hover:from-[#2E4C99] hover:to-[#0E1D44] ${index !== items.length - 2 ? 'border-r border-[#BAC6E1]' : ''
                    }`}
                >
                  <div className="3xl:w-[105px] 2xl:w-[95px] xl:w-[80px] w-[70px] 3xl:h-[105px] 2xl:h-[95px] xl:h-[80px] h-[70px] rounded-full bg-[#E7F0FD] flex items-center justify-center group-hover:bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="object-contain 3xl:w-[60px] 2xl:w-[45px] xl:w-[35px] w-[30px] 3xl:h-[60px] 2xl:h-[45px] xl:h-[35px] h-[30px]"
                    />
                  </div>
                  <div className="3xl:text-[26px] 2xl:text-[22px] xl:text-[18px]  font-medium xl:mt-[25px] mt-[15px] font-base1 leading-[1.4] text-[#262626] group-hover:text-white">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation Arrows */}
          <div className="absolute top-[45%] left-0 right-0 flex items-center justify-between  w-full z-10 
                          pointer-events-none">
            <button className="navBtn-prev pointer-events-auto bg-white rounded-full shadow 
                        w-[30px] md:w-10 md:h-10 h-[30px]
                            flex items-center justify-center group hover:bg-[#2E4C99] relative left-[-15px] sm:left-[-35px]
                             md:left-[-55px] cursor-pointer disabled:opacity-[0.5]">
              <svg
                viewBox="0 0 7 13"
                fill="none"
                className="group-hover:invert-100 w-[8px] md:w-2 md:h-5 h-[8px]"
              >
                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
              </svg>
            </button>
            <button className="navBtn-next pointer-events-auto bg-white rounded-full shadow  w-[30px] md:w-10 md:h-10 h-[30px]
                             flex items-center justify-center group hover:bg-[#2E4C99] relative right-[-15px] 
                             sm:right-[-35px] md:right-[-55px] cursor-pointer disabled:opacity-[0.5]">
              <svg
                viewBox="0 0 7 13"
                fill="none"
                className="group-hover:invert-100 w-[8px] md:w-2 md:h-5 h-[8px]"
              >
                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
