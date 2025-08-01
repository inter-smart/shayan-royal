import Link from 'next/link';
import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";

const carData = [
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/productImages/car3.jpeg",
        title: "Camry Hybrid - Toyota Camry Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type1"
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/productImages/car3/car31.jpeg",
        title: "Corolla Cross - Corolla Cross Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type2"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/productImages/car4/car41.jpeg",
        title: "RX 350h Luxury - RX 350h Luxury Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars"
    },
    {
        brand: "Toyota",
        logo: "/images/toyota.png",
        image: "/images/NewArr4.png",
        title: "Prado - PradoElegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type3"
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/NewArr5.png",
        title: "Lexus LC - Lexus LC Elegant is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type4"
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/NewArr6.png",
        title: "NX 350h F-Sport - NX 350h F-Sport is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type5"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_1.png",
        title: "Land Cruiser- Land Cruiser is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type5"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_2.png",
        title: "Urban Cruiser - Urban Cruiser is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type6"
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/inventory_car_3.png",
        title: "Lexus LS - Lexus LS is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type7"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_4.png",
        title: "Granvia - Granvia is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type8"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_5.png",
        title: "2.4L Crown Hybrid - 2.4L Crown Hybrid is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type9"
    },
    {
        brand: "Lexus",
        logo: "/images/lexus.png",
        image: "/images/inventory_car_6.png",
        title: "NX 350h Overtrail - NX 350h Overtrail is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type10"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_7.png",
        title: "1.0L Raize - 1.0L Raize is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type11"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_8.png",
        title: "LM  Flagship Luxury MPV - LM  Flagship Luxury MPV  is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type12"
    },
    {
        brand: "Lexus",
        logo: "/images/toyota.png",
        image: "/images/inventory_car_9.png",
        title: "2.4L 86 - 2.4L 86 is the hybrid (electric + petrol) variant . It gives a mileage of 25.49 kmpl ",
        specs: ["GCC", "Petrol", "Auto", "2024"],
        link: "/inventory/cars",
        type: "type13"
    }
];

export default function InventorySection() {
    return (
        <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
            <div className="container">
                <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
                    <AdvancesearchSection />
                    <Link
                        href="/"
                        className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
                    >
                        *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
                    </Link>
                </div>
                <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
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