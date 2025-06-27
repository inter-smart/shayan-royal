import Image from "next/image";
import { Fragment } from "react";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";

const items = {
    title: "Additional Fitment Services",
    description: [
        {
            description: (
                <Fragment>
                    At <b>Shayan Royal General Trading LLC,</b>we don’t just export vehicles — we transform them.
                </Fragment>
            )
        },
        {
            description: (
                <Fragment>
                    <b>Our Additional Fitment Services</b>are designed to meet the unique requirements of clients across industries. Whether you're outfitting a life-saving ambulance, customizing a vehicle for extreme off-road conditions, or fabricating trucks for specialized transport, we deliver precision, durability, and excellence.
                </Fragment>
            )
        },
        {
            description: "Every modification is executed with global standards, ensuring your vehicle is ready for real-world challenges — from rough terrains to emergency response scenarios.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever"
        }
    ],
    image: "/images/fitment_section.webp"
}

export default function FitmentServiceSection() {
    return (
        <section className="w-full h-auto block 3xl:p-[80px_0_40px] 2xl:p-[60px_0_30px]  md:p-[50px_0_30px] sm:p-[40px_0_30px] p-[20px_0_30px]">
            <div className="container">
                <Heading
                    size={"heading2"}
                    as="h2"
                    className="leading-[1] font-semibold uppercase text-center text-black 2xl:mb-[35px] lg:mb-[25px] mb-[15px]"
                >
                    {items.title}
                </Heading>
                <div className="text-center w-full">
                    {items.description.map((item, index) => (
                        <Text
                            key={index}
                            size="text1"
                            as="p"
                            className="leading-[1.5] font-medium font-base1 text-[#4B4B4B] 2xl:mb-[20px] sm:mb-[15px] mb-[10px]"
                        >
                            {item.description}
                        </Text>
                    ))}
                </div>
                <div className="3xl:w-[950px] 2xl:w-[715px] lg:w-[640px] md:w-[520px] sm:w-[480px] w-[280px] h-auto aspect-[950/545] m-auto flex items-center justify-center">
                    <Image
                        src={items.image}
                        alt="Fitment"
                        width={950}
                        height={545}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
}