import Link from 'next/link'
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

const item = {
    title: "Contact Us Today!",
    description: "Leadership & Team",
    backgroundImage: "/images/contact_section.webp"
}

export default function ContactSection() {
    return (
        <section className="w-full h-auto 2xl:pb-[130px] xl:pb-[90px] md:pb-[60px] sm:pb-[40px] pb-[30px] block">
            <div className="container">
                <div className="w-full h-auto 2xl:p-[110px_75px] xl:p-[70px_50px] md:p-[40px_30px] sm:p-[30px_20px] p-[20px_15px] bg-[#07163D] rounded-[10px] overflow-hidden flex flex-wrap relative z-0">
                    <div className="absolute -z-1 top-0 right-0 sm:w-[70%] w-[50%] h-full before:content-[''] before:absolute before:z-1 before:left-0 before:top-0 before:w-[50%] before:h-full before:bg-[linear-gradient(270deg,_rgba(7,22,61,0)_0%,_#07163D_100%)]">
                        <Image
                            src={item.backgroundImage}
                            alt="Contact Background"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute -z-1 top-0 left-0 sm:w-[25%] w-[50%] h-full pointer-events-none">
                        <Image
                            src="/images/contact_bg.svg"
                            alt="contact background"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="w-full h-auto block">
                        <Text
                            size="text1"
                            as="p"
                            className="2xl:text-[20px] md:text-[16px] text-[14px] leading-[1.5] font-normal text-white md:mb-[10px] mb-[5px]"
                        >
                            {item.description}
                        </Text>
                        <Heading
                            size={"heading4"}
                            as="h2"
                            className="leading-none font-semibold uppercase text-white mb-[10px]"
                        >
                            {item.title}
                        </Heading>
                        <Link
                            href="#"
                            aria-label="get in touch"
                            className="2xl:text-[16px] md:text-[12px] text-[11px] leading-normal font-medium text-white min-w-[70px] w-fit 2xl:h-[40px] md:h-[30px] 2xl:p-[10px_20px] sm:p-[7px_15px] p-[5px_10px] 2xl:mt-[25px] mt-[15px] rounded-[5px] bg-[#BE1E2D] flex items-center justify-center hover:bg-[rgba(190,30,45,0.8)] transition-colors duration-300 ease-in-out"
                            color="black"
                        >
                            GET IN TOUCH
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}