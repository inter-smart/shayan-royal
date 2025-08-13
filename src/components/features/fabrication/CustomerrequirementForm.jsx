"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { countries } from "@/data/countries";
import Image from "next/image";
import { mediaUrl } from "@/lib/constants";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PhoneInput from "@/components/ui/phone-input";

// Tailwind Classes
const menuLinkClass =
  "!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] !w-full px-0 border-0 border-b border-[#000] bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none data-[state=open]:shadow-none font-base1";

const contentClass =
  "3xl:text-[18px] 2xl:text-[16px] md:text-[12px] text-[10px] bg-white border border-[#CCCCCC] rounded-md shadow-md font-medium text-black";

const itemClass = "py-[10px] px-4 hover:bg-[#00095b] focus:bg-[#1D0A44] focus:text-white cursor-pointer";

const mainText = "3xl:text-[25px] 2xl:text-[21px] lg:text-[18px] text-[16px] text-[#2E4C99] font-medium font-base1 placeholder:!text-black my-[10px]";

const errorMessage = "absolute bottom-[-15px] lg:left-[15px] left-[8px] md:text-[12px] text-[10px]";

const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

// Schema
const formSchema = z.object({
  company: z.string().optional(),
  contactPerson: z.string().nonempty("Contact person is required"),
  phone: z.string().regex(/^\+?[1-9]\d{0,2}(?:-\d{1,3})?\s\d{7,14}$/, {
    message: "Enter a valid international phone number.",
  }),
  email: z.string().email("Invalid email"),
  address: z.string().optional(),
  fabricationType: z.string().optional(),
  finalDestination: z.string().nonempty("Select final destination"),
  make_id: z.string().optional(),
  model_id: z.string().optional(),
  modelYear: z.string().optional(),
  vehicleType: z.string().optional(),
  additionalNotes: z.string().optional(),
  samplePictures: z
    .any()
    .refine(
      (files) =>
        !files || (Array.isArray(files) && files.length > 0 && files.every((file) => file instanceof File && imageMimeTypes.includes(file.type))),
      {
        message: "Only image files are allowed (jpg, jpeg, png, webp, gif)",
      }
    ),
  budgetRange: z.string().optional(),
  deliveryDate: z.date().optional(),
});

