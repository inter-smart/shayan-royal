
import { Heading } from "@/components/layout/Heading";
import Image from "next/image";
import { Text } from "@/components/layout/Text";
import Link from 'next/link';



const footerLink = "2xl:text-[14px] xl:text-[12px] md:text-[11px] text-[10px] text-white/60 capitalize font-normal hover:text-white transition-all"
const footerHeading = "lg:text-[11px] text-[10px] uppercase text-white/40 font-medium lg:mb-3 mb-1"

export default function footer() {
  return (
    <footer className="w-full h-auto block bg-[#07163D] py-[120px_60px]">
      <div className="max-w-screen-xl grid md:grid-cols-4 gap-10">
        <Link
          href="#"
          className="w-[12px] xl:w-[12px] 2xl:w-[16px] 3xl:w-[20px] aspect-square block transition-transform duration-300 hover:scale-110"
        >
          <Image
            src="/images/footer-logo.webp"
            alt="logo"
            width="319"
            height="135"
            className="w-full h-full block object-contain"
          />
        </Link>

      </div>
    </footer>
  );
}
