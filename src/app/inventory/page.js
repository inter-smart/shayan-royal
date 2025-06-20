import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventorySection from "@/components/features/inventory/InventorySection";

export default function page() {
    return (
        <>
            <InnerBanner title="Inventory" image="/images/inventory_banner.webp" alt="about-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "INVENTORY", isCurrent: true }
                ]}
            />
            <InventorySection />
        </>
    );
} 