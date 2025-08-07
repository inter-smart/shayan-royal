import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import BlogDetailSection from "@/components/features/blog/BlogDetailSection";
import CommentSection from "@/components/features/blog/CommentSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const resolvedParamms = await params;
  const { slug } = resolvedParamms;

  const { data, error } = await fetchFromAPI(`blog?slug=${slug}`);

  if (error) {
    return notFound();
  }
  
  
  if (!data) {
    return <div>No data</div>;
  }

  const { banner, blog, recentBlogs } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Blogs"}
        image={
          banner?.image
            ? `${mediaUrl}${banner?.image}`
            : "/images/blog_banner.webp"
        }
        alt={banner?.title ? banner?.title : "blog-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "BLOGS", href: "/blog" },
          { label: blog?.title, isCurrent: true },
        ]}
      />
      <BlogDetailSection blog={blog} recentBlogs={recentBlogs} slug={slug} />
      {/* <CommentSection /> */}
    </>
  );
}
