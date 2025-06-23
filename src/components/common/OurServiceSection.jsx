import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";


export default function OurServiceSection({image, title, description1, description2}) {
    return (
        <section className="w-full h-auto block 3xl:py-[80px_135px] 2xl:py-[60px_100px] xl:py-[50px_80px] md:py-[40px_60px] py-[20px_40px]">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-[50%]">
                        <div className="w-full md:h-full sm:h-[280px] h-[220px] max-md:mb-[25px] max-sm:mb-[20px] rounded-[10px] overflow-hidden block relative z-0">
                            <Image
                                src={image}
                                alt="Service"
                                fill
                                style={{ objectFit: "cover" }}
                                className="hover:scale-105 transition-all duration-500 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-[50%] 3xl:pl-[60px] lg:pl-[40px] md:pl-[20px]">
                        <Heading
                            as="h2"
                            className="3xl:text-[50px] 2xl:text-[38px] lg:text-[32px] md:text-[26px] sm:text-[22px] text-[18px] text-black uppercase font-semibold leading-none font-base1 2xl:mb-[20px] sm:mb-[15px] mb-[10px]"
                        >
                            {title}
                        </Heading>
                        <Text
                            as="p"
                            className="3xl:text-[20px] 2xl:text-[16px] sm:text-[14px] text-[13px] leading-[1.3] font-normal text-[#4B4B4B] 2xl:mb-[30px] lg:mb-[15px] mb-[10px]"
                        >
                            {description1}
                        </Text>
                        <Text
                            as="p"
                            className="3xl:text-[20px] 2xl:text-[16px] sm:text-[14px] text-[13px] leading-[1.3] font-normal text-[#4B4B4B]"
                        >
                            {description2}
                        </Text>
                    </div>
                </div>
            </div>
        </section>
    );
} 
