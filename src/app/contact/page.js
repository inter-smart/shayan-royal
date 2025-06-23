import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import GetInTouchSection from "@/components/features/contact/GetInTouchSection";
import ContactMapSection from "@/components/features/contact/ContactMapSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Contact us" image="/images/contact_banner.webp" alt="contact-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "CONTACT US", isCurrent: true }
                ]}
            />
            <GetInTouchSection />
            <ContactMapSection />
        </>
    );
} 