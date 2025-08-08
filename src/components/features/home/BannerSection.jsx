"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const slides = [
  { img: "/images/banner1.png", title: "Lexus LFA" },
  { img: "/images/banner2.png", title: "vellfire" },
  { img: "/images/banner3.png", title: "LAND CRUISER" },
];

export default function BannerSection({ homeBanners }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1200);
      setIsMediumScreen(width < 1441);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setDirection(newIndex > currentIndex ? "next" : "prev");
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    setDirection("prev");
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    setDirection("next");
    swiperRef.current?.slideNext();
  };

  const imageVariants = {
    enter: (dir) => ({
      x:
        dir === "next"
          ? isMobile
            ? [100, -100, 0]
            : isMediumScreen
            ? [-200, 200, 0]
            : [-450, 450, 0]
          : isMobile
          ? [80, -100, 0]
          : isMediumScreen
          ? [200, -200, 0]
          : [450, -450, 0],
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: [0, 1],
      transition: { duration: 3 },
    },
    exit: (dir) => ({
      x:
        dir === "next"
          ? isMobile
            ? [100, -100, 0]
            : isMediumScreen
            ? [200, -200, 0]
            : [450, -450, 0]
          : isMobile
          ? [-80, 100, 0]
          : isMediumScreen
          ? [-200, 200, 0]
          : [-450, 450, 0],
      opacity: [0],
      transition: { duration: 3.5 },
    }),
  };

  const textVariants = {
    enter: (dir) => ({
      y: dir === "next" ? [1000, 1000] : [-1000, 1000],
      opacity: [0, 1],
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
    exit: (dir) => ({
      y: dir === "next" ? [-1000, -1000] : [1000, -1000],
      opacity: [1, 0],
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section className="h-full xl:py-[40px] py-[60px] overflow-hidden ">
      <div className="container">
        {/* <div className="2xl:h-[calc(100vh-400px)] lg:h-[calc(100vh-350px)] h-[250px] mb-[50px] relative min-h-[250px] 2xl:min-h-[350px] 3xl:min-h-[450px]"> */}
        <div className="h-full mb-[50px] relative min-h-[250px] 2xl:min-h-[350px] 3xl:min-h-[450px]">
          <Swiper
            modules={[Thumbs, EffectFade, Autoplay]}
            speed={900}
            loop={false}
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              992: {
                speed: 1500,
              },
            }}
            onSlideChange={handleSlideChange}
            className="w-full  mb-5 !overflow-visible h-[250px] lg:h-[350px] xl:h-[400px] 2xl:h-[550px] 3xl:h-[600px]"
          >
            {homeBanners?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-end w-full h-full">
                  <div className="w-full h-full relative flex justify-center items-center sm:overflow-hidden max-h-[145px] xs:max-h-[185px] md:max-h-[220px] lg:max-h-[280px] xl:max-h-[320px] 2xl:max-h-[360px] 3xl:max-h-[430px]">
                    <AnimatePresence custom={direction}>
                      {currentIndex === index && (
                        <motion.div
                          key={slide.img}
                          custom={direction}
                          variants={imageVariants}
                          initial={currentIndex === index && hasLoaded ? "enter" : false}
                          animate={currentIndex === index && hasLoaded ? "center" : false}
                          exit={currentIndex === index && hasLoaded ? "exit" : false}
                          className={`absolute bottom-0 w-full 3xl:max-w-[1000px] 2xl:max-w-[780px] 
                          lg:max-w-[650px] md:max-w-[500px] xs:max-w-[420px] max-w-[320px] m-auto flex flex-col justify-end z-1 
                          ${currentIndex !== index ? "opacity-0 pointer-events-none" : ""} bg-transparent`}
                        >
                          <Image
                            src={slide.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${slide?.image}` : "/images/banner1.png"}
                            alt={slide.title}
                            width={1000}
                            height={500}
                            className="w-full h-auto object-contain"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence custom={direction} mode="wait">
                      {currentIndex === index && (
                        <div className="3xl:h-[200px] 2xl:h-[180px] lg:h-[150px] h-[60px] overflow-hidden absolute left-0 right-0 top-[5px] m-auto ">
                          <motion.h2
                            key={slide.title}
                            custom={direction}
                            variants={textVariants}
                            initial={currentIndex === 0 && !hasLoaded ? false : "enter"}
                            animate={currentIndex === 0 && !hasLoaded ? false : "center"}
                            exit={currentIndex === 0 && !hasLoaded ? false : "exit"}
                            className="3xl:text-[150px] 2xl:text-[110px] xl:text-[80px] lg:text-[60px] 
                            sm:text-[40px] 2xs:text-[30px] text-[25px] font-normal uppercase  
                            font-base2  text-center bg-clip-text text-transparent line-clamp-1
                            [background-image:linear-gradient(0deg,rgba(180,186,202,0.20)_20.28%,#B4BACA_80.51%)]"
                          >
                            {slide.title}
                          </motion.h2>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center absolute top-0 bottom-0 w-full ">
            <button
              className="custom-prev  absolute left-0 z-10 sm:-translate-y-1/2 cursor-pointer
                disabled:pointer-events-none disabled:opacity-[0.2]   w-[30px] h-[30px] 
                flex items-center justify-center 
                 "
              onClick={handlePrev}
            >
              <svg className="xl:w-[18px] xl:h-[18px] w-[10px] h-[10px] flex" viewBox="0 0 10 18" fill="none">
                <path
                  d="M9 17L1.41948 9.94278C0.860173 9.42208 0.860172 8.57786 1.41948 8.05716L9 0.999969"
                  stroke="#0D0D0D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="custom-next  absolute top-1/2  right-0 z-10 -translate-y-1/2 cursor-pointer 
                disabled:pointer-events-none disabled:opacity-[0.2]  w-[30px] h-[30px]
                flex items-center justify-center  
                 "
              onClick={handleNext}
            >
              <svg className="xl:w-[18px] xl:h-[18px] w-[10px] h-[10px] flex" viewBox="0 0 10 18" fill="none">
                <path
                  d="M1 17L8.58052 9.94278C9.13983 9.42208 9.13983 8.57786 8.58052 8.05716L1 0.999969"
                  stroke="#0D0D0D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="2xl:min-h-[165px] min-h-[140px]">
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center">
                <div className="border-t-2 border-b-2 border-gray-900 h-[2px] w-[50px] mx-auto"></div>
              </div>
            }
          >
            <AdvancesearchSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
