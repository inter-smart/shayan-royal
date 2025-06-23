"use client";
import Image from "next/image";
import { useState } from "react";

const colors = [
    { name: "Red", code: "#C6564A", image: "/images/carDetails1.png" },
    { name: "Platinum White", code: "#EDEDED", image: "/images/carColor1.png" },
    { name: "Black", code: "#000000", image: "/images/carColor1.png" },
    { name: "Blue", code: "#3C44B1", image: "/images/carColor1.png" },
    { name: "Green", code: "#295F29", image: "/images/carColor1.png" },
];

const specIcons = [
    { label: "GCC", icon: "/images/globe.svg" },
    { label: "5", icon: "/images/seat.png" },
    { label: "Auto", icon: "/images/transmission.svg" },
    { label: "4", icon: "/images/door.png" },
    { label: "2024", icon: "/images/year.svg" },
];

export default function CarColorSpecSection() {
    const [activeColor, setActiveColor] = useState(colors[1]);
    const radius = 410; // distance from center
    const center = 400; // half of 820px

    return (
        <section className="relative w-full py-[40px_90px]">
            <div className="container">
                <div className="flex justify-between items-center">
                    {/* Left Color Options */}
                    <div className="w-[40%] ">
                        <div className="w-full flex items-center justify-center text-center flex-col">
                            <h4 className="3xl:text-[30px] 2xl:text-[25px] text-[20px] font-semibold text-black mb-5 uppercase w-full">Colors</h4>
                            <ul className="flex flex-col">
                                {colors.map((color, index) => {
                                    const isActive = activeColor.name === color.name;
                                    return (
                                        <li
                                            key={index}
                                            className="flex items-center cursor-pointer relative last-of-type:mb-0 mb-[15px]"
                                            onClick={() => setActiveColor(color)}
                                        >
                                            <div
                                                className={`w-[42px] h-[42px] rounded relative flex items-center justify-center transition-all ${isActive ? "border border-[#D2D5DA]]" : ""
                                                    }`}
                                                style={{
                                                    backgroundColor: isActive ? "#ffffff" : color.code,
                                                }}
                                            >
                                                {isActive && (
                                                    <div
                                                        className="w-[32px] h-[32px] rounded transition-all"
                                                        style={{ backgroundColor: color.code }}
                                                    />
                                                )}
                                            </div>
                                            {isActive && (
                                                <span className="text-[20px] text-black font-medium absolute top-0 bottom-0 text-nowrap m-auto left-0 pl-[50px]">
                                                    {color.name}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul> 
                        </div>
                    </div>

                    {/* Car Image and Circle */}
                    <div className="relative w-[65%] flex justify-start items-center">
                        <div className="relative w-[810px] h-[810px] border border-[#ccc] rounded-full">
                            {/* Car Image */}
                            <div className="absolute top-0 bottom-0 m-auto left-[-15%] flex items-center z-10">
                                <Image
                                    src={activeColor.image}
                                    alt="Car"
                                    width={780}
                                    height={400}
                                    className="object-contain bg-white p-5 max-w-[780px] w-full "
                                />
                            </div>

                            {/* Circular Icons (Quarter Arc) */}
                            {specIcons.map((item, index) => {
                                const totalIcons = specIcons.length;
                                const startAngle = -50; // top-right
                                const endAngle = 50;    // bottom-right

                                const angleDeg =
                                    startAngle + (index * (endAngle - startAngle)) / (totalIcons - 1);
                                const angleRad = (angleDeg * Math.PI) / 180;

                                const x = center + radius * Math.cos(angleRad) - 45; // center X - half icon width
                                const y = center + radius * Math.sin(angleRad) - 45; // center Y - half icon height
                                return (
                                    <div
                                        key={index}
                                        className="absolute flex flex-col items-center justify-center 3xl:w-[105px] w-[70px] 3xl:h-[105px] h-[70px] rounded-full bg-[#F1F5FF] text-center"
                                        style={{ top: `${y}px`, left: `${x}px` }}
                                    >
                                        <div className="3xl:w-[40px] w-[25px] 3xl:h-[40px] h-[25px] mb-1">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={40}
                                                height={40}
                                                className="object-contain max-w-[40px] w-full"
                                            />
                                        </div>
                                        <span className="text-[24px] text-[#181818] font-regular">
                                            {item.label}
                                        </span>
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
