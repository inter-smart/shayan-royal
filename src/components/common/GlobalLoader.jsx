"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GlobalLoader({ isLoading = true }) {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before hiding to ensure smooth transition
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
      isLoading ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.svg"
            alt="Shayan Royal"
            width={120}
            height={80}
            className="w-auto h-16 md:h-20"
            priority
          />
        </div>
        
        {/* Loading spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[#2E4C99]"></div>
          
          {/* Inner ring for double effect */}
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-[#BD1F2D] animate-reverse"></div>
        </div>
        
        {/* Loading text */}
        <div className="mt-6 text-center">
          <p className="text-[#2E4C99] font-medium text-lg mb-2">Loading...</p>
          {/* <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#2E4C99] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#2E4C99] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#2E4C99] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div> */}
        </div>
        
        {/* Progress bar */}
        {/* <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#2E4C99] to-[#BD1F2D] rounded-full animate-pulse"></div>
        </div> */}
      </div>
    </div>
  );
}

// Page-specific loader for route transitions
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-[#2E4C99]"></div>
        <p className="mt-4 text-[#2E4C99] font-medium">Loading page...</p>
      </div>
    </div>
  );
}

// Component loader for sections
export function ComponentLoader({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 border-gray-200 rounded-full animate-spin border-t-[#2E4C99]`}></div>
      {text && <p className="mt-4 text-gray-600 text-sm">{text}</p>}
    </div>
  );
}