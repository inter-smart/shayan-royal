"use client";

import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";

export default function PaginationNavigator({ currentPage = 1, totalPages = 10, onPageChange = () => {}, maxVisiblePages = 7 }) {
  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      const halfVisible = Math.floor(maxVisiblePages / 2);

      if (currentPage <= halfVisible + 1) {
        // Show pages from start
        for (let i = 1; i <= maxVisiblePages - 2; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        // Show pages from end
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - (maxVisiblePages - 3); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Pagination>
      <PaginationContent className="border border-[#E7E7E7] gap-0 flex">
        {/* Previous Button */}
        <PaginationItem>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] md:p-[10px] p-[8px] border-r border-[#E7E7E7] flex items-center justify-center transition-colors ${
              currentPage === 1 ? "cursor-not-allowed opacity-50 bg-gray-100" : "hover:bg-gray-50 cursor-pointer"
            }`}
            aria-label="Previous page"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.2266 12.8718H5.56844M5.56844 12.8718L12.8975 5.54272M5.56844 12.8718L12.8975 20.2008"
                stroke={currentPage === 1 ? "#9CA3AF" : "#131514"}
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((item, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            {item === "ellipsis" ? (
              <PaginationEllipsis className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] flex items-center justify-center text-gray-500" />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(item)}
                isActive={item === currentPage}
                className={`2xl:text-[16px] text-[10px] font-medium text-black 2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] rounded-[0px] flex items-center justify-center transition-colors hover:bg-gray-50 ${
                  item === currentPage ? "font-bold text-[#BE1E2D] bg-[#E7E7E7]" : "hover:text-[#BE1E2D]"
                }`}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] md:p-[10px] p-[8px] flex items-center justify-center transition-colors ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50 bg-gray-100" : "hover:bg-gray-50 cursor-pointer"
            }`}
            aria-label="Next page"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.89844 12.8718H20.5566M20.5566 12.8718L13.2275 5.54272M20.5566 12.8718L13.2275 20.2008"
                stroke={currentPage === totalPages ? "#9CA3AF" : "#131514"}
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
