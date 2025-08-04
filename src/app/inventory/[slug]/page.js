import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventoryDetailSection from "@/components/features/inventory/InventoryDetailSection";
import ColorSection from "@/components/features/inventory/ColorSection";
import FaqSection from "@/components/features/inventory/FaqSection";
import SpecificationSection from "@/components/features/inventory/SpecificationSection";
import SimilarcarSection from "@/components/features/inventory/SimilarcarSection";
import { fetchFromAPI } from "@/lib/api";
// import PDFViewerSection from "@/components/features/inventory/PDFViewerSection";
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

  const { carDetails, specs, specs2, faqs } = data;

  console.log("Inventory Page Data:", data);

  return (
    <>
      <InnerBanner title="Camry Hybrid" image="/images/inventoryDetailBanner.jpg" alt="about-banner" />

      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", href: "/" },
          { label: "Camry Hybrid", isCurrent: true },
        ]}
      />
      <InventoryDetailSection carDetails={carDetails} specs={specs} />
      <SpecificationSection />
      <ColorSection />
      {/* <PDFViewerSection fileUrl="/images/policy.pdf" /> */}
      <SimilarcarSection />
      <FaqSection />
      {/* <LogoScrollSection /> */}
    </>
  );
}
