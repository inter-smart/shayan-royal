import { mediaUrl } from "@/lib/constants";
import EnquiryForm from "../../common/EnquiryForm";

export default function LogisticSection({ title, desc, image }) {
  return (
    <section className="w-full h-auto block 3xl:py-[130px] 2xl:py-[100px] lg:py-[80px] sm:py-[60px] py-[40px]">
      <div className="container">
        <EnquiryForm
          image={image ? `${mediaUrl}${image}` : "/images/fitment-enquiry.webp"}
          Formtitle={title || "One Click Away Send Your Enquiry"}
          Formsubtitle={desc || "Seamless Logistic"}
          type="service-details"
        />
      </div>
    </section>
  );
}
