import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
export default function MarketSection() {
    return (
        <section className="w-full h-auto 2xl:py-[120px] xl:py-[75px] md:py-[50px] py-[40px] block">
            <div className="container">
                <div className="mb-[10px]">
                    <Heading
                        size={"heading4"}
                        as="h2"
                        className="leading-none font-semibold text-center uppercase text-black mb-[10px]"
                    >
                        Market Specialization
                    </Heading>
                    <Text
                        size="text1"
                        as="p"
                        className="leading-[1.5] font-normal text-black text-center"
                    >
                        The reasons to choose shayan royal lorem Ipsum has been the industry's standard dummy text ever since
                    </Text>
                </div>
                <div className="2xl:w-[1225px] xl:w-[815px] md:w-[740px] sm:w-[580px] w-[280px] h-auto aspect-1225/750 m-auto block">
                    <Image
                        src="/images/market_map_bg.svg"
                        alt="Market Map"
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );

}