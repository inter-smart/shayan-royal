import Image from "next/image";

const brandLogos = Array.from({ length: 36 }, (_, i) => `/images/p${i + 1}.webp`);

export default function PremiumBrandsSection() {
    return (
        <section className="w-full h-auto 2xl:pt-[90px] md:pt-[40px] md:pt-[20px] sm:pt-[10px] pt-[5px] lg:pb-[50px] md:pb-[20px] sm:pb-[10px] pb-[5px]">
            <div className="container">
                <div className="2xl:text-[50px] lg:text-[40px] md:text-[30px] text-[20px] text-center font-semibold uppercase 2xl:mb-[45px] lg:mb-[35px] md:mb-[25px] mb-[15px]">
                  Brand 
                </div>
                <div className="w-full flex flex-wrap m-0 2xl:mx-[-20px] mx-[-10px]">
                    {brandLogos.map((src, index) => (
                        <div key={index} className="lg:w-1/6 sm:w-1/5 xs:w-1/4 3xs:w-1/3 w-1/2 2xl:py-[20px] py-[10px] 2xl:px-[20px] px-[10px]">
                            <a
                                href="#"
                                className="border overflow-hidden border-[#D5DBEB] rounded-[10px] w-full 2xl:h-[95px] xl:h-[85px] md:h-[75px] h-[65px] flex items-center justify-center py-[10px] 3xl:px-[75px] 2xl:px-[55px] 2xl:px-[45px] md:px-[35px] px-[25px] relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:right-0 after:w-full after:h-[4px] after:bg-transparent hover:after:bg-[#2E4C99] hover:border-[#2E4C99] transition-all"
                            >
                                <Image
                                    src={src}
                                    alt={`brand-${index + 1}`}
                                    width={78}
                                    height={78}
                                    className="w-full h-full block object-contain max-w-[80px]"
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
