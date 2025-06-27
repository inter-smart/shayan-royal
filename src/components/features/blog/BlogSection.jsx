import BlogCard from "@/components/common/BlogCard";
import PaginationNavigator from "../../common/PaginationNavigator";

const items = [
    {
        image: "/images/blog_1.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_2.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_3.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_2.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_3.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_1.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_1.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_2.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_3.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_2.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_3.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    },
    {
        image: "/images/blog_1.webp",
        title: "Lorem ipsum dolor sit amet, consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
        date: "29.11.2024",
        link:"/blog/blog-detail"
    }

];

export default function BlogSection() {
    return (
        <section className="w-full h-auto 3xl:p-[75px_0_130px] lg:p-[50px_0_90px] sm:p-[50px_0_70px] p-[40px_0_50px] block">
            <div className="container">
                <div className="3xl:mb-[120px] 2xl:mb-[100px] lg:mb-[80px] sm:mb-[50px] mb-[30px] flex flex-wrap">
                    {items.map((item, index) => (
                        <div key={index} className="lg:w-[calc(100%/3)] sm:w-[calc(100%/2)] w-full 2xl:p-[25px_17px] lg:p-[15px_12px] sm:p-[10px_7px] p-[10px_0px]">
                            <BlogCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
            <PaginationNavigator totalPages={10} />
        </section>
    );
}