import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import GetInTouchSection from "@/components/features/contact/GetInTouchSection";
import ContactMapSection from "@/components/features/contact/ContactMapSection";
import { mediaUrl } from "@/lib/constants";
import { fetchFromAPI } from "@/lib/api";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=contact`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
  const { data, error } = await fetchFromAPI("contact");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  const { banner, footer, socialLinks, contents } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Contact us"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/contact_banner.webp"}
        alt={banner?.title ? banner?.title : "contact-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "CONTACT US", isCurrent: true },
        ]}
      />
      <GetInTouchSection
        title={contents?.title ? contents?.title : "Get in Touch"}
        description={contents?.description}
        socialLinks={socialLinks}
        image={contents?.form_image}
        form_title={contents?.form_title}
        footer={footer}
      />
      <ContactMapSection />
    </>
  );
}
