"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// Form validation schema
const formSchema = z.object({
    make: z.string().nonempty("Select make"),
    model: z.string().nonempty("Select model"),
    fuel: z.string().nonempty("Select fuel"),
    gearbox: z.string().nonempty("Select gearbox"),
    year: z.string().optional(),
    body: z.string().optional(),
});

export default function CarSearchForm() {
    const [isExpanded, setIsExpanded] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            make: "",
            model: "",
            fuel: "",
            gearbox: "",
            year: "",
            body: "",
        },
    });

    const onSubmit = (values) => {
        console.log("Search values:", values);
    };

    const menuLinkClass =
        "!text-[11px] md:!text-[12px] 2xl:!text-[14px] max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] !w-full md:px-6 px-[8px] border border-[rgba(46, 76, 153, 0.44)] bg-[#F8F9FD] rounded-[5px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:border-[#CCCCCC] focus:shadow-none data-[state=open]:border-[#00095b] data-[state=open]:shadow-none";

    const contentClass =
        "3xl:text-[18px] 2xl:text-[16px] md:text-[12px] text-[10px] bg-white border border-[#CCCCCC] rounded-md shadow-md font-medium text-black";

    const itemClass =
        "py-[10px] px-4 hover:bg-[#00095b] focus:bg-[#1D0A44] focus:text-white cursor-pointer";

    return (
        <div className="w-full relative">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-wrap justify-between bg-[#031640] overflow-hidden rounded-[10px] xl:p-[30px] sm:p-[15px] p-[10px]"
                >
                    {/* Make */}
                    <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[calc(100%/5)] p-[5px] md:p-[10px]">
                        <FormField
                            control={form.control}
                            name="make"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                <SelectValue placeholder="MAKE" className="text-black" />
                                            </SelectTrigger>
                                            <SelectContent className={contentClass}>
                                                <SelectItem value="toyota" className={itemClass}>Toyota</SelectItem>
                                                <SelectItem value="bmw" className={itemClass}>BMW</SelectItem>
                                                <SelectItem value="audi" className={itemClass}>Audi</SelectItem>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                <SelectValue placeholder="MODEL" className="text-black" />
                                            </SelectTrigger>
                                            <SelectContent className={contentClass}>
                                                <SelectItem value="corolla" className={itemClass}>Corolla</SelectItem>
                                                <SelectItem value="3series" className={itemClass}>3 Series</SelectItem>
                                                <SelectItem value="a4" className={itemClass}>A4</SelectItem>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                <SelectValue placeholder="FUEL" className="text-black" />
                                            </SelectTrigger>
                                            <SelectContent className={contentClass}>
                                                <SelectItem value="petrol" className={itemClass}>Petrol</SelectItem>
                                                <SelectItem value="diesel" className={itemClass}>Diesel</SelectItem>
                                                <SelectItem value="electric" className={itemClass}>Electric</SelectItem>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                <SelectValue placeholder="GEARBOX" className="text-black" />
                                            </SelectTrigger>
                                            <SelectContent className={contentClass}>
                                                <SelectItem value="automatic" className={itemClass}>Automatic</SelectItem>
                                                <SelectItem value="manual" className={itemClass}>Manual</SelectItem>
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
                                <Button type="submit" className="bg-[#BD1F2D] min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px]
                                 text-white w-full hover:bg-[#a81b27d3]">
                                    SEARCH
                                </Button>
                            </div>
                            <div className={`relative flex-grow p-[5px] ${isExpanded ? 'block' : 'hidden'}`}>
                                <Button type="submit" className="bg-[#C4C4C4] min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px]
                                 text-white w-full hover:bg-[#a81b26]">
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
                        <AccordionTrigger className={`text-[12px] lg:text-[14px] xl:text-[16px] text-black uppercase w-[280px]
                         md:w-[300px] max-sm:m-auto rounded-[0px]
                         absolute left-0 max-sm:right-0 h-[35px]  flex items-center justify-center realtive z-0 cursor-pointer [&>svg]:hidden
                           ${isExpanded ? "bottom-0" : "top-[100%]"}`}>
                            <Image
                                src="/images/buttonBg.png"
                                alt="buttonBg"
                                width="300"
                                height="33"
                                className={`absolute top-0 left-0 w-full h-full object-cover -z-10 ${isExpanded ? "scale-y-[-1]" : " "}`}
                            />
                            {isExpanded ? "- LESS OPTIONS" : "+ ADVANCED SEARCH"}
                        </AccordionTrigger>
                        <div className={`absolute max-sm:hidden sm:bottom-[20px] right-[30px] 3xl:max-w-[250px] 2xl:max-w-[200px]
                         lg:max-w-[150px] md:max-w-[100px]
                         max-w-[75px] pointer-events-none  ${isExpanded ? "" : "hidden"}`}>
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
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="Regional Spec" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="GCC" className={itemClass}>GCC</SelectItem>
                                                            <SelectItem value="American" className={itemClass}>American</SelectItem>
                                                            <SelectItem value="Japanese" className={itemClass}>Japanese</SelectItem>
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
                                        name="Year From"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="YEAR" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="2020" className={itemClass}>2020</SelectItem>
                                                            <SelectItem value="2021" className={itemClass}>2021</SelectItem>
                                                            <SelectItem value="2022" className={itemClass}>2022</SelectItem>
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
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="Year To" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="2020" className={itemClass}>2020</SelectItem>
                                                            <SelectItem value="2021" className={itemClass}>2021</SelectItem>
                                                            <SelectItem value="2022" className={itemClass}>2022</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Steering side */}
                                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                                    <FormField
                                        control={form.control}
                                        name="body"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="Steering side" className="text-black uppercase" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="sedan" className={itemClass}>Sedan</SelectItem>
                                                            <SelectItem value="suv" className={itemClass}>SUV</SelectItem>
                                                            <SelectItem value="hatchback" className={itemClass}>Hatchback</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Car Type   */}
                                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                                    <FormField
                                        control={form.control}
                                        name="body"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="CAR TYPE" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="sedan" className={itemClass}>Sedan</SelectItem>
                                                            <SelectItem value="suv" className={itemClass}>SUV</SelectItem>
                                                            <SelectItem value="hatchback" className={itemClass}>Hatchback</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/*CYLINDERS  */}
                                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                                    <FormField
                                        control={form.control}
                                        name="body"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="CYLINDERS" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="sedan" className={itemClass}>Sedan</SelectItem>
                                                            <SelectItem value="suv" className={itemClass}>SUV</SelectItem>
                                                            <SelectItem value="hatchback" className={itemClass}>Hatchback</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/*NUMBER OF SEATS  */}
                                <div className="w-full 3xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-[10px] p-[8px]">
                                    <FormField
                                        control={form.control}
                                        name="body"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass} placeholder:!text-black text-black`}>
                                                            <SelectValue placeholder="NUMBER OF SEATS" className="text-black" />
                                                        </SelectTrigger>
                                                        <SelectContent className={contentClass}>
                                                            <SelectItem value="sedan" className={itemClass}>Sedan</SelectItem>
                                                            <SelectItem value="suv" className={itemClass}>SUV</SelectItem>
                                                            <SelectItem value="hatchback" className={itemClass}>Hatchback</SelectItem>
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
