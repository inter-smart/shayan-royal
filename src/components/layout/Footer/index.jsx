import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialMediaSections from "./SocialMediaSections";
import { fetchFromAPI } from "@/lib/api";
import NewsletterForm from "@/components/forms/NresLetterSub";

const footerLink =
  "text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-light mb-[8px] 2xl:mb-[10px] 3xl:mb-[15px] hover:text-[#BE1E2D] transition-all";
const footerHeading =
  "3xl:text-[20px] 2xl:text-[16px] xl:text-[13px] text-[10px] leading-none font-semibold uppercase text-white 3xl:mb-[30px] 2xl:mb-[25px] sm:mb-[15px] mb-[10px]";

export default async function footer() {
  const footerData = await fetchFromAPI("footer");
  const { data, error } = footerData;

  const { socialMediaLinks, footerContents } = data;

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <footer className="w-full h-auto block bg-[#07163D] py-[40px_20px] 2xl:py-[60px_25px] 3xl:py-[120px_60px]">
      <div className="container">
        <div className="w-full flex flex-wrap mb-[30px] max-sm:gap-3">
          <div className="w-full md:w-5/12">
            <div className="flex flex-wrap max-sm:gap-2">
              <div className="w-full sm:w-1/2 md:w-2/3">
                <Link
                  href="/"
                  className="3xl:w-[320px] 2xl:w-[250px] xl:w-[200px] lg:w-[170px] w-[120px]  block mb-[25px] lg:mb-[30px] xl:mb-[35px] 2xl:mb-[40px] 3xl:mb-[50px] "
                >
                  <Image src="/images/footer-logo.webp" alt="logo" width="319" height="135" className="w-full h-full block object-contain" />
                </Link>
                <p className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-light text-white sm:max-w-[220px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[245px] 2xl:max-w-[280px] 3xl:max-w-[350px]">
                  Shayan Royal General Trading was established in 1995 in Dubai, United Arab Emirates and has since extended its core business into
                  exporting of Brand-new cars from Middle East.
                </p>
              </div>

              <div className="w-full sm:w-1/2  md:w-1/3 3xl:pl-[30px] mb-[10px]">
                <div className={`${footerHeading}`}>Quick Link</div>
                <ul>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/about" className={`${footerLink}`}>
                      About Us
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/inventory" className={`${footerLink}`}>
                      Inventory
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/brand" className={`${footerLink}`}>
                      Brands
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/service" className={`${footerLink}`}>
                      Services
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/privacy-policy" className={`${footerLink}`}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/terms-conditions" className={`${footerLink}`}>
                      Terms & Condition
                    </Link>
                  </li>
                  <li className="xl:mb-[6px] 3xl:mb-[10]">
                    <Link href="/contact" className={`${footerLink}`}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12">
            <div className="flex flex-wrap max-sm:gap-3">
              <div className="w-full sm:w-1/2 ">
                <div className={`${footerHeading}`}>visit us</div>
                <div className="w-full 3xl:max-w-[380px] 2xl:max-w-[320px] xl:max-w-[250px] lg:max-w-[220px] md:max-w-[180px] sm:max-w-[250px]">
                  <p className={`${footerLink} line-clamp-3 !mb-[15px] md:!mb-[50px] 2xl:!mb-[60px] 3xl:!mb-[80px]`}>
                    Centurion Star Tower, behind Day To Day,Port Saeed 34 St. Deira. Dubai, United Arab Emirates
                  </p>
                  <div className={`${footerHeading} !mb-[10px]`}>Stay in the loop.</div>
                  <p className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px]  leading-[1.3] font-light text-white mb-[25px]">
                    Sign up for email updates today.
                  </p>
                  <div className="w-full flex items-center relative z-0 bg-white p-[2px] rounded-[4px] xl:rounded-[5px] 2xl:rounded-[8px] 3xl:rounded-[10px] h-[25px] xl:h-[30px] 2xl:h-[35px] 3xl:h-[45px]">
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full w-[calc(100%-75px)]  
                        xl:w-[calc(100%-95px)] 2xl:w-[calc(100%-115px)] 3xl:w-[calc(100%-145px)]  placeholder-[#555555] placeholder:text-[8px]
                          placeholder:xl:text-[10px] placeholder:2xl:text-[12px] placeholder:3xl:text-[14px] !text-[8px]
                          xl:!text-[10px] 2xl:!text-[12px] 3xl:!text-[14px]"
                    />
                    <Button
                      type="submit"
                      className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] bg-[#BE1E2D] w-[75px] xl:w-[95px] 2xl:w-[115px] 3xl:w-[145px] h-full 
                      rounded-[4px] xl:rounded-[5px] 2xl:rounded-[8px] 3xl:rounded-[10px] 
                      uppercase font-normal cursor-pointer"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className={`${footerHeading}`}>our Location</div>
                <div>
                  <Link
                    href="https://maps.app.goo.gl/z5LV1Zd5tjzemEAZ7"
                    className="h-[130px] sm:h-[150px] xl:h-[195px] 2xl:h-[220px] 3xl:h-[283px] aspect-square block rounded-[10px] overflow-hidden w-full"
                  >
                    <Image src="/images/mapFooter.webp" alt="logo" width="490" height="283" className="w-full h-full block object-cover" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#0E1D44] p-[12px_15px] xl:p-[15px_20px] 2xl:p-[18px_25px] 3xl:p-[22px_30px] rounded-[10px] mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-wrap items-center">
              <div className="text-[20px] lg:text-[26px] xl:text-[33px] 2xl:text-[40px] 3xl:text-[50px] font-semibold text-white sm:mb-[0px] mb-[10px]">
                CONNECT WITH US
              </div>
              <div className="lg:pl-[40px] md:pl-[30px] pl-[20px] sm:mb-[0px] mb-[10px]">
                <Image
                  src="/images/arrow.webp"
                  alt="logo"
                  width="78"
                  height="15"
                  className=" h-full w-[40px] xl:w-[52px] 2xl:w-[62px] 3xl:w-[78px] block object-contain"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center sm:w-auto w-full">
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:w-auto w-full 2xs:mb-[0px] mb-[10px]">
                <div className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] font-medium text-white">EMAIL</div>
                <a
                  href={footerContents?.footer_email ? `mailto:${footerContents?.footer_email}` : "mailto:sales@shayan.ae"}
                  className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] block text-white hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_email ? footerContents?.footer_email : "sales@shayan.ae"}
                </a>
              </div>
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:pl-[25px] 2xs:w-auto w-full 2xs:mb-[0px] mb-[10px]">
                <div className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] font-medium text-white">TELEPHONE</div>
                <a
                  href={footerContents?.footer_tel ? `tel:${footerContents?.footer_tel}` : "tel:+97142728150"}
                  className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] block text-white hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_tel ? footerContents?.footer_tel : "+971 42 728 150"}
                </a>
              </div>
              <div className="3xl:pl-[60px] 2xl:pl-[40px] md:pl-[25px] sm:pl-[20px] 2xs:pl-[25px] 2xs:w-auto w-full">
                <div className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] font-medium text-white">WHATSAPP</div>
                <a
                  href={footerContents?.footer_whtsapp ? `https://wa.me/${footerContents?.footer_whtsapp}` : "https://wa.me/971505286045"}
                  target="_blank"
                  className="text-[10px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] block text-white hover:text-[#BE1E2D]"
                >
                  {footerContents?.footer_whtsapp ? footerContents?.footer_whtsapp : "+971 50 528 6045"}
                </a>
              </div>
            </div>
            <SocialMediaSections socialmedias={socialMediaLinks} />
          </div>
        </div>

        {/* copyRight */}
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-white text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] sm:mb-[0px] mb-[10px]">
            © 2025 Shayan Royal Group. All rights reserved.
          </div>
          <div className="text-white text-[7px] xl:text-[9px] 2xl:text-[11px] 3xl:text-[14px] text-right">
            <div className="flex flex-wrap">
              Designed By:
              <a href="" className="block pl-[10px]">
                <Image
                  src="/images/intersmart.webp"
                  alt="logo"
                  width="96"
                  height="12"
                  className="w-full h-full block object-contain max-w-[50px] xl:max-w-[65px] 2xl:amx-w-[75px] 3xl:max-w-[95px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
