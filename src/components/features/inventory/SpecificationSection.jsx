"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const tabs = ["Specifications", "Description", "Interior Features", "Exterior Features", "Security & Environment"];

const detailsData = [
  // Specifications tab (first)
  [
    { label: "Make", value: "Toyota" },
    { label: "Model", value: "Raize" },
    { label: "Color", value: "Red" },
    { label: "Interior Color", value: "Black" },
    { label: "Engine Capacity", value: "1.2 L" },
    { label: "Export Status", value: "Can Be Exported" },
    { label: "Service History", value: "No" },
    { label: "Cylinder", value: "3 Cylinders" },
    { label: "Color", value: "Red" },
    { label: "Transmission", value: "Automatic" },
    { label: "Vehicle Type", value: "Sedan" },
    { label: "Color", value: "Red" },
    { label: "Model Year", value: "2024(New!)" },
    { label: "Fuel Type", value: "Gasoline" },
    { label: "No: Of Doors", value: "5 Doors" },
    { label: "Seating Capacity", value: "5 Seater" },
    { label: "Wheel Size", value: "16" },
    { label: "Interior Color", value: "Black" },
    { label: "Engine Capacity", value: "1.2 L" },
    { label: "Export Status", value: "Can Be Exported" },
    { label: "Service History", value: "No" },
    { label: "No: Of Doors", value: "5 Doors" },
    { label: "Seating Capacity", value: "5 Seater" },
    { label: "Wheel Size", value: "16" },
    { label: "Transmission", value: "Automatic" },
    { label: "Vehicle Type", value: "Sedan" },
    { label: "Color", value: "Red" },
    { label: "Model Year", value: "2024(New!)" },
  ],
  // Description
  [
    {
      value:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
  ],
  // Interior Features
  [
    { value: "360 Degree Camera" },
    { value: "Headlights" },
    { value: "Heated Mirrors" },
    { value: "360 Degree Camera" },
    { value: "Headlights" },
    { value: "Blind Spot Detection Mirror" },
    { value: "Automatic Headlights" },
    { value: "Blind Spot Indicators" },
    { value: "Blind Spot Detection Mirror" },
    { value: "Automatic Headlights" },
  ],
  // Exterior Features
  [
    { value: "Fog Lights" },
    { value: "LED Taillights" },
    { value: "Sensing Wipers" },
    { value: "Fog Lights" },
    { value: "LED Taillights" },
    { value: "Key Less Go" },
    { value: "Alloy Wheels" },
    { value: "Colored Bumpers" },
    { value: "Key Less Go" },
    { value: "Alloy Wheels" },
  ],
  // Security & Environment
  [
    { value: "Blind Spot Detection Mirror" },
    { value: "Low-Profile Tires" },
    { value: "Side Skirts" },
    { value: "Blind Spot Detection Mirror" },
    { value: "Low-Profile Tires" },
  ],
];

export default function ResponsiveTabsWithSwiper({ specList = detailsData }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full px-4 pt-6 pb-3 bg-white overflow-hidden">
      <div className="container mx-auto">
        {/* Tab Header */}
        <div className="mb-6 relative">
          <Swiper
            slidesPerView={2}
            modules={[Navigation]}
            spaceBetween={10}
            breakpoints={{
              420: { slidesPerView: 3 },
              578: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: ".btn-prev",
              nextEl: ".btn-next",
            }}
            className="border-b border-[#D9D9D9]"
          >
            {tabs.map((tab, idx) => (
              <SwiperSlide key={idx}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-[13px] sm:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] font-base1 w-full pb-2 text-left cursor-pointer transition-all hover:text-[#2E4C99] hover:font-semibold
                    ${
                      activeTab === tab
                        ? "font-semibold text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-[#2E4C99]"
                        : "text-[#4B4B4B]"
                    }`}
                >
                  {tab}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center absolute top-0 bottom-0 w-full lg:hidden">
            <button
              className="btn-prev absolute left-[-30px] lg:left-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10
                        lg:bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                        lg:shadow w-[34px] h-[38px] flex items-center justify-center rounded-[30px_0px_0px_30px] cursor-pointer group
                         hover:bg-[#2E4C99] disabled:pointer-events-none disabled:opacity-[0.2]"
            >
              <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 flex">
                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
              </svg>
            </button>
            <button
              className="btn-next absolute right-[-30px] lg:right-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10 
                        lg:bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                        lg:shadow w-[34px] h-[38px] flex items-center justify-center
                         rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99] 
                        disabled:pointer-events-none disabled:opacity-[0.2] "
            >
              <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 flex">
                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <Tabs
          defaultValue={tabs[0]}
          value={activeTab}
          className={`w-full ${specList[tabs.indexOf(activeTab)]?.length > 0 ? "bg-[#F5F9FF]" : "bg-transparent"} rounded-[15px] p-[25px_10px] 3xl:p-[45px_20px] overflow-hidden relativebefore:absolute after:content-[''] before:top-0 before:left-0 before:w-[20px] 2xl:before:w-[30px] 
          before:h-full before:bg-[#F5F9FF]`}
        >
          {tabs.map((tab, index) => (
            <TabsContent key={tab} value={tab} className="w-full h-full">
              {index === 0 ? (
                // Specifications layout
                <div className="flex flex-wrap">
                  {(specList?.[index] || []).map((item, idx) => (
                    <div className="w-full xs:w-1/2 lg:w-1/4  border-l border-[#D9D9D9] px-[15px] 2xl:px-[30px]">
                      <div
                        key={idx}
                        className="flex items-start justify-between text-sm mb-3 border-b border-dashed border-[#2E4C99] pb-[10px] 2xl:pb-[15px]"
                      >
                        <span className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[20px] block text-black font-medium mr-2">
                          {item.label}
                        </span>
                        <span className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[20px] text-[#2E4C99]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : index === 1 ? (
                // Description layout
                <p className="text-[14px] text-[#4B4B4B] font-base1 leading-relaxed px-[30px]">
                  {specList?.[index]?.[0]?.value || "No description available."}
                </p>
              ) : (
                // Features grid layout
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-1 lg:gap-x-2 text-[14px] text-[#1F1F1F] font-base1">
                  {specList?.[index] && specList[index].length > 0 ? (
                    specList[index].map((item, i) => (
                      <div
                        key={i}
                        className="text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[20px]
 block text-black font-semibold mr-2 font-base1 mx-[10px] lg:mx-[20px] border-b 
        border-dashed border-[#2E4C99] pb-[10px] xl:pb-[15px]"
                      >
                        {item.value}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center italic mx-[10px] lg:mx-[20px]"></div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
