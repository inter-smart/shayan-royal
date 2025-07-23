"use client";

import { useState } from "react";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    title: "Security & Protection Mods",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune.",
    features: [
      {
        title: "Armoring",
        desc: "Reinforcing the vehicle’s body with ballistic steel or composite materials.",
      },
      {
        title: "Bulletproofing",
        desc: "Installing bullet-resistant glass and protective panels.",
      },
      {
        title: "Run-Flat Tires",
        desc: "Tires that function even after being punctured.",
      },
    ],
    images: [
      "/images/categories/cat1.jpg",
      "/images/categories/cat2.jpg",
      "/images/categories/cat3.jpg",
    ],
  },
  {
    title: "Off-Road & Adventure Mods",
    description:
      "Off-road upgrades to tackle any terrain. Better suspension, airflow, and tires.",
    features: [
      {
        title: "Off-Road Suspension Kits",
        desc: "Lift kits, upgraded shocks, and springs for better ground clearance and terrain handling.",
      },
      {
        title: "Snorkels",
        desc: "Allows the engine to breathe in water or dusty environments.",
      },
      {
        title: "All-Terrain Tires",
        desc: "Designed for dirt, rocks, mud, and other off-road surfaces.",
      },
    ],
    images: [
      "/images/categories/cat4.jpg",
      "/images/categories/cat5.jpg",
      "/images/categories/cat6.jpg",
    ],
  },
  {
    title: "Utility & Commercial Mods",
    description:
      "Convert vehicles for commercial use with specialized storage and utility features.",
    features: [
      { title: "Freezer Trucks", desc: "Refrigeration units for transporting perishable goods." },
      { title: "Food Truck Conversions", desc: "Outfitting vans for food service." },
      { title: "Workshop Vans", desc: "Mobile workspaces with built-in tools and storage." },
      { title: "Towing & Recovery Kits", desc: "Winches, tow bars, and heavy-duty hooks." },
      { title: "Tipper Modifications", desc: "Hydraulic tipping systems for easy unloading." },
      { title: "Flatbed Conversions", desc: "Turning trucks into flatbeds for cargo." },
    ],
    images: [
      "/images/categories/cat7.jpg",
      "/images/categories/cat8.jpg",
      "/images/categories/cat9.jpg",
    ],
  },
  {
    title: "Special Purpose Conversions",
    description:
      "Vehicles modified for emergency services and high-security transport.",
    features: [
      { title: "Ambulance Conversions", desc: "Fitting emergency medical equipment and stretchers." },
      { title: "Fire/Rescue Vehicle Mods", desc: "Specialized compartments and gear." },
      { title: "Police Vehicle Upgrades", desc: "Sirens, lights, communication devices." },
      { title: "Cash-in-Transit Vans", desc: "Heavily armored and secured cargo areas." },
    ],
    images: [
      "/images/categories/cat10.jpg",
      "/images/categories/cat11.jpg",
      "/images/categories/cat12.jpg",
    ],
  },
  {
    title: "Performance & Aesthetic Mods",
    description:
      "Enhance performance and appearance with premium customizations.",
    features: [
      { title: "Body Kits", desc: "Spoilers, bumpers, and side skirts for custom looks." },
      { title: "Lighting Mods", desc: "LED bars, underglow, or projector headlights." },
      { title: "Interior Customization", desc: "Leather seats, infotainment systems, ambient lighting." },
    ],
    images: [
      "/images/categories/cat1.jpg",
      "/images/categories/cat2.jpg",
      "/images/categories/cat3.jpg",
    ],
  },
];



