import Link from 'next/link';
import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

export default function InventorySection({data}) {
    return (
        <section className="w-full h-auto block 3xl:py-[60px_130px] lg:py-[30px_90px] sm:py-[20px_70px] py-[15px_40px]">
            <div className="container">
                <div className="w-full h-auto 3xl:mb-[30px] 2xl:mb-[20px] mb-[15px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
                    <AdvancesearchSection />
                    <Link
                        href="/"
                        className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
                    >
                        *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
                    </Link>
                </div>
                <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
                    {data.map((car, index) => (
                        <div key={index} className="xl:w-1/3 sm:w-1/2 w-full 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
                            <ProductCard car={car} variant="inventory" />
                        </div>
                    ))}
                </div>
                <PaginationNavigator />
            </div>
        </section>
    );
} 