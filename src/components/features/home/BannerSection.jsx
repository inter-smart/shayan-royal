"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const slides = [
  { img: "/images/banner1.png", title: "Lexus LFA" },
  { img: "/images/banner2.png", title: "Supra MK4" },
  { img: "/images/banner3.png", title: "Nissan GTR" },
];

export default function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200); // adjust breakpoint if needed
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  /// Image animation variants
  const imageVariants = {
    enter: (dir) => ({
      x: dir === "next"
        ? isMobile ? [100, -100, 0] : [-750, 350, 0]
        : isMobile ? [80, -100, 0] : [750, -350, 0],
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
    exit: (dir) => ({
      x: dir === "next"
        ? isMobile ? [100, -100, 0] : [250, -150, 0]
        : isMobile ? [-80, 100, 0] : [-250, 150, 0],
      opacity: 0,
      transition: { duration: 3.5 },
    }),
  };

  // Text animation variants
  const textVariants = {
    enter: (dir) => ({
      y: dir === "next" ? [1000, 1000] : [-1000, 1000],
      opacity: [0, 1],
      transition: {
        duration: 2.5,
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
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };


  return (
    <section className="h-full  xl:py-[40px] py-[60px] overflow-hidden ">
      <div className="container">
        <div className="lg:h-[calc(100vh-300px)] h-[250px] mb-[50px] relative">
          <Swiper
            modules={[Thumbs, EffectFade]}
            speed={900}
            loop={false}
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              992: {
                speed: 1500,

              },
            }}
            onSlideChange={handleSlideChange}
            className="w-full h-full mb-5 !overflow-visible"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full relative flex justify-center items-center sm:overflow-hidden">
                  <AnimatePresence custom={direction}>
                    {currentIndex === index && (
                      <motion.div
                        key={slide.img}
                        custom={direction}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute bottom-0 w-full 3xl:max-w-[1000px] 2xl:max-w-[780px] 
                        lg:max-w-[650px] max-w-[500px] m-auto flex flex-col justify-end z-1"
                      >
                        <Image
                          src={slide.img}
                          alt={slide.title}
                          width={1000}
                          height={500}
                          className="w-full h-auto object-contain"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence custom={direction} mode="wait">
                    {currentIndex === index && (
                      <div className="lg:h-[200px] h-[60px] overflow-hidden absolute left-0 right-0 lg:top-[150px] sm:top-[50px] top-[90px] m-auto ">
                        <motion.h2
                          key={slide.title}
                          custom={direction}
                          variants={textVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="3xl:text-[150px] 2xl:text-[110px] xl:text-[80px] lg:text-[60px] 
                        sm:text-[40px] 2xs:text-[30px] text-[25px] font-normal uppercase  
                        font-base2  text-center bg-clip-text text-transparent 
                        [background-image:linear-gradient(0deg,rgba(180,186,202,0.20)_20.28%,#B4BACA_80.51%)]"
                        >
                          {slide.title}
                        </motion.h2>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center sm:absolute sm:top-0 sm:bottom-0 sm:w-full max-sm:pt-1">
            <button
              className="custom-prev xs:absolute top-1/2 xs:left-4 z-10 -translate-y-1/2 cursor-pointer
              disabled:pointer-events-none disabled:opacity-[0.2] max-sm:shadow w-[30px] h-[30px] 
              flex items-center justify-center max-sm:rounded-[30px_0px_0px_30px] 
              max-sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] "
              onClick={handlePrev}
            >
              <svg className="xl:w-[18px] xl:h-[18px] w-[10px] h-[10px] flex" viewBox="0 0 10 18" fill="none">
                <path d="M9 17L1.41948 9.94278C0.860173 9.42208 0.860172 8.57786 1.41948 8.05716L9 0.999969" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="custom-next xs:absolute top-1/2 xs:right-4 z-10 -translate-y-1/2 cursor-pointer 
                disabled:pointer-events-none disabled:opacity-[0.2] max-sm:shadow w-[30px] h-[30px]
                flex items-center justify-center max-sm:rounded-[0px_30px_30px_0px] 
                max-sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] "
              onClick={handleNext}
            >
              <svg className="xl:w-[18px] xl:h-[18px] w-[10px] h-[10px] flex" viewBox="0 0 10 18" fill="none">
                <path d="M1 17L8.58052 9.94278C9.13983 9.42208 9.13983 8.57786 8.58052 8.05716L1 0.999969" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:min-h-[165px]">
          <AdvancesearchSection />
        </div>
      </div>
    </section >
  );
}
