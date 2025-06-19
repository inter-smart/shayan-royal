import InnerBanner from "@/components/common/InnerBanner"; 
import FabricationSection from "@/components/features/fabrication/FabricationSection";
export default function Page() {
    return (
        <>
            <InnerBanner title="fabrication" image="/images/fabricationBanner.jpg" alt="fabrication-banner" />
            <FabricationSection />
        </>
    );
}