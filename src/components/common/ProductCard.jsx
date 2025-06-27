
import Image from 'next/image';

const specIcons = [
    { label: "GCC", icon: "globe.svg" },
    { label: "Petrol", icon: "fuel.svg" },
    { label: "Auto", icon: "transmission.svg" },
    { label: "2024", icon: "year.svg" },
];

const variants = {
    inventory: "p-[0]",
};

export default function ProductCard({ car, variant }) {

    const defaultPadding = "px-[10px] 3xl:py-[25px] py-[15px]";
    const paddingClass = variant ? (variants[variant] || defaultPadding) : defaultPadding;

    return (
        <div className={`w-full h-full ${paddingClass}`}>
            <div className="w-full h-full rounded-[10px] bg-white overflow-hidden 3xl:py-[15px] py-[10px] 3xl:px-[20px] px-[15px] flex items-end shadow-xl">
                {/* Left Section */}
                <div className="3xl:w-[calc(100%-65px)] w-[calc(100%-45px)] h-full min-h-[200px] 3xs:min-h-[230px] 3xl:min-h-[295px] mr-[20px] 
                    relative flex flex-col rounded-[10px] overflow-hidden after:absolute 
                    after:top-0 after:right-0 after:content-[''] 
                    after:bg-[linear-gradient(90deg,_rgba(187,192,207,0.00)_0%,_#BBC0CF_100%)] after:w-full after:max-w-[150px] 
                    after:opacity-[0.22] after:h-full">
                    {/* Logo */}
                    <div className="w-full 3xl:max-w-[50px] max-w-[40px] absolute top-0 left-0">
                        <Image
                            src={car.logo}
                            alt={`${car.brand} Logo`}
                            width={350}
                            height={200}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {/* Image */}
                    <div className="w-full 3xl:max-w-[340px] 2xl:max-w-[290px] 3xs:max-w-[200px] max-w-[150px] 3xl:min-h-[250px] 2xl:min-h-[170px] min-h-[140px] flex items-center justify-center m-auto relative">
                        <Image
                            src={car.image}
                            alt={car.title}
                            width={350}
                            height={200}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {/* Title */}
                    <div className="py-2">
                        <div className="3xl:text-[20px] 2xl:text-[18px] text-[14px] font-semibold font-base1 text-black capitalize line-clamp-3">
                            {car.title}
                        </div>
                    </div>
                </div>

                {/* Right Section - Specs */}
                <div className="3xl:w-[65px] w-[45px]">
                    <div className="flex flex-col 3xl:max-h-[265px] max-h-[200px] h-full">
                        {car.specs.map((spec, i) => {
                            const icon = specIcons.find((s) => s.label === spec)?.icon;

                            return (
                                <div key={i} className="3xl:mb-[15px] mb-[10px] last:mb-0">
                                    <div className="text-center w-full h-full rounded-[10px] overflow-hidden bg-[#F5F9FF] 3xl:min-h-[55px] min-h-[40px] flex items-center justify-center flex-col">
                                        <div>
                                            <div className="3xl:w-[22px] w-[15px] 3xl:h-[22px] h-[15px] m-auto mb-[3px] flex">
                                                <Image
                                                    src={`/images/${icon}`}
                                                    alt={spec}
                                                    width={25}
                                                    height={25}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="3xl:text-[14px] text-[10px] font-normal font-base1 text-black">
                                                {spec}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}