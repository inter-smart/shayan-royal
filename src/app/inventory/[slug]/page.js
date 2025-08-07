import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventoryDetailSection from "@/components/features/inventory/InventoryDetailSection";
import ColorSection from "@/components/features/inventory/ColorSection";
import FaqSection from "@/components/features/inventory/FaqSection";
import SpecificationSection from "@/components/features/inventory/SpecificationSection";
import SimilarcarSection from "@/components/features/inventory/SimilarcarSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";
import PDFViewerSection from "@/components/features/inventory/PDFViewerSection";
// import LogoScrollSection from "@/components/features/inventory/LogoScrollSection";

export default async function page({ params }) {
  const resolvedSlug = await params;
  const id = resolvedSlug.slug;

  const { data, error } = await fetchFromAPI(`inventory/${id}`);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { carDetails, specs, specs2, faqs, colorVariants, banner, specList, specDoc, productLists } = data;

  console.log(colorVariants);

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Our Car"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/inventoryDetailBanner.jpg"}
        alt={banner?.title ? banner?.title : "inventory-banner"}
      />

      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", href: "/" },
          { label: "Camry Hybrid", isCurrent: true },
        ]}
      />
      <InventoryDetailSection carDetails={carDetails} specs={specs} />
      <SpecificationSection specList={specList} />
      <ColorSection colorVariants={colorVariants} specs2={specs2} />
      <PDFViewerSection fileUrl={specDoc ? `${mediaUrl}${specDoc}` : null} />
      <SimilarcarSection productLists={productLists} />
      <FaqSection faqs={faqs} />
      {/* <LogoScrollSection /> */}
    </>
  );
}
