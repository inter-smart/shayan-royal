"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { mediaUrl } from "@/lib/constants";
import { useState } from "react";
import { useFormLoading } from "@/hooks/usePageLoading";

// Tailwind Classes
const menuLinkClass =
  "!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal max-w-full min-h-[35px] lg:min-h-[40px] 3xl:min-h-[50px]  !w-full px-0 border-0 border-b border-[#000] bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none data-[state=open]:shadow-none font-base1";

const errorMessage = "absolute bottom-[-12px] left-[5px] 2xl:left-[10px] md:text-[12px] text-[10px] text-red-500";

// Zod Schema
const formSchema = z.object({
  Name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, {
    message: "Enter a valid phone number.",
  }),
});

export default function ReserveForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { submitWithLoading } = useFormLoading();
  const params = useParams();

  const onSubmit = async (values) => {
    const inventoryId = params.slug;

    try {
      await submitWithLoading(async () => {
      const payload = {
        name: values.Name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        inventory_id: inventoryId,
      };

      const res = await fetch(`${mediaUrl}/api/reserve-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

        const data = await res.json();

        if (data.success) {
          toast.success(data.message || "Enquiry submitted!");
          form.reset();
          return data;
        } else {
          throw new Error(data.message || "Something went wrong. Please try again.");
        }
      }, "Submitting enquiry...");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit enquiry. Please try again later.");
    }
  };

  return (
    <div className="relative bg-[#F5F9FF] rounded-[10px] p-[15px_20px] 3xl:px-[20px] px-[15px] shadow-2xl overflow-hidden">
      <Heading size="heading5" as="div" className="text-black uppercase font-semibold xl:mb-[10px]">
        Reserve Your Ride
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-end">
          {/* Name */}
          <FormField
            name="Name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full p-[5px] 2xl:p-[10px] relative">
                <FormControl>
                  <Input placeholder="Name*" {...field} className={menuLinkClass} />
                </FormControl>
                <FormMessage className={errorMessage} />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full p-[5px] 2xl:p-[10px] relative">
                <FormControl>
                  <Input placeholder="Email*" {...field} className={menuLinkClass} />
                </FormControl>
                <FormMessage className={errorMessage} />
              </FormItem>
            )}
          />
          {/* Phone */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full p-[5px] 2xl:p-[10px] relative">
                <FormControl>
                  <Input placeholder="Phone Number*" {...field} className={menuLinkClass} />
                </FormControl>
                <FormMessage className={errorMessage} />
              </FormItem>
            )}
          />
          {/* Message */}
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full p-[5px] 2xl:p-[10px] relative">
                <FormControl>
                  <Textarea placeholder="Message" {...field} className={menuLinkClass} rows={2} />
                </FormControl>
                <FormMessage className={errorMessage} />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="w-full mt-4 p-[5px] 2xl:p-[10px] flex justify-end">
            <Button
              type="submit"
              className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px]  text-white font-light rounded-[80px] uppercase px-2 py-1 bg-[#2E4C99] hover:bg-[#be1e2d] 
              3xl:h-[40px] 2xl:h-[40px] xl:h-[30px] h-[30px] md:min-w-[120px] sm:min-w-[100px] min-w-full cursor-pointer"
            >
              Get started
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
