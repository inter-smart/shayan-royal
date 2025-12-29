import { Heading } from "@/components/layout/Heading";

const items = [
  {
    title: "Address",
    value: (
      <>
        Centurion Star Tower, behind Day To Day,
        <br />
        Port Saeed 34 St. Deira. Dubai, United Arab Emirates
      </>
    ),
    isLink: false,
  },
  {
    title: "Email Us",
    value: "sales@shayan.ae",
    href: "#",
    isLink: true,
  },
  {
    title: "Telephone",
    value: "+971 4 272 8150",
    href: "tel:+97142728150",
    isLink: true,
  },
  {
    title: "Whatsapp",
    value: "+971 4 272 8150",
    href: "#",
    isLink: true,
  },
];

export default function ContactInfo({ footer }) {
  const contactItems = footer
    ? [
        {
          title: "Address",
          value: footer?.footer_address || "Centurion Star Tower, behind Day To Day, Port Saeed 34 St. Deira. Dubai, United Arab Emirates",
          isLink: true,
          href: `${footer?.map_link || "/"}`,
        },
        {
          title: "Email Us",
          value: footer?.footer_email || "sales@shayan.ae",
          isLink: true,
          className: "2xl:text-[20px] sm:text-[14px] leading-[1] font-semibold text-black hover:text-[#BE1E2D] transition-colors duration-300",
          href: `mailto:${footer?.footer_email || "sales@shayan.ae"}`,
        },
        {
          title: "Telephone",
          value: footer?.footer_tel || "+971 4 272 8150",
          isLink: true,
          className: "2xl:text-[20px] sm:text-[14px] leading-[1] font-semibold text-black hover:text-[#BE1E2D] transition-colors duration-300",
          href: `tel:${footer?.footer_tel || "+971 4 272 8150"}`,
        },
        {
          title: "Whatsapp",
          value: footer?.footer_whtsapp || "+971 4 272 8150",
          isLink: true,
          className: "2xl:text-[20px] sm:text-[14px] leading-[1] font-semibold text-black hover:text-[#BE1E2D] transition-colors duration-300",
          href: `https://wa.me/${footer?.footer_whtsapp || "+971 4 272 8150"}`,
        },
      ]
    : items;

  return (
    <div className="w-full h-auto 3xl:p-[30px] md:p-[20px_15px] p-[15px] bg-[#F5F9FF] flex max-md:flex-wrap">
      {contactItems?.map((item, index) => (
        <div
          key={index}
          className="md:w-[calc(100%/4)] w-full flex flex-col justify-center relative z-0 md:first:w-[35%] [&:not(:last-child)]:max-md:mb-[20px]
                     [&:not(:last-child)]:max-sm:mb-[15px] [&:not(:first-child)]:xl:pl-[30px] [&:not(:first-child)]:md:pl-[17px]
                     max-md:before:hidden first:before:hidden [&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:absolute
                      [&:not(:last-child)]:before:z-1 [&:not(:last-child)]:before:right-0 [&:not(:last-child)]:before:top-0
                       [&:not(:last-child)]:before:w-[1px] [&:not(:last-child)]:before:h-full [&:not(:last-child)]:before:bg-[#dde0e5]
                       max-md:border-b max-md-border-[#dde0e5] max-md:pb-[12px] last-of-type:border-none last-of-type:pb-0"
        >
          <Heading
            as="h2"
            className="3xl:text-[25px] 2xl:text-[20px] sm:text-[16px] text-[14px] leading-none font-semibold text-black 2xl:mb-[20px] md:mb-[10px] mb-[7px]"
          >
            {item.title}
          </Heading>
          <div className="3xl:text-[18px] 2xl:text-[16px] text-[12px] leading-[1.1] font-normal text-black">
            {item.isLink && item.href ? (
              <a href={item.href} className={item?.className || ""}>
                {item.value}
              </a>
            ) : (
              <p>{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
