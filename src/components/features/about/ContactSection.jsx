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
        <section className="w-full h-auto pb-[130px] block">
            <div className="container">
                <div className="w-full h-auto p-[110px_75px] bg-[#07163D] rounded-[10px] overflow-hidden flex flex-wrap relative z-0">
                    <div className="absolute -z-1 top-0 right-0 w-[70%] h-full before:content-[''] before:absolute before:z-1 before:left-0 before:top-0 before:w-[50%] before:h-full before:bg-[linear-gradient(270deg,_rgba(7,22,61,0)_0%,_#07163D_100%)]">
                        <Image
                            src={item.backgroundImage}
                            alt="Contact Background"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute -z-1 top-0 left-0 w-[25%] h-full">
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
                            className="text-[20px] leading-[1.5] font-normal text-white"
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
                            className=" text-[16px] leading-normal font-medium text-white min-w-[70px] sm:min-w-[120px] xl:min-w-[140px] 3xl:min-w-[145px] w-fit h-[40px] p-[10px_20px] mt-[25px] rounded-[5px] bg-[#BE1E2D] flex items-center justify-center hover:bg-[rgba(190,30,45,0.8)] transition-colors duration-300 ease-in-out"
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