import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, } from '@/components/ui/pagination';

export default function PaginationNavigator() {
    const items = [1, 2, 3, 4, '…', 7, 8, 9, 10];

    return (
        <Pagination>
            <PaginationContent className="border border-[#E7E7E7] gap-0 flex">
                <PaginationItem>
                    <button
                        className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] md:p-[10px] p-[8px] border-r border-[#E7E7E7] flex items-center justify-center hover:bg-gray-50"
                        aria-label="Previous page"
                    >
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2266 12.8718H5.56844M5.56844 12.8718L12.8975 5.54272M5.56844 12.8718L12.8975 20.2008" stroke="#131514" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </PaginationItem>
                {items.map((item, index) => (
                    <PaginationItem key={index}>
                        {item === '…' ? (
                            <PaginationEllipsis className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] flex items-center justify-center text-gray-500" />
                        ) : (
                            <PaginationLink
                                isActive={item === 1}
                                className={`2xl:text-[16px] text-[10px] font-medium text-black 2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] rounded-[0px] flex items-center justify-center ${item === 1 ? 'font-bold text-[#BE1E2D] border-none border-[#E7E7E7] border-r bg-[#E7E7E7] pointer-events-none' : ''
                                    }`}
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <button
                        className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] md:p-[10px] p-[8px] flex items-center justify-center hover:bg-gray-50"
                        aria-label="Next page"
                    >
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.89844 12.8718H20.5566M20.5566 12.8718L13.2275 5.54272M20.5566 12.8718L13.2275 20.2008" stroke="#131514" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}