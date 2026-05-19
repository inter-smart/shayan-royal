import { Heading } from "@/components/layout/Heading";
import Image from "next/image";

export default function InnerBanner({ title, image, mobileImage, alt = "InnerBanner" }) {
  return (
    <section
      className="w-full 3xl:h-[650px] 2xl:h-[550px] xl:h-[440px] md:h-[380px] h-[320px] 
            3xl:pb-[50px]   pb-[30px] block relative z-0
            before:content-[''] before:absolute before:-z-[1] before:bottom-0 before:left-0 
            before:w-full before:h-1/2 before:bg-gradient-to-b before:from-transparent before:to-black before:opacity-75 
            before:pointer-events-none 
            after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-2/4 
            after:bg-[linear-gradient(180deg,_#000_43.28%,_rgba(0,0,0,0)_100%)] after:z-01 after:opacity-70"
    >
      <picture className="w-full h-full">
        <source media="(max-width: 640px)" srcSet={mobileImage || "/images/about_banner.webp"}></source>
        <Image src={image} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} className="-z-2" priority />
      </picture>
      <div className="container w-full h-full">
        <div className="w-full h-full flex items-end">
          <Heading size="heading2" as="h1" className="!font-bold uppercase text-white">
            {title}
          </Heading>
        </div>
      </div>
    </section>
  );
}
