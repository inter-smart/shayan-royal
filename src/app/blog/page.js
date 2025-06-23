import { BreadCrumb } from "@/components/common/BreadCrumb";
import InnerBanner from "@/components/common/InnerBanner";
import BlogSection from "@/components/features/blog/BlogSection";

export default function Page() {
    return (
        <>
            <InnerBanner title="Blogs" image="/images/blog_banner.webp" alt="about-banner" />
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "BLOGS", isCurrent: true }
                ]}
            />
            <BlogSection />
        </>
    );
} 