"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Tailwind Classes
const menuLinkClass =
  "!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] !w-full px-0 border-0 border-b border-[#000] bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none data-[state=open]:shadow-none font-base1";

const contentClass =
  "3xl:text-[18px] 2xl:text-[16px] md:text-[12px] text-[10px] bg-white border border-[#CCCCCC] rounded-md shadow-md font-medium text-black";

const itemClass = "py-[10px] px-4 hover:bg-[#00095b] focus:bg-[#1D0A44] focus:text-white cursor-pointer";

const mainText = "3xl:text-[25px] 2xl:text-[21px] lg:text-[18px] text-[16px] text-[#2E4C99] font-medium font-base1 placeholder:!text-black my-[10px]";

const errorMessage = "absolute bottom-[-15px] lg:left-[15px] left-[8px] md:text-[12px] text-[10px]";

// Schema
const formSchema = z.object({
  company: z.string().nonempty("Company name is required"),
  contactPerson: z.string().nonempty("Contact person is required"),
  phone: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email"),
  address: z.string().nonempty("Address is required"),
  fabricationType: z.string().nonempty("Select a model"),
  finalDestination: z.string().nonempty("Select final destination"),
  make: z.string().nonempty("Select make"),
  modelYear: z.string().nonempty("Select model year"),
  vehicleType: z.string().nonempty("Select vehicle type"),
  additionalNotes: z.string().optional(),
  samplePictures: z.string().optional(),
  budgetRange: z.string().nonempty("Select budget range"),
  deliveryDate: z.date({ required_error: "Expected completion date is required" }),
});

