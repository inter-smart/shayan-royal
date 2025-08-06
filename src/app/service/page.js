import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import OurServiceSection from "@/components/common/OurServiceSection";
import ServiceSection from "@/components/features/service/ServiceSection";
import ContactSection from "@/components/common/ContactSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=services`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
      },

      error: result?.message || "No metadata found",
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
  const { data, error } = await fetchFromAPI("services");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    notFound();
  }

  const { contents, banner, services } = data;

  console.log(banner);

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Services"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/service_banner.webp"}
        alt={banner?.title ? banner?.title : "service-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", isCurrent: true },
        ]}
      />
      <OurServiceSection
        image={contents?.image ? `${mediaUrl}${contents?.image}` : "/images/service_section.webp"}
        title={contents?.title ? contents?.title : "Our Services"}
        description1={contents?.description}
        // description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
        // description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse enim quam vellet iniquus iustus poterat inpune. Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Duo Reges: constructio interrete. Que Manilium, ab iisque M. Quo studio Aristophanem putamus aetatem in litteris duxisse Cum autem in quo sapienter dicimus, id a primo rectissime dicitur. Conferam tecum, quam cuique verso rem subicias; Sed haec nihil sane ad rem."
      />
      <ServiceSection services={services} />
      <ContactSection
        backgroundImage={contents?.contact_section_image ? `${mediaUrl}${contents?.contact_section_image}` : "/images/service_contact.webp"}
        title={contents?.contact_section_title ? contents?.contact_section_title : "Contact Us Today!"}
        description={contents?.contact_section_subtitle ? contents?.contact_section_subtitle : "Leadership & Team"}
        alt={contents?.contact_section_title ? contents?.contact_section_title : "service-contact"}
        buttonLabel={contents?.contact_section_button_name ? contents?.contact_section_button_name : "Contact Us"}
        buttonLink={contents?.contact_section_link ? contents?.contact_section_link : "/contact"}
      />
    </>
  );
}
