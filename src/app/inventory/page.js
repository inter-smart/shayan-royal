import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventorySection from "@/components/features/inventory/InventorySection";
import { Suspense } from "react";
import { defaultMeta } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=inventory`);
    const result = await response.json();
    console.log(result);
    const meta = result.data;

    if (result.status === "success") {
      return {
        title: meta?.meta_title || defaultMeta.title,
        description: meta?.meta_description || defaultMeta.description,
        keywords: meta?.meta_keywords || defaultMeta.keywords,
        // Enhanced SEO fields
        openGraph: {
          title: meta?.og_title || meta?.meta_title || defaultMeta.title,
          description: meta?.og_description || meta?.meta_description || defaultMeta.description,
          images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
        },
        error: null,
      };
    }
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      keywords: defaultMeta.keywords,
      openGraph: {
        title: defaultMeta.title,
        description: defaultMeta.description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      error: result.message || "No metadata found",
    };
  } catch (error) {
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      keywords: defaultMeta.keywords,
      openGraph: {
        title: defaultMeta.title,
        description: defaultMeta.description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory`,
      },

      error:  "No metadata found",
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
  return (
    <>
      <InnerBanner title="Inventory" image="/images/inventory_banner.webp" alt="inventory-banner" />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", isCurrent: true },
        ]}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <InventorySection />
      </Suspense>
    </>
  );
}
