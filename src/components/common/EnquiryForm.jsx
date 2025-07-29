"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const items = [
  { id: "name", label: "Name*", type: "text", required: true, placeholder: "Name*" },
  { id: "email", label: "Email*", type: "email", required: true, placeholder: "Email*" },
  { id: "phone", label: "Phone Number*", type: "text", required: true, placeholder: "Phone Number*" },
];

export default function EnquiryForm({ image, Formtitle, Formsubtitle }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission (e.g. API call)
    console.log("Form submitted", form);
  };

  const inputFormStyle =
    "text-white w-full h-auto 2xl:p-[15px_0] p-[10px_0] bg-transparent border-0 border-b border-white rounded-none placeholder:2xl:text-[16px] placeholder:text-[12px] placeholder:leading-[1] placeholder:font-normal placeholder:text-white focus-visible:placeholder:text-[#BE1E2D] focus-visible:border-[#BE1E2D] focus-visible:ring-0 transition-colors duration-300 ease-in-out";

  return (
    <div className="w-full flex flex-wrap rounded-[10px] overflow-hidden">
      <div className="w-full lg:w-[55%]">
        <Image
          src={image}
          alt="brand"
          width={915}
          height={567}
          className="w-full h-full object-cover lg:rounded-l-[10px]"
        />
      </div>
      <div className="w-full lg:w-[45%] bg-[#07163D] lg:rounded-r-[10px] 2xl:pt-[45px] xl:pt-[30px] 2xs:pt-[20px] pt-[15px] 2xl:pr-[75px] xl:pr-[55px] 2xs:pr-[35px] pr-[15px] 2xl:pb-[55px] xl:pb-[45px] 2xs:pb-[35px] pb-[25px] 2xl:pl-[75px] xl:pl-[55px] 2xs:pl-[35px] pl-[15px] relative after:content-[''] after:absolute after:top-0 after:right-0 after:bg-[url('/images/form-bg2.webp')] after:bg-no-repeat xl:after:w-[320px] after:w-[220px] xl:after:h-[185px] after:h-[135px] after:bg-contain
           before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[url('/images/form-bg.webp')] before:bg-no-repeat xl:before:w-[330px] before:w-[240px] xl:before:h-[155px] before:h-[115px] before:bg-contain before:pointer-events-none after:pointer-events-none">
        <div className="text-white 2xl:text-[20px] text-[15px] font-base1 mb-[0px]">
          {Formsubtitle}
        </div>
        <div className="text-white 3xl:text-[35px] 2xl:text-[30px] text-[20px] font-base1 font-medium uppercase 2xl:mb-[35px] 2xs:mb-[25px] mb-[15px]">
          {Formtitle}
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          {items.map((item) => (
            <div key={item.id} className="2xl:mb-[40px] 2xs:mb-[30px] mb-[20px]">
              <Input
                id={item.id}
                name={item.id}
                type={item.type}
                required={item.required}
                placeholder={item.placeholder}
                value={form[item.id]}
                onChange={handleChange}
                className={inputFormStyle}
              />
            </div>
          ))}

          <div className="2xl:mt-[40px] 2xs:mt-[30px] mt-[20px] 2xl:mb-[40px] 2xs:mb-[30px] mb-[20px]">
            <Textarea
              id="message"
              name="message"
              rows={2}
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className={`${inputFormStyle} min-h-[55px] pt-0`}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="2xl:text-[16px] text-[12px] leading-[1] font-medium text-[#2E4C99] w-full sm:w-fit 2xl:h-[40px] h-[35px] 2xl:p-[10px_45px] p-[5px_30px] bg-[#FFFFFF] rounded-[50px] cursor-pointer hover:bg-[#BE1E2D]/80 transition-colors duration-300 ease-in-out hover:text-white"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
