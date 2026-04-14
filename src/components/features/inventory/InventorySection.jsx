"use client";

import Link from "next/link";
import PaginationNavigator from "@/components/common/PaginationNavigator";
import ProductCard from "@/components/common/ProductCard";
import { useEffect, useState } from "react";
import { mediaUrl } from "@/lib/constants";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";

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
        <Link
          href="/contact"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="xl:w-1/3 sm:w-1/2 w-full 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
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
        <Link
          href="/contact"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="text-center py-20">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load inventory</h3>
        <p className="text-gray-500 mb-6">We couldn't load the car inventory. Please try again.</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <Link
          href="/contact"
          className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-[75%] w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
        >
          *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
        </Link>
      </div>
      <div className="text-center py-20">
        <div className="m-auto !mb-5 max-w-[40px]">
          <svg height="40" viewBox="0 0 32 32" width="40">
            <g id="search_x2C__magnifier_x2C__magnifying_x2C__emoji_x2C__No_results">
              <g id="XMLID_1857_">
                <g id="XMLID_1865_">
                  <g>
                    <path
                      d="m29.914 27.086-3.5-3.5c-.756-.756-2.072-.756-2.828 0-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3.5 3.5c.378.378.88.586 1.414.586s1.036-.208 1.414-.586.586-.88.586-1.414-.208-1.036-.586-1.414z"
                      fill="#ff8a80"
                    />
                  </g>
                </g>
                <g id="XMLID_1863_">
                  <g>
                    <path
                      d="m30.414 28.414c-.378.378-.88.586-1.414.586s-1.036-.208-1.414-.586l-4-4c-.125-.124-.223-.266-.309-.414-.175.302-.277.642-.277 1 0 .534.208 1.036.586 1.414l3.5 3.5c.378.378.88.586 1.414.586s1.036-.208 1.414-.586.586-.88.586-1.414c0-.058-.012-.113-.017-.17-.024.027-.043.058-.069.084z"
                      fill="#e67c73"
                    />
                  </g>
                </g>
                <g id="XMLID_1861_">
                  <g>
                    <path
                      d="m28.254 26.547-2.5-2.5c-.195-.195-.512-.195-.707 0s-.195.512 0 .707l2.5 2.5c.098.098.225.146.354.146.127 0 .256-.049.354-.146.194-.195.194-.512-.001-.707z"
                      fill="#ffafa9"
                    />
                  </g>
                </g>
                <g id="XMLID_1860_">
                  <g>
                    <circle cx="13" cy="13" fill="#eceff1" r="11.5" />
                  </g>
                </g>
                <g id="XMLID_1859_">
                  <g>
                    <path
                      d="m22.063 5.937c.914 1.648 1.437 3.543 1.437 5.563 0 6.354-5.147 11.5-11.5 11.5-3.686 0-6.958-1.74-9.063-4.436 1.961 3.54 5.73 5.936 10.063 5.936 6.353 0 11.5-5.146 11.5-11.5 0-2.666-.915-5.113-2.437-7.063z"
                      fill="#cfd8dc"
                    />
                  </g>
                </g>
                <g id="XMLID_1858_">
                  <g>
                    <path
                      d="m2.5 14.5c0-6.354 5.147-11.5 11.5-11.5 3.687 0 6.958 1.74 9.063 4.437-1.96-3.54-5.73-5.937-10.063-5.937-6.353 0-11.5 5.146-11.5 11.5 0 2.667.915 5.114 2.438 7.064-.914-1.649-1.438-3.544-1.438-5.564z"
                      fill="#fff"
                    />
                  </g>
                </g>
                <g id="XMLID_1791_">
                  <g id="XMLID_1802_">
                    <g>
                      <circle cx="18.5" cy="15" fill="#cfd8dc" r="1.5" />
                    </g>
                  </g>
                  <g id="XMLID_1799_">
                    <g>
                      <circle cx="7.5" cy="15" fill="#cfd8dc" r="1.5" />
                    </g>
                  </g>
                  <g id="XMLID_1797_">
                    <g>
                      <path d="m17.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5z" fill="#455a64" />
                    </g>
                  </g>
                  <g id="XMLID_1794_">
                    <g>
                      <path d="m8.5 13c.27 0 .5.23.5.5s-.23.5-.5.5-.5-.23-.5-.5.23-.5.5-.5z" fill="#455a64" />
                    </g>
                  </g>
                </g>
              </g>
              <g id="XMLID_1764_">
                <g id="XMLID_1856_">
                  <g>
                    <path
                      d="m23.43 23.901c-.128 0-.256-.049-.354-.146l-2.216-2.216c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.216 2.216c.195.195.195.512 0 .707-.097.098-.225.146-.353.146z"
                      fill="#455a64"
                    />
                  </g>
                </g>
                <g id="XMLID_1852_">
                  <g>
                    <path
                      d="m28.5 31c-.667 0-1.295-.26-1.768-.732l-3.5-3.5c-.472-.473-.732-1.1-.732-1.768s.26-1.295.732-1.768c.906-.906 2.629-.906 3.535 0l3.5 3.5c.473.473.733 1.1.733 1.768s-.26 1.295-.732 1.768-1.101.732-1.768.732zm-3.5-7.48c-.407 0-.793.152-1.061.42-.283.283-.439.66-.439 1.06s.156.777.439 1.061l3.5 3.5c.567.566 1.554.566 2.121 0 .284-.284.44-.661.44-1.061s-.156-.777-.439-1.061l-3.5-3.5c-.268-.267-.654-.419-1.061-.419z"
                      fill="#455a64"
                    />
                  </g>
                </g>
                <g id="XMLID_1839_">
                  <g>
                    <path
                      d="m13 25c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-23c-6.065 0-11 4.935-11 11s4.935 11 11 11 11-4.935 11-11-4.935-11-11-11z"
                      fill="#455a64"
                    />
                  </g>
                </g>
                <g id="XMLID_1837_">
                  <g>
                    <path
                      d="m14 16.021c-.276 0-.5-.224-.5-.5 0-.275-.224-.5-.5-.5s-.5.225-.5.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5c0 .276-.224.5-.5.5z"
                      fill="#455a64"
                    />
                  </g>
                </g>
                <g id="XMLID_1767_">
                  <g>
                    <path d="m17.5 14.5c-.542 0-1-.458-1-1s.458-1 1-1 1 .458 1 1-.458 1-1 1z" fill="#455a64" />
                  </g>
                </g>
                <g id="XMLID_1766_">
                  <g>
                    <path d="m8.5 14.5c-.542 0-1-.458-1-1s.458-1 1-1 1 .458 1 1-.458 1-1 1z" fill="#455a64" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No cars available</h3>
        <p className="text-gray-500">No cars match your search criteria. Try adjusting your filters.</p>
      </div>
    </div>
  </section>
);