export default function CustomerrequirementForm({ title }) {
  const [date, setDate] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      fabricationType: "",
      finalDestination: "",
      make: "",
      modelYear: "",
      vehicleType: "",
      additionalNotes: "",
      samplePictures: "",
      budgetRange: "",
      deliveryDate: undefined,
    },
  });

  const onSubmit = (values) => {};

  return (
    <section className="relative py-[20px] xl:py-[30px] 2xl:py-[40px] 3xl:py-[80px_60px]">
      <div className="container">
        <div className="relative bg-[#F5F9FF] px-[15px] md:px-[25px] 2xl:px-[35px] py-[30px] md:py-[40px] 2xl:py-[65px] 3xl:py-[95px] rounded-[10px] overflow-hidden">
          <Heading size="heading2" as="h2" className="text-black text-center uppercase font-normal 3xl:mb-[40px] 2xl:mb-[25px] md:mb-[15px]">
            {title ? title : "Customer Requirement Form"}
          </Heading>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-end">
              {/* PERSONAL INFO */}
              <div className="w-full lg:p-[15px] p-[8px]">
                <div className={`${mainText} mb-0`}>Personal Info</div>
              </div>

              <FormField
                name="company"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Company Name" {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="contactPerson"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Contact Person" {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Email Address" {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-2/3 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Address" {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* FABRICATION TYPE */}
              <div className="w-full md:w-1/2 lg:p-[15px] p-[8px] relative">
                <div className={mainText}>
                  Fabrication Type <span className="2xl:text-[14px] text-[12px] text-black">(Please select one or more options)</span>
                </div>
                <FormField
                  name="fabricationType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className={menuLinkClass}>
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent className={contentClass}>
                            <SelectItem value="type1" className={itemClass}>
                              Type 1
                            </SelectItem>
                            <SelectItem value="type2" className={itemClass}>
                              Type 2
                            </SelectItem>
                            <SelectItem value="type3" className={itemClass}>
                              Type 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className={errorMessage} />
                    </FormItem>
                  )}
                />
              </div>

              {/* FINAL DESTINATION */}
              <FormField
                name="finalDestination"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 lg:p-[15px] p-[8px] relative">
                    <div className={mainText}>Final Destination</div>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          <SelectItem value="country1" className={itemClass}>
                            Country 1
                          </SelectItem>
                          <SelectItem value="country2" className={itemClass}>
                            Country 2
                          </SelectItem>
                          <SelectItem value="country3" className={itemClass}>
                            Country 3
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* VEHICLE DETAILS */}
              <div className="w-full lg:p-[15px] p-[8px] ">
                <div className={mainText}>Vehicle Details</div>
              </div>

              <FormField
                name="make"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Make & Model" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          <SelectItem value="toyota" className={itemClass}>
                            Toyota
                          </SelectItem>
                          <SelectItem value="bmw" className={itemClass}>
                            BMW
                          </SelectItem>
                          <SelectItem value="audi" className={itemClass}>
                            Audi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="modelYear"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Model Year" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          <SelectItem value="2022" className={itemClass}>
                            2022
                          </SelectItem>
                          <SelectItem value="2023" className={itemClass}>
                            2023
                          </SelectItem>
                          <SelectItem value="2024" className={itemClass}>
                            2024
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="vehicleType"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          <SelectItem value="sedan" className={itemClass}>
                            Sedan
                          </SelectItem>
                          <SelectItem value="suv" className={itemClass}>
                            SUV
                          </SelectItem>
                          <SelectItem value="truck" className={itemClass}>
                            Truck
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* NOTES */}
              <FormField
                name="additionalNotes"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:p-[15px] p-[8px] relative">
                    <div className={mainText}>Additional Notes & Custom Requests</div>
                    <FormControl>
                      <Input placeholder="Type here..." {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* SAMPLE PICS */}
              <FormField
                control={form.control}
                name="samplePictures"
                render={({ field }) => (
                  <FormItem className="w-full lg:p-[15px] p-[8px] relative">
                    <div className={mainText}>
                      Sample Pictures{" "}
                      <span className="2xl:text-[14px] text-[12px] text-black">
                        {" "}
                        (Please attach any reference images for the required modifications.)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-black">Upload the Sample Pictures</label>
                      <label className="flex items-center gap-2 text-[#24408A] text-sm cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-[#24408A] flex items-center justify-center text-white ">
                          <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
                            <g clipPath="url(#clip0_4263_3055)">
                              <path
                                d="M6.72419 19.1871C4.764 17.199 4.78676 13.988 6.77494 12.0279L13.1838 5.70916C14.5827 4.33003 16.8427 4.34605 18.2219 5.74487C19.601 7.14369 19.585 9.40375 18.1861 10.7829L12.3113 16.575C11.5019 17.3731 10.1926 17.3638 9.39457 16.5543C8.59651 15.7449 8.60579 14.4357 9.41524 13.6376L14.2219 8.89858C14.4431 8.68055 14.7994 8.68307 15.0174 8.90421C15.2354 9.12536 15.2329 9.48166 15.0118 9.69969L10.2051 14.4387C9.83686 14.8017 9.83265 15.3963 10.1957 15.7645C10.5587 16.1327 11.1533 16.1369 11.5215 15.7739L17.3963 9.98176C18.3534 9.03818 18.3648 7.49228 17.4207 6.5347C16.4766 5.57712 14.9307 5.56668 13.9737 6.51027L7.56477 12.829C6.01888 14.3531 6.00117 16.8514 7.52531 18.3973C9.04944 19.9432 11.5477 19.9609 13.0936 18.4368L18.4344 13.1712C18.6555 12.9532 19.0118 12.9557 19.2299 13.1768C19.4479 13.398 19.4454 13.7543 19.2242 13.9723L13.8835 19.2379C11.8953 21.1981 8.68439 21.1753 6.72419 19.1871Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4263_3055">
                                <rect width="18" height="18" fill="white" transform="translate(13.0898 0.272461) rotate(45.4061)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <span className="underline">Upload File</span>
                        <input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} className="hidden" />
                      </label>
                    </div>
                    <div className="border-b border-gray-300"></div>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* BUDGET + DELIVERY */}
              <div className="w-full lg:p-[15px] p-[8px]">
                <div className={mainText}>Estimated Budget & Delivery Time</div>
              </div>

              <FormField
                name="budgetRange"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          <SelectItem value="10k" className={itemClass}>
                            Up to $10,000
                          </SelectItem>
                          <SelectItem value="20k" className={itemClass}>
                            $10,000 - $20,000
                          </SelectItem>
                          <SelectItem value="30k" className={itemClass}>
                            $20,000 - $30,000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="deliveryDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2  lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "text-left flex items-center justify-between cursor-pointer",
                              menuLinkClass,
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : "Expected Completion Date"}
                            <CalendarIcon className="h-6 w-6 text-[#5949A7]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(val) => {
                              field.onChange(val);
                              setDate(val);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <div className="w-full mt-4 lg:p-[15px] p-[8px] flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#2E4C99] text-white rounded-[80px] px-6 py-2 hover:bg-[#1f3574] min-h-[40px] md:min-w-[200px] sm:min-w-[170px] min-w-full cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
