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
    <section className="h-dvh py-[40px]">
      <div className="container h-full relative ">
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
          className="w-full h-[calc(100%-185px)] mb-5"
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
                <div className="relative w-full max-w-[1000px] m-auto h-full flex flex-col justify-end">
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
                  <h2 className="text-[150px] font-regular uppercase text-center absolute top-1/2 left-0 right-0 m-auto">
                    {slide.title}
                  </h2>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation buttons */}
        <button
          className="custom-prev absolute top-1/2 left-4 z-10 bg-black text-white text-4xl px-3 py-1"
          onClick={handlePrev}
        >
          &#8592;
        </button>
        <button
          className="custom-next absolute top-1/2 right-4 z-10 bg-black text-white text-4xl px-3 py-1"
          onClick={handleNext}
        >
          &#8594;
        </button>
        <AdvancesearchSection />
      </div>

    </section>
  );
}
