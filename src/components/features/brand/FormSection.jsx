
import Image from "next/image";

export default function FormSection() {
    return (
        <section className="w-full h-auto lg:pt-[50px] pt-[30px]  lg:pb-[140px] pb-[80px]">
            <div className="container">
                <div className="w-full flex flex-wrap">
                    <div className="w-[55%]">
                        <div className="rounded-none rounded-l-[10px] overflow-hidden">
                            <Image
                                src="/images/brand-form.webp"
                                alt="brand"
                                width={915}
                                height={567}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-[45%] bg-[#07163D] rounded-none rounded-r-[10px]">
                        <div className="text-[#fff] text-[40px] font-medium">
                            Enquiry Form
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}