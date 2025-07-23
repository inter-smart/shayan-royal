"use client";
import { mediaUrl } from "@/lib/constants";
import EnquiryForm from "../../common/EnquiryForm";

export default function EnquiryFormSection({ image }) {
  return (
    <section className="w-full h-auto lg:pt-[50px] pt-[30px] lg:pb-[140px] md:pb-[80px] pb-[40px]">
      <div className="container mx-auto px-4">
        <EnquiryForm image={image ? `${mediaUrl}${image}` : "/images/brand-form.webp"} Formtitle="Enquiry Form" />
      </div>
    </section>
  );
}