// Module-level cache — dropdown data is fetched once and reused across renders
let dropdownCache = null;
const fetchDropdownData = async (url) => {
  if (dropdownCache) return dropdownCache;
  const res = await fetch(url);
  dropdownCache = await res.json();
  return dropdownCache;
};

// nuqs parsers — mirror the keys used in AdvancesearchSection, plus page
const inventoryParsers = {
  make: parseAsString.withDefault(""),
  model: parseAsString.withDefault(""),
  fuel: parseAsString.withDefault(""),
  gearbox: parseAsString.withDefault(""),
  yearFrom: parseAsString.withDefault(""),
  yearTo: parseAsString.withDefault(""),
  body: parseAsString.withDefault(""),
  regionalSpec: parseAsString.withDefault(""),
  steeringSide: parseAsString.withDefault(""),
  carType: parseAsString.withDefault(""),
  cylinders: parseAsString.withDefault(""),
  seats: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

export default function InventorySection() {
  // Single source of truth — URL params via nuqs
  const [queryParams, setQueryParams] = useQueryStates(inventoryParsers, {
    shallow: false,
  });

  const [cars, setCars] = useState([]);
  const [paginationState, setPaginationState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPageChanging, setIsPageChanging] = useState(false);

  const fetchInventory = async () => {
    try {
      // Resolve name → ID for make, model, carType (URL stores names; API needs IDs)
      const dropdown = await fetchDropdownData(`${mediaUrl}/api/drop-down-data`);
      const makes     = dropdown?.data?.makes     || [];
      const models    = dropdown?.data?.models    || [];
      const carTypes  = dropdown?.data?.carTypes  || [];

      const makeRecord     = queryParams.make     ? makes.find((m) => m.name === queryParams.make)         : null;
      const modelRecord    = queryParams.model    ? models.find((m) => m.name === queryParams.model)       : null;
      const carTypeRecord  = queryParams.carType  ? carTypes.find((c) => c.name === queryParams.carType)   : null;

      // Build API query — map clean URL param names → API param names
      const apiParams = new URLSearchParams();
      if (makeRecord)              apiParams.set("make_id",       String(makeRecord.id));
      if (modelRecord)             apiParams.set("model_id",      String(modelRecord.id));
      if (queryParams.fuel)        apiParams.set("fueltype",      queryParams.fuel);
      if (queryParams.gearbox)     apiParams.set("gearbox",       queryParams.gearbox);
      if (queryParams.yearFrom)    apiParams.set("yearFrom",      queryParams.yearFrom);
      if (queryParams.yearTo)      apiParams.set("yearTo",        queryParams.yearTo);
      if (queryParams.body)        apiParams.set("body",          queryParams.body);
      if (queryParams.regionalSpec)apiParams.set("regional_spec", queryParams.regionalSpec);
      if (queryParams.steeringSide)apiParams.set("steering_type", queryParams.steeringSide);
      if (carTypeRecord)           apiParams.set("car_type_id",   String(carTypeRecord.id));
      if (queryParams.cylinders)   apiParams.set("cylinder",      queryParams.cylinders);
      if (queryParams.seats)       apiParams.set("seats",         queryParams.seats);
      apiParams.set("page",  String(queryParams.page));
      apiParams.set("limit", "15");

      const isFirstLoad = cars.length === 0;
      if (isFirstLoad) setLoading(true);
      else setIsPageChanging(true);

      setError(null);

      const response = await fetch(`${mediaUrl}/api/web/inventories/filtered?${apiParams.toString()}`);
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
      setCars([]);
      setPaginationState({});
    } finally {
      setLoading(false);
      setIsPageChanging(false);
    }
  };

  const handlePageChange = (page) => {
    if (page === queryParams.page || isPageChanging) return;
    setQueryParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    fetchInventory();
  };

  useEffect(() => {
    fetchInventory();
  }, [queryParams]); // re-fetch whenever filters or page change in URL

  // Loading state
  if (loading && cars.length === 0) return <InventorySectionLoader />;

  // Error state
  if (error && cars.length === 0) return <InventorySectionError onRetry={handleRetry} />;

  // Empty state
  if (!loading && cars.length === 0) return <InventorySectionEmpty />;

  return (
    <section className="w-full h-auto block 3xl:py-[0px_130px] lg:py-[10px_90px] sm:py-[10px_70px] py-[10px_40px]">
      <div className="container">
        {isPageChanging && (
          <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3 border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading page {queryParams.page}...</span>
            </div>
          </div>
        )}
        <div className="w-full h-auto mb-[10px] 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
          <Link
            href="/contact"
            className="3xl:text-[18px] sm:text-[14px] text-[13px] leading-[1.2] font-medium font-base1 text-center sm:text-right text-[#2E4C99] sm:w-1/2 w-full ml-auto sm:mt-[20px] mt-[40px] flex justify-end transition-colors duration-200 hover:text-base3"
          >
            *If The Cars Are Unavailable, Feel Free To Contact Us For Further Assistance
          </Link>
        </div>
        <div className="w-full h-full 3xl:mb-[140px] 2xl:mb-[110px] lg:mb-[90px] sm:mb-[70px] mb-[40px] flex flex-wrap">
          {cars.map((car, index) => (
            <div key={car.id || index} className="xl:w-1/3 sm:w-1/2 w-full 3xl:p-[20px_15px] 2xl:p-[15px_12px] lg:p-[12px_10px] p-[8px_5px]">
              <ProductCard car={car} variant="inventory" />
            </div>
          ))}
        </div>
        {paginationState.totalPages > 1 && (
          <PaginationNavigator
            currentPage={paginationState.currentPage || queryParams.page}
            totalPages={paginationState.totalPages || 1}
            onPageChange={handlePageChange}
            maxVisiblePages={7}
          />
        )}
        {error && cars.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">
                  Failed to load page {queryParams.page}: {error}
                </p>
                <button onClick={handleRetry} className="mt-2 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors">
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
