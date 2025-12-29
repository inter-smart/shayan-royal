import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import PartnershipSection from "@/components/features/brand/PartnershipSection";
import PremiumBrandsSection from "@/components/features/brand/PremiumBrandsSection";
import EnquiryFormSection from "@/components/features/brand/EnquiryFormSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=brands`);
    const result = await response.json();

    const meta = result.data;
    const metaTitle = defaultMeta.brands.title;
    const metaDescription = defaultMeta.brands.description;
    const metaKeywords = defaultMeta.brands.keywords;

    if (result.status === "success") {
      return {
        title: meta?.meta_title || metaTitle,
        description: meta?.meta_description || metaDescription,
        keywords: meta?.meta_keywords || metaKeywords,
        // Enhanced SEO fields
        openGraph: {
          title: meta?.og_title || meta?.meta_title || metaTitle,
          description: meta?.og_description || meta?.meta_description || metaDescription,
          images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
        },
        error: null,
      };
    }
    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
      },
      error: result.message || "No metadata found",
    };
  } catch (error) {
    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/brand`,
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
      <EnquiryFormSection image={contents?.enquiry_image} title={contents?.enquiry_title} subTitle={contents?.enquiry_sub_title} />
    </>
  );
}
