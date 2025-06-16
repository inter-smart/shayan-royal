import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import Image from "next/image";
export default function MarketSection() {
    return (
        <section className="w-full h-auto p-[120px_0_110px_0] block">
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
                        className="text-[20px] leading-[1.5] font-normal text-black text-center"
                    >
                        The reasons to choose shayan royal lorem Ipsum has been the industry's standard dummy text ever since
                    </Text>
                </div>
                <div className="w-[80%] h-full m-auto block">
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