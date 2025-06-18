
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";


export default function TestimonialSection() {
    return (
        <section className="relative z-0 bg-white py-[40px] 2xl:py-[60px] 3xl:py-[105px_130px] after:absolute after:content-[''] overflow-hidden
            after:top-0 after:left-0 after:right-0 after:m-auto after:h-full lg:after:w-[365px] after:w-[210px] after:skew-x-[-15deg]
            after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-10">
            <div className="container">
                <div className="max-w-[85%]  mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading
                        size="heading2"
                        as="h2"
                        className="text-black uppercase mb-[10px]" >
                        testimonials
                    </Heading>
                    <Text size="text1" as="p" className="text-black mb-[15px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                         typesetting, remaining essentially unchanged. It was popularised in  Lorem Ipsum passages, and more recently with desktop.
                    </Text>
                </div>

            </div>
        </section>
    );
}
