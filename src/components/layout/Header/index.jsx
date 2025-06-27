"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "Brands", href: "/brand" },
  { label: "Fabrication", href: "/fabrication" },
  { label: "Services", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isInnerPage = pathname !== "/";
  const [isOpen, setIsOpen] = React.useState(false); // State for sheet

  return (
    <header>
      <div className="w-full absolute top-0 left-0 z-10 bg-transparent">
        <div className="container">
          <div
            className={`w-full flex flex-wrap items-center justify-between py-[20px_0] ${
              isInnerPage
                ? "lg:border-b lg:border-[rgba(217,217,217,0.2)]"
                : ""
            }`}
          >
            {/* Logo */}
            <div className="3xl:w-[260px] 2xl:w-[195px] lg:w-[165px] w-[145px] flex items-center justify-center">
              <Link href="/" className="block w-full h-full">
                <Image
                  src="/images/logo.svg"
                  alt="shayan Logo"
                  width={80}
                  height={40}
                  className="w-full h-full object-contain block hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="max-lg:hidden">
              <NavigationMenuList className="flex items-center gap-0">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;

                  const menuLinkClass = `
                    3xl:text-[18px] 2xl:text-[13px] xl:text-[11px] text-[12px] font-medium uppercase
                    ${isInnerPage ? "lg:text-white text-black" : "text-black"}
                    flex items-center justify-center 3xl:px-[25px] 2xl:px-[20px] px-[15px] 3xl:py-[43px] 2xl:py-[35px] py-[25px]
                    ${
                      isActive
                        ? "after:absolute after:content-[''] after:bottom-0 after:left-0 after:right-0 after:m-auto after:w-[70%] after:h-[3px] after:bg-white"
                        : ""
                    }
                    hover:!text-[#BE1E2D] hover:bg-transparent
                  `;

                  return (
                    <NavigationMenuItem key={item.label}>
                      <Link href={item.href} passHref>
                        <NavigationMenuLink asChild>
                          <span
                            className={`${menuLinkClass} ${
                              item.label === "Contact Us"
                                ? "text-white bg-[#2E4C99] 3xl:h-[40px] 2xl:h-[30px] h-[25px] min-w-[90px] !py-0 !rounded-[50px] after:hidden hover:!bg-[#BE1E2D] hover:!text-white"
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

            {/* Mobile Hamburger & Sheet Menu */}
            <NavigationMenuItem className="lg:hidden list-none">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="text-white font-medium flex items-center cursor-pointer">
                  <svg
                    height="25"
                    width="25"
                    viewBox="0 0 512 512"
                    className="fill-[#2E4C99]"
                  >
                    <path d="M128 102.4c0-14.138 11.462-25.6 25.6-25.6h332.8c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6h-332.8c-14.138 0-25.6-11.463-25.6-25.6zm358.4 128h-460.8c-14.138 0-25.6 11.463-25.6 25.6 0 14.138 11.462 25.6 25.6 25.6h460.8c14.138 0 25.6-11.462 25.6-25.6 0-14.137-11.462-25.6-25.6-25.6zm0 153.6h-230.4c-14.137 0-25.6 11.462-25.6 25.6 0 14.137 11.463 25.6 25.6 25.6h230.4c14.138 0 25.6-11.463 25.6-25.6 0-14.138-11.462-25.6-25.6-25.6z" />
                  </svg>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full max-w-[340px] backdrop-blur-[20px] bg-black/70 p-6 text-white border-none"
                >
                  <SheetHeader>
                    <div className="flex justify-between items-center mb-3">
                      <SheetTitle className="text-2xl text-[#BE1E2D] font-semibold tracking-wide">
                        Menu
                      </SheetTitle>
                    </div>
                    <ul className="space-y-4 mt-4">
                      {menuItems.map((item, i) => (
                        <li
                          key={item.label}
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
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
          </div>
        </div>
      </div>
    </header>
  );
}
