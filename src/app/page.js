import dynamic from "next/dynamic";
import BannerSection from "@/components/features/home/BannerSection";
import AboutSection from "@/components/features/home/AboutSection";
import BlogSection from "@/components/features/home/BlogSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta } from "@/lib/constants";

// Below-the-fold sections are code-split out of the main bundle: they still
// render on the server (ssr defaults to true) so content/SEO is unaffected,
// but their client JS (Swiper, Framer Motion, etc.) ships as separate chunks
// instead of inflating the initial hydration bundle — cuts mobile TBT.
const CategorySection = dynamic(() => import("@/components/features/home/CategorySection"));
const NewarrivalSection = dynamic(() => import("@/components/features/home/NewarrivalSection"));
const LimitedstockSection = dynamic(() => import("@/components/features/home/LimitedstockSection"));
const FeaturedSection = dynamic(() => import("@/components/features/home/FeaturedSection"));
const LogisticsSection = dynamic(() => import("@/components/features/home/LogisticsSection"));
const WhySection = dynamic(() => import("@/components/features/home/WhySection"));
const TestimonialSection = dynamic(() => import("@/components/features/home/TestimonialSection"));
const SocialSection = dynamic(() => import("@/components/features/home/SocialSection"));
const FaqSection = dynamic(() => import("@/components/features/home/FaqSection"));

async function getMetaData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta?page=home`);
    const result = await response.json();

    
    const meta = result.data;
    const metaTitle = defaultMeta.home.title
    const metaDescription = defaultMeta.home.description;
    const metaKeywords = defaultMeta.home.keywords;

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
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
      {firstProductList && <NewarrivalSection products={firstProductList} />}
      <WhySection
        title={contents?.why_shayan_royal_section_title}
        description={contents?.why_shayan_royal_section_description}
        image={contents?.why_shayan_royal_section_image}
        whyShayanItems={whyShayanItems}
      />
      {productLists?.length > 0 && productLists?.map((productList) => <LimitedstockSection key={productList?.id} products={productList} />)}
      {lastProductList && <FeaturedSection products={lastProductList} />}
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
