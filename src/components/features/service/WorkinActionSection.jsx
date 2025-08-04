"use client";

import { mediaUrl } from "@/lib/constants";
import Image from "next/image";

function ImageBox({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden xs:rounded-[10px] rounded-[5px] w-full h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-full object-cover xs:rounded-[10px] rounded-[5px] transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>
  );
}

const workImages = [
  { image: "/images/w1.webp", alt: "Work Image" },
  { image: "/images/w2.webp", alt: "Work Image" },
  { image: "/images/w3.webp", alt: "Work Image" },
  { image: "/images/w4.webp", alt: "Work Image" },
  { image: "/images/w5.webp", alt: "Work Image" },
  { image: "/images/w6.webp", alt: "Work Image" },
  { image: "/images/w7.webp", alt: "Work Image" },
];

export default function WorkinActionSection({ gallery = workImages }) {
  return (
    <section className="w-full bg-[#F5F9FF] 2xl:pt-[105px] lg:pt-[60px] pt-[40px] 2xl:pb-[130px] lg:pb-[80px] pb-[60px] relative">
      <div className="absolute z-0 top-0 left-[-20%] right-0 mx-auto w-[50%]">
        <Image src="/images/work-bg.webp" alt="bg" width={1014} height={836} className="w-full h-auto object-cover" />
      </div>
      <div className="container">
        <h2 className="text-center 2xl:text-[50px] xl:text-[40px] lg:text-[30px] text-[24px] font-semibold font-base1 uppercase 2xl:mb-[50px] lg:mb-[30px] mb-[20px]">
          GALLERY
        </h2>

        {/* <div className="flex xs:flex-nowrap flex-wrap 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1 w-full relative">
          <div className="xs:w-3/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={workImages[0].image} alt={workImages[0].alt} className="aspect-[393/387]" />
            <ImageBox src={workImages[3].image} alt={workImages[3].alt} className="aspect-[393/581]" />
          </div>

          <div className="xs:w-6/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={workImages[1].image} alt={workImages[1].alt} className="aspect-[4/3]" />
            <div className="grid grid-cols-2 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1 w-full">
              <ImageBox src={workImages[4].image} alt={workImages[4].alt} className="aspect-[1] w-full" />
              <ImageBox src={workImages[5].image} alt={workImages[5].alt} className="aspect-[1] w-full" />
            </div>
          </div>

          <div className="xs:w-3/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={workImages[2].image} alt={workImages[2].alt} className="aspect-[393/581]" />
            <ImageBox src={workImages[6].image} alt={workImages[6].alt} className="aspect-[393/387]" />
          </div> 
        </div> */}
        <div className="flex xs:flex-nowrap flex-wrap 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1 w-full relative">
          {/* Column 1 */}
          <div className="xs:w-3/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={gallery[0].image ? `${mediaUrl}${gallery[0].image}` : ""} alt={gallery[0].alt} className="aspect-[393/387]" />
            <ImageBox src={gallery[1].image ? `${mediaUrl}${gallery[1].image}` : ""} alt={gallery[1].alt} className="aspect-[393/581]" />
          </div>

          {/* Column 2 */}
          <div className="xs:w-6/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={gallery[2].image ? `${mediaUrl}${gallery[2].image}` : ""} alt={gallery[2].alt} className="aspect-[4/3]" />
            <div className="grid grid-cols-2 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1 w-full">
              <ImageBox src={gallery[3].image ? `${mediaUrl}${gallery[3].image}` : ""} alt={gallery[3].alt} className="aspect-[1] w-full" />
              <ImageBox src={gallery[4].image ? `${mediaUrl}${gallery[4].image}` : ""} alt={gallery[4].alt} className="aspect-[1] w-full" />
            </div>
          </div>

          {/* Column 3 */}
          <div className="xs:w-3/12 w-full flex flex-col 3xl:gap-5 2xl:gap-4 xs:gap-2 gap-1">
            <ImageBox src={gallery[5].image ? `${mediaUrl}${gallery[5].image}` : ""} alt={gallery[5].alt} className="aspect-[393/581]" />
            <ImageBox src={gallery[6].image ? `${mediaUrl}${gallery[6].image}` : ""} alt={gallery[6].alt} className="aspect-[393/387]" />
          </div>
        </div>
      </div>
    </section>
  );
}
