import InnerBanner from "@/components/common/InnerBanner";
import CategorySection from "@/components/features/fabrication/CategorySection";
import CustomerrequirementForm from "@/components/features/fabrication/CustomerrequirementForm";
import FabricationSection from "@/components/features/fabrication/FabricationSection";
import ClientSection from "@/components/features/fabrication/OurClientSection";
import WhychooseUsSection from "@/components/features/fabrication/WhychooseUsSection";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import CustomerReqSection from "@/components/features/fabrication/CustomerReqSection";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=fabrication`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/fabrication`,
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
  const { data, error } = await fetchFromAPI("fabrications");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { contents, categories, whyChooseUs, testimonials, banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "fabrication"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/fabricationBanner.jpg"}
        alt={banner?.title ? banner?.title : "fabrication-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "FABRICATION", isCurrent: true },
        ]}
      />
      <FabricationSection title={contents?.title} description={contents?.description} />
      <WhychooseUsSection
        title={contents?.why_choose_us_section_title}
        description={contents?.why_choose_us_section_description}
        whyData={whyChooseUs}
        image={contents?.why_choose_us_section_image}
        alt={contents?.image_alt}
      />
      <CategorySection title={contents?.category_title} description={contents?.category_description} categoryData={categories} />
      <CustomerReqSection title={contents?.form_title} />
      <ClientSection title={contents?.testimonial_title} clientData={testimonials} />
    </>
  );
}
