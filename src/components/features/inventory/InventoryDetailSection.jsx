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
import { mediaUrl } from "@/lib/constants";
import StickyMobileCTA from "@/components/common/StickyMobileCTA";

const carDetails = [
  {
    carName: "Camry Hybrid",
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
    link: "tel:+1234567890",
  },
  {
    icon: "/images/email.png",
    name: "Email",
    colorCode: "#BE1E2D",
    link: "mailto:someone@example.com",
  },
  {
    icon: "/images/whtap.png",
    name: "Whatsapp",
    colorCode: "#25D366",
    link: "https://wa.me/1234567890",
  },
];

export default function InventoryDetailSection({ carDetails, specs, contactData = SocialLinks, price }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const thumbsPrevRef = useRef(null);
  const thumbsNextRef = useRef(null);
  const verticalPrevRef = useRef(null);
  const verticalNextRef = useRef(null);
  const carImages = carDetails?.images;

  useEffect(() => {
    // Delay update to ensure refs are mounted
  }, []);

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA contactData={contactData} />

      <section className="w-full h-auto block 3xl:py-[40px_100px] xl:py-[30px_50px] sm:py-[20px_30px] py-[15px_30px] overflow-hidden">
        <div className="container">
          <Heading size="heading2" as="h2" className="text-black uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] md:mb-[15px] mb-[10px]">
            {carDetails?.carName}
          </Heading>
          <div className="flex flex-wrap w-full">
            <div className="3xl:w-[calc(100%-400px)] 2xl:w-[calc(100%-300px)] xl:w-[calc(100%-275px)]  md:w-[calc(100%-245px)] w-full 3xl:pr-[50px] 2xl:pr-[40px] md:pr-[30px] max-md:mb-[15px]">
              <div className="flex flex-col lg:flex-row w-full">
                {/* Main Slider */}
                <div
                  className="w-full 3xl:w-[calc(100%-110px)] 2xl:w-[calc(100%-80px)] lg:w-[calc(100%-70px)] 3xl:mr-[50px] mr-[30px] overflow-hidden relative
                 "
                >
                  {/* <div className="absolute 3xl:top-[50px] md:top-[30px] top-[15px] 3xl:left-[50px] md:left-[30px] left-[15px] flex items-center 3xl:p-[15px] 2xl:p-[10px]
                                 p-[5px] bg-[#2E4C99] rounded-[10px] z-9">
                                    <div className="3xl:w-[30px] 2xl:w-[25px] w-[20px] flex">
                                        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" >
                                            <path d="M31.2475 8.04021H29.0275L28.446 4.64112C28.0512 2.31382 26.0505 0.624573 23.6884 0.624573H10.3561C7.99414 0.624573 5.99297 2.31382 5.59785 4.64193L5.52437 5.07978C5.48068 5.34096 5.65669 5.58817 5.91772 5.632C6.18111 5.67584 6.42625 5.49969 6.46994 5.23865L6.54327 4.80161C6.85969 2.9368 8.46318 1.58331 10.356 1.58331H23.6883C25.5811 1.58331 27.1845 2.9368 27.5009 4.8022L28.2047 8.91584V9.70335C27.925 9.69298 6.12241 9.69283 5.83946 9.70335V8.9154L6.04776 7.69739C6.09241 7.43651 5.91699 7.18871 5.6561 7.14407C5.3958 7.09957 5.14742 7.27469 5.10278 7.53573L5.0165 8.04021H2.79673C1.56592 8.04021 0.564453 9.04169 0.564453 10.2725C0.564453 11.4153 1.42809 12.3588 2.53673 12.4883C2.43809 12.962 2.46281 12.5357 2.46281 18.9154C1.81482 19.1205 1.34071 19.7204 1.34071 20.4354C1.34071 21.2785 1.99745 21.9639 2.82497 22.0251V23.977C2.82497 24.8093 3.50216 25.4863 4.33446 25.4863H8.53798C9.37029 25.4863 10.0473 24.8093 10.0473 23.977V22.037H24.3589V23.977C24.3589 24.8093 25.0361 25.4863 25.8684 25.4863H30.0718C30.9041 25.4863 31.5812 24.8093 31.5812 23.977V21.9556C32.2293 21.7504 32.7035 21.1505 32.7035 20.4354C32.7035 19.7204 32.2294 19.1205 31.5812 18.9154C31.5812 12.7817 31.6097 12.9798 31.5073 12.4883C32.616 12.3589 33.4796 11.4153 33.4796 10.2725C33.4797 9.04169 32.4783 8.04021 31.2475 8.04021ZM5.97016 10.6554H28.074C29.4792 10.6554 30.6227 11.7987 30.6227 13.2039V13.4608H27.3549C26.3978 13.4608 25.6192 14.2394 25.6192 15.1965C25.6192 16.5752 26.7408 17.6969 28.1192 17.6969H30.6227V18.8339H3.42162V17.6969H6.68935C7.64647 17.6969 8.42508 16.9181 8.42508 15.9609C8.42508 14.5824 7.3035 13.4607 5.92486 13.4607H3.42162V13.2039C3.42162 11.7987 4.5649 10.6554 5.97016 10.6554ZM30.6227 14.4195V16.7382H28.1193C27.2695 16.7382 26.5779 16.0467 26.5779 15.1966C26.5779 14.7681 26.9265 14.4195 27.355 14.4195H30.6227ZM3.42162 16.7382V14.4195H5.92493C6.77489 14.4195 7.46641 15.111 7.46641 15.961C7.46641 16.3897 7.11786 16.7382 6.68935 16.7382H3.42162ZM1.52327 10.2725C1.52327 9.57015 2.09454 8.99888 2.79688 8.99888H4.88095V9.87208C4.02003 10.1543 3.3046 10.7598 2.88087 11.5461H2.79688C2.09454 11.5461 1.52327 10.9748 1.52327 10.2725ZM9.08873 23.977C9.08873 24.2806 8.84175 24.5276 8.53805 24.5276H4.33461C4.03099 24.5276 3.78378 24.2807 3.78378 23.977V22.037H9.08873V23.977ZM30.6227 23.977C30.6227 24.2806 30.3756 24.5276 30.0719 24.5276H25.8685C25.5649 24.5276 25.3177 24.2807 25.3177 23.977V22.037H30.6227V23.977H30.6227ZM31.745 20.4354C31.745 20.7899 31.4566 21.0783 31.1021 21.0783C25.3572 21.0783 8.56622 21.0783 2.94229 21.0783C2.58792 21.0783 2.2996 20.7899 2.2996 20.4354C2.2996 20.081 2.58799 19.7927 2.94229 19.7927H31.1021C31.4566 19.7927 31.745 20.081 31.745 20.4354ZM31.2475 11.5461H31.1635C30.7397 10.7598 30.0243 10.1544 29.1635 9.87215V8.99895H31.2475C31.9497 8.99895 32.5212 9.57022 32.5212 10.2726C32.5211 10.9748 31.9497 11.5461 31.2475 11.5461Z" fill="white" />
                                            <path d="M11.5639 17.9432H22.4792C23.3633 17.9432 24.0823 17.2242 24.0823 16.3402V13.1489C24.0823 12.265 23.3633 11.546 22.4792 11.546H11.5639C10.68 11.546 9.96094 12.265 9.96094 13.1489V16.3402C9.96094 17.2242 10.68 17.9432 11.5639 17.9432ZM10.9196 13.1489C10.9196 12.7936 11.2086 12.5046 11.5639 12.5046H22.4792C22.8347 12.5046 23.1236 12.7936 23.1236 13.1489V16.3402C23.1236 16.6956 22.8347 16.9845 22.4792 16.9845H11.5639C11.2086 16.9845 10.9196 16.6956 10.9196 16.3402V13.1489Z" fill="white" />
                                            <path d="M12.5496 14.2502H21.491C21.7557 14.2502 21.9704 14.0357 21.9704 13.7709C21.9704 13.5061 21.7557 13.2916 21.491 13.2916H12.5496C12.2849 13.2916 12.0703 13.5061 12.0703 13.7709C12.0703 14.0357 12.2849 14.2502 12.5496 14.2502Z" fill="white" />
                                            <path d="M20.4339 15.239H13.6121C13.3474 15.239 13.1328 15.4536 13.1328 15.7183C13.1328 15.9831 13.3474 16.1977 13.6121 16.1977H20.4339C20.6986 16.1977 20.9133 15.9831 20.9133 15.7183C20.9133 15.4536 20.6986 15.239 20.4339 15.239Z" fill="white" />
                                        </svg>
                                    </div>
                                    <span className="3xl:text-[20px] text-[15px] text-white w-[calc(100%-30px)] 3xl:px-[15px] 2xl:px-[10px] px-[5px]">{carDetails[0].model}</span>
                                </div> */}
                  <div className="relative w-full 3xl:h-[calc(100%-200px)] 2xl:h-[calc(100%-160px)] sm:h-[calc(100%-140px)] h-[calc(100%-120px)] sm:mb-[20px] mb-[10px]">
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
                      className="border border-[rgba(46,76,153,0.3)] rounded-[10px] w-full h-full"
                    >
                      {carImages?.map((img, index) => (
                        <SwiperSlide key={index}>
                          {/* <div className="relative w-full 3xl:h-[570px] 2xl:h-[465px] xl:h-[425px] sm:h-[370px] 3xs:h-[230px] h-[200px] bg-white"> */}
                          <div className="relative w-full h-full bg-white">
                            {/* <Image
                                                    src={img}
                                                    alt={`car-${index}`}
                                                    fill
                                                    className="2xl:max-w-[900px] lg:max-w-[650px] max-w-[300px] w-full h-full object-contain m-auto"
                                                /> */}
                            <div className="w-full h-full aspect-[16/9]">
                              <Image
                                src={img ? `${mediaUrl}${img}` : "/images/no-image.png"}
                                alt={`car-${index}`}
                                fill
                                className="max-w-full w-full h-full object-cover m-auto"
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* Navigation Arrows */}
                    <div
                      className="absolute top-[45%] left-0 right-0 flex items-center justify-between  w-full z-10 
                                            pointer-events-none"
                    >
                      <button
                        className="navBtn-prev pointer-events-auto bg-white rounded-full shadow 
                                            w-[20px] md:w-10 md:h-10 h-[20px]
                                                flex items-center justify-center group hover:bg-[#2E4C99] relative left-[5px] md:left-[10px] cursor-pointer disabled:opacity-[0.5]"
                      >
                        <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 w-[7px] md:w-2 md:h-5 h-[8px]">
                          <path d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834" stroke="black" />
                        </svg>
                      </button>
                      <button
                        className="navBtn-next pointer-events-auto bg-white rounded-full shadow  w-[20px] md:w-10 md:h-10 h-[20px]
                                            flex items-center justify-center group hover:bg-[#2E4C99] relative right-[5px] md:right-[10px] cursor-pointer disabled:opacity-[0.5]"
                      >
                        <svg viewBox="0 0 7 13" fill="none" className="group-hover:invert-100 w-[7px] md:w-2 md:h-5 h-[8px]">
                          <path d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834" stroke="black" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Slider */}
                  <div className="relative 3xl:h-[170px] 2xl:h-[130px] xl:h-[110px] 3xs:h-[80px] h-[50px] ">
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
                      className="!overflow-visible relative w-full h-full"
                    >
                      {carImages?.map((img, index) => (
                        <SwiperSlide key={`thumb-${index}`} className="group">
                          <div
                            className="relative w-full h-full cursor-pointer bg-[#F5F9FF] aspect-[4/4]
                                               rounded-[5px]  lg:rounded-[10px] overflow-hidden shadow transition-opacity duration-00 opacity-90 group-[.swiper-slide-thumb-active]:opacity-100"
                          >
                            <Image
                              src={img ? `${mediaUrl}${img}` : "/images/no-image.png"}
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
                    <button
                      ref={verticalPrevRef}
                      className="absolute top-0 xl:top-[-25px] left-[-15px] max-lg:bottom-0 max-xl:m-auto lg:left-1/2 -translate-x-1/2 z-10 w-4 h-4 flex text-white text-sm rounded-full cursor-pointer group disabled:pointer-events-none disabled:opacity-[0.2]"
                    >
                      <svg
                        width="19"
                        height="10"
                        viewBox="0 0 19 10"
                        fill="none"
                        className="group-hover:fill-[#2E4C99] fill-[rgba(0,0,0,0.5)] max-lg:rotate-[-90deg]"
                      >
                        <path d="M9.50004 0C9.27916 0 9.05807 0.0814571 8.88945 0.244164L0.253099 8.57746C-0.0843663 8.90308 -0.0843663 9.43037 0.253099 9.75578C0.590564 10.0812 1.13703 10.0814 1.47428 9.75578L9.50004 2.01166L17.5258 9.75578C17.8633 10.0814 18.4097 10.0814 18.747 9.75578C19.0842 9.43016 19.0844 8.90287 18.747 8.57746L10.1106 0.244164C9.94201 0.0814571 9.72091 0 9.50004 0Z" />
                      </svg>
                    </button>
                    <button
                      ref={verticalNextRef}
                      className="absolute max-lg:top-0 max-lg:m-auto bottom-0 xl:bottom-[-30px] lg:left-1/2 max-lg:right-[-25px] lg:-translate-x-1/2 z-10 w-4 h-4 flex text-white text-sm rounded-full cursor-pointer group disabled:pointer-events-none disabled:opacity-[0.2]"
                    >
                      <svg
                        width="19"
                        height="10"
                        viewBox="0 0 19 10"
                        fill="none"
                        className="group-hover:fill-[#2E4C99] fill-[rgba(0,0,0,0.5)] max-lg:rotate-[-90deg]"
                      >
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
                        nextEl: verticalNextRef.current,
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
                          direction: "horizontal",
                          slidesPerView: 6,
                          spaceBetween: 5,
                        },
                        578: {
                          direction: "horizontal",
                          slidesPerView: 6,
                          spaceBetween: 10,
                        },
                        1024: {
                          direction: "vertical",
                          spaceBetween: 15,
                          slidesPerView: 6,
                        },
                      }}
                      className="h-full"
                    >
                      {specs?.map((feature, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="text-center w-full h-full rounded-[5px] lg:rounded-[10px] overflow-hidden bg-[#F5F9FF] flex items-center justify-center flex-col">
                            <div className="w-full">
                              <div className="3xl:w-[40px] 2xl:w-[35px] lg:w-[30px] w-[25px] 3xl:h-[40px] 2xl::h-[30px] lg-h-[20px] h-[22px] m-auto mb-[2px] flex">
                                <Image src={`${feature?.icon}`} alt={feature} width={25} height={25} className="w-full h-full object-contain" />
                              </div>
                              <div className="3xl:text-[20px] 2xl:text-[17px] lg:text-[14px] text-[10px] font-normal font-base1 text-black">
                                {feature?.label}
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
            <div className="3xl:w-[400px] 2xl:w-[300px] xl:w-[275px]  md:w-[245px] w-full">
              <div className="w-full h-full">
                <Heading size="heading3" as="div" className="text-black font-semibold md:mb-[15px] mb-[10px] hidden md:block">
                  {price ? `AED ${price}` : "Ask for the price"}
                </Heading>
                <div className="w-full 3xl:mb-[35px] mb-[25px] hidden md:block">
                  <div className="w-full">
                    {contactData?.map((item, index) => (
                      <div className="3xl:mb-[15px] mb-[10px] last:mb-0" key={index}>
                        <a href={item?.link ? item.link : "#"} target="_blank" rel="noopener noreferrer" className="block">
                          <div
                            className="w-full 3xl:h-[55px] xl:h-[40px] h-[35px] flex items-center justify-center rounded-[10px] group"
                            style={{ backgroundColor: item.colorCode }}
                          >
                            <div className="3xl:w-[25px] 2xl:w-[20px] w-[15px] transition-all group-hover:scale-105">
                              <Image src={item?.icon} alt={item.name} width={25} height={25} className="w-full h-full object-contain" />
                            </div>
                            <div className="px-[10px]">
                              <div className="3xl:text-[16px] text-[14px] text-white capitalize transition-all group-hover:tracking-widest">
                                {item?.name}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <ReserveForm /> */}
                <div className="relative bg-[#F5F9FF] rounded-[10px] p-[15px_20px] 3xl:px-[20px] px-[15px] shadow-2xl overflow-hidden">
                  <Heading size="heading5" as="div" className="text-black uppercase font-semibold xl:mb-[10px]">
                    Reserve Your Ride
                  </Heading>
                  <iframe
                    aria-label="Reserve Your Ride"
                    frameborder="0"
                    className="w-full h-full min-h-[370px] md:min-h-[350px] xl:min-h-[370px] 2xl:min-h-[370px] 3xl:min-h-[410px] !bg-[#F5F9FF]"
                    src={`https://forms.zohopublic.com/shayanroyalgeneraltradingllc/form/ReserveYourRide/formperma/loe0YejjSZ42uy-lJjv2mgfhpKrx_H-Y9KhPpdVtNvA?srcode=${carDetails?.sr_code}`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
