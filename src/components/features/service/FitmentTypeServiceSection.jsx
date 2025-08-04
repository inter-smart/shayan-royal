"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { mediaUrl } from "@/lib/constants";

const items = [
  {
    image: "/images/ambulance.jpg",
    title: "AMBULANCE",
  },
  {
    image: "/images/truck_fab.jpg",
    title: "TRUCK FABRICATION",
  },
  {
    image: "/images/armoring.jpg",
    title: "Armoring",
  },
  {
    image: "/images/offroad.jpg",
    title: "OFF-ROADING VEHICLES",
  },
  {
    image: "/images/bullet-proofing.jpg",
    title: "bullet proofing",
  },
];

export default function FitmentTypeServiceSection({ services = items }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full h-auto block 3xl:py-[90px] 2xl:py-[70px] lg:py-[60px] sm:py-[50px] py-[40px] bg-[#F5F9FF] relative z-0">
      <div className="absolute -z-1 left-0 top-0 right-[-25%] w-[45%] h-full m-auto pointer-events-none">
        <Image src="/images/expertise_bg.png" alt="Business background" fill />
      </div>

      <div className="container">
        <div className="w-full h-full flex items-center justify-center">
          <Heading size="heading2" as="h2" className="leading-none font-semibold font-base1 text-[#262626] 2xl:mb-[40px] lg:mb-[30px] mb-[20px]">
            SERVICES
          </Heading>
        </div>

        <div
          className="w-full h-[340px] md:h-[350px] xl:h-[475px] 2xl:h-[545px] 3xl:h-[930px] 
                relative"
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={false}
            loopAdditionalSlides={0}
            loopFillGroupWithBlank={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1771: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            speed={800}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = ".nav-prev";
              swiper.params.navigation.nextEl = ".nav-next";
            }}
            navigation={{
              prevEl: ".nav-prev",
              nextEl: ".nav-next",
            }}
            className="fitmentTypeSlider relative w-full h-full"
          >
            {items.map(() => {
              const groupedItems = [];
              for (let i = 0; i < items.length; ) {
                if (i === 0 || i % 3 === 0) {
                  groupedItems.push(items.slice(i, i + 2)); // 2 items
                  i += 2;
                } else {
                  groupedItems.push(items.slice(i, i + 1)); // 1 item
                  i += 1;
                }
              }

              return groupedItems.map((group, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="flex flex-col w-full h-full -my-[5px] 2xl:-my-[10px] 3xl:-my-[20px]">
                    {group.map((item, index) => (
                      <div key={index} className={`w-full ${group.length === 1 ? "h-full" : "h-1/2"} py-[5px] 2xl:py-[10px] 3xl:py-[20px]`}>
                        <div className="w-full h-full rounded-[10px] overflow-hidden relative group">
                          <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-all duration-500" />
                          <div
                            className="text-white font-semibold absolute right-[10px] 3xl:right-[20px] bottom-0 p-[10px] lg:p-[15px] 
                                                         rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] uppercase"
                          >
                            <h2 className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[25px] font-semibold">
                              {item.title}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ));
            })}
          </Swiper>

          {/* Navigation Arrows */}
          <div
            className="absolute top-[45%] left-0 right-0 flex items-center justify-between  w-full z-10 
                          pointer-events-none"
          >
            <button
              className="nav-prev pointer-events-auto bg-white rounded-full shadow 
                        w-[30px] md:w-10 md:h-10 h-[30px]
                            flex items-center justify-center group hover:bg-[#2E4C99] relative left-[-15px] sm:left-[-35px] md:left-[-55px] cursor-pointer"
            >
              <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 w-[8px] md:w-2 md:h-5 h-[8px]">
                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
              </svg>
            </button>
            <button
              className="nav-next pointer-events-auto bg-white rounded-full shadow  w-[30px] md:w-10 md:h-10 h-[30px]
                             flex items-center justify-center group hover:bg-[#2E4C99] relative right-[-15px] sm:right-[-35px] md:right-[-55px] cursor-pointer"
            >
              <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 w-[8px] md:w-2 md:h-5 h-[8px]">
                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
