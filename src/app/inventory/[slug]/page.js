import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import InventoryDetailSection from "@/components/features/inventory/InventoryDetailSection";
import ColorSection from "@/components/features/inventory/ColorSection";
import FaqSection from "@/components/features/inventory/FaqSection";
import SpecificationSection from "@/components/features/inventory/SpecificationSection";
import SimilarcarSection from "@/components/features/inventory/SimilarcarSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import PDFViewerSection from "@/components/features/inventory/PDFViewerSection";
// import LogoScrollSection from "@/components/features/inventory/LogoScrollSection";
import { notFound } from "next/navigation";

async function getMetaData(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-inventory?slug=${slug}`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.inventory.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.inventory.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.inventory.title,
        description: defaultMeta.inventory.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${slug}`,
      },

      error: "No metadata found",
    };
  }
}

export async function generateMetadata({ params }) {
  const resolvedParamms = await params;
  const { slug } = resolvedParamms;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData(slug);
  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

export default async function page({ params }) {
  const resolvedSlug = await params;
  const slug = resolvedSlug.slug;

  const { data, error } = await fetchFromAPI(`inventory/${slug}`, {
    cache: "no-store",
  });

  if (error) {
    return notFound();
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { carDetails, specs, specs2, faqs, colorVariants, banner, specList, specDoc, contactData, productLists, bannerSettings, price } = data;

  return (
    <>
      {bannerSettings?.status == "active" && (
      <InnerBanner
        title={banner?.title ? banner?.title : "Our Car"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/inventoryDetailBanner.jpg"}
        alt={banner?.title ? banner?.title : "inventory-banner"}
      />
      )}

      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "INVENTORY", href: "/inventory" },
          { label: banner?.title.toUpperCase(), isCurrent: true },
        ]}
      />
      <InventoryDetailSection carDetails={carDetails} specs={specs} contactData={contactData} price={price} />
      <SpecificationSection specList={specList} />
      {specDoc && <PDFViewerSection fileUrl={`${mediaUrl}${specDoc}`} />}
      {colorVariants.length > 0 && <ColorSection colorVariants={colorVariants} specs2={specs2} />}
      {productLists.length > 0 && <SimilarcarSection productLists={productLists} />}
      <FaqSection faqs={faqs} />
      {/* <LogoScrollSection /> */}
    </>
  );
}
