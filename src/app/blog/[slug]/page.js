import InnerBanner from "@/components/common/InnerBanner";
import BlogDetailSection from "@/components/features/blog/BlogDetailSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Blogs" image="/images/blog_banner.webp" alt="about-banner" />
            <BlogDetailSection />
        </>
    );
}