"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heading } from "@/components/layout/Heading";
import Image from "next/image";
import { mediaUrl } from "@/lib/constants";

const item = {
  image: "/images/choose_our_section.webp",
};
const items = [
  {
    sectionTitle: "WHY CHOOSE OUR LOGISTIC SERVICES?",
  },
  {
    image: "/images/service_detail_1.svg",
    title: "Real-Time Tracking & Shipment  Updates",
  },
  {
    image: "/images/service_detail_2.svg",
    title: "Fast and Secure Road Freight Solutions",
  },
  {
    image: "/images/service_detail_3.svg",
    title: "Flexible Transport Options",
  },
  {
    image: "/images/service_detail_4.svg",
    title: "Nationwide & Cross-Border Transport Coverage",
  },
  {
    image: "/images/service_detail_5.svg",
    title: "Cost-Effective Deliveries",
  },
];
export default function ChooseServicesSection({ chooseItems, image, title }) {
  const { ref, inView } = useInView({ threshold: 0.4 });

  const modified = [{ sectionTitle: title }, ...chooseItems];

  return (
    <section className="w-full h-auto block overflow-hidden bg-[#F5F9FF] 3xl:py-[110px] 2xl:py-[80px] lg:py-[70px] sm:py-[50px] py-[40px] relative z-0">
      <div className="3xl:w-[1020px] 2xl:w-[810px] xl:w-[680px] md:w-[570px] sm:w-[480px] w-[280px] h-auto aspect-[1020/580] xl:mb-[0] mb-[20px] 
      xl:absolute z-1 right-0 top-0 bottom-0 m-auto flex items-center">
        <motion.div
          ref={ref}
          initial={{ x: "25%", opacity: 1 }}
          animate={inView ? { x: "10%", opacity: 1 } : { x: "20%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-auto max-xl:flex max-xl:items-center"
        >
          <Image src={image ? `${mediaUrl}${image}` : "/images/choose_our_section.webp"} alt="Business Car" width={1250} height={550} />
        </motion.div>
      </div>
      <div className="container">
        <div className="absolute -z-1 left-0 top-0 right-[-25%] w-[45%] h-full m-auto pointer-events-none">
          <Image src="/images/expertise_bg.png" alt="Business background" fill />
        </div>
        <div className="xl:w-[52%] w-full 3xl:m-[-17px] lg:m-[-12px] sm:m-[-8px] m-[-5px] flex flex-wrap">
          {modified?.map((item, index) => (
            <div key={index} className="w-full sm:w-[calc(100%/2)] 3xl:p-[17px] lg:p-[12px] sm:p-[8px] p-[5px]">
              {item.sectionTitle && (
                <div className="w-full h-full flex items-center">
                  <Heading
                    as="h2"
                    className="3xl:text-[40px] 2xl:text-[30px] lg:text-[26px] sm:text-[20px] text-[18px] leading-none font-semibold font-base1 
                    text-[#262626] max-sm:mb-[10px]"
                  >
                    {item.sectionTitle}
                  </Heading>
                </div>
              )}
              {item.image && item.title && (
                <div className="w-full h-full 3xl:p-[20px_25px] sm:p-[15px_20px] p-[10px_15px] bg-white rounded-[10px] overflow-hidden 
                flex items-center relative z-0 group">
                  <div className="absolute inset-0 -z-1 w-full h-full bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] rounded-[10px] 
                  opacity-0 pointer-events-none transition-all duration-800 ease-in-out group-hover:opacity-100" />
                  <div className="3xl:w-[95px] 2xl:w-[70px] lg:w-[60px] sm:w-[50px] w-[40px] h-auto aspect-[95/95] 3xl:p-[20px] 
                  2xl:p-[15px] lg:p-[12px] sm:p-[10px] p-[7px] bg-[#E7F0FD] rounded-[50%] overflow-hidden flex items-center justify-center
                   group-hover:bg-white transition-all duration-300">
                    <Image
                      src={item.image ? `${mediaUrl}${item.image}` : "/images/service_detail_1.svg"}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="3xl:w-[calc(100%-95px)] 2xl:w-[calc(100%-70px)] lg:w-[calc(100%-60px)] sm:w-[calc(100%-50px)] w-[calc(100%-40px)]
                   3xl:pl-[30px] 2xl:pl-[20px] sm:pl-[15px] pl-[10px]">
                    <h4 className="3xl:text-[22px] 2xl:text-[16px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-black
                     group-hover:text-white transition-all duration-300">
                      {item.title}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
