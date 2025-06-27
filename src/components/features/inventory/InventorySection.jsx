import Link from 'next/link';
import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const carData = [
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr1.png",
        title: "Camry Hybrid - Toyota Camry Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr2.png",
        title: "Corolla Cross - Corolla Cross Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/NewArr3.png",
        title: "RX 350h Luxury - RX 350h Luxury Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr4.png",
        title: "Prado - PradoElegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/NewArr5.png",
        title: "Lexus LC - Lexus LC Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport - NX 350h F-Sport is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_1.png",
        title: "Land Cruiser- Land Cruiser is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_2.png",
        title: "Urban Cruiser - Urban Cruiser is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/inventory_car_3.png",
        title: "Lexus LS - Lexus LS is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_4.png",
        title: "Granvia - Granvia is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_5.png",
        title: "2.4L Crown Hybrid - 2.4L Crown Hybrid is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/inventory_car_6.png",
        title: "NX 350h Overtrail - NX 350h Overtrail is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_7.png",
        title: "1.0L Raize - 1.0L Raize is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_8.png",
        title: "LM  Flagship Luxury MPV - LM  Flagship Luxury MPV  is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_9.png",
        title: "2.4L 86 - 2.4L 86 is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
    }
];

export default function InventorySection() {
    return (
        <section className="w-full h-auto block 3xl:py-[90px_130px] lg:py-[50px_90px] sm:py-[30px_70px] py-[20px_40px]">
            <div className="container">
                <div className="w-full h-auto 3xl:mb-[70px] 2xl:mb-[50px] mb-[40px]">
                    <AdvancesearchSection />
                    <Link
                        href="/"
                        className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
                    >
                        *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
                    </Link>
                </div>
                <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] 3xl:mx-[-15px] 2xl:mx-[-12px] lg:mx-[-10px] mx-[-5px] flex flex-wrap">
                    {carData.map((car, index) => (
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