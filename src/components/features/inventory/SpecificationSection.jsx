"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const tabs = [
  "Specifications",
  "Description",
  "Interior Features",
  "Exterior Features",
  "Security & Environment",
];

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

export default function ResponsiveTabsWithSwiper() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="w-full px-4 py-10 bg-white">
      <div className="container mx-auto">
        {/* Tab Header */}
        <div className="mb-6">
          <Swiper
            slidesPerView={2.5}
            spaceBetween={10}
            breakpoints={{
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
            }}
            className="border-b border-[#D9D9D9]"
          >
            {tabs.map((tab, idx) => (
              <SwiperSlide key={idx}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-[14px] sm:text-[16px] xl:text-[18px] font-base1 w-full pb-2 whitespace-nowrap text-left
                    ${activeTab === tab ? "font-semibold text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-[#2E4C99]" : "text-[#4B4B4B]"}`}
                >
                  {tab}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tab Content */}
        <Tabs
          defaultValue={tabs[0]}
          value={activeTab}
          className="w-full bg-[#F5F9FF] rounded-[15px] p-6 sm:p-10 overflow-hidden"
        >
          {tabs.map((tab, index) => (
            <TabsContent key={tab} value={tab} className="w-full h-full">
              {index === 0 ? (
                // Specifications layout
                <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
                  {(detailsData[index] || []).map((item, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="block text-black font-medium min-w-[130px] mr-2">
                        {item.label}
                      </span>
                      <span className="text-[#2E4C99]">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : index === 1 ? (
                // Description layout
                <p className="text-[14px] text-[#4B4B4B] font-base1 leading-relaxed">
                  {detailsData[index]?.[0]?.value || "No description available."}
                </p>
              ) : (
                // Features grid layout
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-6 text-[14px] text-[#1F1F1F] font-base1">
                  {(detailsData[index] || []).map((item, i) => (
                    <div key={i} className="whitespace-nowrap block text-black font-semibold mr-2 font-base1">{item.value}</div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
