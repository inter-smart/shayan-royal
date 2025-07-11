
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
        title: "There are many variations of passages of Lorem Ipsum available",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "If you are going to use a passage of Lorem Ipsum, you need to be sure",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "All the Lorem Ipsum generators on the Internet tend to repeat",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: " It uses a dictionary of over 200 Latin words, combined with a handful of model",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "Lorem Ipsum is therefore always free from repetition, injected humour",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
    {
        title: "This book is a treatise on the theory of ethics, very popular during the Renaissance",
        description: "You can book a rental car online through our website, via our mobile app, or by calling our customer service team."
    },
]


export default function FaqSection() {
    return (
        <section className="relative z-0 bg-white py-[30px] 2xl:py-[40px] 3xl:py-[70px]">
            <div className="container">
                <div className="bg-[#F5F9FF] 3xl:p-[50px] xl:p-[30px] p-[20px]">
                    <div className="mb-[15px]">
                        <Heading size="heading2" as="h2" className="text-[#4B4B4B] uppercase ">
                            FAQ
                        </Heading>                       
                    </div>
                    <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2 ">
                        {faqContents.map((item, index) => (
                            <div className="relative" key={index}>
                                <AccordionItem 
                                    value={`item-${index}`}
                                    className="pb-[1px]" // leave room for border line
                                >
                                    <AccordionTrigger
                                        className="text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] cursor-pointer pr-[30px]  
                                         relative !text-[#4B4B4B] font-semibold leading-[1.2] font-base1 [&>svg]:hidden after:absolute after:content-['+'] 
                                        after:top-0 after:bottom-0 after:right-0 after:w-[25px] after:h-[25px] after:m-auto after:text-center 
                                        after:text-[15px] after:bg-white after:rounded-[5px] after:flex after:items-center after:justify-center
                                        data-[state=open]:after:content-['-']"
                                    >
                                        {item.title}
                                    </AccordionTrigger>

                                    <AccordionContent className="typography [&>p]:text-[#656565] [&>p]:text-[16px] text-[#656565] 3xl:text-[16px] lg:text-[14px] text-[12px] pb-[15px]">
                                        {item.description}
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Gradient bottom border */}
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#737373] to-white" />
                            </div>

                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
