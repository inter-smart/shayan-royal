"use client";

import Image from "next/image";
import BlogCard from "@/components/common/BlogCard";
import { Heading } from "@/components/layout/Heading";
import { formatPostDate, formatPostTime } from "@/lib/utils";
import parse from "html-react-parser";
import { mediaUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RecaptchaProvider from "@/components/layout/RecaptchaProvider";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import BlogComments from "./BlogComments";
dayjs.extend(relativeTime);

const items = [
  {
    image: "/images/blog_2.webp",
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
    date: "29.11.2024",
  },
  {
    image: "/images/blog_3.webp",
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent, aut bona sunt aut mala, quae sint paria necesse est.",
    date: "29.11.2024",
  },
];

export default function BlogDetailSection({ blog, recentBlogs, slug }) {
  return (
    <section className="w-full h-auto 2xl:py-[20px_130px] lg:py-[10px_85px] sm:py-[10px_50px] py-[10px_40px] block">
      <div className="container">
        <div className="flex flex-wrap">
          {/* Left content */}
          <div className="2xl:w-[calc(100%-525px)] xl:w-[calc(100%-350px)] lg:w-[calc(100%-280px)] w-full 2xl:pr-[30px] lg:pr-[20px] max-lg:pb-[20px] max-lg:mb-[30px]">
            {/* Blog content */}
            <div className="typography [&>*]:md:my-[10px] [&>*]:my-[4px] [&>h3]:font-medium [&>h3]:2xl:mb-[30px] [&>h3]:lg:mb-[20px] [&>h3]:mb-[15px] [&>p]:col-span-full [&>p]:grid-cols-1 [&>p]:text-[12px] [&>p]:lg:text-[14px] [&>p]:2xl:text-[18px] [&>p]:3xl:text-[20px] [&>p]:2xl:mb-[25px] [&>img]:w-full [&>img]:h-auto [&>img]:aspect-[1085/530] [&>img]:2xl:mb-[40px] [&>img]:lg:mb-[30px] [&>img]:sm:mb-[20px] [&>img]:mb-[15px] [&>img]:object-cover">
              {/* <Image src={blog?.image ? `${mediaUrl}${blog.image}` : "/images/blog_detail_section.webp"} alt="Image-1" width={1085} height={530} /> */}
              <Image
                src={blog?.cover_image ? `${mediaUrl}${blog.cover_image}` : "/images/blog_detail_section.webp"}
                alt="Image-1"
                width={1085}
                height={530}
                className="w-full h-full object-cover"
              />
              <div className="flex items-center 2xs:pl-[20px] sm:pl-[30px] 2xl:pl-[40px] !mt-[-35px] sm:!mt-[-45px] xl:!mt-[-55px] 2xl:!mt-[-65px]">
                <div className="w-[60px] h-[60px] 2xs:w-[70px] 2xs:h-[70px] sm:w-[85px] sm:h-[85px] 2xl:w-[95px] 2xl:h-[95px] rounded-full bg-[#F3F3F3] flex items-center justify-center">
                  <div className="w-[50px] h-[50px] 2xs:w-[60px] 2xs:h-[60px] sm:w-[70px] sm:h-[70px] 2xl:w-[79px] 2xl:h-[79px] rounded-full bg-white">
                    <Image
                      src={blog?.author_avatar ? `${mediaUrl}${blog.author_avatar}` : "/images/blog.png"}
                      alt="Image-1"
                      width={79}
                      height={79}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="pl-[10px] 2xs:pl-[20px] pt-[25px] 2xs:pt-[30px] 2xl:pt-[25px]">
                  <h5 className="text-[15px] sm:text-[18px] 2xl:text-[20px] font-medium text-[#262626] mb-[2px] 2xl:mb-[5px] mt-0">
                    {blog?.author_name || ""}
                  </h5>
                  <h6 className="text-[13px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#8E8585] mt-0">
                    {blog?.published_at ? formatPostTime(blog?.published_at) : ""}
                  </h6>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between py-[20px] gap-1">
                <h2 className="m-0">{blog?.title || ""}</h2>
                {/* <div className="2xl:text-[20px] md:text-[14px] font-medium text-[#262626]  relative z-0 ">
                  {blog?.published_at ? formatPostTime(blog?.published_at) : ""}
                </div> */}
              </div>
              {blog?.content ? parse(blog?.content) : ""}
            </div>

            {/* Comment Form */}
            <RecaptchaProvider>
              <BlogComments slug={slug} />
            </RecaptchaProvider>
          </div>

          {/* Related Blogs Section */}
          <div className="lg:sticky top-[10px] h-full 2xl:w-[525px] xl:w-[350px] lg:w-[280px] w-full">
            <Heading as="h3" size="heading5" className="font-semibold text-[#262626] 2xl:mb-[25px] md:mb-[15px] mb-[10px]">
              Related Blogs
            </Heading>
            <div className="max-lg:m-[0_-10px] max-lg:flex max-lg:flex-wrap">
              {recentBlogs?.map((item, index) => (
                <div key={index} className="w-full h-auto 2xl:mb-[40px] lg:mb-[25px] max-lg:w-[calc(100%/2)] max-sm:w-full max-lg:p-[10px] block">
                  <BlogCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
