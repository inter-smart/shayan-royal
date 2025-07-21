"use client";
import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import parse from "html-react-parser";
import { mediaUrl } from "@/lib/constants";

const item = {
  title: "Core Values",
  description: "Our core values are the guiding principles that shape our culture and decision-making.",
};

const coreValues = [
  {
    title: "Integrity",
    image: "/images/values_1.svg",
  },
  {
    title: "Innovation",
    image: "/images/values_2.svg",
  },
  {
    title: "Customer Focus",
    image: "/images/values_3.svg",
  },
];

export default function CorevalueSection({ title, description, values }) {
    console.log("CorevalueSection values:", title);
  return (
    <section className="w-full h-auto 3xl:py-[140px] xl:py-[90px] lg:py-[70px] sm:py-[50px] py-[40px] block">
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="3xl:w-[370px] 2xl:w-[280px] xl:w-[250px] lg:w-[180px] w-full h-auto max-lg:mb-[30px] max-sm:mb-[20px]">
            <Heading size={"heading2"} as="div" className=" text-black uppercase font-semibold leading-none 2xl:mb-[20px] lg:mb-[20px] mb-[15px]">
              {title || item.title}
            </Heading>
            <Text size="text1" as="p" className="leading-[1.5] font-normal text-black">
              {description ? parse(description) : item.description}
            </Text>
          </div>
          <div className="3xl:w-[calc(100%-370px)] 2xl:w-[calc(100%-280px)] xl:w-[calc(100%-250px)] lg:w-[calc(100%-180px)] w-full 2xl:pl-[100px] xl:pl-[70px] lg:pl-[40px]">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1536: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              className="corevalueSlider"
            >
              {values?.map((item, index) => (
                <SwiperSlide key={"coreValues" + index}>
                  <div className="w-full h-full 2xl:p-[40px_20px] xl:p-[30px_20px] p-[20px_10px] bg-[#F5F9FF] rounded-[10px] overflow-hidden block relative z-0 group">
                    <div className="absolute -z-1 inset-0 pointer-events-none bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    <div className="2xl:w-[80px] xl:w-[55px] lg:w-[45px] sm:w-[40px] w-[35px] h-auto aspect-80/80 2xl:m-[0_auto_25px_auto] sm:m-[0_auto_15px_auto] m-[0_auto_10px_auto] flex items-center justify-center">
                      <Image
                        src={item.logo ? `${mediaUrl}${item.logo}` : "/images/values_1.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert"
                      />
                    </div>
                    <div className="text-center">
                      <p className="3xl:text-[30px] 2xl:text-[24px] xl:text-[20px] sm:text-[16px] text-[14px] font-normal leading-normal text-black transition-all duration-300 ease-in-out group-hover:text-white">
                        {item.title || "Core Value"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
