import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import OurServiceSection from "@/components/common/OurServiceSection";
import ChooseServicesSection from "@/components/features/service/ChooseServicesSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Logistic services" image="/images/service_banner.webp" alt="service_banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "SERVICES", href: "/service" },
                    { label: "SERVICES DETAIL", isCurrent: true }
                ]}
            />
            <OurServiceSection
                image="/images/service_section.webp"
                title="logistic services"
                description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
                description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
            />
            <ChooseServicesSection />
        </>
    );
}