"use client";
import React, { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
                    className={`
            z-50 flex items-center justify-center 2xl:w-[50px] w-[40px] 2xl:h-[50px] h-[40px] rounded-full border border-white/20 group fixed 
            lg:bottom-[50px] bottom-[30px] ltr:md:right-[60px] rtl:md:left-[60px] ltr:right-[15px] rtl:left-[15px]
            transition-opacity duration-300 ease-in-out cursor-pointer
            ${visible ? "opacity-100" : "opacity-0"}
            bg-[#00095B] hover:bg-white/10 hover:border-[#00095B]
        `}
            aria-label="Scroll to top"
        >
            <svg
                width="9"
                height="16"
                viewBox="0 0 9 16"
                className="stroke-white group-hover:stroke-[#00095B]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.60146 14.5664L4.60146 1.21885M4.60146 1.21885L1.04211 4.7782M4.60146 1.21885L8.16081 4.7782"
                    strokeWidth="1.33476"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>

    );
}
