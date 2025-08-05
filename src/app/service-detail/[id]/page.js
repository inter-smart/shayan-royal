import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import OurServiceSection from "@/components/common/OurServiceSection";
import ChooseServicesSection from "@/components/features/service/ChooseServicesSection";
import LogisticSection from "@/components/features/service/LogisticSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

export default async function Page({ params }) {
  const resolvedParamms = await params;
  const { id } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`service-detail/${id}`);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { service, banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Logistic services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/service_banner.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/service" },
          { label: "SERVICES DETAIL", isCurrent: true },
        ]}
      />
      <OurServiceSection
        image={service?.image ? `${mediaUrl}${service?.image}` : "/images/service_section.webp"}
        title={service?.title ? service?.title : ""}
        description1={service?.description}
        // description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
        // description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
      />
      <ChooseServicesSection chooseItems={service?.servicesWhyChooseItems} image={service?.side_image} title={service?.why_choose_title} />
      <LogisticSection title={service?.contact_title} desc={service?.contact_description} image={service?.contact_image} />
    </>
  );
}