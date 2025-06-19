import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import OurServiceSection from "@/components/common/OurServiceSection";
import ServiceSection from "@/components/features/service/ServiceSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Services" image="/images/service_banner.webp" alt="service_banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "SERVICES", isCurrent: true }
                ]}
            />
            <OurServiceSection />
            <ServiceSection />
        </>
    );
} 