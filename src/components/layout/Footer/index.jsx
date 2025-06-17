import Link from 'next/link';
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const footerLink = "2xl:text-[14px] xl:text-[12px] md:text-[11px] text-[10px] text-white/60 capitalize font-normal hover:text-white transition-all"
const footerHeading = "lg:text-[11px] text-[10px] uppercase text-white/40 font-medium lg:mb-3 mb-1"

export default function footer() {
  return (
    <footer className="w-full h-auto block bg-[#07163D] py-[120px_60px]">
      <div className="container">
        <div className="w-full flex flex-wrap">
          <div className="w-[25%] pr-[60px]">
            <Link
              href="#"
              className="w-[320px] h-[135px] aspect-square block mb-[50px]"
            >
              <Image
                src="/images/footer-logo.webp"
                alt="logo"
                width="319"
                height="135"
                className="w-full h-full block object-contain"
              />
            </Link>
            <p className="text-[20px] leading-[1.3] font-normal text-white ">
              Shayan Royal General Trading was established in 1995 in Dubai, United Arab Emirates and has since extended its core business into exporting of Brand-new cars from Middle East.
            </p>
          </div>
          <div className="w-[20%] pr-[60px]">
            <Heading
              as="h6"
              className="text-[20px] leading-none font-semibold uppercase text-white mb-[30px]"
            >
              Quick Link
            </Heading>
            <ul>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Brands Specialized In
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[20px] block text-white mb-[15px] hover:text-[#BE1E2D]" >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[25%] pr-[60px]">
            <Heading
              as="h6"
              className="text-[20px] leading-none font-semibold uppercase text-white mb-[30px]"
            >
              visit us
            </Heading>
            <p className="text-[20px] leading-[1.3] font-normal text-white mb-[85px]">
              Centurion Star Tower, behind Day To Day,Port Saeed 34 St. Deira.
              Dubai, United Arab Emirates
            </p>
            <Heading
              as="h6"
              className="text-[20px] leading-none font-semibold uppercase text-white mb-[10px]"
            >
              Stay in the loop.
            </Heading>
            <p className="text-[16px] leading-[1.3] font-normal text-white mb-[25px]">
              Sign up for email updates today.
            </p>
            <div className="w-full flex items-center relative z-0">
              <Input
                type="email"
                placeholder="Enter Email"
                className="rounded-[10px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white h-[45px] placeholder-[#555555] placeholder:text-[14px]"
              />
              <Button
                type="submit"
                className="absolute top-0 right-[10px] bottom-0 margin-auto bg-[#BE1E2D] h-[40px] top-1/2 -translate-y-1/2 right-[3px] text-[16px] uppercase font-medium">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="w-[30%] ">
            <Heading
              as="h6"
              className="text-[20px] leading-none font-semibold uppercase text-white mb-[30px]"
            >
              our Location
            </Heading>
            <div>
              <Link
                href="https://maps.app.goo.gl/z5LV1Zd5tjzemEAZ7"
                className="w-[490px] h-[283px] aspect-square block mb-[50px] rounded-[10px] overflow-hidden w-full"
              >
                <Image
                  src="/images/map.webp"
                  alt="logo"
                  width="490"
                  height="283"
                  className="w-full h-full block object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#0E1D44] pt-[20px] pr-[50px] pb-[20px] pl-[30px] rounded-[10px] mb-[45px]">
          <div className='flex flex-wrap'>
            <div className='flex flex-wrap'>
              <div className='text-[50px] font-semibold text-white'>
                CONNECT WITH US
              </div>
              <div className='pl-[40px]'>
                <Image
                  src="/images/arrow.webp"
                  alt="logo"
                  width="78"
                  height="15"
                  className="w-full h-full block object-contain"
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='pl-[60px]'>
                <div className='text-[20px] font-medium text-white'>EMAIL</div>
                <a href="mailto:sales@shayan.ae" className='block text-white text-[20px] hover:text-[#BE1E2D]'>sales@shayan.ae</a>
              </div>
              <div className='pl-[60px]'>
                <div className='text-[20px] font-medium text-white'>TELEPHONE</div>
                <a href="tel:+97142728150" className='block text-white text-[20px] hover:text-[#BE1E2D]'>+971 4 272 8150</a>
              </div>
              <div className='pl-[60px]'>
                <div className='text-[20px] font-medium text-white'>WHATSAPP</div>
                <a href="https://wa.me/971505286045" target="_blank" className='block text-white text-[20px] hover:text-[#BE1E2D]'>+971 50 528 6045</a>
              </div>
            </div>
            <div className='flex flex-wrap pl-[90px]'>
              <a href="" className='pr-[25px] transition-all duration-500 hover:scale-110'>
                <Image
                  src="/images/insta.webp"
                  alt="logo"
                  width="46"
                  height="46"
                  className="w-full h-full block object-contain"
                />
              </a>
              <a href="" className='pr-[25px] transition-all duration-500 hover:scale-110'>
                <Image
                  src="/images/fb.webp"
                  alt="logo"
                  width="46"
                  height="46"
                  className="w-full h-full block object-contain"
                />
              </a>
              <a href="" className='pr-[25px] transition-all duration-500 hover:scale-110'>
                <Image
                  src="/images/youtube.webp"
                  alt="logo"
                  width="46"
                  height="46"
                  className="w-full h-full block object-contain"
                />
              </a>
              <a href="" className='pr-[25px] transition-all duration-500 hover:scale-110'>
                <Image
                  src="/images/linkdin.webp"
                  alt="logo"
                  width="46"
                  height="46"
                  className="w-full h-full block object-contain"
                />
              </a>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='text-white text-[16px]'>
            © 2025 Shayan Royal Group. All rights reserved.
          </div>
          <div className='text-white text-[16px] text-right'>
            <div className='flex flex-wrap'>
              Designed By:
              <a href="" className='block pl-[10px]'>
                <Image
                  src="/images/intersmart.webp"
                  alt="logo"
                  width="96"
                  height="12"
                  className="w-full h-full block object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
