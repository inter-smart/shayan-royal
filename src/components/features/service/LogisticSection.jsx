import EnquiryForm from "../../common/EnquiryForm";

export default function LogisticSection () {
    return (
        <section className="w-full h-auto block 3xl:py-[130px] 2xl:py-[100px] lg:py-[80px] sm:py-[60px] py-[40px]">
            <div className="container">
                <EnquiryForm image="/images/fitment-enquiry.webp"
                    Formtitle="One Click Away Send Your Enquiry"
                    Formsubtitle="Seamless Logistic"
                />
            </div>
        </section>
    );
}