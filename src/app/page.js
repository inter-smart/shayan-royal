import BannerSection from "@/components/features/home/BannerSection";
import AboutSection from "@/components/features/home/AboutSection";
import CategorySection from "@/components/features/home/CategorySection";
import NewarrivalSection from "@/components/features/home/NewarrivalSection";
import LimitedstockSection from "@/components/features/home/LimitedstockSection";
import FeaturedSection from "@/components/features/home/FeaturedSection";
import LogisticsSection from "@/components/features/home/LogisticsSection";
import WhySection from "@/components/features/home/WhySection";
import TestimonialSection from "@/components/features/home/TestimonialSection";
import BlogSection from "@/components/features/home/BlogSection";
import SocialSection from "@/components/features/home/SocialSection";
import FaqSection from "@/components/features/home/FaqSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta } from "@/lib/constants";

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=home`);
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || defaultMeta.title,
          description: meta?.twitter_description || meta?.meta_description || defaultMeta.description,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMeta.title,
        description: defaultMeta.description,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
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
export default async function Home() {
  const { data, error } = await fetchFromAPI("home");

  if (error) {
    return <div>Something went wrong</div>;
  }

  const {
    homeBanners,
    contents,
    whyShayanItems,
    categories,
    productLists,
    lastProductList,
    firstProductList,
    logistics,
    testimonials,
    blogs,
    socialMedia,
    faqs,
  } = data;

  return (
    <>
      <BannerSection homeBanners={homeBanners} />
      <AboutSection
        title={contents?.since_title}
        year={contents?.since_starting_year}
        description1={contents?.since_description_one}
        description2={contents?.since_description_two}
        video={contents?.since_video}
        name={contents?.group_name}
        years={contents?.business_years}
        countries={contents?.countries_count}
        cars={contents?.cars_count}
      />
      <CategorySection title={contents?.category_section_title} description={contents?.category_section_description} categories={categories} />
      <NewarrivalSection products={firstProductList} />
      <WhySection
        title={contents?.why_shayan_royal_section_title}
        description={contents?.why_shayan_royal_section_description}
        image={contents?.why_shayan_royal_section_image}
        whyShayanItems={whyShayanItems}
      />
      {productLists?.map((productList) => (
        <LimitedstockSection key={productList?.id} products={productList} />
      ))}
      <FeaturedSection products={lastProductList} />
      <LogisticsSection
        title={contents?.logistics_and_transport_section_title}
        description={contents?.logistics_and_transport_section_description}
        image={contents?.logistics_and_transport_section_image}
        logistics={logistics}
      />
      <TestimonialSection
        title={contents?.testimonial_section_title}
        description={contents?.testimonial_section_description}
        testimonials={testimonials}
      />
      <BlogSection title={contents?.blog_section_title} description={contents?.blog_section_description} blogs={blogs} />
      <SocialSection
        title={contents?.social_media_post_section_title}
        description={contents?.social_media_post_section_description}
        socialMedia={socialMedia}
      />
      <FaqSection
        faqs={faqs}
        title={contents?.faq_section_title}
        description={contents?.faq_section_description}
        image={contents?.faq_section_image}
      />
    </>
  );
}
