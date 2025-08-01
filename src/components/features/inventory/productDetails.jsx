"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import { Heading } from "@/components/layout/Heading";
import ReserveForm from "@/components/forms/ReserveForm";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const carDetails = [
    {
        carName: "Camry Hybrid",
        type: "type1",
        model: "2024",
        images: [
            "/images/productImages/car3.jpeg",
            "/images/productImages/car2.jpeg",
            "/images/productImages/car1.jpeg",
            "/images/productImages/car4.jpeg",
            "/images/productImages/car5.jpeg",
            "/images/productImages/car6.jpeg",

        ],
    },
    {
        carName: "Camry Hybrid",
        type: "type2",
        model: "2024",
        images: [
            "/images/productImages/car3.jpeg",
            "/images/productImages/car2.jpeg",
            "/images/productImages/car1.jpeg",
            "/images/productImages/car4.jpeg",
            "/images/productImages/car5.jpeg",
            "/images/productImages/car6.jpeg",

        ],
    },
    {
        carName: "Camry Hybrid",
        type: "type3",
        model: "2024",
        images: [
            "/images/productImages/car3.jpeg",
            "/images/productImages/car2.jpeg",
            "/images/productImages/car1.jpeg",
            "/images/productImages/car4.jpeg",
            "/images/productImages/car5.jpeg",
            "/images/productImages/car6.jpeg",

        ],
    },

];

const specIcons = [
    { label: "GCC", icon: "/images/globe.svg" },
    { label: "Auto", icon: "/images/transmission.svg" },
    { label: "Hybrid", icon: "/images/hybrid.svg" },
    { label: "2.5L", icon: "/images/liter.svg" },
    { label: "0Km", icon: "/images/km.svg" },
    { label: "2024", icon: "/images/calender.svg" },
];

const SocialLinks = [
    {
        icon: "/images/call.png",
        name: "Call",
        colorCode: "#2E4C99",
        link: "tel:+1234567890"
    },
    {
        icon: "/images/email.png",
        name: "Email",
        colorCode: "#BE1E2D",
        link: "mailto:someone@example.com"
    },
    {
        icon: "/images/whtap.png",
        name: "Whatsapp",
        colorCode: "#25D366",
        link: "https://wa.me/1234567890"
    }
];

