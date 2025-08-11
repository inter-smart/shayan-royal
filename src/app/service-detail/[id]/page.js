import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import OurServiceSection from "@/components/common/OurServiceSection";
import ChooseServicesSection from "@/components/features/service/ChooseServicesSection";
import LogisticSection from "@/components/features/service/LogisticSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";

async function getMetaData(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-service?service_id=${id}`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/service-detail/${id}`,
      },

      error: "No metadata found",
    };
  }
}

export async function generateMetadata({ params }) {
  const resolvedParamms = await params;
  const { id } = resolvedParamms;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData(id);
  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

export default async function Page({ params }) {
  const resolvedParamms = await params;
  const { id } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`service-detail/${id}`);

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
        title={banner?.title ? banner?.title : "Logistic services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/service_banner.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/service" },
          { label: "SERVICES DETAIL", isCurrent: true },
        ]}
      />
      <OurServiceSection
        image={service?.image ? `${mediaUrl}${service?.image}` : "/images/service_section.webp"}
        title={service?.title ? service?.title : ""}
        description1={service?.description}
        // description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
        // description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
      />
      <ChooseServicesSection chooseItems={service?.servicesWhyChooseItems} image={service?.side_image} title={service?.why_choose_title} />
      <LogisticSection title={service?.contact_title} desc={service?.contact_description} image={service?.contact_image} />
    </>
  );
}
