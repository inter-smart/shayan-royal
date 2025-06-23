import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const carData = [
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr1.png",
        title: "Camry Hybrid",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr2.png",
        title: "Corolla Cross",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr3.png",
        title: "RX 350h Luxury",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr4.png",
        title: "Prado",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr5.png",
        title: "Lexus LC",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
];

export default function InventorySection() {
    return (
        <section className="w-full h-auto block 3xl:py-[90px_130px] lg:py-[60px_90px] sm:py-[50px_70px] py-[40px_50px]">
            <div className="container">
                <AdvancesearchSection />
                <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] m-[-15px] flex flex-wrap">
                    {carData.map((car, index) => (
                        <div key={index} className="w-1/3 p-[20px_15px]">
                            <ProductCard car={car} />
                        </div>
                    ))}
                </div>
                <PaginationNavigator />
            </div>
        </section>
    );
} 