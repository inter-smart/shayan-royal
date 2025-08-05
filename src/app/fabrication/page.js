import InnerBanner from "@/components/common/InnerBanner";
import CategorySection from "@/components/features/fabrication/CategorySection";
import CustomerrequirementForm from "@/components/features/fabrication/CustomerrequirementForm";
import FabricationSection from "@/components/features/fabrication/FabricationSection";
import ClientSection from "@/components/features/fabrication/OurClientSection";
import WhychooseUsSection from "@/components/features/fabrication/WhychooseUsSection";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";
import CustomerReqSection from "@/components/features/fabrication/CustomerReqSection";

export default async function Page() {
  const { data, error } = await fetchFromAPI("fabrications");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { contents, categories, whyChooseUs, testimonials, banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "fabrication"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/fabricationBanner.jpg"}
        alt={banner?.title ? banner?.title : "fabrication-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "FABRICATION", isCurrent: true },
        ]}
      />
      <FabricationSection title={contents?.title} description={contents?.description} />
      <WhychooseUsSection
        title={contents?.why_choose_us_section_title}
        description={contents?.why_choose_us_section_description}
        whyData={whyChooseUs}
        image={contents?.why_choose_us_section_image}
        alt={contents?.image_alt}
      />
      <CategorySection title={contents?.category_title} description={contents?.category_description} categoryData={categories} />
      <CustomerReqSection title={contents?.form_title} />
      <ClientSection title={contents?.testimonial_title} clientData={testimonials} />
    </>
  );
}
