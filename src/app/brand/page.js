import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import PartnershipSection from "@/components/features/brand/PartnershipSection";
import PremiumBrandsSection from "@/components/features/brand/PremiumBrandsSection";
import EnquiryFormSection from "@/components/features/brand/EnquiryFormSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

export default async function Page() {
  const { data, error } = await fetchFromAPI("brands");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { contents, brands, banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Brands"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/about_banner.webp"}
        alt={banner?.title ? banner?.title : "brands-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "BRANDS", isCurrent: true },
        ]}
      />
      <PartnershipSection
        title={contents?.title}
        description={contents?.description}
        image={contents?.image}
        alt={contents?.image_alt_tag}
        brands={brands}
        brandCount={contents?.brand_count}
      />
      <PremiumBrandsSection title={contents?.brand_title} brands={brands} />
      <EnquiryFormSection image={contents?.enquiry_image} />
    </>
  );
}
