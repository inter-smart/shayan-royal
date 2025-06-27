'use client';
import EnquiryForm from "../../common/EnquiryForm";

export default function FitmentEnquirySection() {
  return (
    <section className="w-full h-auto block 3xl:pb-[130px] 2xl:pb-[100px] lg:pb-[80px] sm:pb-[60px] pb-[40px]">
      <div className="container">
        <EnquiryForm image="/images/fitment-enquiry.webp"
            Formtitle="One Click Away Send Your Enquiry" 
            Formsubtitle="Seamless Logistic"
            />
      </div>
    </section>
  );
}
