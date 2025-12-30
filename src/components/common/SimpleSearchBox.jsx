"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { mediaUrl } from "@/lib/constants";

export default function SimpleSearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const wrapperRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  const fetchSuggestions = async (searchQuery, page = 1) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setPagination(null);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${mediaUrl}/api/web/inventory/tag?search=${encodeURIComponent(searchQuery)}&page=${page}`);
      const result = await response.json();

      if (result?.success && result?.data?.inventories) {
        setSuggestions(result.data.inventories);
        setPagination(result.data.pagination);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setPagination(null);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
      setPagination(null);
      setShowSuggestions(true);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim().length < 2) {
      setSuggestions([]);
      setPagination(null);
      setShowSuggestions(false);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchSuggestions(query, 1);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const handleSuggestionClick = (item) => {
    router.push(`/inventory/srcode=${item.shayan_code}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSuggestions(query, newPage);
  };

  return (
    <div className="w-full mb-6">
      <div className="container mx-auto">
        <div ref={wrapperRef} className="relative max-w-full md:max-w-xl ml-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search by car model, brand, or keywords..."
              className="w-full h-12 pl-12 pr-4 bg-white border-1 border-black/30 rounded-lg focus:outline-none focus:border-[#BE1E2D] focus:ring-0 text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-[#BE1E2D] rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Loading State in Dropdown */}
          {showSuggestions && loading && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 px-4 py-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-gray-300 border-t-[#BE1E2D] rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Searching...</p>
              </div>
            </div>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && !loading && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
              <div className="max-h-96 overflow-y-auto">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-150 flex items-start gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    <div className="flex-grow min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                      {/* <div className="text-xs text-gray-600 mt-1">
                        {item.make?.name} {item.model?.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Code: {item.shayan_code}</div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag.id} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                              {tag.tag}
                            </span>
                          ))}
                        </div>
                      )} */}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                  <div className="text-xs text-gray-600">
                    Showing {pagination.startIndex}-{pagination.endIndex} of {pagination.totalItems}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(pagination.totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        // Show first page, last page, current page, and pages around current
                        if (pageNum === 1 || pageNum === pagination.totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-6 h-6 text-xs rounded transition-colors ${
                                currentPage === pageNum ? "bg-[#BE1E2D] text-white" : "hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                          return (
                            <span key={pageNum} className="text-gray-400 px-1">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No results message */}
          {showSuggestions && !loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 px-4 py-6 text-center text-gray-500 text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
