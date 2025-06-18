
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqContents = [
    {
        title: "How do I book a rental car?",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "Can I modify or cancel my reservation?",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "Do I need to pay in advance?",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "What are the age requirements to rent a car?",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "What is your fuel policy?",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
]


export default function FaqSection() {
    return (
        <section className="relative z-0 bg-white py-[40px] 2xl:py-[60px] 3xl:py-[100px]">
            {/* logo */}
            <div className="3xl:max-w-[690px] 2xl:max-w-[620px] xl:max-w-[520px] lg:max-w-[420px] md:max-w-[320px] max-w-[250px] w-full absolute top-[5%] right-0">
                <Image
                    src="/images/faqLogo.png"
                    alt="faqLogo"
                    width={850}
                    height={500}
                    className="w-full h-full object-cover"
                />
            </div> 
            <div className="container">
                <div className="flex flex-wrap m-[-10px]">
                    <div className="lg:w-1/2 w-full p-[10px]">
                        <div className="xl:max-w-[85%]">
                            <div className="mb-[15px] 2xl:mb-[30px]">
                                <Heading size="heading2" as="h2" className="text-black uppercase mb-[10px]">
                                    FAQ
                                </Heading>
                                <Text size="text1" as="p" className="text-black mb-[15px]"> 
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard
                                    dummy text ever since the 1500s, when an unknown printer.
                                </Text>
                            </div>
                            <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2 ">
                                {faqContents.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-b border-[#D3D3D3]"
                                    >
                                        <AccordionTrigger
                                            className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] 
                                     text-black font-semibold leading-[1.2] font-base1 [&>svg]:hidden"
                                        >
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="typography [&>p]:text-[#656565] text-[#656565] pb-[15px]" >
                                            {item.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full p-[10px] flex items-end">

                        {/* car */}
                        <div className="w-full max-w-[1040px] flex item-center justify-end ml-auto">
                            <Image
                                src="/images/faqCar.png"
                                alt="faq"
                                width={650}
                                height={315}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
