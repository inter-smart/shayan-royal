import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import PartnershipSection from "@/components/features/brand/PartnershipSection";
import PremiumBrandsSection from "@/components/features/brand/PremiumBrandsSection";
import FormSection from "@/components/features/brand/FormSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="brands" image="/images/brand-banner.webp" alt="brand-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "BRANDS", isCurrent: true }
                ]}
            />
            <PartnershipSection />
            <PremiumBrandsSection />
            <FormSection />
        </>
    );
}