"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavMenus from "./NavMenus";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_URL } from "@/lib/api";

function Contents({ data }) {
  const pathname = usePathname();
  const isInnerPage = pathname !== "/";
  const isPrivacyPage = ["/privacy-policy", "/terms-conditions"].includes(pathname);
  return (
    <div className={`${isPrivacyPage ? "relative bg-white" : "absolute bg-transparent"} w-full  top-0 left-0 z-10 bg-transparent`}>
      <div className="container">
        <div
          className={`w-full flex flex-wrap items-center justify-between py-[5px_0] ${
            isInnerPage ? "lg:border-b lg:border-[rgba(217,217,217,0.2)]" : ""
          }`}
        >
          {/* Logo */}
          <div className="3xl:w-[260px] 2xl:w-[195px] lg:w-[165px] w-[145px] flex items-center justify-center pb-[5px]">
            <Link href="/" className="block w-full h-full">
              <Image
                src={data?.header_logo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${data?.header_logo}` : "/images/logo.svg"}
                alt="shayan Logo"
                width={80}
                height={40}
                className="w-full h-full object-contain block hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
          <NavMenus isInnerPage={isInnerPage} pathname={pathname} data={data} isPrivacyPage={isPrivacyPage} />
        </div>
      </div>
    </div>
  );
}

export default Contents;
