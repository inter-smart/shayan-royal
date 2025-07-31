"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
      regionalSpec: params.specs || "",
      yearFrom: params.yearFrom || "",
      steeringSide: params.steering_type || "",
      carType: "", // optional: map car_type_id to name later
      cylinders: params.cylinder || "",
      seats: params.seats || "",
    };
  }, [searchParams]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: queryValues, // initially from query string
  });

  useEffect(() => {
    if (queryValues.make) {
      setMakeId(queryValues.make);
    }
  }, [queryValues.make]);

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      if (!values) {
        console.warn("No form values provided");
        return;
      }

      // Map carType name to ID
      const selectedCarType = dropdownData?.data?.carTypes?.find(
        (type) => type.name === values.carType
      );

      const params = {
        make_id: values.make,
        model_id: values.model,
        fueltype: values.fuel,
        gearbox: values.gearbox,
        yearTo: values.yearTo, // Changed from "year" to "yearTo"
        body: values.body,
        specs: values.regionalSpec,
        steering_type: values.steeringSide,
        car_type_id: selectedCarType ? String(selectedCarType.id) : undefined,
        cylinder: values.cylinders,
        seats: values.seats,
        yearFrom: values.yearFrom,
      };

      // Filter out empty or undefined values
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined)
      );

      const query = new URLSearchParams(filteredParams).toString();
      router.push(`/inventory?${query}`);
    } catch (error) {
      console.error("Error during form submission:", error);
      router.push("/inventory");
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

    setMakeId(null);

    // 2. Reset related state
    setMakeId(null);

    router.push("/inventory?");
  };

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(`${mediaUrl}/api/drop-down-data`);
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

  const models = makeId
    ? dropdownData?.data?.models?.filter(
        (model) => model.make_id === Number(makeId)
      )
    : [];

  const menuLinkClass =
    "!text-[10px] 2xl:!text-[12px] 3xl:!text-[14px] text-black max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] text-black uppercase font-normal placeholder:!text-black placeholder:font-normal !w-full px-[12px] border !border-[rgba(46,76,153,0.34)] bg-white rounded-[5px] font-normal outline-none shadow-none focus:outline-none focus:ring-0 focus:border-[#CCCCCC] focus:shadow-none data-[state=open]:border-[#00095b] data-[state=open]:shadow-none";

  const contentClass =
    "3xl:text-[18px] 2xl:text-[16px] md:text-[12px] text-[10px] bg-white border border-[#CCCCCC] rounded-md shadow-md font-normal uppercase placeholder:!text-black";

  const itemClass =
    "3xl:py-[10px] 3xl:px-4 px-[7px] hover:bg-[#00095b] focus:bg-[#1D0A44] focus:text-white cursor-pointer font-normal !uppercase placeholder:!text-black";

  return (
    <div className="w-full relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap justify-between bg-[#031640] overflow-hidden rounded-[10px] 2xl:p-[30px] lg:p-[15px] sm:p-[15px] p-[10px]"
        >
          {/* Make */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] md:p-[10px]">
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
                    >
                      <SelectTrigger className={menuLinkClass}>
                        <SelectValue placeholder="MAKE" />
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownData?.data?.makes?.map((make) => (
                          <SelectItem
                            key={make.id}
                            value={String(make.id)}
                            className={itemClass}
                          >
                            {make.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Model */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] md:p-[10px]">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={!makeId}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className={menuLinkClass}>
                        <SelectValue placeholder="MODEL" />
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {models ? (
                          models.map((model) => (
                            <SelectItem
                              key={model.id}
                              value={String(model.id)}
                              className={itemClass}
                            >
                              {model.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500">
                            No models available
                          </div>
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
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] md:p-[10px]">
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className={menuLinkClass}>
                        <SelectValue placeholder="FUEL" />
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownData?.data?.fuelTypes?.map((fuel) => (
                          <SelectItem
                            key={fuel}
                            value={fuel}
                            className={itemClass}
                          >
                            {fuel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Gearbox */}
          <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] md:p-[10px]">
            <FormField
              control={form.control}
              name="gearbox"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className={menuLinkClass}>
                        <SelectValue placeholder="GEARBOX" />
                      </SelectTrigger>
                      <SelectContent className={contentClass}>
                        {dropdownData?.data?.gearboxes?.map((gearbox) => (
                          <SelectItem
                            key={gearbox}
                            value={gearbox}
                            className={itemClass}
                          >
                            {gearbox}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Search Button */}
          <div className="w-full sm:w-2/3 md:w-full xl:w-1/5 p-[5px] md:p-[10px]">
            <div className="flex flex-wrap justify-end -m-[5px]">
              <div className="flex-grow p-[5px]">
                <Button
                  type="submit"
                  className="bg-[#BD1F2D] min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] text-white cursor-pointer w-full hover:bg-[#a81b27d3]"
                >
                  SEARCH
                </Button>
              </div>
              <div
                className={`relative flex-grow p-[5px] ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                <Button
                  type="button"
                  onClick={handleClear}
                  className="bg-[#C4C4C4] min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] text-white cursor-pointer w-full hover:bg-[#a81b26]"
                >
                  CLEAR
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* Advanced Search Accordion */}
        <Accordion
          type="single"
          collapsible
          onValueChange={(value) => setIsExpanded(!!value)}
          className={`relative ${isExpanded ? "shadow-2xl pb-[50px]" : ""}`}
        >
          <AccordionItem value="advanced-search">
            <AccordionTrigger
              className={`text-[10px] lg:text-[12px] 3xl:text-[16px] text-black uppercase w-[280px] md:w-[300px] max-sm:m-auto rounded-[0px] absolute left-0 max-sm:right-0 h-[35px] flex items-center justify-center realtive z-0 font-normal cursor-pointer [&>svg]:hidden ${
                isExpanded ? "bottom-0" : "top-[100%]"
              }`}
            >
              <Image
                src="/images/buttonBg.png"
                alt="buttonBg"
                width="300"
                height="33"
                className={`absolute top-0 left-0 w-full h-full object-cover -z-10 ${
                  isExpanded ? "scale-y-[-1]" : " "
                }`}
              />
              {isExpanded ? "- LESS OPTIONS" : "+ ADVANCED SEARCH"}
            </AccordionTrigger>
            <div
              className={`absolute max-sm:hidden sm:bottom-[20px] right-[30px] 3xl:max-w-[250px] 2xl:max-w-[200px] lg:max-w-[150px] md:max-w-[100px] max-w-[75px] pointer-events-none ${
                isExpanded ? "" : "hidden"
              }`}
            >
              <Image
                src="/images/logo.svg"
                alt="buttonBg"
                width="300"
                height="33"
                className={`w-full h-full object-cover -z-10 `}
              />
            </div>
            <AccordionContent className="xl:p-[30px] p-[20px] relative">
              <div className="flex flex-wrap lg:-m-[10px] -m-[8px]">
                {/* Regional Spec */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="regionalSpec"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="Regional Spec" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.specs?.map((spec) => (
                                <SelectItem
                                  key={spec}
                                  value={spec}
                                  className={itemClass}
                                >
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Year From */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="yearFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="YEAR FROM" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.years?.map((year) => (
                                <SelectItem
                                  key={year}
                                  value={year.toString()}
                                  className={itemClass}
                                >
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Year To */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="yearTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="YEAR TO" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.years?.map((year) => (
                                <SelectItem
                                  key={year}
                                  value={year.toString()}
                                  className={itemClass}
                                >
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Steering Side */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="steeringSide"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="STEERING SIDE" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.steeringTypes?.map(
                                (steering) => (
                                  <SelectItem
                                    key={steering}
                                    value={steering}
                                    className={itemClass}
                                  >
                                    {steering}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Car Type */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="carType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="CAR TYPE" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.carTypes?.map((type) => (
                                <SelectItem
                                  key={type.id}
                                  value={type.name}
                                  className={itemClass}
                                >
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Cylinders */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="cylinders"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="CYLINDERS" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.cylinders?.map(
                                (cylinder) => (
                                  <SelectItem
                                    key={cylinder}
                                    value={cylinder.toString()}
                                    className={itemClass}
                                  >
                                    {cylinder}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Number of Seats */}
                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className={menuLinkClass}>
                              <SelectValue placeholder="NUMBER OF SEATS" />
                            </SelectTrigger>
                            <SelectContent className={contentClass}>
                              {dropdownData?.data?.seats?.map((seat) => (
                                <SelectItem
                                  key={seat}
                                  value={seat.toString()}
                                  className={itemClass}
                                >
                                  {seat}
                                </SelectItem>
                              ))}
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
