import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
import parse from "html-react-parser";
import { mediaUrl } from "@/lib/constants";
export default function MarketSection({ title, description, image }) {
  return (
    <section className="w-full h-auto 2xl:py-[120px] xl:py-[75px] md:py-[50px] py-[40px] block">
      <div className="container">
        <div className="mb-[10px]">
          <Heading size={"heading2"} as="h2" className="leading-none font-semibold text-center uppercase text-black mb-[10px]">
            {title || "Market Section"}
          </Heading>
          <Text size="text1" as="p" className="leading-[1.5] font-normal text-black text-center">
            {description
              ? parse(description)
              : "The reasons to choose shayan royal lorem Ipsum has been the industry's standard dummy text ever since"}
          </Text>
        </div>
        <div className="2xl:w-[1225px] xl:w-[815px] md:w-[740px] sm:w-[580px] w-[280px] h-auto aspect-1225/750 m-auto block">
          <Image
            src={image ? `${mediaUrl}${image}` : "/images/market_map_bg1.svg"}
            alt="Market Map"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
