import Image from "next/image";
import parse, { domToReact } from "html-react-parser";
import { mediaUrl } from "@/lib/constants";

const customParserOptions = {
  replace: (domNode) => {
    if (domNode.name === "p") {
      return (
        <p className="3xl:text-[20px] 2xl:text-[18px] lg:text-[16px] text-[14px] text-[#4B4B4B] lg:mb-[30px] mb-[20px]">
          {domToReact(domNode.children)}
        </p>
      );
    }
  },
};

export default function PartnershipSection({ title, description, image, alt, brandCount }) {
  console.log("PartnershipSection rendered with title:", description);
  return (
    <section className="w-full h-auto xl:pt-[80px] lg:pt-[40px] pt-[20px] lg:pb-[90px] pb-[20px]">
      <div className="container">
        <div className="relative w-full">
          <div className="md:w-[50%] w-full md:float-left xl:mb-[20px] mb-[15px] 3xl:mr-[70px] xl:mr-[50px] mr-[30px]">
            <div className="w-full relative rounded-[10px] overflow-hidden">
              <Image
                src={image ? `${mediaUrl}${image}` : "/images/brand.webp"}
                alt={alt ? alt : "brand"}
                width={810}
                height={466}
                className="w-full h-auto object-cover"
              />
              <div
                className="absolute bottom-0 right-0 3xl:pt-[30px] 2xl:pt-[20px] xl:pt-[15px] pt-[10px] 3xl:pr-[35px] 2xl:pr-[25px] xl:pr-[20px] pr-[15px] 3xl:pb-[40px] 2xl:pb-[30px] xl:pb-[20px] pb-[15px] 3xl:pl-[50px] 2xl:pl-[40px] xl:pl-[30px] pl-[20px] rounded-tl-[10px] rounded-br-[10px]"
                style={{
                  background: "linear-gradient(180deg, #2E4C99 0%, #0E1D44 100%)",
                }}
              >
                <div className="3xl:text-[100px] 2xl:text-[80px] xl:text-[60px] 2xs:text-[35px] text-[25px] text-white font-bold mb-[10px] leading-none">
                  {brandCount}
                  <span className="text-[#BE1E2D]">+</span>
                </div>
                <div className="3xl:text-[40px] 2xl:text-[30px] xl:text-[22px] 2xs:text-[16px] text-[14px] text-white leading-none">Brands</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="3xl:text-[50px] 2xl:text-[40px] xl:text-[30px] lg:text-[25px] 3xs:text-[20px] text-[18px] 3xl:mb-[30px] 2xl:mb-[20px] 3xs:mb-[15px] mb-[10px] uppercase font-semibold font-barlow">
              {title ? title : "Trusted Brand Partnership"}
            </h2>
            {description && parse(description, customParserOptions)}
          </div>
        </div>
      </div>
    </section>
  );
}
