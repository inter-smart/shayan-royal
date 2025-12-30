import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import GetInTouchSection from "@/components/features/contact/GetInTouchSection";
import ContactMapSection from "@/components/features/contact/ContactMapSection";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import { fetchFromAPI } from "@/lib/api";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=contact`);
    const result = await response.json();

    const meta = result.data;
    const metaTitle = defaultMeta.contact.title;
    const metaDescription = defaultMeta.contact.description;
    const metaKeywords = defaultMeta.contact.keywords;

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
        mobileImage={banner?.mobile_image ? `${mediaUrl}${banner?.mobile_image}` : "/images/about_banner.webp"}
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
