
import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";

export default function AboutSection() {
    return (
        <section className="relative py-[40px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] after:absolute after:top-0 after:left-0 after:content:[''] after:bg-[rgba(0,0,0,0.1)]">
            <video
                autoPlay
                preload="auto"
                width="1920"
                height="1000"
                muted
                playsInline
                className="w-full h-full object-cover absolute top-0 left-0 "
            >
                <source src="/videos/about.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="container">
                <div className="max-w-[1200px] m-auto text-center relative text-white">
                    <div className="text-[25px] md:text-[30px] lg:text-[40px] 2xl:text-[50px] text-[#B4BACA] uppercase font-base1 mb-[10px] 
                    leading-none">SINCE</div>
                    <div className="text-[70px] lg:text-[100px] 2xl:text-[130px] 3xl:text-[150px] font-bold font-base1 leading-none mb-[10px] ">1995</div>
                    <Heading size="heading2" as="h2" className="text-white uppercase !font-normal mb-[10px]" >
                        Shayan <span className="text-[#B6BCCB]"> Royal Group</span>
                    </Heading>
                    <Text size="text1" as="p" className="text-white mb-[15px]"
                    >
                        Shayan Royal General Trading was established in 1995 in Dubai, United Arab Emirates
                        and has since extended its core business into exporting of Brand-new cars from Middle East. The company
                        expanded its business horizon into international trade and has successfully penetrated the Middle East,
                        Africa and Far East markets.
                    </Text>
                    <Text size="text2" as="p" className="text-white"  >
                        With our well-established network of global suppliers, we can source new car for export from Dubai and other countries and ensure
                        highly competitive prices. We offer largest selection of all automobile brands from passenger cars, SUV’s, light commercial
                        vehicles to luxury cars and conversion vehicles for export. We have been dealing in several automobile brands including –Toyota,
                        Lexus, Jeep, Ford, Nissan,
                        Infiniti, Renault, Mazda, Hyundai, Kia, BMW, Mercedes, Range Rover, Land Rover to name a few.
                        Our typical customers are individuals, wholesaler, mining companies, NGO’s, and governments… for which large quantity order and fleet deals remains
                        our first specialty. To fulfil our customers’ needs, we are working in strong partnership with several conglomerates in this region
                        and with first class freight forwarders, insurers and shipping companies. We believe in service, we believe in relationship, we want you to
                        rely on what we offer: trust, peace of mind, respect, reliability, accountability & transparency.
                    </Text>



                    <div className="flex flex-wrap justify-between mt-[40px] lg:mt-[60px]">
                        <div className="w-1/3 p-[8px]">
                            <div className="w-full h-full">
                                <div className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[60px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white 
                                font-base1 leading-none"><span>30</span>+</div>
                                <div className="text-[18px] md:text-[20px] xl:text-[25px] 3xl:text-[30px] font-medium font-base1">Years</div>
                            </div>
                        </div>
                        <div className="w-1/3 p-[8px]">
                            <div className="w-full h-full">
                                <div className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[60px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white 
                                font-base1 leading-none"><span>80</span>+</div>
                                <div className="text-[18px] md:text-[20px] xl:text-[25px] 3xl:text-[30px] font-medium font-base1">Countries</div>
                            </div>
                        </div>
                        <div className="w-1/3 p-[8px]">
                            <div className="w-full h-full">
                                <div className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[60px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white 
                                font-base1 leading-none"><span>40</span>K+</div>
                                <div className="text-[18px] md:text-[20px] xl:text-[25px] 3xl:text-[30px] font-medium font-base1">Cars</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
