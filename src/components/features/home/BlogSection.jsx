import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

const blogs = [
    {
        image: "/images/blog1.jpg",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
    },
    {
        image: "/images/blog2.jpg",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
    },
    {
        image: "/images/blog3.jpg",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
    },
    {
        image: "/images/blog4.jpg",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
    },
];

export default function BlogSection() {
    const leftItems = blogs.slice(0, 2);
    const rightItems = blogs.slice(2);
    return (
        <section className="relative z-0 bg-white py-[35px] 2xl:py-[40px] 3xl:py-[75px] after:absolute after:content-[''] overflow-hidden
        after:top-0 after:left-0 after:right-0 after:m-auto after:h-full after:3xl:w-[365px] after:2xl:w-[275px] after:w-[220px] after:skew-x-[-15deg]
        after:bg-[linear-gradient(180deg,_#C1C6D2_-13.07%,_rgba(209,212,220,0.38)_100%)] after:z-[-1] after:opacity-10">
            <div className="container">
                <div className="max-w-[85%] m-auto text-center mb-[15px] 2xl:mb-[30px] 3xl:mb-[50px]">
                    <Heading size="heading2" as="h2" className="text-black uppercase mb-[10px]">
                        BLOG
                    </Heading>
                    <Text size="text1" as="p" className="text-black mb-[15px]">
                       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy 
                       text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in  Lorem Ipsum passages, and more recently with desktop.
                    </Text>
                </div>

                <div className="flex flex-wrap">
                    {/* Left Column */}
                    <div className="3xl:w-[calc(100%-625px)] 2xl:w-[calc(100%-470px)] lg:w-[calc(100%-400px)] w-full 2xs:mb-[15px] mb-[5px] ">
                        <div className="flex flex-wrap -m-[8px]">
                            {leftItems.map((item, index) => (
                                <div key={index} className="2xs:w-1/2 w-full lg:p-[8px] p-[5px]">
                                    <div className="w-full h-full bg-white lg:p-[18px] md:p-[10px] p-[5px] rounded-[6px] max-2xs:flex">
                                        <div className="w-full sm:aspect-[265/140] overflow-hidden rounded-[10px] 2xs:mb-[10px] max-2xs:w-[100px]">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={1070}
                                                height={500}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full max-2xs:w-[calc(100%-100px)] max-2xs:pl-[25px]">
                                            <div className="flex items-center mb-[8px]">
                                                <div className="w-[15px] h-[15px] flex">
                                                    <Image
                                                        src="/images/date.png"
                                                        alt="date"
                                                        width={10}
                                                        height={10}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="3xl:text-[16px] 2xl:text-[14px] text-[12px] text-[#BE1E2D] font-medium px-[10px]">{item.date}</span>
                                            </div>
                                            <Heading
                                                size=""
                                                as="div"
                                                className="text-[14px] 2xl:text-[18px] 3xl:text-[25px] text-black line-clamp-2 font-semibold mb-[10px] max-w-[360px]"
                                            >
                                                {item.title}
                                            </Heading>
                                            <Text size="text1" as="p" className="text-[#595959] ">
                                                <span className=" line-clamp-2">{item.description}</span>
                                                <span className="text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-[#2E4C99] text-nowrap font-medium underline">READ MORE</span>
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="3xl:w-[625px] 2xl:w-[470px] lg:w-[400px] w-full">
                        <div className="flex flex-col">
                            {rightItems.map((item, index) => (
                                <div key={index} className="w-full 3xl:mb-[20px] last:mb-0">
                                    <div className="w-full h-full bg-white lg:p-[12px] md:p-[10px] p-[5px]  rounded-[6px] flex">
                                        <div className="3xl:w-[200px] 2xl:w-[150px] sm:w-[130px] w-[100px] overflow-hidden rounded-[10px]">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={1070}
                                                height={500}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="3xl:w-[calc(100%-200px)] 2xl:w-[calc(100%-150px)] sm:w-[calc(100%-130px)] w-[calc(100%-100px)] pl-[25px]">
                                            <div className="flex items-center mb-[5px]">
                                                <div className="w-[15px] h-[15px] flex items-center lg:justify-end lg:ml-auto">
                                                    <Image
                                                        src="/images/date.png"
                                                        alt="date"
                                                        width={10}
                                                        height={10}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="3xl:text-[16px] 2xl:text-[14px] text-[12px]  text-[#BE1E2D] font-medium px-[10px]">{item.date}</span>
                                            </div>
                                            <Heading
                                                size=""
                                                as="div"
                                                className="text-[14px] 2xl:text-[18px] 3xl:text-[25px] text-black line-clamp-2 font-semibold mb-[10px] max-w-[360px]"
                                            >
                                                {item.title}
                                            </Heading>
                                            <Text size="text1" as="p" className="text-[#595959] line-clamp-2">
                                                 <span className=" line-clamp-2">{item.description}</span>
                                                <span className="text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-[#2E4C99] text-nowrap font-medium underline">READ MORE</span>
                                            </Text>
                                        </div>
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
