import Image from "next/image";
import React from "react";

function SocialMediaSections({ socialmedias = [] }) {
  return (
    <div className="flex flex-wrap items-center lg:justify-start sm:justify-center justify-start 2xl:pl-[90px] xl:pl-[45px] xl:mt-[0px] mt-[20px] lg:w-auto w-full xl:mx-0 mx-auto">
      {socialmedias?.map((media) => (
        <a
          key={media?.id}
          href={media?.link ? media?.link : "#"}
          className="2xl:pr-[25px] xl:pr-[15px] pr-[10px] transition-all duration-500 hover:scale-110"
          target="_blank"
        >
          <Image
            src={media?.logo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${media?.logo}` : "/images/insta.webp"}
            alt={media?.title ? media?.title : "logo"}
            width="46"
            height="46"
            className=" block object-contain 3xl:w-[46px] 3xl:h-[46px] 2xl:w-[40px] 2xl:h-[40px] xl:w-[30px] xl:h-[30px] w-[25px] h-[25px]"
          />
        </a>
      ))}
    </div>
  );
}

export default SocialMediaSections;
