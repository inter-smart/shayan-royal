"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Tailwind Classes
const menuLinkClass =
  "!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal max-w-full min-h-[35px] lg:min-h-[40px] 3xl:min-h-[50px]  !w-full px-0 border-0 border-b border-[#000] bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none data-[state=open]:shadow-none font-base1";

const errorMessage =
  "absolute bottom-[-12px] left-[5px] 2xl:left-[10px] md:text-[12px] text-[10px] text-red-500";

// Zod Schema
const formSchema = z.object({
  Name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().nonempty("Phone number is required"),
  message: z.string().nonempty("Message is required"),
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

  const onSubmit = (values) => {
    
  };

  return (
    <div className="relative bg-[#F5F9FF] rounded-[10px] p-[15px_20px] 3xl:px-[20px] px-[15px] shadow-2xl overflow-hidden">
      <Heading
        size="heading5"
        as="div"
        className="text-black uppercase font-semibold xl:mb-[10px]"
      >
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
                  <Textarea
                    placeholder="Message"
                    {...field}
                    className={menuLinkClass}
                    rows={2}
                  />
                </FormControl>
                <FormMessage className={errorMessage} />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="w-full mt-4 p-[5px] 2xl:p-[10px] flex justify-end">
            <Button
              type="submit"
              className="3xl:text-[16px] text-[14px] text-white rounded-[80px] uppercase px-6 py-2 bg-[#2E4C99] hover:bg-[#1f3574] 3xl:min-h-[40px] 2xl:min-h-[40px] md:min-w-[130px] sm:min-w-[100px] min-w-full cursor-pointer"
            >
              Get started
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