export default function CategorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="relative 3xl:py-[120px_65px] 2xl:py-[80px_40px] xl:py-[40px] py-[30px] overflow-hidden">
      <div className="container">
        <div className="3xl:mb-[60px] 2xl:mb-[50px] xl:mb-[30px] mb-[20px] text-center">
          <Heading
            size="heading2"
            as="h2"
            className="text-black uppercase font-normal mb-[15px]" >
            Categories
          </Heading>
          <Text size="Text1" as="p"
            className="max-w-[730px] m-auto" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet
            iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, </Text>
        </div>

      <div className="relative">
          <Swiper
          spaceBetween={15}
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onBeforeInit={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            prevEl: ".btn-prev",
            nextEl: ".btn-next",
          }}
          className="relative" >

          {categories.map((category, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="flex flex-wrap">
                {/* Left Column - Text */}
                <div className="w-full md:w-1/2 flex items-center">
                  <div className="w-full [&>p]:text-[#4B4B4B]">
                    <div className="text-[16px] sm:text-[20px] lg:text-[22px] xl:text-[25px] 2xl:text-[35px] 3xl:text-[40px] font-medium mb-[15px]">
                      {category.title}
                    </div>
                    <p>{category.description}</p>
                    <ul className="my-[20px]">
                      {category.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="relative pl-[25px] before:absolute before:content-[''] before:top-[10px] 3xl:before:top-[15px] before:left-0 before:w-[6px] before:h-[6px] 2xl:before:w-[8px] 2xl:before:h-[8px] 3xl:before:w-[10px] 3xl:before:h-[10px] 
                                                      before:rounded-full before:bg-black [&>p]:text-[#4B4B4B] not-last-of-type:mb-[15px]"
                        >
                          <div className="text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[21px] 3xl:text-[25px] font-semibold leading-normal font-base1">
                            {feature.title}
                          </div>
                          <p>{feature.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Right Column - Images */}
                <div className="w-full md:w-1/2">
                  <div className="flex flex-wrap -m-[7px]">
                    {category.images.map((img, idx) => (
                      <div key={idx} className={`${idx === 0 ? "w-full" : "w-1/2"} p-[7px]`} >
                        <div className={`w-full h-full rounded-[10px] overflow-hidden ${idx === 0 ? "aspect-[720/340]" : "aspect-[410/340]"}`}  >
                          <Image
                            src={img}
                            width={730}
                            height={730}
                            alt={`Category Image ${idx + 1}`}
                            className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center absolute top-0 bottom-0 w-full mt-[-150px] 3xs:mt-[-90px] md:mt-0">
          <button className="btn-prev absolute left-[-20px] sm:left-[-45px] -translate-y-1/2 z-10
                        bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)]   w-[34px] h-[38px] flex items-center justify-center
                        rounded-[30px_0px_0px_30px] cursor-pointer group  disabled:pointer-events-none 
                        disabled:opacity-[1]">

            <svg width="16" height="31" viewBox="0 0 16 31" fill="none">
              <path d="M2.76145e-07 15.4999C2.91897e-07 15.8603 0.130332 16.221 0.390664 16.4962L13.7239 30.587C14.2449 31.1377 15.0886 31.1377 15.6093 30.587C16.1299 30.0364 16.1302 29.1448 15.6093 28.5946L3.21865 15.4999L15.6093 2.40527C16.1302 1.85467 16.1302 0.963068 15.6093 0.412819C15.0883 -0.13743 14.2446 -0.137783 13.7239 0.412819L0.390664 14.5037C0.130332 14.7788 2.60392e-07 15.1396 2.76145e-07 15.4999Z" fill="black" fill-opacity="0.4" />
            </svg>

          </button>
          <button className="btn-next absolute right-[-25px] sm:right-[-45px] -translate-y-1/2 z-10 
                        bg-[linear-gradient(270deg, #FFF -4.3%, #EBEBEB 100.24%)] w-[34px] h-[38px] flex items-center 
                        justify-center rounded-[0px_30px_30px_0px] group cursor-pointer  
                        disabled:pointer-events-none disabled:opacity-[0.2] ">
            <svg width="16" height="31" viewBox="0 0 16 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 15.4999C16 15.8603 15.8697 16.221 15.6093 16.4962L2.27607 30.587C1.75507 31.1377 0.911412 31.1377 0.390748 30.587C-0.129916 30.0364 -0.130249 29.1448 0.390748 28.5946L12.7813 15.4999L0.390749 2.40527C-0.130248 1.85467 -0.130248 0.963068 0.390749 0.412819C0.911747 -0.13743 1.75541 -0.137783 2.27607 0.412819L15.6093 14.5037C15.8697 14.7788 16 15.1396 16 15.4999Z" fill="black" fill-opacity="0.4" />
            </svg>

          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
