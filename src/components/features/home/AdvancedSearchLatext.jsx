"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryStates, parseAsString } from "nuqs";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { mediaUrl } from "@/lib/constants";

// Form validation schema
const formSchema = z.object({
  make: z.string(),
  model: z.string(),
  fuel: z.string(),
  gearbox: z.string(),
  yearTo: z.string().optional(),
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

  // Define all query parameters with nuqs
  const [queryParams, setQueryParams] = useQueryStates(
    {
      make_id: parseAsString.withDefault(""),
      model_id: parseAsString.withDefault(""),
      fueltype: parseAsString.withDefault(""),
      gearbox: parseAsString.withDefault(""),
      yearTo: parseAsString.withDefault(""),
      body: parseAsString.withDefault(""),
      regional_spec: parseAsString.withDefault(""),
      yearFrom: parseAsString.withDefault(""),
      steering_type: parseAsString.withDefault(""),
      car_type_id: parseAsString.withDefault(""),
      cylinder: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
    },
    {
      // This will update the URL without navigation
      history: "push",
      shallow: true,
    }
  );

  // Map query params to form values
  const queryValues = {
    make: queryParams.make_id,
    model: queryParams.model_id,
    fuel: queryParams.fueltype,
    gearbox: queryParams.gearbox,
    yearTo: queryParams.yearTo,
    body: queryParams.body,
    regionalSpec: queryParams.regional_spec,
    yearFrom: queryParams.yearFrom,
    steeringSide: queryParams.steering_type,
    carType: queryParams.car_type_id,
    cylinders: queryParams.cylinder,
    seats: queryParams.seats,
  };

  // Auto-expand advanced search if any advanced params are present
  const shouldAutoExpand =
    queryParams.car_type_id ||
    queryParams.regional_spec ||
    queryParams.yearFrom ||
    queryParams.yearTo ||
    queryParams.steering_type ||
    queryParams.cylinder ||
    queryParams.seats;

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: queryValues,
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

  const onSubmit = async (values) => {
    try {
      // Map form values to query param names
      const params = {
        make_id: values.make,
        model_id: values.model,
        fueltype: values.fuel,
        gearbox: values.gearbox,
        yearTo: values.yearTo,
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

      // Update URL params with nuqs - this will automatically navigate to /inventory if needed
      await setQueryParams(filteredParams);

      // If we're on home page and have params, navigate to inventory
      if (window.location.pathname === "/" && Object.keys(filteredParams).length > 0) {
        window.location.href = `/inventory?${new URLSearchParams(filteredParams).toString()}`;
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Fallback navigation
      window.location.href = "/inventory";
    }
  };

  const handleClear = async () => {
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

    setMakeId(null);

    // Clear all query params with nuqs
    await setQueryParams({
      make_id: null,
      model_id: null,
      fueltype: null,
      gearbox: null,
      yearTo: null,
      body: null,
      regional_spec: null,
      steering_type: null,
      car_type_id: null,
      cylinder: null,
      seats: null,
      yearFrom: null,
    });

    // If not on home page, navigate to inventory
    if (window.location.pathname !== "/") {
      window.location.href = "/inventory";
    }
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

  const models = makeId ? dropdownData?.data?.models?.filter((model) => model.make_id == makeId) : [];

  // Helper functions to transform data for SearchableSelect
  const transformToOptions = (data, labelKey = "name", valueKey = "id") => {
    if (!data) return [];
    return data.map((item) => ({
      label: item[labelKey],
      value: String(item[valueKey] || item[labelKey]),
    }));
  };

  const transformFuelTypesToOptions = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  };

  const transformGearboxesToOptions = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  };

  const transformRegionalSpecsToOptions = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  };

  const transformSteeringTypesToOptions = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  };

  const transformYearsToOptions = (years) => {
    if (!years) return [];
    return years.map((year) => ({
      label: year.toString(),
      value: year.toString(),
    }));
  };

  const transformCylindersToOptions = (cylinders) => {
    if (!cylinders) return [];
    return cylinders.map((cylinder) => ({
      label: cylinder.count,
      value: cylinder.count,
    }));
  };

  const transformSeatsToOptions = (seats) => {
    if (!seats) return [];
    return seats.map((seat) => ({
      label: seat.count,
      value: seat.count,
    }));
  };

  const menuLinkClass =
    "3xl:!text-[14px] 2xl:!text-[12px] md:!text-[10px] !text-[8px] text-black max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] text-black uppercase font-normal placeholder:!text-black placeholder:font-normal !w-full px-[12px] border !border-[rgba(46,76,153,0.34)] bg-white rounded-[3px] xl:rounded-[3px] 2xl:rounded-[4px] 3xl:rounded-[5px] font-normal outline-none shadow-none focus:outline-none focus:ring-0 focus:border-[#CCCCCC] focus:shadow-none data-[state=open]:border-[#00095b] data-[state=open]:shadow-none [&>svg]:hidden relative after:absolute after:top-0 after:right-[15px] after:bottom-0 after:content-[''] after:w-[10px] after:h-[5px] after:w-[10px] 2xl:w-[15px] 2xl:h-[8px] after:3xl:w-[15px] after:3xl:h-[7px] after:[background-image:url('/images/selectArrow.png')] after:bg-no-repeat after:bg-center after:bg-contain after:m-auto";

  const contentClass =
    "3xl:text-[18px] 2xl:text-[16px] xl:text-[12px] md:text-[10px] text-[14px] min-w-[200px] md:min-w-0 bg-white border border-[#CCCCCC] rounded-md shadow-md font-normal uppercase placeholder:!text-black max-h-[210px] overflow-auto";

  const itemClass =
    "3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[8px] text-[14px] py-[10px] md:py-0 3xl:py-[10px] 3xl:px-4 px-[10px] hover:bg-[#e4f0fe] focus:bg-[#e4f0fe] focus:text-black cursor-pointer font-normal !uppercase placeholder:!text-black transition-none duration-20";

  const Spinner = ({ className = "inline-block h-4 w-4 mr-2 align-middle" }) => (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  return (
    <div className="w-full relative" aria-live="polite">
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
                    <SearchableSelect
                      options={transformToOptions(dropdownData?.data?.makes)}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setMakeId(value);
                        form.setValue("model", "");
                      }}
                      placeholder="MAKE"
                      searchPlaceholder="Search makes..."
                      emptyText="No makes found"
                      disabled={dropdownLoading}
                      loading={dropdownLoading}
                      loadingText="LOADING..."
                      className={`${menuLinkClass} placeholder:!text-black placeholder:!font-regular !text-black uppercase`}
                      contentClassName={contentClass}
                      itemClassName={itemClass}
                    />
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
                    <SearchableSelect
                      options={!makeId ? [] : transformToOptions(models)}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="MODEL"
                      searchPlaceholder="Search models..."
                      emptyText={!makeId ? "Choose a make first" : "No models available"}
                      disabled={dropdownLoading}
                      loading={dropdownLoading}
                      loadingText="LOADING..."
                      className={`${menuLinkClass} placeholder:!text-black !text-black`}
                      contentClassName={contentClass}
                      itemClassName={itemClass}
                    />
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
                    <SearchableSelect
                      options={transformFuelTypesToOptions(dropdownData?.data?.fuelTypes)}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="FUEL"
                      searchPlaceholder="Search fuel types..."
                      emptyText="No fuel types found"
                      disabled={dropdownLoading}
                      loading={dropdownLoading}
                      loadingText="LOADING..."
                      className={`${menuLinkClass} placeholder:!text-black !text-black`}
                      contentClassName={contentClass}
                      itemClassName={itemClass}
                    />
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
                    <SearchableSelect
                      options={transformGearboxesToOptions(dropdownData?.data?.gearboxes)}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="GEARBOX"
                      searchPlaceholder="Search gearboxes..."
                      emptyText="No gearboxes found"
                      disabled={dropdownLoading}
                      loading={dropdownLoading}
                      loadingText="LOADING..."
                      className={`${menuLinkClass} placeholder:!text-black !text-black`}
                      contentClassName={contentClass}
                      itemClassName={itemClass}
                    />
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
                          <SearchableSelect
                            options={transformRegionalSpecsToOptions(dropdownData?.data?.regional_specs)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Regional Spec"
                            searchPlaceholder="Search regional specs..."
                            emptyText="No regional specs found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
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
                          <SearchableSelect
                            options={transformYearsToOptions(dropdownData?.data?.years)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="YEAR FROM"
                            searchPlaceholder="Search years..."
                            emptyText="No years found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
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
                          <SearchableSelect
                            options={transformYearsToOptions(dropdownData?.data?.years)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="YEAR TO"
                            searchPlaceholder="Search years..."
                            emptyText="No years found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
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
                          <SearchableSelect
                            options={transformSteeringTypesToOptions(dropdownData?.data?.steeringTypes)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="STEERING TYPE"
                            searchPlaceholder="Search steering types..."
                            emptyText="No steering types found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Car Type */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="carType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SearchableSelect
                            options={transformToOptions(dropdownData?.data?.carTypes)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="CAR TYPE"
                            searchPlaceholder="Search car types..."
                            emptyText="No car types found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* CYLINDERS */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:p-[10px] p-[5px]">
                  <FormField
                    control={form.control}
                    name="cylinders"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SearchableSelect
                            options={transformCylindersToOptions(dropdownData?.data?.cylinders)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="CYLINDERS"
                            searchPlaceholder="Search cylinders..."
                            emptyText="No cylinders found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
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
                          <SearchableSelect
                            options={transformSeatsToOptions(dropdownData?.data?.seats)}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="NUMBER OF SEATS"
                            searchPlaceholder="Search seats..."
                            emptyText="No seats found"
                            disabled={dropdownLoading}
                            loading={dropdownLoading}
                            loadingText="LOADING..."
                            className={`${menuLinkClass} placeholder:!text-black !text-black uppercase`}
                            contentClassName={contentClass}
                            itemClassName={itemClass}
                          />
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
