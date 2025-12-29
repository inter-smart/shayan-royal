"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function StickyMobileCTA({ contactData }) {
  useEffect(() => {
    // Add padding to body when component mounts (mobile only)
    const addMobilePadding = () => {
      if (window.innerWidth < 768) { // md breakpoint
        document.body.style.paddingBottom = '80px';
      }
    };

    // Remove padding when component unmounts
    const removeMobilePadding = () => {
      document.body.style.paddingBottom = '';
    };

    // Handle resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        document.body.style.paddingBottom = '';
      } else if (contactData && contactData.length > 0) {
        document.body.style.paddingBottom = '80px';
      }
    };

    addMobilePadding();
    window.addEventListener('resize', handleResize);

    return () => {
      removeMobilePadding();
      window.removeEventListener('resize', handleResize);
    };
  }, [contactData]);

  if (!contactData || contactData.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center justify-center gap-3 w-full max-w-sm">
          {contactData.map((item, index) => (
            <a
              key={index}
              href={item?.link ? item.link : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 block"
            >
              <div
                className="w-full h-[30px] flex items-center justify-center rounded-[5px] group transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: item.colorCode }}
              >
                <div className="w-4 h-4 mr-2 transition-all group-hover:scale-110">
                  <Image 
                    src={item?.icon} 
                    alt={item.name} 
                    width={20} 
                    height={20} 
                    className="w-full h-full object-contain filter brightness-0 invert" 
                  />
                </div>
                <div className="text-[12px] text-white font-medium capitalize transition-all group-hover:tracking-wider">
                  {item?.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}