import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import FitmentAdditionalServicesSection from "@/components/features/service/FitmentAdditionalServicesSection";
import FitmentEnquirySection from "@/components/features/service/FitmentEnquirySection";
import FitmentServiceSection from "@/components/features/service/FitmentServiceSection";
import FitmentTypeServiceSection from "@/components/features/service/FitmentTypeServiceSection";
import WorkinActionSection from "@/components/features/service/WorkinActionSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import { notFound } from "next/navigation";

async function getMetaData(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-service?slug=${slug}`);
    const result = await response.json();

    const meta = result.data;
    const metaTitle = defaultMeta.services.title;
    const metaDescription = defaultMeta.services.description;
    const metaKeywords = defaultMeta.services.keywords;

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-fitment/${slug}`,
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
  const resolvedParamms = await params;
  const { slug } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`service-fitment/${slug}`);

  if (error) {
    return notFound();
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { service, banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "additional fitment Services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/seervice_fitment.webp"}
        mobileImage={banner?.mobile_image ? `${mediaUrl}${banner?.mobile_image}` : "/images/about_banner.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/service" },
          { label: service?.title.toUpperCase(), isCurrent: true },
        ]}
      />
      <FitmentServiceSection title={service?.title} desc={service?.description} image={service?.image} />
      <FitmentTypeServiceSection services={service?.fitmentServices} />
      <FitmentAdditionalServicesSection items={service?.servicesWhyChooseItems} title={service?.why_choose_title} />
      <WorkinActionSection gallery={service?.serviceGallery} />
      <FitmentEnquirySection title={service?.contact_title} desc={service?.contact_description} image={service?.contact_image} />
    </>
  );
}
