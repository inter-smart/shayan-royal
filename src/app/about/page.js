import InnerBanner from "@/components/common/InnerBanner";
import BusinessSection from "@/components/features/about/BusinessSection";
import ContactSection from "@/components/common/ContactSection";
import CorevalueSection from "@/components/features/about/CorevalueSection";
import ExpertiseSection from "@/components/features/about/ExpertiseSection";
import MarketSection from "@/components/features/about/MarketSection";
import AboutSection from "@/components/features/home/AboutSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="About us" image="/images/about_banner.webp" alt="about-banner" />
            <BusinessSection />
            <AboutSection />
            <CorevalueSection />
            <ExpertiseSection />
            <MarketSection />
            <ContactSection backgroundImage="/images/contact_section.webp" title="Contact Us Today!" description="Leadership & Team" />
        </>
    );
}