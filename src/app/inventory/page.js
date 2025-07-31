import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventorySection from "@/components/features/inventory/InventorySection";

export default async function Page() {
  return (
    <>
      <InnerBanner
        title="Inventory"
        image="/images/inventory_banner.webp"
        alt="inventory-banner"
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", isCurrent: true },
        ]}
      />
      <InventorySection />
    </>
  );
}