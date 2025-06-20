import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";

const item = {
    image: "/images/service_section.webp",
    title: "Our Services",
    description1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem.",
    description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
}

export default function OurServiceSection() {
    return (
        <section className="w-full h-auto block py-[80px_135px]">
            <div className="container">
                <div className="flex flex-wrap items-center">
                    <div className="w-[50%]">
                        <div className="w-full h-auto aspect-810/470 rounded-[10px] overflow-hidden block relative z-0">
                            <Image
                                src={item.image}
                                alt="Service"
                                fill
                                style={{ objectFit: "cover" }}
                                className="hover:scale-105 transition-all duration-500 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="w-[50%] pl-[60px]">
                        <Heading
                            size={"heading2"}
                            as="h2"
                            className=" text-black uppercase font-semibold leading-none font-base1 2xl:mb-[20px] lg:mb-[20px] mb-[15px]"
                        >
                            {item.title}
                        </Heading>
                        <Text
                            as="p"
                            className="3xl:text-[20px] 2xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.5] font-normal text-[#4B4B4B] 2xl:mb-[30px] lg:mb-[20px] mb-[10px]"
                        >
                            {item.description1}
                        </Text>
                        <Text
                            as="p"
                            className="3xl:text-[20px] 2xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.5] font-normal text-[#4B4B4B] 2xl:mb-[30px] lg:mb-[20px] mb-[10px]"
                        >
                            {item.description2}
                        </Text>
                    </div>
                </div>
            </div>
        </section>
    );
} 
