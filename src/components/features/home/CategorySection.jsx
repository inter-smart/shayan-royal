"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import parse from "html-react-parser";

const carCategories = [
  { name: "Sedan", img: "/images/cat1.png" },
  { name: "SUV", img: "/images/cat2.png" },
  { name: "Crossover", img: "/images/cat3.png" },
  { name: "Hatchback", img: "/images/cat4.png" },
];

export default function CategorySection({ title, description, categories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const router = useRouter();

  // Ensure we have enough slides for smooth looping
  const minSlides = 8;
  const slidesData =
    categories.length < minSlides
      ? Array.from({ length: minSlides }, (_, i) => ({
          ...categories[i % categories.length],
          id: `${i}-${categories[i % categories.length]?.id || i}`,
          originalIndex: i % categories.length,
        }))
      : categories.map((item, i) => ({ ...item, id: item.id || i, originalIndex: i }));

  return (
    <section className="relative py-[20px] md:py-[25px] 2xl:py-[30px] 3xl:py-[40px] bg-[#F5F9FF] overflow-hidden">
      <div className="container">
        <div className="max-w-[85%] m-auto">
          <Heading size="heading2" as="h2" className="text-[#B4BACA] text-center uppercase mb-[10px]">
            {title || "Categories"}
          </Heading>
          <Text size="text1" as="p" className="text-[#4B4B4B] mb-[15px] text-center">
            {description ? parse(description) : ""}
          </Text>
        </div>

        <div className="relative mt-[45px]">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            slidesPerView={5}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            loopFillGroupWithBlank={false}
            loopedSlides={categories.length}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1200}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            navigation={{
              prevEl: ".nav-prev",
              nextEl: ".nav-next",
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 8,
                centeredSlides: false,
              },
              420: {
                slidesPerView: 3,
                spaceBetween: 10,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
                centeredSlides: true,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
                centeredSlides: true,
              },
            }}
            className="px-10 overflow-hidden mb-3 w-full"
          >
            {slidesData.map((car, index) => {
              // Check if this slide is the active center slide
              const isActive = activeIndex === index;

              return (
                <SwiperSlide key={car.id}>
                  <div
                    className="flex flex-col items-center cursor-pointer group transition-all duration-300"
                    onClick={() => {
                      // Navigate to inventory page with category ID
                      // Use the original category ID, not the modified slide ID
                      const originalCategory = categories[car.originalIndex];
                      if (originalCategory?.id) {
                        router.push(`/inventory?car_type_id=${originalCategory.id}`);
                      }
                    }}
                  >
                    <div
                      className={`w-full max-w-[180px] xs:max-w-[110px] md:max-w-[120px] lg:max-w-[145px] 2xl:max-w-[185px] 3xl:max-w-[250px] h-[45px] xs:h-[100px] flex items-center justify-center transition-all duration-300 ${
                        isActive ? "transform scale-110" : ""
                      }`}
                    >
                      <Image
                        src={car.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${car.image}` : "/images/cat1.png"}
                        alt={car.name}
                        width={100}
                        height={100}
                        className={`w-full h-full object-contain transition-all duration-300`}
                      />
                    </div>
                    <p
                      className={`3xl:text-[25px] 2xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-base1 mt-1 md:mt-1 transition-all duration-300 ${
                        isActive ? "xs:text-[#2E4C99] xs:font-semibold transform scale-105" : "text-black font-normal opacity-70"
                      }`}
                    >
                      {car.name}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Center Arrow */}
          <div className="relative 3xl:max-w-[20px] 2xl:max-w-[15px] m-auto flex justify-center max-sm:hidden animate-jump">
            <svg className="3xl:w-[20px] 2xl:w-[15px] w-[12px] h-[12px]" viewBox="0 0 21 18" fill="none">
              <path d="M1 10.6404L11.3019 1.64038L20.5 10.6404" stroke="black" />
              <path d="M1 16.6404L11.3019 7.64038L20.5 16.6404" stroke="black" />
            </svg>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
            <button className="nav-prev pointer-events-auto absolute left-[-25px] lg:left-[-35px] z-10 sm:bg-[linear-gradient(270deg,#FFF_-4.3%,#EBEBEB_100.24%)] sm:shadow-md 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px] h-[35px] flex items-center justify-center sm:rounded-[30px_0px_0px_30px] cursor-pointer group hover:bg-[#2E4C99] transition-colors duration-300" aria-label="Previous item">
              <svg viewBox="0 0 7 13" fill="none" className=" 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]">
                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="currentColor" />
              </svg>
            </button>

            <button className="nav-next pointer-events-auto absolute right-[-25px] lg:right-[-35px] z-10 sm:bg-[linear-gradient(270deg,#FFF_-4.3%,#EBEBEB_100.24%)] sm:shadow-md 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px] h-[35px] flex items-center justify-center sm:rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99] transition-colors duration-300" aria-label="Next item">
              <svg viewBox="0 0 7 13" fill="none" className=" 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]">
                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
