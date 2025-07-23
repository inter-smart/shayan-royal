import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import BlogSection from "@/components/features/blog/BlogSection";
import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";

export default async function Page() {
  const { data, error } = await fetchFromAPI("blogpage");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  const { banner } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Blogs"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/blog_banner.webp"}
        alt={banner?.title ? banner?.title : "blog-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "BLOGS", isCurrent: true },
        ]}
      />
      <BlogSection />
    </>
  );
}
