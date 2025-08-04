import { Heading } from "@/components/layout/Heading";
import { Text } from "@/components/layout/Text";
import { mediaUrl } from "@/lib/constants";
import parse from "html-react-parser";

export default function AboutSection({ title, year, description1, description2, video, name, years, countries, cars })) {
    return (
        <section className="relative py-[30px] xl:py-[45px] 2xl:py-[50px] 3xl:py-[60px] overflow-hidden after:absolute after:top-0 after:left-0 after:content:[''] after:bg-[rgba(0,0,0,0.1)]">
             <video
                autoPlay
                muted
                playsInline
                preload="metadata"
                loop
                width={1920}
                height={550}
                loading="lazy"
                className="w-full h-full object-cover absolute top-0 left-0"
            >
                <source src={video ? `${mediaUrl}${video}` : "/videos/about.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="container">
                <div className="3xl:max-w-[1200px] 2xl:max-w-[900px] max-w-[750px] m-auto text-center relative text-white">
                    <div className="text-[25px] md:text-[30px] lg:text-[40px] 2xl:text-[50px] text-[#B4BACA] uppercase font-base1 mb-[10px] 
                    leading-none">         {title ? title : "About Us"}</div>
                    <div className="text-[70px] lg:text-[100px] 2xl:text-[130px] 3xl:text-[150px] font-bold font-base1 leading-none mb-[10px] "> {year ? year : "1995"}</div>
                      <Heading size="heading1" as="h1" className="text-white uppercase !font-normal mb-[10px] [&>span]:text-[#B6BCCB] ">
            {name ? parse(name) : "Shayan Royal General Trading"}
          </Heading>
                    <Text size="text1" as="p" className="text-white mb-[15px]"
                    >
                        {description1 ? parse(description1) : "The reasons to choose shayan royal lorem Ipsum has been the industry's standard dummy text ever since"}
                    </Text>
                    <Text size="text2" as="p" className="text-white"  >
                       {description2 ? parse(description2) : "The reasons to choose shayan royal lorem Ipsum has been the industry's standard dummy text ever since"}
                    </Text>



          <div className="flex flex-wrap justify-between mt-[25px] 2xl:mt-[40px] 3xl:mt-[60px]">
            <div className="w-1/3 p-[8px]">
              <div className="w-full h-full">
                <div
                  className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[50px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white  mb-[5px]
                                font-base1 leading-none"
                >
                  <span>{years ? years : "30"}</span>+
                </div>
                <div className="text-[18px] md:text-[20px] 2xl:text-[22px] 3xl:text-[30px] font-medium font-base1">Years</div>
              </div>
            </div>
            <div className="w-1/3 p-[8px]">
              <div className="w-full h-full">
                <div
                  className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[50px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white mb-[5px]
                                font-base1 leading-none"
                >
                  <span>{countries ? countries : "50"}</span>+
                </div>
                <div className="text-[18px] md:text-[20px] 2xl:text-[22px] 3xl:text-[30px] font-medium font-base1">Countries</div>
              </div>
            </div>
            <div className="w-1/3 p-[8px]">
              <div className="w-full h-full">
                <div
                  className="text-[30px] sm:text-[40px] md:text-[55px] xl:text-[50px] 2xl:text-[65px] 3xl:text-[80px] font-bold text-white  mb-[5px]
                                font-base1 leading-none"
                >
                  <span>{cars ? cars : "1000"}</span>K+
                </div>
                <div className="text-[18px] md:text-[20px] 2xl:text-[22px] 3xl:text-[30px] font-medium font-base1">Cars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
