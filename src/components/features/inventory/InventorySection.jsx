import PaginationNavigator from "@/components/common/PaginationNavigator";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";
export default function InventorySection() {
    return (
        <section className="w-full h-auto block 3xl:py-[90px_130px] lg:py-[60px_90px] sm:py-[50px_70px] py-[40px_50px]">
            <div className="container">
                <AdvancesearchSection />
                <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px]">

                </div>
                <PaginationNavigator />
            </div>
        </section>
    );
} 