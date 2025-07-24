import InnerBanner from "@/components/common/InnerBanner";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import GetInTouchSection from "@/components/features/contact/GetInTouchSection";
import ContactMapSection from "@/components/features/contact/ContactMapSection";
import { mediaUrl } from "@/lib/constants";
import { fetchFromAPI } from "@/lib/api";

export default async function Page() {
  const { data, error } = await fetchFromAPI("contact");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  const { banner, footer, socialLinks, contents } = data;

  return (
    <>
      <InnerBanner
        title={banner?.title ? banner?.title : "Contact us"}
        image={banner?.image ? `${mediaUrl}${banner?.image}` : "/images/contact_banner.webp"}
        alt={banner?.title ? banner?.title : "contact-banner"}
      />
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "CONTACT US", isCurrent: true },
        ]}
      />
      <GetInTouchSection
        title={contents?.title ? contents?.title : "Get in Touch"}
        description={contents?.description}
        socialLinks={socialLinks}
        image={contents?.form_image}
        form_title={contents?.form_title}
        footer={footer}
      />
      <ContactMapSection />
    </>
  );
}
