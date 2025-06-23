import InnerBanner from "@/components/common/InnerBanner"; 
import CategorySection from "@/components/features/fabrication/CategorySection";
import CustomerrequirementForm from "@/components/features/fabrication/CustomerrequirementForm";
import FabricationSection from "@/components/features/fabrication/FabricationSection";
import ClientSection from "@/components/features/fabrication/OurClientSection";
import WhychooseUsSection from "@/components/features/fabrication/WhychooseUsSection";
export default function Page() {
    return (
        <>
            <InnerBanner title="fabrication" image="/images/fabricationBanner.jpg" alt="fabrication-banner" />
            <FabricationSection />
            <WhychooseUsSection />
            <CategorySection />
            <CustomerrequirementForm />
            <ClientSection />
        </>
    );
}