"use client";

import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { motion } from "framer-motion";
import { useState } from "react";

const servicesData = [
  {
    title: "Land Transport Facility",
    image: "/images/log1.jpg",
    description:
      "International and local land transport logistics solutions.* Flexible and tailor made road services. Container transportation, Land transportation, LTL and FTL.*",
  },
  {
    title: "Air freight Service",
    image: "/images/log2.jpg",
    description:
      "Specialized Car Exporter From Dubai, UAE to Africa , Reach the World Faster,Auto Import and Export Africa and South America.",
  },
  {
    title: "Marine Insurance",
    image: "/images/log3.jpg",
    description:
      "Marine insurance covers the loss or damage of ships, cargo, terminals, and any transport by which the property is transferred, acquired, or held between.",
  },
  {
    title: "Ocean Freight Service",
    image: "/images/log4.jpg",
    description:
      "We provide reliable ocean freight transportation services tailored to your specific shipping & budget needs.The way to a customer’s heart is much more..",
  },
];

export default function LogisticsSection() {
  return (
    <section
      className="relative z-0 bg-white py-[40px] xl:py-[100px] 2xl:py-[130px] 3xl:py-[165px] after:absolute after:content-[''] overflow-hidden
        after:top-0 after:left-0 after:right-0 after:m-auto after:h-full after:3xl:w-[365px] after:2xl:w-[275px] after:w-[220px] after:skew-x-[-15deg]
        after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-10"
    >
      <div className="container">
        <div className="flex flex-wrap items-start">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="3xl:max-w-[600px] 2xl:max-w-[450px] xl:max-w-[370px] mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
              <Heading
                size="heading2"
                as="h2"
                className="text-black uppercase mb-[10px]"
              >
                Logistics & Transportation
              </Heading>
              <Text size="text1" as="p" className="text-black mb-[15px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem
                Samium felicem apparet. Maximas vero virtutes iacere omnis necesse est
                voluptate dominante. Lorem Ipsum has been the industry's standard.
              </Text>
            </div>

            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="3xl:max-w-[800px] 2xl:max-w-[550px] xl:max-w-[500px] max-w-[350px] w-full"
            >
              <Image
                src="/images/truck.png"
                alt="Truck"
                width={1070}
                height={500}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap w-full h-full">
              {servicesData.map((item, index) => {
                const [showDescription, setShowDescription] = useState(false);
                const toggleDescription = () => setShowDescription((prev) => !prev);

                return (
                  <div key={index} className="w-full 2xs:w-1/2 p-[8px] 2xl:p-[15px]">
                    <div
                      onClick={toggleDescription}
                      className="w-full h-full relative rounded-[10px] overflow-hidden group after:absolute after:left-0 after:bottom-0
                        after:bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_#000_100%)] after:w-full after:h-full cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover w-full h-full !relative duration-500 ease-in-out group-hover:scale-[1.2]"
                      />
                      <div className="w-full h-full absolute bottom-0 left-0 z-1 flex flex-col justify-end 3xl:p-[25px] p-[15px]">
                        <div className="3xl:text-[30px] 2xl:text-[25px] xl:text-[20px] text-[18px] text-white font-semibold z-10 
                          leading-tight transition-all duration-500 line-clamp-2 max-w-[70%]">
                          {item.title}
                        </div>
                        <div
                          className={`transition-all duration-500 ease-in-out 
                            ${showDescription ? "h-[130px] opacity-100 visible" : "sm:opacity-0 sm:invisible sm:h-0"}
                            group-hover:h-[130px] group-hover:opacity-100 group-hover:visible`}
                        >
                          <Text size="text2" as="p" className="text-white mb-[15px] transition duration-500 line-clamp-5">
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
