"use client";
import { mediaUrl } from "@/lib/constants";
import EnquiryForm from "../../common/EnquiryForm";

export default function FitmentEnquirySection({ title, desc, image }) {
  return (
    <section className="w-full h-auto block 3xl:pb-[130px] 2xl:pb-[100px] lg:pb-[80px] sm:pb-[60px] pb-[40px]">
      <div className="container">
        <EnquiryForm
          image={image ? `${mediaUrl}${image}` : "/images/fitment-enquiry.webp"}
          Formtitle={title || "One Click Away Send Your Enquiry"}
          Formsubtitle={desc || "Seamless Logistic"}
          type="fitments"
        />
      </div>
    </section>
  );
}
