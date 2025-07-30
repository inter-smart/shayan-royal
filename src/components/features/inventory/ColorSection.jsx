"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const colors = [
    { name: "Red", code: "#C6564A", image: "/images/carDetails1.png" },
    { name: "Platinum White", code: "#EDEDED", image: "/images/productImages/varient1.jpeg" },
    { name: "Black", code: "#000000", image: "/images/NewArr2.png" },
    { name: "Blue", code: "#3C44B1", image: "/images/carColor1.png" },
    { name: "Green", code: "#295F29", image: "/images/whyCar.png" },
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
    const [radius, setRadius] = useState(300);
    const [center, setCenter] = useState(350);
    const circleRef = useRef(null);

    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;
            if (width >= 1840) return 350;
            if (width >= 1771) return 310;
            if (width >= 1536) return 300;
            if (width >= 1280) return 280;
            if (width >= 576) return 200;
            return 150;
        };

        const handleResize = () => {
            setRadius(updateRadius());
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const size = entry.contentRect.width;
                setCenter(size / 2);
            }
        });

        if (circleRef.current) {
            resizeObserver.observe(circleRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <section className="relative w-full pt-[30px] 3xl:pt-[70px] pb-[40px]">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    {/* Color Selection */}
                    <div className="3xl:w-[500px] 2xl:w-[400px] xl:w-[300px] md:w-[250px] w-full flex justify-center">
                        <div className="text-center">
                            <h4 className="text-[18px] lg:text-[24px] font-semibold text-black mb-5 uppercase">
                                Colors
                            </h4>
                            <ul className="flex lg:flex-col flex-wrap items-center">
                                {colors.map((color, index) => {
                                    const isActive = activeColor.name === color.name;
                                    return (
                                        <li
                                            key={index}
                                            className="relative lg:mb-4 max-lg:mr-3 cursor-pointer"
                                            onClick={() => setActiveColor(color)}
                                        >
                                            <div
                                                className={`2xl:w-[42px] w-[30px] 2xl:h-[42px] h-[30px] rounded flex items-center justify-center ${isActive
                                                    ? "border border-[#D2D5DA] shadow-[0_0_0_2px_white] bg-white"
                                                    : ""
                                                    }`}
                                                style={{
                                                    backgroundColor: isActive ? "#ffffff" : color.code,
                                                }}
                                            >
                                                {isActive && (
                                                    <div
                                                        className="2xl:w-[32px] w-[22px] 2xl:h-[32px] h-[22px] rounded"
                                                        style={{ backgroundColor: color.code }}
                                                    />
                                                )}
                                            </div>
                                            {isActive && (
                                                <span className="absolute left-[55px] top-1/2 transform -translate-y-1/2 text-black text-lg font-medium whitespace-nowrap max-lg:hidden">
                                                    {color.name}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Car + Circle Layout */}
                    <div className="relative 3xl:w-[calc(100%-500px)] 2xl:w-[calc(100%-400px)] xl:w-[calc(100%-300px)] md:w-[calc(100%-250px)] max-sm:max-w-[300px] w-full 3xl:pl-[200px] 2xl:pl-[100px] md:pl-[75px]">
                        <div
                            ref={circleRef}
                            className="relative w-[90vw] 3xl:max-w-[700px] 2xl:max-w-[600px] xl:max-w-[550px] lg::max-w-[450px] xs:max-w-[400px] max-w-[300px] aspect-square border border-gray-300 rounded-full z-0 max-md:m-auto"
                        >
                            {/* Car Image */}
                            <div className="absolute top-0 bottom-0 m-auto left-[-15%] flex items-center -z-10">
                                <Image
                                    src={activeColor.image}
                                    alt="Car"
                                    width={780}
                                    height={400}
                                    className="object-contain bg-white p-5 xl:max-w-[700px] sm:max-w-[580px] max-w-[300px] w-full"
                                />
                            </div>

                            {/* Circular Icons */}
                            {specIcons.map((item, index) => {
                                const total = specIcons.length;
                                const startAngle = -50;
                                const endAngle = 50;
                                const angleDeg =
                                    startAngle + (index * (endAngle - startAngle)) / (total - 1);
                                const angleRad = (angleDeg * Math.PI) / 180;

                                const size = 70;
                                const x = center + radius * Math.cos(angleRad) - size / 2;
                                const y = center + radius * Math.sin(angleRad) - size / 2;

                                return (
                                    <div
                                        key={index}
                                        className="absolute flex flex-col items-center justify-center 2xl:w-[70px] sm:w-[60px] w-[50px] 2xl:h-[70px] sm:h-[60px] h-[50px] rounded-full bg-[#F1F5FF] text-center"
                                        style={{ top: `${y}px`, left: `${x}px` }}
                                    >
                                        <div className="2xl:w-6 sm:w-5 w-4 2xl:h-6 sm:h-5 h-4 mb-1">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={24}
                                                height={24}
                                                className="object-contain w-full"
                                            />
                                        </div>
                                        <span className="text-xs text-[#181818] font-medium">
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
