import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import FitmentAdditionalServicesSection from "@/components/features/service/FitmentAdditionalServicesSection";
import FitmentEnquirySection from "@/components/features/service/FitmentEnquirySection";
import FitmentServiceSection from "@/components/features/service/FitmentServiceSection";
import FitmentTypeServiceSection from "@/components/features/service/FitmentTypeServiceSection";
import WorkinActionSection from "@/components/features/service/WorkinActionSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

async function getMetaData(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-service?slug=${slug}`);
    const result = await response.json();

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${slug}`,
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
    return <div>Something went wrong</div>;
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
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/service" },
          { label: "ADDITIONAL FITMENT SERVICES", isCurrent: true },
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
