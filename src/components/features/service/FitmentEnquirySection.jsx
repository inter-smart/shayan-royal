'use client';
import EnquiryForm from "../../common/EnquiryForm";

export default function FitmentEnquirySection() {
  return (
    <section className="w-full h-auto lg:pt-[50px] pt-[30px] lg:pb-[140px] md:pb-[80px] pb-[40px]">
      <div className="container">
        <EnquiryForm image="/images/fitment-enquiry.webp"
            Formtitle="One Click Away Send Your Enquiry" 
            Formsubtitle="Seamless Logistic"
            />
      </div>
    </section>
  );
}
