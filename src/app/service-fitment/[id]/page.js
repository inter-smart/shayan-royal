import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import FitmentAdditionalServicesSection from "@/components/features/service/FitmentAdditionalServicesSection";
import FitmentEnquirySection from "@/components/features/service/FitmentEnquirySection";
import FitmentServiceSection from "@/components/features/service/FitmentServiceSection";
import FitmentTypeServiceSection from "@/components/features/service/FitmentTypeServiceSection";
import WorkinActionSection from "@/components/features/service/WorkinActionSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

export default async function page({ params }) {
  const resolvedParamms = await params;
  const { id } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`service-fitment/${id}`);

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
        title={banner?.title ? banner?.title : "additional fitment Services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/seervice_fitment.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/service" },
          { label: "ADDITIONAL FITMENT SERVICES", isCurrent: true },
        ]}
      />
      <FitmentServiceSection title={service?.title} desc={service?.description} image={service?.image} />
      <FitmentTypeServiceSection services={service?.fitmentServices} />
      <FitmentAdditionalServicesSection items={service?.servicesWhyChooseItems} title={service?.why_choose_title} />
      <WorkinActionSection gallery={service?.serviceGallery} />
      <FitmentEnquirySection title={service?.contact_title} desc={service?.contact_description} image={service?.contact_image} />
    </>
  );
}
