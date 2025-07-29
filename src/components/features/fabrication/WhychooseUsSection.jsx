import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import Image from "next/image";

const whyData = [
    {
        title: "Original Products",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/whychoose_icon1.svg",
    },
    {
        title: "Wide Selection",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/whychoose_icon2.png",
    },
    {
        title: "Assured Quality",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/whychoose_icon3.png",
    },
    {
        title: "Fast Shipping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/whychoose_icon4.png",
    },
];

export default function WhychooseUsSection() {
    return (
        <section className="relative bg-[#07163D] py-[40px] z-0 3xl:min-h-[850px] 2xl:min-h-[650px] xl:min-h-[550px] min-h-[450px] xl:py-[60px] 
        2xl:py-[80px] 3xl:py-[100px_160px] 
        after:absolute after:top-0 after:right-0 after:content-[''] after:z-[1] after:w-1/2 after:h-full 
        after:bg-[linear-gradient(271deg,rgba(7,22,61,0)_0.62%,#07163D_97.76%)]
        before:absolute before:content-[''] overflow-hidden
            before:top-0 lg:before:left-[35%] before:left-0 max-lg:before:right-0 before:m-auto before:h-full before:3xl:w-[365px] before:2xl:w-[275px]
             before:w-[220px] lg:before:skew-x-[15deg] before:skew-x-[20deg]
            before:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] before:z-[2] before:opacity-10 
        ">
            <Image
                src="/images/whySectionImg.jpg"
                width={900}
                height={900}
                className="w-full h-full object-cover max-w-1/2 absolute top-0 right-0 z-0"
                alt="why_image"
            />
            <div className="container relative z-10">
                <div className="flex flex-wrap -m-4">
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="3xl:mb-[70px] 2xl:mb-[50px] xl:mb-[30px] mb-[20px]">
                            <Heading
                                size="heading2"
                                as="h2"
                                className="text-white uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] mb-[15px]"
                            >
                                Why Choose Us?
                            </Heading>
                            <Text size="text2" as="p" className="text-white">
                                Shayan Royal for genuine products, exceptional quality, and reliable warranty services
                            </Text>
                        </div>

                        <div className="flex flex-wrap relative md:-m-[15px] -m-[5px]">
                            {whyData.map((item, index) => (
                                <div key={index} className="w-full 2xs:w-1/2 md:p-[15px] p-[5px]">
                                    <div className={`w-full h-full bg-white 3xl:p-[30px] 2xl:p-[20px ] p-[15px] rounded-[10px]  ${index % 2 !== 0 ? 'ml-auto' : ''}`}  >
                                        <div className="flex flex-wrap justify-between items-center 3xl:mb-[20px] 2xl:mb-[15px] mb-[10px]">
                                            <Heading
                                                size="heading5"
                                                as="h3"
                                                className="text-black font-semibold line-clamp-2"
                                            >
                                                {item.title}
                                            </Heading>
                                            <div className="3xl:w-[95px] 2xl:w-[70px] w-[40px] 3xl:h-[55px] 2xl:h-[40px] h-[35px] flex items-center justify-center ">
                                                <Image src={item.icon} width={65} height={55} alt={item.title} />
                                            </div>
                                        </div>
                                        <Text size="text1" as="p" className="text-black mb-[15px] line-clamp-3">
                                            {item.desc}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
