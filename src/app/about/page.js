import InnerBanner from "@/components/common/InnerBanner";
import BusinessSection from "@/components/features/about/BusinessSection";
import ContactSection from "@/components/features/about/ContactSection";
import CorevalueSection from "@/components/features/about/CorevalueSection";
import ExpertiseSection from "@/components/features/about/ExpertiseSection";
import MarketSection from "@/components/features/about/MarketSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="About us" image="/images/about_banner.webp" alt="about-banner" />
            <BusinessSection />
            <CorevalueSection />
            <ExpertiseSection />
            < MarketSection />
            <ContactSection />
        </>
    );
}