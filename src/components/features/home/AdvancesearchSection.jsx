"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const formSchema = z.object({
    make: z.string().nonempty("Select make"),
    model: z.string().nonempty("Select model"),
    fuel: z.string().nonempty("Select fuel"),
    gearbox: z.string().nonempty("Select gearbox"),
    year: z.string().optional(),
    body: z.string().optional(),
});

export default function CarSearchForm() {
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
        console.log("Search data:", values);
    };

    const menuLinkClass = "!text-[11px] md:!text-[12px] 2xl:!text-[14px] max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] !w-full px-6 border border-[#CCCCCC] text-[#000000] w-[150px] lg:w-[200px] bg-[#F8F9FD] rounded-[5px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:border-[#CCCCCC] focus:shadow-none data-[state=open]:border-[#00095b] data-[state=open]:shadow-none"

    return (
        <div className="w-full relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap tems-center justify-between bg-[#031640] overflow-hidden rounded-[10px] p-[30px]">
                    <div className="w-1/5 px-[10px]">
                        <FormField
                            control={form.control}
                            name="make"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass}`}>
                                                <SelectValue placeholder="MAKE" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="toyota">Toyota</SelectItem>
                                                <SelectItem value="bmw">BMW</SelectItem>
                                                <SelectItem value="audi">Audi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/5 px-[10px]">

                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass}`}>
                                                <SelectValue placeholder="MODEL" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="corolla">Corolla</SelectItem>
                                                <SelectItem value="3series">3 Series</SelectItem>
                                                <SelectItem value="a4">A4</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/5 px-[10px]">
                        <FormField
                            control={form.control}
                            name="fuel"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass}`}>
                                                <SelectValue placeholder="FUEL" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="petrol">Petrol</SelectItem>
                                                <SelectItem value="diesel">Diesel</SelectItem>
                                                <SelectItem value="electric">Electric</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/5 px-[10px]">
                        <FormField
                            control={form.control}
                            name="gearbox"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className={`${menuLinkClass}`}>
                                                <SelectValue placeholder="GEARBOX" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="manual">Manual</SelectItem>
                                                <SelectItem value="automatic">Automatic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/5 px-[10px]">
                        <Button type="submit" className="bg-[#BD1F2D] min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] 3xl:min-h-[60px] cursor-pointer  hover:bg-[#a81b26] text-white w-full">
                            SEARCH
                        </Button>
                    </div>
                </form>

                <Accordion type="single" collapsible className="relative shadow-2xs pb-[35px]">
                    <AccordionItem value="advanced-search">
                        <AccordionTrigger className="text-[16px] text-black bg-[#E5F0FF] uppercase w-[300px] rounded-[0px]
                             absolute bottom-0 left-0 h-[35px] flex items-center justify-center after:top-0 after:absolute after:left-0 after:w-[80px] after:h-full after:bg-[']">
                            <span> + ADVANCED SEARCH</span>
                        </AccordionTrigger>
                        <AccordionContent className="p-[30px]">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap ">
                                <div className="w-1/5 px-[10px]">
                                    <FormField
                                        control={form.control}
                                        name="make"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass}`}>
                                                            <SelectValue placeholder="MAKE" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="toyota">Toyota</SelectItem>
                                                            <SelectItem value="bmw">BMW</SelectItem>
                                                            <SelectItem value="audi">Audi</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-1/5 px-[10px]">

                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass}`}>
                                                            <SelectValue placeholder="MODEL" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="corolla">Corolla</SelectItem>
                                                            <SelectItem value="3series">3 Series</SelectItem>
                                                            <SelectItem value="a4">A4</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-1/5 px-[10px]">
                                    <FormField
                                        control={form.control}
                                        name="fuel"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass}`}>
                                                            <SelectValue placeholder="FUEL" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="petrol">Petrol</SelectItem>
                                                            <SelectItem value="diesel">Diesel</SelectItem>
                                                            <SelectItem value="electric">Electric</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-1/5 px-[10px]">
                                    <FormField
                                        control={form.control}
                                        name="gearbox"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className={`${menuLinkClass}`}>
                                                            <SelectValue placeholder="GEARBOX" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="manual">Manual</SelectItem>
                                                            <SelectItem value="automatic">Automatic</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                               
                            </form>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Form>
        </div>
    );
}
