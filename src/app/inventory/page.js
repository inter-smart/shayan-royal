import { notFound } from "next/navigation";
import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventorySection from "@/components/features/inventory/InventorySection";
import { fetchFromAPI } from "@/lib/api";

export default async function Page({ searchParams }) {
const safeParams = Object.fromEntries(
  Object.entries(searchParams).filter(
    ([, value]) => typeof value !== "symbol" && typeof value !== "object"
  ).map(
    ([key, value]) => [key, String(value)]
  )
);

  const query = new URLSearchParams(safeParams).toString();
  const endpoint = `inventories/filtered${query ? `?${query}` : ""}`;
  
  const { data, error } = await fetchFromAPI(endpoint);

  if(data == []){
       return <div>NO data available</div>;

  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    notFound();
  }

  return (
    <>
      <InnerBanner
        title="Inventory"
        image="/images/inventory_banner.webp"
        alt="about-banner"
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", isCurrent: true },
        ]}
      />
      <InventorySection data={data} />
    </>
  );
}