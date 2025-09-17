import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/layout/Text";

export default function ContactSection({ backgroundImage, description, title, alt = "alt", buttonText = "", buttonLink = "/" }) {
  return (
    <section className="w-full h-auto 2xl:pb-[130px] xl:pb-[90px] md:pb-[60px] sm:pb-[40px] pb-[30px] block">
      <div className="container">
        <div className="w-full h-auto 2xl:p-[110px_75px] xl:p-[70px_50px] md:p-[40px_30px] sm:p-[30px_20px] p-[20px_15px] bg-[#07163D] rounded-[10px] overflow-hidden flex flex-wrap relative z-0 group">
          <div className="absolute -z-1 top-0 right-0 sm:w-[70%] w-[50%] h-full overflow-hidden before:content-[''] before:absolute before:z-1 before:left-0 before:top-0 before:w-[50%] before:h-full before:bg-[linear-gradient(270deg,_rgba(7,22,61,0)_0%,_#07163D_100%)]">
            <Image
              src={backgroundImage ? `${backgroundImage}` : "/images/contact_bg.svg"}
              alt="Contact Background"
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 transition-all duration-500 ease-in-out"
            />
          </div>
          <div className="absolute -z-1 top-0 left-0 sm:w-[25%] w-[50%] h-full pointer-events-none">
            <Image src="/images/contact_bg.svg" alt="contact background" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="w-full h-auto block">
            <Text
              size="text1"
              as="p"
              className="2xl:text-[20px] md:text-[16px] text-[14px] leading-[1.5] font-normal text-white md:mb-[10px] mb-[5px]"
            >
              {description ? description : "Get in touch with us for any inquiries or support."}
            </Text>
            <div className="text-[18px] sm:text-[22px] lg:text-[25px] xl:text-[30px] 2xl:text-[45px] 3xl:text-[50px] leading-none font-semibold font-base1 uppercase text-white mb-[10px]">
              {title ? title : "Contact Us"}
            </div>
            <Link
              href={ buttonLink ? buttonLink : "/contact"}
              aria-label="get in touch"
              className="2xl:text-[16px] md:text-[12px] text-[11px] leading-normal font-medium text-white min-w-[70px] w-fit 2xl:h-[40px] md:h-[30px] 2xl:p-[10px_20px] sm:p-[7px_15px] p-[5px_10px] 2xl:mt-[25px] mt-[15px] rounded-[5px] bg-[#BE1E2D] flex items-center justify-center hover:bg-[#e4f0fe] hover:text-[#BE1E2D] transition-colors duration-300 ease-in-out"
              color="black"
            >
              {buttonText ? buttonText : "Get in Touch"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
