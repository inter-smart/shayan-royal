import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventorySection from "@/components/features/inventory/InventorySection";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";
import SimpleSearchBox from "@/components/common/SimpleSearchBox";
import { Suspense } from "react";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import { fetchFromAPI } from "@/lib/api";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=inventory`);
    const result = await response.json();

    const meta = result.data;

    if (result.status === "success") {
      return {
        title: meta?.meta_title || defaultMeta.inventory.title,
        description: meta?.meta_description || defaultMeta.inventory.description,
        keywords: meta?.meta_keywords || defaultMeta.inventory.keywords,
        // Enhanced SEO fields
        openGraph: {
          title: meta?.og_title || meta?.meta_title || defaultMeta.inventory.title,
          description: meta?.og_description || meta?.meta_description || defaultMeta.inventory.description,
          images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.inventory.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.inventory.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
        },
        error: null,
      };
    }
    return {
      title: defaultMeta.inventory.title,
      description: defaultMeta.inventory.description,
      keywords: defaultMeta.inventory.keywords,
      openGraph: {
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      error: result.message || "No metadata found",
    };
  } catch (error) {
    return {
      title: defaultMeta.inventory.title,
      description: defaultMeta.inventory.description,
      keywords: defaultMeta.inventory.keywords,
      openGraph: {
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },

      error: "No metadata found",
    };
  }
}

export async function generateMetadata() {
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData();
  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

export default async function Page() {
  const { data, error } = await fetchFromAPI("inventory");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  const { banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Inventory"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/inventory_banner.webp"}
        mobileImage={banner?.mobile_image ? `${mediaUrl}${banner?.mobile_image}` : "/images/about_banner.webp"}
        alt={banner?.title ? banner?.title : "inventory-banner"}
      />

      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", isCurrent: true },
        ]}
      />
      <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-100 rounded-md"></div>}>
        <SimpleSearchBox />
      </Suspense>
      <div className="container">
        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-100 rounded-md"></div>}>
          <AdvancesearchSection />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <InventorySection />
      </Suspense>
    </>
  );
}
