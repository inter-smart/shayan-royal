"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const items = [
    { id: "name", label: "Name*", type: "text", required: true, placeholder: "Name*" },
    { id: "email", label: "Email*", type: "email", required: true, placeholder: "Email*" },
    { id: "phone", label: "Phone Number*", type: "text", required: true, placeholder: "Phone Number*" },
    { id: "subject", label: "Subject*", type: "text", required: true, placeholder: "Subject*" },
];

export default function EnquiryForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const inputFormStyle = "text-white w-full h-auto 2xl:p-[15px_0] p-[10px_0] bg-transparent border-0 border-b-1 border-white rounded-none placeholder:2xl:text-[16px] placeholder:text-[12px] placeholder:leading-[1] placeholder:font-normal placeholder:text-white focus-visible:placeholder:text-[#BE1E2D] focus-visible:border-[#BE1E2D] focus-visible:ring-0 focus:border-b-1 focus:border-[#BE1E2D] transition-colors duration-300 ease-in-out";

    return (
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <div className="3xl:text-[30px] 2xl:text-[24px] md:text-[20px] sm:text-[18px] leading-[1] font-semibold text-white 2xl:mb-[20px] sm:mb-[15px] mb-[10px]">ENQUIRY FORM</div>
            <div className="w-full h-full 2xl:mb-[35px] sm:mb-[25px] mb-[15px]">
                {items.map((item) => (
                    <div key={item.id}
                        className="2xl:mb-[30px] lg:mb-[20px] md:mb-[15px] sm:mb-[10px] mb-[7px]"
                    >
                        <Input
                            id={item.id}
                            name={item.id}
                            type={item.type}
                            required={item.required}
                            placeholder={item.placeholder}
                            value={form[item.id]}
                            onChange={handleChange}
                            className={`${inputFormStyle}`}
                        />
                    </div>
                ))}
                <div className="2xl:mt-[50px] lg:mt-[30px] sm:mt-[20px] mt-[15px]">
                    <Textarea
                        id="message"
                        name="message"
                        rows={2}
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputFormStyle} 2xl:min-h-[80px] min-h-[55px] pt-0`}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="2xl:text-[16px] text-[12px] leading-[1] font-medium text-white w-full sm:w-fit 2xl:h-[40px] h-[28px] 2xl:p-[10px_45px] p-[5px_30px] bg-[#BE1E2D] rounded-[10px] cursor-pointer hover:bg-[#BE1E2D]/80 transition-colors duration-300 ease-in-out"
                >
                    SUBMIT
                </Button>
            </div>
        </form>
    );
}