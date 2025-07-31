"use client";

import Link from "next/link";
import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import AdvancesearchSection from "@/components/features/home/AdvancesearchSection";
import { useEffect, useMemo, useState } from "react";
import { mediaUrl } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

// Loading skeleton component
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-56 mb-4"></div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

// Main loading component
const InventorySectionLoader = () => (
  <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
    <div className="container">
      <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
        <AdvancesearchSection />
        <Link
          href="/"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="xl:w-1/3 sm:w-1/2 w-full 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="border border-[#E7E7E7] gap-0 flex animate-pulse">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Error component
const InventorySectionError = ({ onRetry }) => (
  <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
    <div className="container">
      <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
        <AdvancesearchSection />
        <Link
          href="/"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="text-center py-20">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load inventory</h3>
        <p className="text-gray-500 mb-6">We couldn't load the car inventory. Please try again.</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  </section>
);

// Empty state component
const InventorySectionEmpty = () => (
  <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
    <div className="container">
      <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
        <AdvancesearchSection />
        <Link
          href="/"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="text-center py-20">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No cars available</h3>
        <p className="text-gray-500">No cars match your search criteria. Try adjusting your filters.</p>
      </div>
    </div>
  </section>
);

export default function InventorySection() {
  const search = useSearchParams();
  const searchParams =  useMemo(() => {
  return Object.fromEntries(search.entries());
}, [search]);

  const [cars, setCars] = useState([]);
  const [paginationState, setPaginationState] = useState({});
  const [currentPage, setCurrentPage] = useState(Number(searchParams.page) || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPageChanging, setIsPageChanging] = useState(false);

  const buildQueryString = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        query.append(key, value);
      }
    });
    return query.toString();
  };

  const fetchInventory = async (page = 1) => {
    try {
      const queryString = buildQueryString({ ...searchParams, page, limit: 16 });

      if (page === 1 && cars && cars.length === 0) setLoading(true);
      else setIsPageChanging(true);

      setError(null);

      const response = await fetch(`${mediaUrl}/api/web/inventories/filtered?${queryString}`);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setCars(data.data || []);
        setPaginationState(data.pagination || {});
      } else {
        throw new Error(data.message || "Failed to fetch inventory");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.message);
      if (page === 1) {
        setCars([]);
        setPaginationState({});
      }
    } finally {
      setLoading(false);
      setIsPageChanging(false);
    }
  };

  const handlePageChange = (page) => {
    if (page === currentPage || isPageChanging) return;
    setCurrentPage(page);
    fetchInventory(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    fetchInventory(currentPage);
  };

  useEffect(() => {
    fetchInventory(currentPage);
  }, [searchParams]); // re-fetch if filters change

  // Loading state
  if (loading && cars && cars.length === 0) return <InventorySectionLoader />;

  // Error state
  if (error && cars && cars.length === 0) return <InventorySectionError onRetry={handleRetry} />;

  // Empty state
  if (!loading && cars && cars.length === 0) return <InventorySectionEmpty />;



  return (
    <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
      <div className="container">
        {isPageChanging && (
          <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3 border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading page {currentPage}...</span>
            </div>
          </div>
        )}
        <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
          <AdvancesearchSection  currentPage={currentPage} />
          <Link
            href="/"
            className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
          >
            *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
          </Link>
        </div>
        <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
          {cars.map((car, index) => (
            <div
              key={car.id || index}
              className="xl:w-1/3 sm:w-1/2 w-full 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]"
            >
              <ProductCard car={car} variant="inventory" />
            </div>
          ))}
        </div>
        {/* {paginationState.totalItems > 0 && (
          <div className="text-center mb-6 text-gray-600 text-sm">
            Showing {paginationState.startIndex || 1}-
            {paginationState.endIndex || cars && cars.length} of {paginationState.totalItems} cars
          </div>
        )} */}
        {paginationState.totalPages > 1 && (
          <PaginationNavigator
            currentPage={paginationState.currentPage || currentPage}
            totalPages={paginationState.totalPages || 1}
            onPageChange={handlePageChange}
            maxVisiblePages={7}
          />
        )}
        {error && cars && cars.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">Failed to load page {currentPage}: {error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-2 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}