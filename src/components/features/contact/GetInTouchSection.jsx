import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
import ContactInfo from "./ContactInfo";
import EnquiryForm from "./EnquiryForm";

const item = {
    title: "Get in Touch with Us",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent,",
    backgroundImage: "/images/contact_enquiry_banner.webp"
}

const socialLinks = [
    {
        icon: "/images/sociallinks_1.svg",
        url: "#"
    },
    {
        icon: "/images/sociallinks_2.svg",
        url: "#"
    },
    {
        icon: "/images/sociallinks_3.svg",
        url: "#"
    },
    {
        icon: "/images/sociallinks_4.svg",
        url: "#"
    },
    {
        icon: "/images/sociallinks_5.svg",
        url: "#"
    },
];

export default function GetInTouchSection() {
    return (
        <section className="w-full h-auto 3xl:py-[100px_135px] 2xl:py-[80px_100px] lg:py-[65px_90px] sm:py-[50px_60px] py-[40px] block">
            <div className="container">
                <div className="2xl:mb-[50px] lg:mb-[30px] sm:mb-[20px] flex flex-wrap items-center">
                    <div className="lg:w-[30%] max-lg:w-[50%] max-sm:w-full 3xl:pr-[50px] lg:pr-[30px] max-lg:mb-[25px] max-md:mb-[15px]">
                        <Heading
                            as="h2"
                            className="3xl:text-[40px] 2xl:text-[32px] lg:text-[25px] md:text-[20px] sm:text-[18px] text-black uppercase font-semibold leading-none 2xl:mb-[20px] lg:mb-[10px] md:mb-[15px] mb-[10px]"
                        >
                            {item.title}
                        </Heading>
                        <Text
                            size="text1"
                            as="p"
                            className="leading-[1.5] font-normal text-black"
                        >
                            {item.description}
                        </Text>
                    </div>
                    <div className="w-full lg:w-[70%]">
                        <ContactInfo />
                    </div>
                </div>
                <div className="w-full h-auto 2xl:p-[15px] p-[10px] relative z-0">
                    <div className="w-full h-full absolute -z-1 inset-0">
                        <Image
                            src={item.backgroundImage}
                            alt="Enquiry Banner"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="3xl:max-w-[575px] lg:max-w-[380px] bg-[rgb(7,22,61,0.8)] 3xl:p-[40px] sm:p-[30px] p-[15px] ml-auto">
                        <EnquiryForm />
                    </div>
                    <div className="3xl:w-[calc(100%-590px)] lg:w-[calc(100%-390px)] w-full h-auto max-lg:px-[30px] max-sm:px-[15px] 2xl:py-[30px] sm:py-[20px] py-[15px] bg-[rgb(7,22,61,0.8)] flex max-sm:flex-wrap items-center justify-center lg:absolute z-1 2xl:bottom-[15px] lg:bottom-[10px] left-0">
                        <div className="3xl:text-[40px] 2xl:text-[30px] lg:text-[25px] sm:text-[20px] text-[16px] leading-[1] font-semibold text-white max-lg:w-[100%] 3xl:pr-[80px] lg:pr-[50px] mb-[15px] sm:mb-[0]">
                            FOLLOW US ON
                        </div>
                        <div className="max-lg:w-full h-100% 3xl:gap-[40px] 2xl:gap-[40px] lg:gap-[25px] sm:gap-[20px] gap-[10px] flex max-lg:justify-end max-sm:justify-start">
                            {socialLinks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="2xl:w-[55px] sm:w-[35px] w-[30px] h-auto aspect-55/55 bg-white rounded-[50%] relative z-0 flex items-center justify-center hover:bg-[#BE1E2D]/80 transition-colors duration-300 ease-in-out"
                                >
                                    <div className="2xl:w-[30px] sm:w-[20px] w-[15px] h-auto aspect-30/30 relative z-0">
                                        <Image
                                            src={item.icon}
                                            alt="Icon"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}