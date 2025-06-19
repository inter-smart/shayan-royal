"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import clsx from "clsx";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const slides = [
  { img: "/images/banner1.png", title: "Lexus LFA" },
  { img: "/images/banner2.png", title: "Supra MK4" },
  { img: "/images/banner3.png", title: "Nissan GTR" },
];

export default function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("next");
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(swiper.realIndex);
  };

  const handlePrev = () => {
    setDirection("prev");
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    setDirection("next");
    swiperRef.current?.slideNext();
  };

  return (
    <section className="lg:min-h-[100vh] h-full py-[40px]">
      <div className="container">
        <div className="lg:h-[calc(100vh-300px)] h-[350px] mb-[50px] relative">
          <Swiper
            modules={[Navigation]}
            loop
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            className="w-full h-full mb-5"
          >
            {slides.map((slide, index) => {
              const isCurrent = index === currentIndex;
              const isPrevious = index === prevIndex;

              const animationClass = isCurrent
                ? direction === "next"
                  ? "animate-car-in-right"
                  : "animate-car-in-left"
                : isPrevious
                  ? direction === "next"
                    ? "animate-car-out-left"
                    : "animate-car-out-right"
                  : "";

              return (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center h-full"
                >
                  <div className="w-full h-full relative">
                    <div className="relative w-full 3xl:max-w-[1000px] 2xl:max-w-[780px] lg:max-w-[650px] max-w-[500px] m-auto h-full flex flex-col justify-end">
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        width={1000}
                        height={500}
                        className={clsx(
                          "w-full h-auto object-contain",
                          animationClass
                        )}
                        priority={index === 0}
                      />
                    </div>
                    <h2 className="3xl:text-[150px] 2xl:text-[110px] xl:text-[80px] lg:text-[60px] sm:text-[50px] 2xs:text-[40px] text-[30px] font-normal uppercase text-center font-base2 absolute top-1/3 left-0 right-0 m-auto bg-clip-text text-transparent [background-image:linear-gradient(0deg,rgba(180,186,202,0.20)_20.28%,#B4BACA_80.51%)]">
                      {slide.title}
                    </h2>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation buttons */}
          <button
            className="custom-prev absolute top-1/2 left-4 z-10  text-white text-4xl px-3 py-1 cursor-pointer"
            onClick={handlePrev}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" >
              <path d="M9 17L1.41948 9.94278C0.860173 9.42208 0.860172 8.57786 1.41948 8.05716L9 0.999969" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

          </button>
          <button
            className="custom-next absolute top-1/2 right-4 z-10   text-white text-4xl px-3 py-1 cursor-pointer"
            onClick={handleNext}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" >
              <path d="M1 17L8.58052 9.94278C9.13983 9.42208 9.13983 8.57786 8.58052 8.05716L1 0.999969" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

          </button>
        </div>
        <div className="lg:min-h-[165px]">
          <AdvancesearchSection />
        </div>
      </div>

    </section>
  );
}
