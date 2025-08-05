"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mediaUrl } from "@/lib/constants";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const items = [
  {
    id: "name",
    label: "Name*",
    type: "text",
    placeholder: "Name*",
    validation: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
  },
  {
    id: "email",
    label: "Email*",
    type: "email",
    placeholder: "Email*",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    id: "phone",
    label: "Phone Number*",
    type: "text",
    placeholder: "Phone Number*",
    validation: {
      required: "Phone number is required",
      pattern: {
        value: /^(\+971\s?|0)(4|5[024568])\s?\d{3}\s?\d{4}$/,
        message: "Enter a valid UAE number (e.g., 0501234567 or +971 4 765 4321)",
      },
    },
  },
  {
    id: "subject",
    label: "Subject*",
    type: "text",
    placeholder: "Subject",
    validation: {
      required: "Subject is required",
      minLength: {
        value: 3,
        message: "Subject must be at least 3 characters",
      },
    },
  },
];

export default function EnquiryForm({ form_title, type }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const recaptchaToken = await executeRecaptcha(type || "enquiry");
    if (!recaptchaToken) {
      toast.error("Failed to get reCAPTCHA token. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...data, type, recaptchaToken }; // Merge `type` from props

      const res = await fetch(`${mediaUrl}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // <-- this is required
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error?.message || "Something went wrong");

      toast.success("Enquiry submitted successfully!");
      reset();
    } catch (err) {
      toast.error(err.message || "Submission failed");
    }
  };

  const inputFormStyle =
    "text-white w-full h-auto 2xl:p-[15px_0] p-[10px_0] bg-transparent border-0 border-b-1 border-white rounded-none placeholder:2xl:text-[16px] placeholder:text-[12px] placeholder:leading-[1] placeholder:font-normal placeholder:text-white focus-visible:placeholder:text-[#BE1E2D] focus-visible:border-[#BE1E2D] focus-visible:ring-0 focus:border-b-1 focus:border-[#BE1E2D] transition-colors duration-300 ease-in-out";

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="3xl:text-[30px] 2xl:text-[24px] md:text-[20px] sm:text-[18px] leading-[1] font-semibold text-white 2xl:mb-[20px] sm:mb-[15px] mb-[10px]">
        {form_title || "Enquiry Form"}
      </div>

      <div className="w-full h-full 2xl:mb-[35px] sm:mb-[25px] mb-[15px]">
        {items.map((item) => (
          <div key={item.id} className="2xl:mb-[30px] lg:mb-[20px] md:mb-[15px] sm:mb-[10px] mb-[7px]">
            <Input id={item.id} type={item.type} placeholder={item.placeholder} className={inputFormStyle} {...register(item.id, item.validation)} />
            {errors[item.id] && <p className="text-red-400 text-sm mt-1">{errors[item.id]?.message}</p>}
          </div>
        ))}

        <div className="2xl:mt-[50px] lg:mt-[30px] sm:mt-[20px] mt-[15px]">
          <Textarea
            id="message"
            rows={2}
            placeholder="Message"
            className={`${inputFormStyle} 2xl:min-h-[80px] min-h-[55px] pt-0`}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 5,
                message: "Message must be at least 5 characters",
              },
            })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="2xl:text-[16px] text-[12px] leading-[1] font-medium text-white w-full sm:w-fit 2xl:h-[40px] h-[35px] 2xl:p-[10px_45px] p-[5px_30px] bg-[#BE1E2D] rounded-[10px] cursor-pointer hover:bg-[#BE1E2D]/80 transition-colors duration-300 ease-in-out"
        >
          SUBMIT
        </Button>
      </div>
    </form>
  );
}