export default function Productdetails({ type }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const thumbsPrevRef = useRef(null);
    const thumbsNextRef = useRef(null);
    const verticalPrevRef = useRef(null);
    const verticalNextRef = useRef(null);
    // const carImages = carDetails[0].images;

   
  const selectedCar = carDetails.find((car) => car.type === type);
  if (!selectedCar) return <div className="p-10 text-center text-red-600">Car not found</div>;

    return (
        <section className="w-full h-auto block 3xl:py-[40px_100px] xl:py-[30px_50px] sm:py-[20px_30px] py-[15px_30px]">
            <div className="container">
                <Heading size="heading2" as="h2" className="text-black uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] md:mb-[15px] mb-[10px]">
                    {carDetails[0].carName}
                </Heading>
                <div className="flex flex-wrap w-full">
                    <div className="3xl:w-[calc(100%-400px)] 2xl:w-[calc(100%-300px)] md:w-[calc(100%-245px)] w-full 3xl:pr-[50px] 2xl:pr-[40px] md:pr-[30px] max-md:mb-[15px]">
                        <div className="flex flex-col lg:flex-row w-full">
                            {/* Main Slider */}
                            <div className="w-full 3xl:w-[calc(100%-110px)] 2xl:w-[calc(100%-80px)] lg:w-[calc(100%-70px)] 3xl:mr-[50px] mr-[30px] overflow-hidden relative">
                         
                                <div className="relative w-full">
                                    <Swiper
                                        modules={[Thumbs, EffectFade, Navigation]}
                                        spaceBetween={10}
                                        effect="fade"
                                        fadeEffect={{ crossFade: true }}
                                        speed={800}
                                        onBeforeInit={(swiper) => {
                                            swiper.params.navigation.prevEl = ".navBtn-prev";
                                            swiper.params.navigation.nextEl = ".navBtn-next";
                                        }}
                                        navigation={{
                                            prevEl: ".navBtn-prev",
                                            nextEl: ".navBtn-next",
                                        }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        className="border border-[rgba(46,76,153,0.3)] rounded-[10px] sm:mb-[30px] mb-[20px]"
                                    >
                                        {carImages.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="relative w-full 3xl:h-[570px] 2xl:h-[465px] xl:h-[425px] sm:h-[370px] 3xs:h-[300px] h-[200px] bg-white">
                                                    {/* <Image
                                                    src={img}
                                                    alt={`car-${index}`}
                                                    fill
                                                    className="2xl:max-w-[900px] lg:max-w-[650px] max-w-[300px] w-full h-full object-contain m-auto"
                                                /> */}
                                                    <Image
                                                        src={img}
                                                        alt={`car-${index}`}
                                                        fill
                                                        className="max-w-full w-full h-full object-cover m-auto"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* Navigation Arrows */}
                                    <div className="absolute top-[45%] left-0 right-0 flex items-center justify-between  w-full z-10 
                                            pointer-events-none">
                                        <button className="navBtn-prev pointer-events-auto bg-white rounded-full shadow 
                                            w-[20px] md:w-10 md:h-10 h-[20px]
                                                flex items-center justify-center group hover:bg-[#2E4C99] relative left-[5px] md:left-[10px] cursor-pointer disabled:opacity-[0.5]">
                                            <svg
                                                viewBox="0 0 7 13"
                                                fill="none"
                                                className="group-hover:invert-100 w-[7px] md:w-2 md:h-5 h-[8px]"
                                            >
                                                <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                                            </svg>
                                        </button>
                                        <button className="navBtn-next pointer-events-auto bg-white rounded-full shadow  w-[20px] md:w-10 md:h-10 h-[20px]
                                            flex items-center justify-center group hover:bg-[#2E4C99] relative right-[5px] md:right-[10px] cursor-pointer disabled:opacity-[0.5]">
                                            <svg
                                                viewBox="0 0 7 13"
                                                fill="none"
                                                className="group-hover:invert-100 w-[7px] md:w-2 md:h-5 h-[8px]"
                                            >
                                                <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>

                                {/* Thumbnail Slider */}
                                <div className="relative">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        watchSlidesProgress
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: thumbsPrevRef.current,
                                            nextEl: thumbsNextRef.current,
                                        }}
                                        onBeforeInit={(swiper) => {
                                            setTimeout(() => {
                                                swiper.params.navigation.prevEl = thumbsPrevRef.current;
                                                swiper.params.navigation.nextEl = thumbsNextRef.current;
                                                swiper.navigation.init();
                                                swiper.navigation.update();
                                            });
                                        }}
                                        breakpoints={{
                                            0: { slidesPerView: 3.5 },
                                            578: { slidesPerView: 4 },
                                        }}
                                        className="!overflow-visible relative"
                                    >
                                        {carImages.map((img, index) => (
                                            <SwiperSlide key={`thumb-${index}`} className="group">
                                                <div className="relative w-full 3xl:h-[150px] 2xl:h-[110px] sm:h-[90px] h-[70px] cursor-pointer bg-[#F5F9FF] rounded-[10px] overflow-hidden shadow transition-opacity duration-300 opacity-50 group-[.swiper-slide-thumb-active]:opacity-100">
                                                    <Image
                                                        src={img}
                                                        alt={`thumb-${index}`}
                                                        fill
                                                        // className="3xl:max-w-[180px] 2xl:max-w-[135px] sm:max-w-[110px] max-w-[80px] m-auto object-contain"
                                                        className="max-w-full m-auto object-cover"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* <button ref={thumbsPrevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-5 lg:h-10 h-6 bg-[rgba(46,76,153,0.9)] shadow text-white hover:bg-[#2E4C99] cursor-pointer disabled:pointer-events-none disabled:opacity-[0.2]">‹</button>
                                    <button ref={thumbsNextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-5 lg:h-10 h-6 bg-[rgba(46,76,153,0.9)] shadow text-white hover:bg-[#2E4C99] cursor-pointer disabled:pointer-events-none disabled:opacity-[0.2]">›</button> */}
                                </div>
                            </div>

                            {/* Vertical Icon Slider */}
                            <div className="w-full 3xl:w-[110px] 2xl:w-[80px] lg:w-[70px] flex justify-center max-lg:mt-[20px]">
                                <div className="3xl:h-[750px] 2xl:h-[615px] xl:h-[550px] lg:h-[490px] h-[50px] w-full relative">
                                    <button ref={verticalPrevRef} className="absolute top-0 xl:top-[-25px] left-[-15px] max-lg:bottom-0 max-xl:m-auto lg:left-1/2 -translate-x-1/2 z-10 w-4 h-4 flex text-white text-sm rounded-full cursor-pointer group disabled:pointer-events-none disabled:opacity-[0.2]">
                                        <svg width="19" height="10" viewBox="0 0 19 10" fill="none" className="group-hover:fill-[#2E4C99] fill-[rgba(0,0,0,0.5)] max-lg:rotate-[-90deg]">
                                            <path d="M9.50004 0C9.27916 0 9.05807 0.0814571 8.88945 0.244164L0.253099 8.57746C-0.0843663 8.90308 -0.0843663 9.43037 0.253099 9.75578C0.590564 10.0812 1.13703 10.0814 1.47428 9.75578L9.50004 2.01166L17.5258 9.75578C17.8633 10.0814 18.4097 10.0814 18.747 9.75578C19.0842 9.43016 19.0844 8.90287 18.747 8.57746L10.1106 0.244164C9.94201 0.0814571 9.72091 0 9.50004 0Z" />
                                        </svg>
                                    </button>
                                    <button ref={verticalNextRef} className="absolute max-lg:top-0 max-lg:m-auto bottom-0 xl:bottom-[-30px] lg:left-1/2 max-lg:right-[-25px] lg:-translate-x-1/2 z-10 w-4 h-4 flex text-white text-sm rounded-full cursor-pointer group disabled:pointer-events-none disabled:opacity-[0.2]">
                                        <svg width="19" height="10" viewBox="0 0 19 10" fill="none" className="group-hover:fill-[#2E4C99] fill-[rgba(0,0,0,0.5)] max-lg:rotate-[-90deg]">
                                            <path d="M9.50004 10C9.27916 10 9.05807 9.91854 8.88945 9.75584L0.253099 1.42254C-0.0843663 1.09692 -0.0843663 0.569632 0.253099 0.244218C0.590564 -0.0811975 1.13703 -0.0814058 1.47428 0.244218L9.50004 7.98834L17.5258 0.244218C17.8633 -0.0814058 18.4097 -0.0814058 18.747 0.244218C19.0842 0.569841 19.0844 1.09713 18.747 1.42254L10.1106 9.75584C9.94201 9.91854 9.72091 10 9.50004 10Z" />
                                        </svg>
                                    </button>
                                    <Swiper
                                        direction="vertical"
                                        slidesPerView={6}
                                        spaceBetween={10}
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: verticalPrevRef.current,
                                            nextEl: verticalNextRef.current
                                        }}
                                        onBeforeInit={(swiper) => {
                                            setTimeout(() => {
                                                swiper.params.navigation.prevEl = verticalPrevRef.current;
                                                swiper.params.navigation.nextEl = verticalNextRef.current;
                                                swiper.navigation.init();
                                                swiper.navigation.update();
                                            });
                                        }}
                                        breakpoints={{
                                            0: {
                                                direction: 'horizontal',
                                                slidesPerView: 6,
                                                spaceBetween: 5
                                            },
                                            578: {
                                                direction: 'horizontal',
                                                slidesPerView: 6,
                                                spaceBetween: 10
                                            },
                                            1024: {
                                                direction: 'vertical',
                                                spaceBetween: 15,
                                                slidesPerView: 6,
                                            },
                                        }}
                                        className="h-full"
                                    >
                                        {specIcons.map((feature, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="text-center w-full h-full rounded-[5px] lg:rounded-[10px] overflow-hidden bg-[#F5F9FF] flex items-center justify-center flex-col">
                                                    <div className="w-full">
                                                        <div className="3xl:w-[40px] 2xl:w-[35px] lg:w-[30px] w-[25px] 3xl:h-[40px] 2xl::h-[30px] lg-h-[20px] h-[22px] m-auto mb-[2px] flex">
                                                            <Image src={feature.icon} alt={feature.label} width={25} height={25} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div className="3xl:text-[20px] 2xl:text-[17px] lg:text-[14px] text-[10px] font-normal font-base1 text-black">
                                                            {feature.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="3xl:w-[400px] 2xl:w-[300px] md:w-[245px]">
                        <div className="w-full h-full">
                            <Heading size="heading3" as="div" className="text-black font-semibold md:mb-[15px] mb-[10px]">
                                Ask for the price
                            </Heading>
                            <div className="w-full 3xl:mb-[35px] mb-[25px]">
                                <div className="w-full">
                                    {SocialLinks.map((item, index) => (
                                        <div className="3xl:mb-[15px] mb-[10px] last:mb-0" key={index}>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                                                <div className="w-full 3xl:h-[55px] xl:h-[40px] h-[35px] flex items-center justify-center rounded-[10px] group" style={{ backgroundColor: item.colorCode }}>
                                                    <div className="3xl:w-[25px] 2xl:w-[20px] w-[15px] transition-all group-hover:scale-105">
                                                        <Image src={item.icon} alt={item.name} width={25} height={25} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="px-[10px]">
                                                        <div className="3xl:text-[16px] text-[14px] text-white capitalize transition-all group-hover:tracking-widest">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ReserveForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
