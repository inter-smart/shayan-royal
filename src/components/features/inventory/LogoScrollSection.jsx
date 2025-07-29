import Marquee from "react-fast-marquee";

export default function LogoScrollSection() {
    return (
        <section className="bg-white py-[10px_0]">
            <Marquee speed={50} pauseOnHover={true}>
                <div className="outlined-text 3xl:text-[90px] 2xl:text-[85px] xl:text-[75px] text-[45px] uppercase text-transparent font-bold relative flex items-center
                    before:relative before:content-[''] before:block before:top-[2px] before:2xl:top-[10px] before:bottom-0 before:left-0 before:m-[auto_10px] before:w-[15px] before:h-[15px] before:2xl:w-[30px] before:2xl:h-[30px]
                    before:border-[rgba(74,95,112,0.2)] before:border  before:p-[4px] before:rounded-full">
                    Shayan Royal GROUP
                </div>
                <div className="outlined-text 3xl:text-[90px] 2xl:text-[85px] xl:text-[75px] text-[45px] uppercase text-transparent font-bold relative flex items-center
                    before:relative before:content-[''] before:block before:top-[2px] before:2xl:top-[10px] before:bottom-0 before:left-0 before:m-[auto_10px] before:w-[15px] before:h-[15px] before:2xl:w-[30px] before:2xl:h-[30px]
                    before:border-[rgba(74,95,112,0.2)] before:border  before:p-[4px] before:rounded-full">
                    Shayan Royal GROUP
                </div>
            </Marquee>
        </section>
    );
}  