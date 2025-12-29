"use client";

import React, { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

function NavMenus({ pathname, isInnerPage, data = { data }, isPrivacyPage, staticHeader, isScrolled, isBannerActive }) {
  // Check if it's an inventory detail page (has slug after /inventory/)
  const isInventoryDetailPage = pathname.startsWith("/inventory/") && pathname !== "/inventory";
  const menuItems = [
    { label: "Home", href: "/", sublabel: "home" },
    { label: "About Us", href: "/about", sublabel: "about" },
    { label: "Inventory", href: "/inventory", sublabel: "inv" },
    { label: "Brands", href: "/brand", sublabel: "brand" },
    { label: "Fabrication", href: "/fabrication", sublabel: "fab" },
    { label: "Services", href: "/service", sublabel: "ser" },
    { label: "Blogs", href: "/blog", sublabel: "blog" },
    { label: data?.header_button_text, href: data?.header_button_link, sublabel: "Contact Us" },
  ];

  const [isOpen, setIsOpen] = useState(false); // State for sheet

  return (
    <>
      <NavigationMenu className="max-lg:hidden">
        <NavigationMenuList className="flex items-center gap-0">
          {menuItems.map((item) => {
            let isActive = pathname === item.href;

            switch (item.sublabel) {
              case "inv":
                if (pathname.startsWith("/inventory")) {
                  isActive = true;
                }
                break;

              case "blog":
                if (pathname.startsWith("/blog")) {
                  isActive = true;
                }
                break;

              case "ser":
                if (
                  pathname.startsWith("/service-detail") ||
                  pathname.startsWith("/service-fitment")
                ) {
                  isActive = true;
                }
                break;

              default:
                break;
            }

            // Determine text color based on page type and banner status
            let textColorClass = "";
            if (isPrivacyPage || staticHeader) {
              textColorClass = "!text-black hover:!text-[#BE1E2D]";
            } else if (isInventoryDetailPage) {
              // For inventory detail pages, use banner status to determine text color
              textColorClass = isBannerActive
                ? (isScrolled ? "text-black" : "lg:text-white text-black")
                : "text-black";
            } else if (isInnerPage) {
              textColorClass = isScrolled ? "text-black" : "lg:text-white text-black";
            } else {
              textColorClass = isScrolled ? "text-black" : "text-[rgba(0,0,0,0.9)]";
            }

            const menuLinkClass = `
                  text-[9px]  xl:text-[11px] 2xl:text-[13px] 3xl:text-[18px] font-medium uppercase tracking-[1px] transition-all
                  flex items-center justify-center 3xl:px-[25px] 2xl:px-[20px] px-[15px] 
                  ${isInnerPage ? (isScrolled ? "py-[35px]" : "3xl:py-[43px] 2xl:py-[35px] py-[30px]") : (isScrolled ? "py-[30px]" : "3xl:py-[43px] 2xl:py-[35px] py-[30px]")}
                    ${isScrolled ? "py-[30px]" : "3xl:py-[55px] 2xl:py-[45px] py-[40px]"} 
                    ${textColorClass}
                    ${isActive
                ? "!font-semibold after:absolute after:content-[''] text-black after:bottom-[-1px] after:left-0 after:right-0 after:m-auto after:w-[70%] after:h-[2px] after:bg-[#be1e2d]"
                : ""
              }
                    hover:!text-[#BE1E2D] hover:bg-transparent
                `;

            return (
              <NavigationMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <NavigationMenuLink asChild>
                    <span
                      className={`${menuLinkClass}  ${item.sublabel === "Contact Us"
                        ? "!text-[9[px] ]xl:!text-[10px] 2xl:!text-[12px] 3xl:!text-[16px] !text-white !font-normal bg-[#2E4C99] 3xl:h-[40px] 2xl:h-[30px] h-[25px] min-w-[90px] !py-0 !rounded-[50px] after:hidden hover:!bg-[#BE1E2D] hover:!text-white"
                        : ""
                        }`}
                    >
                      {item.label}
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenuItem className="lg:hidden list-none">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-label="Open menu" className="text-white font-medium flex items-center cursor-pointer">
            <svg height="25" width="25" viewBox="0 0 512 512" className="fill-[#2E4C99]">
              <path d="M128 102.4c0-14.138 11.462-25.6 25.6-25.6h332.8c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6h-332.8c-14.138 0-25.6-11.463-25.6-25.6zm358.4 128h-460.8c-14.138 0-25.6 11.463-25.6 25.6 0 14.138 11.462 25.6 25.6 25.6h460.8c14.138 0 25.6-11.462 25.6-25.6 0-14.137-11.462-25.6-25.6-25.6zm0 153.6h-230.4c-14.137 0-25.6 11.462-25.6 25.6 0 14.137 11.463 25.6 25.6 25.6h230.4c14.138 0 25.6-11.463 25.6-25.6 0-14.138-11.462-25.6-25.6-25.6z" />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-[340px] backdrop-blur-[20px] bg-black/70 p-6 text-white border-none">
            <SheetHeader>
              <div className="flex justify-between items-center mb-3">
                <SheetTitle className="text-2xl text-[#BE1E2D] font-semibold tracking-wide">Menu</SheetTitle>
              </div>
              <ul className="space-y-4 mt-4">
                {menuItems.map((item, i) => (
                  <li key={item.label} style={{ animationDelay: `${i * 80}ms` }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)} // 👈 Close Sheet on click
                      className="relative block text-[16px] font-medium py-1 transition-all duration-300 group"
                    >
                      {item.label}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#1577F0] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </NavigationMenuItem>
    </>
  );
}

export default NavMenus;
