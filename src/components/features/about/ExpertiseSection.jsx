import Image from "next/image";
import { Heading } from "@/components/layout/Heading";

const expertise = [
    {
        image: "/images/expertise_1.svg",
        title: "Vehicle Sourcing & Procurement",
        description: "We source high-quality new vehicles from trusted global manufacturers."
    },
    {
        image: "/images/expertise_2.svg",
        title: "Multi Brand Experience",
        description: "We offer a wide selection of vehicles from premium brands"
    },
    {
        image: "/images/expertise_3.svg",
        title: "Global Logistics  & Shipping",
        description: "We ensure timely and safe delivery of vehicles worldwide."
    },
    {
        image: "/images/expertise_4.svg",
        title: "Spare Parts Solutions",
        description: "We provide genuine spare parts for reliable performance."
    },
    {
        image: "/images/expertise_5.svg",
        title: "Quality Assurance",
        description: "All vehicles and parts undergo strict quality checks."
    },
    {
        image: "/images/expertise_6.svg",
        title: "supplying bulk order",
        description: "It is a long established fact that a reader will be distracted by the looking at its layout. "
    }
];

export default function ExpertiseSection() {
    return (
        <section className="w-full h-auto bg-[#F5F9FF] 3xl:py-[140px] block overflow-hidden relative z-0">
            <div className="absolute -z-1 left-0 top-0 right-0 w-[45%] h-full m-auto">
                <Image
                    src="/images/expertise_bg.png"
                    alt="Business background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            <div className="container">
                <Heading
                    size={"heading4"}
                    as="h2"
                    className="leading-none font-semibold text-center uppercase text-black 2xl:mb-[50px] mb-[20px]"
                >
                    Our Expertise
                </Heading>
                <div className="m-[-10px] flex flex-wrap">
                    {expertise.map((item, index) => (
                        <div key={index} className="w-[calc(100%/3)] p-[10px]">
                            <div className="w-full h-full bg-white p-[45px_20px_35px_35px] rounded-[10px] border border-[#2E4C99] overflow-hidden relative z-0 block group">
                                <div className="absolute inset-0 -z-1 w-full h-full bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] rounded-[10px] opacity-0 pointer-events-none transition-all duration-800 ease-in-out group-hover:opacity-100"/>
                                <div className="w-[100px] h-auto aspect-100/100 bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] p-[20px] rounded-[0px_10px_0px_10px] absolute z-1 top-0 right-0 flex items-center justify-center group-hover:bg-transparent-to-b group-hover:from-transparent group-hover:to-transparent transition-colors duration-200 ease-in-out">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={55}
                                        height={55}
                                    />
                                </div>
                                <div className="max-w-[370px]">
                                    <Heading
                                        size={"heading5"}
                                        as="h2"
                                        className=" text-black uppercase font-semibold leading-none 2xl:mb-[20px] mb-[20px] group-hover:text-white transition-colors duration-300 ease-in-out"
                                    >
                                        {item.title}
                                    </Heading>
                                    <p className="3xl:text-[20px] 2xl:text-[16px] md:text-[14px] text-[12px] font-normal leading-normal text-black group-hover:text-white transition-colors duration-300 ease-in-out">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
