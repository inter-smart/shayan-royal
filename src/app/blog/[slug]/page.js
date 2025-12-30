import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import BlogDetailSection from "@/components/features/blog/BlogDetailSection";
import CommentSection from "@/components/features/blog/CommentSection";
import { fetchFromAPI } from "@/lib/api";
import { defaultMeta, mediaUrl } from "@/lib/constants";
import { notFound } from "next/navigation";

async function getMetaData(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/meta-blog?slug=${slug}`);
    const result = await response.json();

    const meta = result.data;
    const metaTitle = defaultMeta.blog.title;
    const metaDescription = defaultMeta.blog.description;
    const metaKeywords = defaultMeta.blog.keywords;

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: meta?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
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

export default async function Page({ params }) {
  const resolvedParamms = await params;
  const { slug } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`blog?slug=${slug}`);

  if (error) {
    return notFound();
  }

  if (!data) {
    return notFound();
  }

  const { blog, recentBlogs } = data;

  return (
    <>
      {/* <InnerBanner
        title={blog?.title ? blog?.title : "Blogs"}
        image={blog?.cover_image ? `${mediaUrl}${blog?.cover_image}` : "/images/blog_banner.webp"}
        alt={blog?.title ? blog?.title : "blog-banner"}
      /> */}
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "BLOGS", href: "/blog" },
          { label: blog?.title.toUpperCase(), isCurrent: true },
        ]}
      />
      <BlogDetailSection blog={blog} recentBlogs={recentBlogs} slug={slug} />
      {/* <CommentSection /> */}
    </>
  );
}
