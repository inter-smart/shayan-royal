import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb"; 
import InventoryDetailSection from "@/components/features/inventory/InventoryDetailSection";
import ColorSection from "@/components/features/inventory/ColorSection";
import FaqSection from "@/components/features/inventory/FaqSection";
import SpecificationSection from "@/components/features/inventory/SpecificationSection";
import SimilarcarSection from "@/components/features/inventory/SimilarcarSection";
import PdfViewer from "@/components/features/inventory/PDFviewsweSection";

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
            <SpecificationSection />
            {/* <PdfViewer fileUrl="/images/policy.pdf" /> */}
            <FaqSection />
            <SimilarcarSection />
            
        </>
    );
} 