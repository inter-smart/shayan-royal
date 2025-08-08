"use client";
import { Text } from "@/components/layout/Text";
import { truncateToReferenceLength } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

function ReadMoreBlog({ blog }) {
  const router = useRouter();

  const handleReadMore = (slug) => {
    try {
      // Navigate to the blog post detail page
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error("Error navigating to blog post:", error);
    }
  };
  return (
    <Text size="text1" as="p" className="text-[#595959]">
      <span>{blog?.short_content ? truncateToReferenceLength(blog?.short_content) : ""} </span>
      <span
        onClick={() => handleReadMore(blog?.slug)}
        className="text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-[#2E4C99] text-nowrap font-medium underline"
      >
        READ MORE
      </span>
    </Text>
  );
}

export default ReadMoreBlog;
