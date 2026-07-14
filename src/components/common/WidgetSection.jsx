import { fetchFromAPI } from "@/lib/api";
import { mediaUrl } from "@/lib/constants";
import Image from "next/image";
import Script from "next/script";

const menuLinkClass =
  "3xl:w-[32px] 3xl:h-[32px] 2x:w-[24px] 2xl:h-[24px] w-[20px] h-[20px] rounded-full flex items-center justify-center transition-all hover:lg:scale-130";

export default async function WidgetSection() {
  const { data, error } = await fetchFromAPI("float-icons");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { buttons } = data;

  return (
    <section>
      <div className="fixed right-[-2px] top-1/3 z-50 3xl:w-[65px] 2xl:w-[50px] lg:w-[40px] w-[30px] 3xl:min-h-[260px] min-h-[240px] flex items-center justify-center py-[85px] max-md:px-[15px]">
        <Image
          src="/images/widgetBg.png"
          alt="buttonBg"
          width="47"
          height="230"
          className={`absolute top-0 left-0 w-full object-fill h-full -z-10 `}
        />
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
          {buttons?.map((button, index) => {
            let bgClass = "";

            if (button?.link?.startsWith("tel:")) {
              bgClass = "bg-[#24408A]"; // Call Us
            } else if (button?.link?.startsWith("mailto:")) {
              bgClass = "bg-[#BE1E2D]"; // Email Us
            } else if (button?.link?.includes("wa.me")) {
              bgClass = "bg-[#2AA81A]"; // WhatsApp
            }

            return (
              <a
                key={index}
                href={button?.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${menuLinkClass} ${bgClass} cursor-pointer`}
                aria-label={button?.alt}
              >
                <div className="lg:max-w-[13px] max-w-[10px] flex">
                  <Image
                    src={button?.icon ? `${mediaUrl}${button?.icon}` : "/images/no-image.jpg"}
                    width="13"
                    height="13"
                    className="object-contain"
                    alt={button?.alt}
                  />
                </div>
              </a>
            );
          })}

          {/* <a href="tel:+971123456789" className={`${menuLinkClass} bg-[#24408A] cursor-pointer`} aria-label="Call Us">
            <div className="lg:max-w-[13px] max-w-[10px] flex">
              <Image src="/images/callIcon.svg" width="13" height="13" className="object-contain" alt="call" />
            </div>
          </a>

          <a href="mailto:info@example.com" className={`${menuLinkClass} bg-[#BE1E2D] cursor-pointer`} aria-label="Email Us">
            <div className="lg:max-w-[13px] max-w-[10px] flex">
              <Image src="/images/mailIcon.svg" width="13" height="13" className="object-contain" alt="mail" />
            </div>
          </a>

          <a
            href="https://wa.me/971123456789"
            target="_blank"
            rel="noopener noreferrer"
            className={`${menuLinkClass} bg-[#2AA81A] cursor-pointer`}
            aria-label="WhatsApp Us"
          >
            <div className="lg:max-w-[13px] max-w-[10px] flex">
              <Image src="/images/wtapicon.svg" width="13" height="13" className="object-contain" alt="whatsapp" />
            </div>
          </a> */}
        </div>
      </div>
      {/* chat us  */}
      {/* <div className="fixed bottom-[60px] md:right-[40px] right-[15px] ">
        <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-all hover:-translate-y-1">
          <Image src="/images/chat_icon.png" width="40" height="40" className="w-full h-full object-cover" alt="chat_icon" />
        </div>
      </div> */}
      <Script id="zoho-init" strategy="lazyOnload">
        {`window.$zoho = window.$zoho || {};
          $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
        `}
      </Script>

      <Script
        id="zoho-salesiq"
        src="https://salesiq.zohopublic.com/widget?wc=siqed953e1b49e39ca20576f0bb91bae38ba97bf7f0fa471ea161411f81335df6e5"
        strategy="lazyOnload"
      />


    </section>
  );
}
