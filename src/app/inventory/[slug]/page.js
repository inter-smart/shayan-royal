import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb"; 
import InventoryDetailSection from "@/components/features/inventory/InventoryDetailSection";
import ColorSection from "@/components/features/inventory/ColorSection";

export default function page() {
    return (
        <>
            <InnerBanner title="Camry Hybrid" image="/images/inventoryDetailBanner.jpg" alt="about-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "INVENTORY", href: "/" },
                    { label: "Camry Hybrid", isCurrent: true }
                ]}
            /> 
            <InventoryDetailSection />
            <ColorSection />
        </>
    );
} 