"use client";

import { useState, useRef, useEffect } from "react";
import { countries } from "@/data/countries";
import { cn } from "@/lib/utils";

// Component for country flag (using emoji flags)
const CountryFlag = ({ countryCode }) => {
  const getFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return "🏳️";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  return <span className="text-lg">{getFlagEmoji(countryCode)}</span>;
};

// Main PhoneInput component
export const PhoneInput = ({
  value = "",
  onChange,
  onCountryChange,
  placeholder = "Phone number",
  className = "",
  disabled = false,
  defaultCountry = "AE", // UAE as default
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter countries by search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.mobileCode.includes(searchTerm)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse initial value if provided
  useEffect(() => {
    if (value && typeof value === "string") {
      // Try to extract country code and phone number from the value
      const cleanValue = value.replace(/\s+/g, " ").trim();
      const possibleCode = cleanValue.split(" ")[0];
      
      const matchingCountry = countries.find(c => 
        cleanValue.startsWith(c.mobileCode)
      );
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setPhoneNumber(cleanValue.replace(matchingCountry.mobileCode, "").trim());
      } else {
        setPhoneNumber(cleanValue);
      }
    }
  }, [value]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setPhoneNumber(""); // Clear the phone number when country changes
    setIsOpen(false);
    setSearchTerm("");
    
    // Focus back to phone input
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Notify parent of country change
    if (onCountryChange) {
      onCountryChange(country);
    }

    // Update the combined value with just the country code (no phone number)
    const newValue = country.mobileCode;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Only allow numbers, remove any non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);
    
    // Update the combined value
    const newValue = selectedCountry.mobileCode + (numericValue ? " " + numericValue : "");
    if (onChange) {
      onChange(newValue.trim());
    }
  };

  const menuLinkClass =
    "!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal max-w-full min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] !w-full px-0 border-0 border-b border-[#000] bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none font-base1";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className={cn("flex items-end w-full border-0 border-b border-[#000]", className)}>
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex items-center gap-1 px-0 py-0 bg-transparent min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] focus:outline-none transition-colors flex-shrink-0"
          aria-label="Select country"
        >
          <CountryFlag countryCode={selectedCountry.code} />
          <span className="text-[11px] md:text-[12px] 2xl:text-[14px] 3xl:text-[17px] font-medium text-black mr-1">
            {selectedCountry.mobileCode}
          </span>
          <svg 
            className={cn("w-3 h-3 transition-transform text-black", isOpen && "rotate-180")} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Phone number input */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onKeyDown={(e) => {
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
              return;
            }
            // Ensure that it's a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="!text-[11px] md:!text-[12px] 2xl:!text-[14px] 3xl:!text-[17px] !text-black placeholder:text-black !font-normal flex-1 min-h-[35px] lg:min-h-[40px] 2xl:min-h-[50px] px-2 border-0 bg-transparent rounded-[0px] font-medium outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:ring-0 focus-visible:shadow-none font-base1"
          {...props}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden z-50">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Countries list */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-3 transition-colors"
                >
                  <CountryFlag countryCode={country.code} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {country.name}
                    </div>
                    <div className="text-xs text-gray-500">{country.mobileCode}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;