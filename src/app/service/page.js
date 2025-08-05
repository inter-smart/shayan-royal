import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import OurServiceSection from "@/components/common/OurServiceSection";
import ServiceSection from "@/components/features/service/ServiceSection";
import ContactSection from "@/components/common/ContactSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

export default async function Page() {
  const { data, error } = await fetchFromAPI("services");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    notFound();
  }

  const { contents, banner, services } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/service_banner.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", isCurrent: true },
        ]}
      />
      <OurServiceSection
        image={contents?.image ? `${mediaUrl}${contents?.image}` : "/images/service_section.webp"}
        title={contents?.title ? contents?.title : "Our Services"}
        description1={contents?.description}
        // description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
        // description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
      />
      <ServiceSection services={services} />
      <ContactSection
        backgroundImage={contents?.contact_section_image ? `${mediaUrl}${contents?.contact_section_image}` : "/images/service_contact.webp"}
        title={contents?.contact_section_title ? contents?.contact_section_title : "Contact Us Today!"}
        description={contents?.contact_section_subtitle ? contents?.contact_section_subtitle : "Leadership & Team"}
        alt={contents?.contact_section_title ? contents?.contact_section_title : "service-contact"}
        buttonLabel={contents?.contact_section_button_name ? contents?.contact_section_button_name : "Contact Us"}
        buttonLink={contents?.contact_section_link ? contents?.contact_section_link : "/contact"}
      />
    </>
  );
}
