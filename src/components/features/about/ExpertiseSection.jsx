import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { mediaUrl } from "@/lib/constants";

const items = [
  {
    image: "/images/expertise_1.svg",
    title: "Vehicle Sourcing & Procurement",
    description: "We source high-quality new vehicles from trusted global manufacturers.",
  },
  {
    image: "/images/expertise_2.svg",
    title: "Multi Brand Experience",
    description: "We offer a wide selection of vehicles from premium brands",
  },
  {
    image: "/images/expertise_3.svg",
    title: "Global Logistics  & Shipping",
    description: "We ensure timely and safe delivery of vehicles worldwide.",
  },
  {
    image: "/images/expertise_4.svg",
    title: "Spare Parts Solutions",
    description: "We provide genuine spare parts for reliable performance.",
  },
  {
    image: "/images/expertise_5.svg",
    title: "Quality Assurance",
    description: "All vehicles and parts undergo strict quality checks.",
  },
  {
    image: "/images/expertise_6.svg",
    title: "supplying bulk order",
    description: "It is a long established fact that a reader will be distracted by the looking at its layout. ",
  },
];

export default function ExpertiseSection({ title, expertise }) {
  return (
    <section className="w-full h-auto bg-[#F5F9FF] 3xl:py-[140px] 2xl:py-[100px] xl:py-[70px] lg:py-[50px] py-[40px] block overflow-hidden relative z-0">
      <div className="absolute -z-1 left-0 top-0 right-0 w-[45%] h-full m-auto pointer-events-none">
        <Image src="/images/expertise_bg.png" alt="Business background" fill />
      </div>
      <div className="container">
        <Heading
          size={"heading2"}
          as="div"
          className="leading-none font-semibold text-center uppercase text-black 2xl:mb-[50px] lg:mb-[35px] sm:mb-[25px] mb-[20px]"
        >
          {title || "Our Expertise"}
        </Heading>
        <div className="2xl:m-[-10px] sm:m-[-6px] m-[-4px] flex flex-wrap">
          {expertise?.map((item, index) => (
            <div key={index} className="lg:w-[calc(100%/3)] sm:w-[calc(100%/2)] w-full 2xl:p-[10px] sm:p-[6px] p-[4px]">
              <div className="w-full h-full bg-white 2xl:p-[45px_110px_35px_35px] lg:p-[25px_70px_20px_25px] sm:p-[20px_60px_20px_15px] p-[15px_55px_15px_15px] rounded-[10px] border border-[#2E4C99] overflow-hidden relative z-0 block group">
                <div className="absolute inset-0 -z-1 w-full h-full bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] rounded-[10px] opacity-0 pointer-events-none transition-all duration-800 ease-in-out group-hover:opacity-100" />
                <div className="3xl:w-[100px] 2xl:w-[80px] lg:w-[65px] sm:w-[55px] w-[50px] h-auto aspect-100/100 bg-gradient-to-b from-[#2E4C99] to-[#0E1D44] 3xl:p-[20px] lg:p-[15px] sm:p-[10px] p-[8px] rounded-[0px_10px_0px_10px] absolute z-1 top-0 right-0 flex items-center justify-center group-hover:bg-transparent-to-b group-hover:from-transparent group-hover:to-transparent transition-colors duration-200 ease-in-out">
                  <Image src={item?.icon ? `${mediaUrl}${item.icon}` : "/images/expertise_3.svg"} alt={item.title} width={100} height={100} />
                </div>
                <div>
                  <Heading
                    size={"heading5"}
                    as="h2"
                    className=" text-black uppercase font-semibold leading-[1.4] max-w-[250px] 2xl:!mb-[15px] !mb-[10px] group-hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    {item?.title || "Title"}
                  </Heading>
                  <p className="3xl:text-[20px] 2xl:text-[16px] md:text-[14px] text-[12px] font-light leading-[1.3] text-[#4B4B4B]] group-hover:text-white transition-colors duration-300 ease-in-out">
                    {item?.description || "Expertise"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
