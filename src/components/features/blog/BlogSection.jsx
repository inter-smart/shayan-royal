"use client";

import BlogCard from "@/components/common/BlogCard";
import PaginationNavigator from "../../common/PaginationNavigator";
import { useEffect, useState } from "react";
import { mediaUrl } from "@/lib/constants";

// Loading skeleton component
const BlogCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

// Main loading component
const BlogSectionLoader = () => (
  <section className="w-full h-auto 3xl:p-[75px_0_130px] lg:p-[50px_0_90px] sm:p-[50px_0_70px] p-[40px_0_50px] block">
    <div className="container">
      <div className="3xl:mb-[120px] 2xl:mb-[100px] lg:mb-[80px] sm:mb-[50px] mb-[30px] flex flex-wrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="lg:w-[calc(100%/3)] sm:w-[calc(100%/2)] w-full 2xl:p-[25px_17px] lg:p-[15px_12px] sm:p-[10px_7px] p-[10px_0px]">
            <BlogCardSkeleton />
          </div>
        ))}
      </div>
    </div>

    {/* Pagination skeleton */}
    <div className="flex justify-center">
      <div className="border border-[#E7E7E7] gap-0 flex animate-pulse">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="2xl:w-[60px] md:w-[40px] w-[30px] 2xl:h-[45px] md:h-[30px] h-[25px] border-r border-[#E7E7E7] bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  </section>
);

// Error component
const BlogSectionError = ({ onRetry }) => (
  <section className="w-full h-auto 3xl:p-[75px_0_130px] lg:p-[50px_0_90px] sm:p-[50px_0_70px] p-[40px_0_50px] block">
    <div className="container">
      <div className="text-center py-20">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load blogs</h3>
        <p className="text-gray-500 mb-6">We couldn't load the blog posts. Please try again.</p>
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
const BlogSectionEmpty = () => (
  <section className="w-full h-auto 3xl:p-[75px_0_130px] lg:p-[50px_0_90px] sm:p-[50px_0_70px] p-[40px_0_50px] block">
    <div className="container">
      <div className="text-center py-20">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
        <p className="text-gray-500">There are no blog posts available at the moment.</p>
      </div>
    </div>
  </section>
);

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPageChanging, setIsPageChanging] = useState(false);

  const fetchBlogs = async (page) => {
    try {
      // Only show full loading on initial load, show page changing indicator for subsequent loads
      if (page === 1 && blogs.length === 0) {
        setLoading(true);
      } else {
        setIsPageChanging(true);
      }

      setError(null);

      const response = await fetch(`${mediaUrl}/api/web/blogs?page=${page}&limit=12`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setBlogs(data.data || []);
        setPagination(data.pagination || {});
      } else {
        throw new Error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.message);

      // Keep existing data if this was a page change
      if (page === 1 || blogs.length === 0) {
        setBlogs([]);
        setPagination({});
      }
    } finally {
      setLoading(false);
      setIsPageChanging(false);
    }
  };

  const handlePageChange = (page) => {
    if (page === currentPage || isPageChanging) return;

    setCurrentPage(page);
    fetchBlogs(page);

    // Smooth scroll to top of section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRetry = () => {
    fetchBlogs(currentPage);
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  // Show loading state on initial load
  if (loading && blogs.length === 0) {
    return <BlogSectionLoader />;
  }

  // Show error state if there's an error and no existing data
  if (error && blogs.length === 0) {
    return <BlogSectionError onRetry={handleRetry} />;
  }

  // Show empty state if no blogs and not loading
  if (!loading && blogs.length === 0) {
    return <BlogSectionEmpty />;
  }

  return (
    <section className="w-full h-auto 3xl:p-[75px_0_130px] lg:p-[50px_0_90px] sm:p-[50px_0_70px] p-[40px_0_50px] block">
      <div className="container">
        {/* Page changing indicator */}
        {isPageChanging && (
          <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3 border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading page {currentPage}...</span>
            </div>
          </div>
        )}

        <div className="3xl:mb-[120px] 2xl:mb-[100px] lg:mb-[80px] sm:mb-[50px] mb-[30px] flex flex-wrap">
          {blogs.map((item, index) => (
            <div
              key={item.id || index}
              className="lg:w-[calc(100%/3)] sm:w-[calc(100%/2)] w-full 2xl:p-[25px_17px] lg:p-[15px_12px] sm:p-[10px_7px] p-[10px_0px]"
            >
              <BlogCard item={item} />
            </div>
          ))}
        </div>

        {/* Pagination info */}
        {pagination.totalItems > 0 && (
          <div className="text-center mb-6 text-gray-600 text-sm">
            Showing {pagination.startIndex || 1}-{pagination.endIndex || blogs.length} of {pagination.totalItems} blog posts
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <PaginationNavigator
          currentPage={pagination.currentPage || currentPage}
          totalPages={pagination.totalPages || 1}
          onPageChange={handlePageChange}
          maxVisiblePages={7}
        />
      )}

      {/* Error toast for page changes */}
      {error && blogs.length > 0 && (
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
              <p className="text-sm text-red-800">Failed to load page {currentPage}. Please try again.</p>
              <button onClick={handleRetry} className="mt-2 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors">
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
