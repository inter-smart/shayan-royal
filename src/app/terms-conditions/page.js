import { BreadCrumb } from "@/components/common/BreadCrumb";
import TermsandConditions from "@/components/features/terms-conditions/TermsandConditions";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-policies?type=terms_and_conditions`);
    const result = await response.json();

    const meta = result.data;
    const metaTitle = defaultMeta.terms.title
    const metaDescription = defaultMeta.terms.description;
    const metaKeywords = defaultMeta.terms.keywords;

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-conditions`,
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
  const { data, error } = await fetchFromAPI("policies/?type=terms_and_conditions");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <>
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "Terms & Conditions", isCurrent: true },
        ]}
      />
      <TermsandConditions policy={data?.content || ""} />
    </>
  );
}
