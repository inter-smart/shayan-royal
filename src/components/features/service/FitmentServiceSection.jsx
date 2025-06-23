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
        <section className="w-full h-auto block p-[80px_0_40px]">
            <div className="container">
                <Heading
                    size={"heading2"}
                    as="h2"
                    className="leading-[1] font-semibold uppercase text-center text-black mb-[35px]"
                >
                    {items.title}
                </Heading>
                <div className="text-center w-full">
                    {items.description.map((item, index) => (
                        <Text
                            key={index}
                            size="text1"
                            as="p"
                            className="leading-[1.5] font-normal font-base1 text-[#4B4B4B] mb-[20px]"
                        >
                            {item.description}
                        </Text>
                    ))}
                </div>
                <div className="w-[950px] h-auto aspect-[950/545] m-auto flex items-center justify-center">
                    <Image
                        src={items.image}
                        alt="Fitment"
                        width={950}
                        height={545}
                    />
                </div>
            </div>
        </section>
    );
}