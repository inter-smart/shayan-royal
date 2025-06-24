"use client";

import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { motion } from "framer-motion";

const whyData = [
    {
        title: "Global Expertise",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/why_icon1.svg",
    },
    {
        title: "Fast & Easy Process",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/why_icon2.svg",
    },
    {
        title: "Wide Range Vehicle",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/why_icon3.svg",
    },
    {
        title: "Quality Services",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem",
        icon: "/images/why_icon4.svg",
    },
];

export default function WhySection() {
    return (
        <section className="relative z-0 bg-[#F5F9FF] py-[40px] 2xl:py-[60px] 3xl:py-[90px]">
            <div className="container">
                <div className="text-center max-w-[85%] m-auto mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading
                        size="heading2"
                        as="h2"
                        className="text-black uppercase mb-[10px]"
                    >
                        Why Shayan Royal
                    </Heading>
                    <Text size="text1" as="p" className="text-black mb-[15px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </div>

                <div className="flex flex-wrap relative">
                    {whyData.map((item, index) => (
                        <div key={index} className="w-full 2xs:w-1/2 md:p-[32px] sm:p-[25px] p-[8px]">
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 500 : -500 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className={`w-full h-full bg-white 3xl:p-[30px] 2xl:p-[20px] p-[15px] rounded-[10px] 
                  3xl:max-w-[400px] xl:max-w-[345px] lg:max-w-[300px] md:max-w-[275px] 2xs:max-w-[250px] ${index % 2 !== 0 ? 'ml-auto' : ''}`}
                            >
                                <div className="3xl:w-[65px] 2xl:w-[50px] w-[40px] 3xl:h-[55px] 2xl:h-[40px] h-[35px] flex items-center justify-center 3xl:mb-[20px] 2xl:mb-[15px] mb-[10px]">
                                    <Image src={item.icon} width={65} height={55} alt={item.title} />
                                </div>
                                <Heading
                                    size="heading5"
                                    as="h3"
                                    className="text-black font-semibold mb-[10px] line-clamp-2"
                                >
                                    {item.title}
                                </Heading>
                                <Text size="text1" as="p" className="text-black font-semibold mb-[15px] line-clamp-3">
                                    {item.desc}
                                </Text>
                            </motion.div>
                        </div>
                    ))}

                    {/* .logo  */}
                    <div className="absolute sm:top-0 top-[15%] sm:bottom-0 right-0 left-0 m-auto 3xl:max-w-[550px] 2xl:max-w-[400px] xl:max-w-[375px] lg:max-w-[275px] max-w-[200px] flex items-center justify-center">
                        <Image src="/images/whyLog.svg" width={550} height={670} className="w-full object-cover" alt="" />
                    </div>

                    {/* .car  */}
                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 1.2 }}
                        viewport={{ once: true }}
                        className="sm:absolute sm:top-0 bottom-0 right-0 left-0 m-auto 3xl:max-w-[850px] 2xl:max-w-[700px] lg:max-w-[450px] max-w-[250px] flex items-center justify-center"
                    >
                        <Image src="/images/whyCar.png" width={550} height={670} className="w-full object-cover" alt="" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
