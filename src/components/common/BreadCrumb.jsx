import React from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

export function BreadCrumb({ items = [] }) {
    return (
        <div className="container 2xl:py-[20px] py-[15px]">
            <Breadcrumb>
                <BreadcrumbList
                    className="2xl:gap-[15px] gap-[10px] items-center"
                >
                    {items.map((item, index) => (
                        <React.Fragment key={item.label}>
                            <BreadcrumbItem
                                className={"2xl:text-[14px] text-[11px] leading-[1] font-medium font-base1 text-black"}
                            >
                                {item.href && !item.isCurrent ? (
                                    <BreadcrumbLink href={item.href}
                                    >{item.label}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbLink aria-current={item.isCurrent ? "page" : undefined}>
                                        {item.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index !== items.length - 1 && (
                                <BreadcrumbSeparator
                                    className="2xl:w-[15px] w-[12px] h-auto aspect-15/15 flex items-center justify-center"
                                >
                                    <svg
                                        width="14"
                                        height="9"
                                        viewBox="0 0 14 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="inline align-middle"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path
                                            d="M13.8396 4.08524C13.8394 4.08507 13.8393 4.08486 13.8391 4.08469L10.9816 1.03781C10.7675 0.809559 10.4213 0.810408 10.2082 1.0398C9.9951 1.26917 9.99592 1.64015 10.21 1.86844L12.1285 3.91406H0.546875C0.244836 3.91406 0 4.17638 0 4.5C0 4.82361 0.244836 5.08594 0.546875 5.08594H12.1285L10.21 7.13156C9.99594 7.35984 9.99512 7.73083 10.2082 7.96019C10.4213 8.18962 10.7676 8.19041 10.9816 7.96218L13.8391 4.91531C13.8393 4.91513 13.8394 4.91493 13.8396 4.91475C14.0538 4.68571 14.0531 4.31352 13.8396 4.08524Z"
                                            fill="black"
                                        />
                                    </svg>
                                </BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}