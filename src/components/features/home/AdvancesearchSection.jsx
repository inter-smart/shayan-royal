"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { mediaUrl } from "@/lib/constants";

// Form validation schema
const formSchema = z.object({
  make: z.string(), //.nonempty("Select make"),
  model: z.string(), //.nonempty("Select model"),
  fuel: z.string(), //.nonempty("Select fuel"),
  gearbox: z.string(), //.nonempty("Select gearbox"),
  yearTo: z.string().optional(), // Changed from "year" to "yearTo"
  body: z.string().optional(),
  regionalSpec: z.string().optional(),
  yearFrom: z.string().optional(),
  steeringSide: z.string().optional(),
  carType: z.string().optional(),
  cylinders: z.string().optional(),
  seats: z.string().optional(),
});

export default function CarSearchForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dropdownData, setDropdownData] = useState(null);
  const [makeId, setMakeId] = useState(null);

  // loading / error states for dropdowns
  const [dropdownLoading, setDropdownLoading] = useState(true);
  const [dropdownError, setDropdownError] = useState(null);

  const searchParams = useSearchParams();

  const queryValues = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      make: params.make_id || "",
      model: params.model_id || "",
      fuel: params.fueltype || "",
      gearbox: params.gearbox || "",
      yearTo: params.yearTo || "",
      body: params.body || "",
      regionalSpec: params.regional_spec || "",
      yearFrom: params.yearFrom || "",
      steeringSide: params.steering_type || "",
      carType: params.car_type_id || "",
      cylinders: params.cylinder || "",
      seats: params.seats || "",
    };
  }, [searchParams]);

  // Auto-expand advanced search if car type is present in URL
  const shouldAutoExpand = useMemo(() => {
    return !!(
      queryValues.carType ||
      queryValues.regionalSpec ||
      queryValues.yearFrom ||
      queryValues.yearTo ||
      queryValues.steeringSide ||
      queryValues.cylinders ||
      queryValues.seats
    );
  }, [queryValues]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: queryValues, // initially from query string
    mode: "onSubmit",
  });

  useEffect(() => {
    if (queryValues.make) {
      setMakeId(queryValues.make);
    }
  }, [queryValues.make]);

  // Auto-expand advanced search if advanced parameters are present
  useEffect(() => {
    if (shouldAutoExpand) {
      setIsExpanded(true);
    }
  }, [shouldAutoExpand]);

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      // if (!values) {
      //   console.warn("No form values provided");
      //   return;
      // }
      // when no values do not navigate to nventry page

      // if (Object.values(values).every((value) => value === "")) {
      //   if (window.location.pathname === "/" || window.location.pathname === "/inventory") {
      //     return; // Do not navigate if on home page
      //   }
      //   await router.push("/inventory");
      //   return;
      // }

      const params = {
        make_id: values.make,
        model_id: values.model,
        fueltype: values.fuel,
        gearbox: values.gearbox,
        yearTo: values.yearTo, // Changed from "year" to "yearTo"
        body: values.body,
        regional_spec: values.regionalSpec,
        steering_type: values.steeringSide,
        car_type_id: values.carType,
        cylinder: values.cylinders,
        seats: values.seats,
        yearFrom: values.yearFrom,
      };

      // Filter out empty or undefined values
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined));

      console.log("filteredParams", filteredParams);

      const query = new URLSearchParams(filteredParams).toString();
      console.log("filteredParams", query);
      // await router.push so we can rely on isSubmitting during navigation
      await router.push(`/inventory?${query}`);
    } catch (error) {
      console.error("Error during form submission:", error);
      // show fallback navigation

      await router.push("/inventory");
    }
  };

  const handleClear = () => {
    form.reset({
      make: "",
      model: "",
      fuel: "",
      gearbox: "",
      yearTo: "",
      body: "",
      regionalSpec: "",
      yearFrom: "",
      steeringSide: "",
      carType: "",
      cylinders: "",
      seats: "",
    });

    // if in home page do not navigate to inventory
    if (window.location.pathname === "/") {
      setMakeId(null);
      return;
    }

    setMakeId(null);
    router.push("/inventory?");
  };

  useEffect(() => {
    let mounted = true;
    const fetchMakes = async () => {
      setDropdownLoading(true);
      setDropdownError(null);
      try {
        const response = await fetch(`${mediaUrl}/api/drop-down-data`);
        if (!response.ok) {
          throw new Error("Failed to fetch dropdown data");
        }
        const data = await response.json();
        if (!mounted) return;
        setDropdownData(data);
      } catch (error) {
        if (!mounted) return;
        console.error("Failed to fetch dropdown data:", error);
        setDropdownError(error?.message || "Failed to load dropdowns");
      } finally {
        if (!mounted) return;
        setDropdownLoading(false);
      }
    };
    fetchMakes();
    return () => {
      mounted = false;
    };
  }, []);

  const models = makeId ? dropdownData?.data?.models?.filter((model) => model.make_id == Number(makeId)) : [];

  const menuLinkClass =
    "!text-[8px] md:!text-[10px] 2xl:!text-[12px] 3xl:!text-[14px] text-black max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] text-black uppercase font-normal placeholder:!text-black placeholder:font-normal !w-full px-[12px] border !border-[rgba(46,76,153,0.34)] bg-white rounded-[3px] xl:rounded-[3px] 2xl:rounded-[4px] 3xl:rounded-[5px] font-normal outline-none shadow-none focus:outline-none focus:ring-0 focus:border-[#CCCCCC] focus:shadow-none data-[state=open]:border-[#00095b] data-[state=open]:shadow-none [&>svg]:hidden relative after:absolute after:top-0 after:right-[15px] after:bottom-0 after:content-[''] after:w-[10px] after:h-[5px] after:w-[10px] 2xl:w-[15px] 2xl:h-[8px] after:3xl:w-[15px] after:3xl:h-[7px] after:[background-image:url('/images/selectArrow.png')] after:bg-no-repeat after:bg-center after:bg-contain after:m-auto";

  const contentClass =
    "3xl:text-[18px] 2xl:text-[16px] md:text-[12px] sm:text-[10px] text-[8px] bg-white border border-[#CCCCCC] rounded-md shadow-md font-normal uppercase placeholder:!text-black max-h-[210px] overflow-auto";

  const itemClass =
    "3xl:py-[10px] 3xl:px-4 px-[7px] hover:bg-[#e4f0fe] focus:bg-[#e4f0fe] focus:text-black cursor-pointer font-normal !uppercase placeholder:!text-black transition-none duration-20";

  // small inline SVG spinner used in buttons / triggers
  const Spinner = ({ className = "inline-block h-4 w-4 mr-2 align-middle" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" role="img">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  return (
    <div className="w-full relative" aria-live="polite">
      {/* top-level error for dropdowns */}
      {dropdownError ? (
        <div className="mb-3 p-2 text-sm bg-[#ffe6e6] text-[#7a1a1a] rounded">
          <strong>Unable to load filters:</strong> {dropdownError}. You can still search but some options may be missing.
        </div>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-busy={dropdownLoading || form.formState.isSubmitting}
          className="flex flex-wrap justify-between bg-[#031640] overflow-hidden rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] 2xl:p-[30px] lg:p-[15px] sm:p-[15px] p-[10px]"
        >
          {/* Make */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] 2xl:p-[10px]">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setMakeId(value);
                        form.setValue("model", ""); // Reset model when make changes
                      }}
                      // when dropdowns are loading disable make select to avoid confusion
                      disabled={dropdownLoading}
                    >
                      <SelectTrigger
                        className={`${menuLinkClass} placeholder:!text-black placeholder:!font-regular !text-black uppercase`}
                        aria-label="Select make"
                      >
                        {/* show spinner or default placeholder */}
                        {dropdownLoading ? (
                          <>
                            <Spinner className="inline-block h-4 w-4 mr-2" />
                            <span className="align-middle">LOADING...</span>
                          </>
                        ) : (
                          <SelectValue placeholder="MAKE" className="text-black" />
                        )}
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownLoading ? (
                          // skeleton placeholders while loading
                          <div className="p-2 space-y-2">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                            ))}
                          </div>
                        ) : (
                          dropdownData?.data?.makes?.map((make) => (
                            <SelectItem key={make.id} value={String(make.id)} className={itemClass}>
                              {make.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Model */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] 2xl:p-[10px]">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                      <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black`} aria-label="Select model">
                        {/* show contextual placeholder */}
                        {!makeId ? (
                          <span className="text-black">MODEL</span>
                        ) : dropdownLoading ? (
                          <>
                            <Spinner className="inline-block h-4 w-4 mr-2" />
                            <span className="align-middle">LOADING...</span>
                          </>
                        ) : (
                          <SelectValue placeholder="MODEL" className="!text-black placeholder:!text-black" />
                        )}
                      </SelectTrigger>

                      <SelectContent className={contentClass}>
                        {dropdownLoading ? (
                          <div className="p-2 space-y-2">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                            ))}
                          </div>
                        ) : models?.length > 0 ? (
                          models.map((model) => (
                            <SelectItem key={model.id} value={String(model.id)} className={itemClass}>
                              {model.name}
                            </SelectItem>
                          ))
                        ) : !makeId ? (
                          <div className="p-2 text-sm text-gray-500">Choose a make first</div>
                        ) : (
                          <div className="p-2 text-sm text-gray-500">No models available</div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Fuel */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] 2xl:p-[10px]">
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                      <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black`} aria-label="Select fuel">
                        {dropdownLoading ? (
                          <>
                            <Spinner className="inline-block h-4 w-4 mr-2" />
                            <span className="align-middle">LOADING...</span>
                          </>
                        ) : (
                          <SelectValue placeholder="FUEL" className="text-black" />
                        )}
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownLoading ? (
                          <div className="p-2 space-y-2">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                            ))}
                          </div>
                        ) : (
                          dropdownData?.data?.fuelTypes?.map((fuel) => (
                            <SelectItem key={fuel?.id} value={fuel?.name} className={itemClass}>
                              {fuel?.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gearbox */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] 2xl:p-[10px]">
            <FormField
              control={form.control}
              name="gearbox"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                      <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black `} aria-label="Select gearbox">
                        {dropdownLoading ? (
                          <>
                            <Spinner className="inline-block h-4 w-4 mr-2" />
                            <span className="align-middle">LOADING...</span>
                          </>
                        ) : (
                          <SelectValue placeholder="GEARBOX" className="text-black" />
                        )}
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownLoading ? (
                          <div className="p-2 space-y-2">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                            ))}
                          </div>
                        ) : (
                          dropdownData?.data?.gearboxes?.map((gearbox) => (
                            <SelectItem key={gearbox?.id} value={gearbox?.name} className={itemClass}>
                              {gearbox?.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-2/3 md:w-full xl:w-1/5 p-[5px] 2xl:p-[10px]">
            <div className="flex flex-wrap justify-end -m-[5px]">
              <div className="flex-grow p-[5px]">
                <Button
                  type="submit"
                  disabled={dropdownLoading || form.formState.isSubmitting}
                  className="text-[8px] xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] bg-[#BD1F2D] font-normal min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px]
                                 text-white cursor-pointer w-full rounded-[3px] xl:rounded-[3px] 2xl:rounded-[4px] 3xl:rounded-[5px]  hover:bg-[#a81b27d3]"
                  aria-disabled={dropdownLoading || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner className="inline-block h-4 w-4 mr-2" />
                      SEARCHING...
                    </>
                  ) : dropdownLoading ? (
                    <>
                      <Spinner className="inline-block h-4 w-4 mr-2" />
                      LOADING...
                    </>
                  ) : (
                    "SEARCH"
                  )}
                </Button>
              </div>
              <div className={`relative flex-grow p-[5px] ${isExpanded ? "block" : "hidden"}`}>
                <Button
                  type="button"
                  onClick={handleClear}
                  disabled={form.formState.isSubmitting}
                  className="text-[8px] xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] bg-[#C4C4C4] font-normal min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px]
                                 text-white cursor-pointer w-full rounded-[3px] xl:rounded-[3px] 2xl:rounded-[4px] 3xl:rounded-[5px]  hover:bg-[#a81b26]"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner className="inline-block h-4 w-4 mr-2" />
                      ...
                    </>
                  ) : (
                    "CLEAR"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Advanced Search Accordion */}
        <Accordion
          type="single"
          collapsible
          value={isExpanded ? "advanced-search" : ""}
          onValueChange={(value) => setIsExpanded(!!value)}
          className={`relative ${isExpanded ? "shadow-2xl pb-[50px]" : ""}`}
        >
          <AccordionItem value="advanced-search">
            <AccordionTrigger
              className={`text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] text-black uppercase w-[160px] xl:w-[205px] 2xl:w-[250px] 3xl:w-[280px]
                         max-sm:m-auto rounded-[0px]
                         absolute left-0 max-sm:right-0  h-[20px] xl:h-[22px] 2xl:h-[30px] 3xl:h-[35px]   flex items-center justify-center realtive z-0 font-normal cursor-pointer [&>svg]:hidden
                           ${isExpanded ? "bottom-0" : "top-[100%]"}`}
            >
              <Image
                src="/images/buttonBg.png"
                alt="buttonBg"
                width="300"
                height="28"
                className={`absolute top-0 left-0 w-full h-full object-fill -z-10 ${isExpanded ? "scale-y-[-1]" : " "}`}
              />
              {isExpanded ? "- LESS OPTIONS" : "+ ADVANCED SEARCH"}
            </AccordionTrigger>
            <div
              className={`absolute max-sm:hidden sm:bottom-[20px] right-[40px] 2xl:right-[50px] 3xl:right-[70px] 
                            lg:max-w-[150px] 2xl:max-w-[200px] 3xl:max-w-[250px]  md:max-w-[100px]
                            max-w-[75px] pointer-events-none  ${isExpanded ? "" : "hidden"}`}
            >
              <Image src="/images/logo.svg" alt="buttonBg" width="300" height="33" className={`w-full h-full object-cover -z-10 `} />
            </div>
            <AccordionContent className="2xl:p-[40px] p-[20px] relative">
              <div className="flex flex-wrap 2xl:-m-[10px] -m-[5px]">
                {/* Regional Spec */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="regionalSpec"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="Regional Spec" className="text-black" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.regional_specs?.map((spec) => (
                                  <SelectItem key={spec?.id} value={spec?.name} className={itemClass}>
                                    {spec?.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Year From */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="yearFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="YEAR FROM" className="text-black" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2, 3].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.years?.map((year) => (
                                  <SelectItem key={year} value={year.toString()} className={itemClass}>
                                    {year}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Year To */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="yearTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="YEAR TO" className="text-black uppercase placeholder:!uppercase" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2, 3].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.years?.map((year) => (
                                  <SelectItem key={year} value={year.toString()} className={itemClass}>
                                    {year}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Steering side */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="steeringSide"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="STEERING TYPE" className="text-black uppercase" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.steeringTypes?.map((steering) => (
                                  <SelectItem key={steering?.id} value={steering?.name} className={itemClass}>
                                    {steering?.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Car Type   */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="carType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="CAR TYPE" className="text-black" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2, 3].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.carTypes?.map((type) => (
                                  <SelectItem key={type.id} value={String(type.id)} className={itemClass}>
                                    {type.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*CYLINDERS  */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="cylinders"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="CYLINDERS" className="text-black" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.cylinders?.map((cylinder) => (
                                  <SelectItem key={cylinder?.id} value={cylinder.count} className={itemClass}>
                                    {cylinder?.count}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*NUMBER OF SEATS  */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} disabled={dropdownLoading}>
                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}>
                              {dropdownLoading ? (
                                <>
                                  <Spinner className="inline-block h-4 w-4 mr-2" />
                                  <span className="align-middle">LOADING...</span>
                                </>
                              ) : (
                                <SelectValue placeholder="NUMBER OF SEATS" className="text-black" />
                              )}
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownLoading ? (
                                <div className="p-2 space-y-2">
                                  {[1, 2].map((n) => (
                                    <div key={n} className="h-4 rounded animate-pulse bg-[#f0f0f0]" />
                                  ))}
                                </div>
                              ) : (
                                dropdownData?.data?.seats?.map((seat) => (
                                  <SelectItem key={seat?.id} value={seat.count} className={itemClass}>
                                    {seat?.count}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Form>
    </div>
  );
}
