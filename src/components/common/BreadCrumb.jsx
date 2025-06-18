import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function BreadCrumb({ items = [], className, ...props }) {
    return (
        <Breadcrumb
            aria-label="breadcrumb"
            className={cn("flex items-center", className)}
            {...props}
        >
            <BreadcrumbList className="flex items-center space-x-6">
                {items.map((item, i) => (
                    <BreadcrumbItem key={item.label}>
                        {i > 0 && (
                            <BreadcrumbSeparator className="inline-flex items-center mx-2">
                                <svg
                                    width={36}
                                    height={24}
                                    viewBox="0 0 36 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-black"
                                >
                                    <path
                                        d="M0 12h32m0 0l-6-6m6 6l-6 6"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </BreadcrumbSeparator>
                        )}
                        {item.href ? (
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage
                                className={cn(
                                    "font-sans text-3xl font-normal tracking-widest text-black",
                                )}
                            >
                                {item.label}
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

