import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialMediaSections from "./SocialMediaSections";
import { fetchFromAPI } from "@/lib/api";

const footerLink = "2xl:text-[14px] xl:text-[12px] md:text-[11px] text-[10px] text-white/60 capitalize font-normal hover:text-white transition-all";
const footerHeading = "lg:text-[11px] text-[10px] uppercase text-white/40 font-medium lg:mb-3 mb-1";

export default async function footer() {
  const footerData = await fetchFromAPI("footer");
  const { data, error } = footerData;
  const { socialMediaLinks, footerContents } = data;

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <footer className="w-full h-auto block bg-[#07163D] 2xl:py-[120px_60px] sm:py-[80px_40px] py-[40px_30px]">
      <div className="container">
        <div className="w-full flex flex-wrap">
          <div className="xl:w-[25%] sm:w-[50%] w-[100%]  sm:pr-[60px] xl:mb-[0] mb-[20px]">
            <Link
              href="/"
              className="3xl:w-[320px] 3xl:h-[135px] 2xl:w-[260px] 2xl:h-[100px] xl:w-[200px] xl:h-[85px] w-[200px] h-[85px] aspect-square block 3xl:mb-[50px] 2xl:mb-[30px] mb-[20px]"
            >
              <Image
                src={
                  footerContents?.footer_logo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${footerContents?.footer_logo}` : "/images/footer-logo.webp"
                }
                alt="logo"
                width="319"
                height="135"
                className="w-full h-full block object-contain"
              />
            </Link>
            <p className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] leading-[1.3] font-normal text-white ">
              {footerContents?.footer_description
                ? footerContents?.footer_description
                : "Shayan Royal General Trading was established in 1995 in Dubai, United Arab Emirates and has since extended its core business into exporting of Brand-new cars from Middle East."}
            </p>
          </div>
          <div className="xl:w-[20%] sm:w-[50%] w-[100%] sm:pr-[60px] xl:mb-[0] mb-[20px]">
            <Heading
              as="h6"
              className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] leading-none font-semibold uppercase text-white sm:mb-[30px] mb-[20px]"
            >
              Quick Link
            </Heading>
            <ul>
              <li className="mb-[10]">
                <Link href="/about" className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]">
                  About Us
                </Link>
              </li>
              <li className="mb-[10]">
                <Link
                  href="/inventory?"
                  className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]"
                >
                  Inventory
                </Link>
              </li>
              <li className="mb-[10]">
                <Link href="/brand" className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]">
                  Brands
                </Link>
              </li>
              <li className="mb-[10]">
                <Link
                  href="/service"
                  className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]"
                >
                  Services
                </Link>
              </li>
              <li className="mb-[10]">
                <Link
                  href="/privacy-policy"
                  className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-[10]">
                <Link
                  href="/terms-conditions"
                  className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]"
                >
                  Terms & Condition
                </Link>
              </li>
              <li className="mb-[10]">
                <Link
                  href="/contact"
                  className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] text-white mb-[15px] hover:text-[#BE1E2D]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="2xl:w-[25%] xl:w-[30%] sm:w-[50%] w-[100%] sm:pr-[60px] ">
            <Heading
              as="h6"
              className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] leading-none font-semibold uppercase text-white sm:mb-[30px] mb-[20px]"
            >
              visit us
            </Heading>
            <p className="3xl:text-[20px] 2xl:text-[18px] xl:text-[16px] text-[14px] leading-[1.3] font-normal text-white 3xl:mb-[85px] 2xl:mb-[60px] xl:mb-[40px] mb-[40px]">
              {footerContents?.footer_address
                ? footerContents?.footer_address
                : "Centurion Star Tower, behind Day To Day,Port Saeed 34 St. Deira. Dubai, United Arab Emirates"}
            </p>
            <Heading
              as="h6"
              className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] leading-none font-semibold uppercase text-white mb-[10px]"
            >
              {footerContents?.footer_news_letter_title ? footerContents?.footer_news_letter_title : "Stay in the loop."}
            </Heading>
            <p className="xl:text-[16px] text-[14px] leading-[1.3] font-normal text-white mb-[25px]">
              {footerContents?.footer_news_letter_description ? footerContents?.footer_news_letter_description : "Sign up for email updates today."}
            </p>
            <div className="w-full flex items-center relative z-0">
              <Input
                type="email"
                placeholder="Enter Email"
                className="rounded-[10px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white h-[45px] placeholder-[#555555] placeholder:text-[14px]"
              />
              <Button
                type="submit"
                className="absolute  bottom-0 margin-auto bg-[#BE1E2D] h-[40px] top-1/2 -translate-y-1/2 right-[3px] 3xl:text-[16px] 2xl:text-[14px] text-[14px] uppercase font-medium"
              >
                Subscribe
              </Button>
            </div>
          </div>
          <div className="2xl:w-[30%] xl:w-[25%] sm:w-[50%] w-[100%] sm:mt-[0px] mt-[25px]">
            <Heading
              as="h6"
              className="3xl:text-[20px] 2xl:text-[18px] sm:text-[16px] text-[14px] leading-none font-semibold uppercase text-white sm:mb-[30px] mb-[20px]"
            >
              {footerContents?.footer_location_title ? footerContents?.footer_location_title : "Find our Location"}
            </Heading>
            <div>
              <Link
                href="https://maps.app.goo.gl/z5LV1Zd5tjzemEAZ7"
                className=" 3xl:h-[283px] 2xl:h-[255px] xl:h-[215px]  sm:h-[195px] h-[160px] aspect-square block sm:mb-[50px] mb-[20px] rounded-[10px] overflow-hidden w-full"
              >
                <Image src="/images/map.webp" alt="logo" width="490" height="283" className="w-full h-full block object-cover" />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#0E1D44] lg:pt-[20px] lg:pr-[20px] lg:pb-[20px] lg:pl-[30px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] rounded-[10px] sm:mb-[45px] mb-[20px]">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-wrap items-center">
              <div className="3xl:text-[50px] 2xl:text-[35px] xl:text-[20px] lg:text-[18px] md:text-[20px] sm:text-[15px] text-[14px] font-semibold text-white sm:mb-[0px] mb-[10px]">
                {footerContents?.footer_social_title ? footerContents?.footer_social_title : "CONNECT WITH US"}
              </div>
              <div className="lg:pl-[40px] md:pl-[30px] pl-[20px] sm:mb-[0px] mb-[10px]">
                <Image
                  src="/images/arrow.webp"
                  alt="logo"
                  width="78"
                  height="15"
                  className=" h-full xl:w-[78px] lg:w-[60px] md:w-[40px] w-[30px] block object-contain"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center sm:w-auto w-full">
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:w-auto w-full 2xs:mb-[0px] mb-[10px]">
                <div className="3xl:text-[20px] 2xl:text-[18px] text-[14px] font-medium text-white">EMAIL</div>
                <a
                  href={footerContents?.footer_email ? `mailto:${footerContents?.footer_email}` : "mailto:sales@shayan.ae"}
                  className="block text-white 3xl:text-[20px] lg:text-[18px] text-[14px] hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_email ? footerContents?.footer_email : "sales@shayan.ae"}
                </a>
              </div>
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:pl-[25px] 2xs:w-auto w-full 2xs:mb-[0px] mb-[10px]">
                <div className="3xl:text-[20px] 2xl:text-[18px] text-[14px] font-medium text-white">TELEPHONE</div>
                <a
                  href={footerContents?.footer_tel ? `tel:${footerContents?.footer_tel}` : "tel:+97142728150"}
                  className="block text-white 3xl:text-[20px] lg:text-[18px] text-[14px] hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_tel ? footerContents?.footer_tel : "+971 42 728 150"}
                </a>
              </div>
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:pl-[25px] 2xs:w-auto w-full">
                <div className="3xl:text-[20px] 2xl:text-[18px] text-[14px] font-medium text-white">WHATSAPP</div>
                <a
                  href={footerContents?.footer_whtsapp ? `https://wa.me/${footerContents?.footer_whtsapp}` : "https://wa.me/971505286045"}
                  target="_blank"
                  className="block text-white 3xl:text-[20px] lg:text-[18px] text-[14px] hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_whtsapp ? footerContents?.footer_whtsapp : "+971 50 528 6045"}
                </a>
              </div>
            </div>
            <SocialMediaSections socialmedias={socialMediaLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-white md:text-[16px] sm:text-[14px] text-[13px] sm:mb-[0px] mb-[10px]">
            © 2025 Shayan Royal Group. All rights reserved.
          </div>
          <div className="text-white md:text-[16px] sm:text-[14px] text-[13px] text-right">
            <div className="flex flex-wrap">
              Designed By:
              <a href="" className="block pl-[10px]">
                <Image src="/images/intersmart.webp" alt="logo" width="96" height="12" className="w-full h-full block object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
