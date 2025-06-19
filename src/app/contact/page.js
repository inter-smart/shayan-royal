import InnerBanner from "@/components/common/InnerBanner";
import GetInTouchSection from "@/components/features/contact/GetInTouchSection";
import ContactMapSection from "@/components/features/contact/ContactMapSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Contact us" image="/images/contact_banner.webp" alt="contact-banner" />
            <GetInTouchSection />
            <ContactMapSection />
        </>
    );
} 