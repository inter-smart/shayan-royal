import InnerBanner from "@/components/common/InnerBanner";
import PartnershipSection from "@/components/features/brand/PartnershipSection";
import PremiumBrandsSection from "@/components/features/brand/PremiumBrandsSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="brands" image="/images/brand-banner.webp" alt="brand-banner" />
             <PartnershipSection />
             <PremiumBrandsSection  />
        </>
    );
}