import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/layout/Text";
import { Heading } from "@/components/layout/Heading";
import { mediaUrl } from "@/lib/constants";
export default function BlogCard({ item }) {
  return (
    <div className="w-full h-full block group">
      <div
        className="w-full h-auto aspect-[520/310] 2xl:mb-[25px] md:mb-[17px] mb-[10px] rounded-[10px] 
            block overflow-hidden relative z-0 group"
      >
        <Image
          src={item.image ? `${mediaUrl}${item.image}` : "/images/blog_1.webp"}
          alt={item.title}
          fill
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="2xl:mb-[25px] mb-[15px]">
        <Heading
          as="h3"
          className="3xl:text-[25px] 2xl:text-[20px] md:text-[16px] text-[14px] leading-[1] font-semibold text-[#262626] 2xl:mb-[20px] md:mb-[15px] mb-[10px]"
        >
          {item.title}
        </Heading>
        <Text size="text1" as="p" className="mb-[0]">
          {item.description}
        </Text>
      </div>
      <div className="2xl:py-[20px] md:py-[15px] py-[10px] border-t border-b border-[#D9D9D9] flex justify-between">
        <span className="3xl:text-[16px] 2xl:text-[14px] text-[11px] font-semibold text-[#262626]">{item.date}</span>
        <Link
          href={item.link || "#"}
          aria-label="news"
          className="3xl:text-[16px] 2xl:text-[14px] text-[11px] font-semibold leading-normal uppercase text-[#2E4C99] transition-colors duration-300 hover:text-[#be1e2d]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
