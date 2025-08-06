import InnerBanner from "@/components/common/InnerBanner";
import BusinessSection from "@/components/features/about/BusinessSection";
import ContactSection from "@/components/common/ContactSection";
import CorevalueSection from "@/components/features/about/CorevalueSection";
import ExpertiseSection from "@/components/features/about/ExpertiseSection";
import MarketSection from "@/components/features/about/MarketSection";
import AboutSection from "@/components/features/home/AboutSection";
import { fetchFromAPI } from "@/lib/api";
import { notFound } from "next/navigation";
import { defaultMeta, mediaUrl } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=about`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
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
  const { data, error } = await fetchFromAPI("about");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    notFound();
  }

  const { contents, banner, expertise, values, sinceData } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "About Us"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/about_banner.webp"}
        alt={banner?.title ? banner?.title : "about-banner"}
      />
      <BusinessSection
        title={contents?.title}
        description1={contents?.description1}
        description2={contents?.description2}
        image={contents?.about_image}
        alt={contents?.about_image_alt_tag}
        year={contents?.year_in_business}
        year_title={contents?.year_in_business_title}
      />
      <AboutSection
        title={sinceData?.since_title}
        year={sinceData?.since_starting_year}
        description1={sinceData?.since_description_one}
        description2={sinceData?.since_description_two}
        video={sinceData?.since_video}
        name={sinceData?.group_name}
        years={sinceData?.business_years}
        countries={sinceData?.countries_count}
        cars={sinceData?.cars_count}
      />
      <CorevalueSection title={contents?.core_values_title} description={contents?.core_values_description} values={values} />
      <ExpertiseSection title={contents?.our_expertise_title} expertise={expertise} />
      <MarketSection title={contents?.map_section_title} description={contents?.map_section_description} />
      <ContactSection
        backgroundImage={contents?.contact_section_image ? `${mediaUrl}${contents?.contact_section_image}` : "/images/contact_section.webp"}
        title={contents?.contact_section_title ? contents?.contact_section_title : "Contact Us Today!"}
        description={contents?.contact_section_subtitle ? contents?.contact_section_subtitle : "Leadership & Team"}
        alt={contents?.contact_section_image_alt_tag ? contents?.contact_section_image_alt_tag : "Contact Section"}
        buttonText={contents?.contact_section_button_name ? contents?.contact_section_button_name : "Get in Touch"}
        buttonLink={contents?.contact_section_link ? contents?.contact_section_link : "#contact"}
      />
    </>
  );
}
