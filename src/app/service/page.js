import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import OurServiceSection from "@/components/common/OurServiceSection";
import ServiceSection from "@/components/features/service/ServiceSection";
import ContactSection from "@/components/common/ContactSection";

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
            <OurServiceSection
                image="/images/service_section.webp"
                title="Our Services"
                description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
                description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
            />
            <ServiceSection />
            <ContactSection backgroundImage="/images/service_contact.webp" title="Contact Us Today!" description="Leadership & Team" />
        </>
    );
} 