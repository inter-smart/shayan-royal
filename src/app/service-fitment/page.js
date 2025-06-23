import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import FitmentServiceSection from "@/components/features/service/FitmentServiceSection";
import FitmentTypeServiceSection from "@/components/features/service/FitmentTypeServiceSection";

export default function page() {
    return (
        <>
            <InnerBanner title="additional fitment Services" image="/images/seervice_fitment.webp" alt="seervice_fitment" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "SERVICES", href: "/service" },
                    { label: "ADDITIONAL FITMENT SERVICES", isCurrent: true }
                ]}
            />
            <FitmentServiceSection />
            <FitmentTypeServiceSection />
        </>
    );
}