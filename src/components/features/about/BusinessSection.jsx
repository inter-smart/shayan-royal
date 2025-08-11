"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
import { useInView } from "react-intersection-observer";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { mediaUrl } from "@/lib/constants";
import parse from "html-react-parser";

const item = {
  years: 30,
  yearsExperience: "Years in Business",
  image: "/images/about_bussiness_section.png",
  title: "We are here to keep you moving",
  description1:
    "Shayan Royal Group was established in 1995 in Dubai, United Arab Emirates and has since extended its core business into exporting of Brand-new cars from Middle East. The company expanded its business horizon into international trade and has successfully penetrated the Middle East, Africa and Far East markets.",
  description2:
    "With our well-established network of global suppliers, we can source new car for export from Dubai and other countries and ensure highly competitive prices. We offer largest selection of all automobile brands from passenger cars, SUV's, light commercial vehicles to luxury cars and conversion vehicles for export. We have been dealing in several automobile brands including –Toyota, Lexus, Jeep, Ford, Nissan, Infiniti, Renault, Mazda, Hyundai, Kia, BMW, Mercedes, Range Rover, Land Rover to name a few.",
};

export default function BusinessSection({ title, description1, description2, image, alt, year, year_title }) {
  const { ref, inView } = useInView({ threshold: 0.4 });

  return (
    <section className="w-full h-auto 3xl:pb-[120px] 2xl:pb-[80px] xl:pb-[50px] md:pb-[70px] sm:pb-[50px] pb-[40px] block relative z-0">
      <div className="absolute -z-1 left-0 top-0 bottom-0 lg:w-[70%] w-full h-full m-auto pointer-events-none">
        <Image src={"/images/business_section_bg.png"} alt="Business background" fill style={{ objectFit: "cover" }} priority />
      </div>
      <div className="container">
        <div className="absolute z-2 top-0 left-0 w-full">
          <BreadCrumb
            items={[
              { label: "HOME", href: "/" },
              { label: "ABOUT US", isCurrent: true },
            ]}
          />
        </div>
        <div className="flex flex-wrap">
          <div className="3xl:w-[955px] 2xl:w-[740px] xl:w-[620px] lg:w-[520px] w-full pt-[70px] sm:pt-[100px] lg:pt-[190px] overflow-hidden relative z-0">
            <div className="absolute top-[10%] right-[15%]  m-auto max-w-[150px] 2xl:max-w-[250px] 3xl:max-w-[300px] w-full h-fit">
              <Image src={"/images/aboutLogo.png"} alt="Business logo" width={1250} height={550} priority className="w-full object-cover" />
            </div>

            <motion.div
              initial={{ x: "-10%", opacity: 1 }}
              animate={inView ? { x: "0%", opacity: 1 } : { x: "-10%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full flex items-center max-w-[1270px]"
            >
              <Image
                src={image ? `${mediaUrl}${image}` : item.image}
                alt="Business Car"
                width={1250}
                height={550}
                priority
                className="w-full object-cover"
              />
            </motion.div>
            <motion.div
              ref={ref}
              className="absolute -z-1 top-0 right-0 md:right-[25%] 2xl:max-w-[210px] xl:max-w-[170px] lg:max-w-[140px] sm:max-w-[120px] max-w-[100px] md:h-[300px] 3xl:h-[430px] 
                            bg-gradient-to-b from-[#2E4C99] to-[#0E1D44]"
              initial={{ y: "-5%", opacity: 0.7 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "-20%", opacity: 0.7 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-full h-full lg:p-[30px_20px] sm:p-[20px] p-[10px]">
                <div className="3xl:text-[100px] 2xl:text-[74px] xl:text-[66px] lg:text-[54px] sm:text-[38px] text-[28px] mb-[8px] leading-none font-bold text-white font-base1">
                  <CountUp start={0} end={inView ? (year ? year : item.years) : 0} duration={1.5} separator="," />
                  <span className="leading-none font-bold text-[#BE1E2D]">+</span>
                </div>
                <div className="3xl:text-[38px] 2xl:text-[30px] xl:text-[26px] lg:text-[18px] sm:text-[16px] text-[14px] leading-none font-normal text-white line-clamp-2">
                  {year_title ? year_title : item.yearsExperience}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="3xl:w-[calc(100%-955px)] 2xl:w-[calc(100%-740px)] xl:w-[calc(100%-620px)] lg:w-[calc(100%-520px)] w-full 3xl:p-[90px_90px_0_50px] xl:p-[80px_20px_0_10px] lg:p-[50px_20px_0_10px] sm:pt-[20px]">
            <Heading size={"heading2"} as="h2" className=" text-black uppercase font-semibold leading-none 2xl:mb-[35px] lg:mb-[20px] mb-[15px]">
              {title ? title : item.title}
            </Heading>
            <Text
              as="p"
              className="3xl:text-[20px] 2xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.5] font-semibold text-black lg:mb-[20px] mb-[10px]"
            >
              {description1 ? parse(description1) : item.description1}
            </Text>
            <Text size="text1" as="p" className="text-black">
              {description2 ? parse(description2) : item.description2}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
