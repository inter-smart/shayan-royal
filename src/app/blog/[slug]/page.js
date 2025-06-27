import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import BlogDetailSection from "@/components/features/blog/BlogDetailSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Blogs" image="/images/blog_banner.webp" alt="about-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "BLOGS", href: "/blog" },
                    { label: "BLOGS DETAIL", isCurrent: true }
                ]}
            />
            <BlogDetailSection />
        </>
    );
} 