export default function CustomerrequirementForm({ title, type }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [date, setDate] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const [makeId, setMakeId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      make_id: "",
      model_id: "",
      modelYear: "",
      vehicleType: "",
      additionalNotes: "",
      samplePictures: "",
      budgetRange: "",
      deliveryDate: undefined,
    },
  });

  // fetch drropdown data
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(`${mediaUrl}/api/drop-down-data/cosumer-dropdown`);
        if (!response.ok) {
          throw new Error("Failed to fetch dropdown data");
        }
        const data = await response.json();
        setDropdownData(data);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };
    fetchMakes();
  }, []);

  const models = makeId ? dropdownData?.models?.filter((model) => model.make_id == Number(makeId)) : [];

  const onSubmit = async (values) => {
    setLoading(true);

    const token = await executeRecaptcha("submit_form");
    if (!token) {
      toast.error("Failed to get reCAPTCHA token. Please try again.");
      setLoading(false);
      return;
    }
    console.log(values);

    try {
      // Extract country code from phone number
      const phoneValue = values.phone || "";
      const phoneMatch = phoneValue.match(/^(\+\d+)\s(.+)$/);
      const countryCode = phoneMatch ? phoneMatch[1] : "";
      const country = countries.find((c) => c.mobileCode === countryCode);

      // Convert file to Base64 if exists
      const formData = new FormData();
      formData.append("company", values.company);
      formData.append("contactPerson", values.contactPerson);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("fabricationType", values.fabricationType);
      formData.append("finalDestination", values.finalDestination);
      formData.append("make_id", values.make_id || "");
      formData.append("model_id", values.model_id || "");
      formData.append("modelYear", values.modelYear);
      formData.append("vehicleType", values.vehicleType);
      formData.append("country", country?.code || "");
      formData.append("additionalNotes", values.additionalNotes || "");
      formData.append("budgetRange", values.budgetRange);
      if (values.deliveryDate) {
        const dateValue = new Date(values.deliveryDate);
        if (!isNaN(dateValue.getTime())) {
          formData.append("deliveryDate", dateValue.toISOString());
        }
      }
      formData.append("recaptchaToken", token);

      // Append file if exists
      if (values.samplePictures instanceof File) {
        formData.append("samplePictures", values.samplePictures);
      }

      const response = await fetch(`${mediaUrl}/api/customer-requirements`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Input placeholder="Company Name " {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="contactPerson"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    {/* Custom Placeholder */}
                    {!field.value && (
                      <span
                        className={`!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal absolute left-3 
                                             top-[15px] lg:top-[30px]  border-none pointer-events-none text-sm transition-opacity duration-200 peer-focus:opacity-0 
                                            peer-placeholder-shown:opacity-100 `}
                      >
                        Contact Person <span className="text-red-500">*</span>
                      </span>
                    )}

                    {/* Input Field */}
                    <FormControl>
                      <Input
                        id="contact"
                        placeholder=" " // required for placeholder-shown to work
                        {...field}
                        className={`${menuLinkClass} peer`}
                      />
                    </FormControl>

                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />
              {/* PHONE NUMBER */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 lg:p-[15px] p-[8px] relative">
                    {!field.value && (
                      <span
                        className={`!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal absolute left-[70px] 
                         top-[15px] lg:top-[30px] border-none pointer-events-none text-sm transition-opacity duration-200 z-10 ml-10`}
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </span>
                    )}
                    <FormControl>
                      <PhoneInput value={field.value || ""} onChange={field.onChange} placeholder=" " defaultCountry="AE" />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    {!field.value && (
                      <span
                        className={`!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal absolute left-3
                                            top-[15px] lg:top-[30px] border-none pointer-events-none text-sm transition-opacity duration-200 peer-focus:opacity-0 
                                            peer-placeholder-shown:opacity-100 `}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </span>
                    )}
                    <FormControl>
                      <Input placeholder=" " {...field} className={menuLinkClass} />
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />

              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-2/3 md:w-full lg:p-[15px] p-[8px] relative">
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={menuLinkClass}>
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent className={contentClass} position="popper">
                            {dropdownData?.fabTypes?.map((make) => (
                              <SelectItem key={make.id} value={make.name} className={itemClass}>
                                {make.name}
                              </SelectItem>
                            ))}
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
                    {!field.value && (
                      <span
                        className={`!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal absolute left-3 
                                           top-[70px] lg:top-[80px] 2xl:top-[90px] border-none pointer-events-none text-sm transition-opacity duration-200 peer-focus:opacity-0 
                                            peer-placeholder-shown:opacity-100 `}
                      >
                        Country <span className="text-red-500">*</span>
                      </span>
                    )}
                    <div className={mainText}>Final Destination</div>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder=" " />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {countries.map((country) => (
                            <SelectItem key={country.name} value={country.name} className={itemClass}>
                              {country.name}
                            </SelectItem>
                          ))}
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
                name="make_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setMakeId(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Make" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {dropdownData?.makes?.map((make) => (
                            <SelectItem key={make.id} value={String(make.id)} className={itemClass}>
                              {make.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={errorMessage} />
                  </FormItem>
                )}
              />
              <FormField
                name="model_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!makeId}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Model" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {models?.length > 0 ? (
                            models?.map((model) => (
                              <SelectItem
                                key={model.id}
                                value={model.id} // or use id if needed
                                className={itemClass}
                              >
                                {model.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-gray-500">No models available</div>
                          )}
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
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 2xs:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Model Year" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {dropdownData?.years?.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ))}
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
                  <FormItem className="w-full lg:w-1/3 md:w-1/2 lg:p-[15px] p-[8px] relative">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {dropdownData?.carTypes?.map((type) => (
                            <SelectItem key={type.id} value={String(type.id)}>
                              {type.name}
                            </SelectItem>
                          ))}
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
                render={({ field }) => {
                  const [selectedFiles, setSelectedFiles] = useState([]);
                  const inputRef = useRef(null); // for resetting input if needed

                  const handleFileChange = (e) => {
                    const files = Array.from(e.target.files || []);
                    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

                    // Filter only allowed file types
                    const validFiles = files.filter((file) => {
                      if (allowedTypes.includes(file.type)) {
                        return true;
                      } else {
                        // Log warning for invalid files
                        console.warn(`File ${file.name} is not an allowed image type`);
                        return false;
                      }
                    });

                    // Show error message if some files were rejected
                    if (validFiles.length !== files.length) {
                      alert("Only image files are allowed (jpg, jpeg, png, webp, gif)");
                    }

                    setSelectedFiles((prev) => [...prev, ...validFiles]); // append valid files only
                    field.onChange([...selectedFiles, ...validFiles]);
                  };

                  const handleRemoveFile = (indexToRemove) => {
                    const updatedFiles = selectedFiles.filter((_, i) => i !== indexToRemove);
                    setSelectedFiles(updatedFiles);
                    field.onChange(updatedFiles);
                  };

                  return (
                    <FormItem className="w-full lg:p-[15px] p-[8px] relative">
                      <div className={mainText}>
                        Sample Pictures{" "}
                        <span className="2xl:text-[14px] text-[12px] text-black">
                          (Please attach any reference images for the required modifications.)
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-black">Upload the Sample Pictures</label>

                        <label className="flex items-center gap-2 text-[#24408A] text-sm cursor-pointer">
                          <div className="w-6 h-6 rounded-full bg-[#24408A] flex items-center justify-center text-white ">
                            {/* SVG icon */}
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
                          <input
                            type="file"
                            multiple
                            ref={inputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          />
                        </label>
                      </div>

                      {/* Selected files with close button */}
                      {selectedFiles.length > 0 && (
                        <ul className="mt-2 space-y-1 flex flex-wrap gap-1">
                          {selectedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="ml-2 text-black hover:text-red-700 text-[8px] cursor-pointer group flex"
                              >
                                <svg width="8" height="8" viewBox="0 0 15 15" className="fill-black group-hover:fill-[#f11025]">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.293457 12.8798C-0.0970427 13.2704 -0.0969825 13.9035 0.293577 14.294C0.684137 14.6845 1.3173 14.6845 1.70779 14.2939L7.29303 8.70773L12.8787 14.2934C13.2692 14.6839 13.9024 14.6839 14.2929 14.2934C14.6834 13.9029 14.6834 13.2697 14.2929 12.8792L8.70713 7.29343L14.2925 1.70705C14.6829 1.31649 14.6829 0.683328 14.2923 0.292838C13.9018 -0.0976623 13.2686 -0.0976027 12.8781 0.292957L7.29283 5.87923L1.70711 0.293438C1.31659 -0.0970825 0.683417 -0.0970825 0.292897 0.293438C-0.0976325 0.683968 -0.0976325 1.31713 0.292897 1.70766L5.87883 7.29353L0.293457 12.8798Z"
                                  />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="border-b border-gray-300 mt-2"></div>
                      <FormMessage className={errorMessage} />
                    </FormItem>
                  );
                }}
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={menuLinkClass}>
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent className={contentClass}>
                          {dropdownData?.budget?.map((item) => (
                            <SelectItem key={item.id} value={item.range}>
                              {item.range}
                            </SelectItem>
                          ))}
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
                  className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] bg-[#2E4C99] text-white rounded-[80px] px-6 hover:bg-[#1f3574] flex items-center
                                3xl:h-[40px] 2xl:h-[40px] xl:h-[30px] h-[30px] uppercase
                                md:min-w-[120px] sm:min-w-[100px]  min-w-full cursor-pointer"
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
