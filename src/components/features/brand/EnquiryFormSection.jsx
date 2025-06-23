'use client';
import EnquiryForm from "./EnquiryForm";

export default function EnquiryFormSection() {
  return (
    <section className="w-full h-auto lg:pt-[50px] pt-[30px] lg:pb-[140px] md:pb-[80px] pb-[40px]">
      <div className="container mx-auto px-4">
        <EnquiryForm image="/images/brand-form.webp"
            Formtitle="Enquiry Form" />
      </div>
    </section>
  );
}
