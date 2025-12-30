"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { mediaUrl } from "@/lib/constants";

export default function SimpleSearchBox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allData, setAllData] = useState({ makes: [], models: [] });
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    // Fetch dropdown data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${mediaUrl}/api/drop-down-data`);
                const result = await response.json();
                if (result?.data) {
                    setAllData({
                        makes: result.data.makes || [],
                        models: result.data.models || [],
                    });
                }
            } catch (error) {
                console.error("Failed to fetch suggestions data:", error);
            }
        };
        fetchData();
    }, []);

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

    // Filter suggestions based on query
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const searchTerm = query.toLowerCase();
        const makeSuggestions = allData.makes
            .filter((make) => make.name.toLowerCase().includes(searchTerm))
            .map((make) => ({ type: "make", label: make.name, value: make.name }));

        const modelSuggestions = allData.models
            .filter((model) => model.name.toLowerCase().includes(searchTerm))
            .map((model) => ({ type: "model", label: model.name, value: model.name }));

        const combined = [...makeSuggestions, ...modelSuggestions].slice(0, 8);
        setSuggestions(combined);
        setShowSuggestions(combined.length > 0);
    }, [query, allData]);

    const handleSearch = (searchValue) => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchValue.trim()) {
            params.set("search", searchValue.trim());
        } else {
            params.delete("search");
        }
        params.delete("page");
        router.push(`/inventory?${params.toString()}`);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.value);
        handleSearch(suggestion.value);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(query);
        }
    };

    return (
        <div className="w-full bg-[#031640] py-8 px-4 sm:px-6 lg:px-8 mb-6">
            <div className="container mx-auto">
                <div ref={wrapperRef} className="relative max-w-3xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
                            placeholder="Search by car model, brand, or keywords..."
                            className="w-full h-12 pl-12 pr-4 bg-white border-2 border-transparent rounded-lg focus:outline-none focus:border-[#BE1E2D] focus:ring-0 text-gray-900 placeholder-gray-500 transition-all duration-200"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={`${suggestion.type}-${suggestion.value}-${index}`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                                >
                                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <div className="flex-grow">
                                        <div className="text-sm font-medium text-gray-900">{suggestion.label}</div>
                                        <div className="text-xs text-gray-500 capitalize">{suggestion.type}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
