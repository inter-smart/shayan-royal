"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { mediaUrl } from "@/lib/constants";

const items = [
  {
    image: "/images/fitment_type_1.webp",
    title: "AMBULANCE",
  },
  {
    image: "/images/fitment_type_33.jpg",
    title: "TRUCK FABRICATION",
  },
  {
    image: "/images/fitment_type_333.jpg",
    title: "OFF-ROADING VEHICLES",
  },
  {
    image: "/images/fitment_type_444.jpg",
    title: "BULLETY PROOFING",
  },

  // {
  //     image: "/images/fitment_type_33.jpg",
  //     title: "TRUCK FABRICATION"
  // },
  // {
  //     image: "/images/fitment_type_33.jpg",
  //     title: "ARMORING"
  // },
  // {
  //     image: "/images/fitment_type_1.webp",
  //     title: "AMBULANCE",
  // },
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
          <Heading size={"heading2"} as="h2" className="leading-none font-semibold font-base1 text-[#262626] 2xl:mb-[40px] lg:mb-[30px] mb-[20px]">
            SERVICES
          </Heading>
        </div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={!isMobile ? { clickable: true } : false}
          spaceBetween={10}
          slidesPerView={1}
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
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 25,
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
            swiper.params.navigation.prevEl = ".fitmentservice-prev";
            swiper.params.navigation.nextEl = ".fitmentservice-next";
          }}
          navigation={{
            prevEl: ".fitmentservice-prev",
            nextEl: ".fitmentservice-next",
          }}
          className="fitmentTypeSlider 2xl:!pb-[90px] lg:!pb-[70px] sm:!pb-[50px] !pb-[20px] [--swiper-pagination-bullet-width:11px] 
                    [--swiper-pagination-bullet-height:11px] 
                    [--swiper-pagination-bullet-inactive-opacity:1] 
                   [--swiper-pagination-bullet-inactive-color:#D6E1FF] 
                   [--swiper-pagination-color:#2E4C99] 
                    [--swiper-pagination-bullet-active-width:30px]"
        >
          {services?.map((item, index) => {
            if (index % 3 === 0) {
              const nextItem = services[index + 1];
              return (
                <SwiperSlide key={"row1-" + index}>
                  <div className="w-full 3xl:h-[750px] 2xl:h-[565px] lg:h-[500px] sm:h-[420px] h-[380px] flex flex-col gap-[20px] 2xl:gap-[33px]">
                    <div className="w-full h-[50%] rounded-[10px] overflow-hidden relative group">
                      <Image
                        src={item?.image ? `${mediaUrl}${item?.image}` : items.image}
                        alt={item?.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="text-white font-semibold absolute right-[20px] bottom-0 p-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]">
                        <h2>{item?.title || "AMBULANCE"}</h2>
                      </div>
                    </div>

                    {nextItem && (
                      <div className="w-full h-[50%] rounded-[10px] overflow-hidden relative group">
                        <Image
                          src={nextItem?.image ? `${mediaUrl}${nextItem.image}` : items.image}
                          alt={nextItem?.title || "AMBULANCE"}
                          fill
                          className="object-cover group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="text-white font-semibold absolute right-[20px] bottom-0 p-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]">
                          <h2>{nextItem.title}</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }

            if (index % 3 === 1) {
              return (
                <SwiperSlide key={"row2-" + index}>
                  <div className="w-full 3xl:h-[750px] 2xl:h-[565px] lg:h-[500px] sm:h-[420px] h-[380px]">
                    <div className="w-full h-full rounded-[10px] overflow-hidden relative group">
                      <Image
                        src={item?.image ? `${mediaUrl}${item?.image}` : items.image}
                        alt={item?.title || "AMBULANCE"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="text-white font-semibold absolute right-[20px] bottom-0 p-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]">
                        <h2>{item?.title}</h2>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }

            if (index % 3 === 2) {
              const nextItem = services[index + 1];
              return (
                <SwiperSlide key={"row3-" + index}>
                  <div className="w-full 3xl:h-[750px] 2xl:h-[565px] lg:h-[500px] sm:h-[420px] h-[380px] flex flex-col gap-[20px] 2xl:gap-[33px]">
                    <div className="w-full h-[50%] rounded-[10px] overflow-hidden relative group">
                      <Image
                        src={item?.image ? `${mediaUrl}${item?.image}` : items.image}
                        alt={item?.title || "AMBULANCE"}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="text-white font-semibold absolute right-[20px] bottom-0 p-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]">
                        <h2>{item?.title || "AMBULANCE"}</h2>
                      </div>
                    </div>

                    {nextItem && (
                      <div className="w-full h-[50%] rounded-[10px] overflow-hidden relative group">
                        <Image
                          src={nextItem?.image ? `${mediaUrl}${nextItem.image}` : items.image}
                          alt={nextItem?.title || "AMBULANCE"}
                          fill
                          className="object-cover group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="text-white font-semibold absolute right-[20px] bottom-0 p-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]">
                          <h2>{nextItem?.title || "AMBULANCE"}</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }

            return null;
          })}
        </Swiper>
        {/* Navigation Arrows */}
        <div className="flex items-center justify-center absolute top-0 bottom-0 w-full xs:hidden">
          <button
            className="nav-prev  absolute left-[-25px] lg:left-[-35px] -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] 
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px] h-[35px] flex items-center justify-center sm:rounded-[30px_0px_0px_30px] cursor-pointer group hover:bg-[#2E4C99]"
          >
            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]">
              <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
            </svg>
          </button>
          <button
            className=" nav-next  absolute right-[-25px] lg:right-[-35px]  -translate-y-1/2 z-10 sm:bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]
                        sm:shadow 3xl:w-[34px] 2xl:w-[25px] w-[35px] 3xl:h-[38px]  h-[35px]   flex items-center justify-center sm:rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99]"
          >
            <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 3xl:w-[7px] 2xl:w-[5px] w-[5px] 3xl:h-[13px] 2xl:h-[10px] h-[10px]">
              <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
