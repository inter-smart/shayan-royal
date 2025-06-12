"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  { label: "About Us", href: "/" },
  { label: "Inventory", href: "/" },
  { label: "Brands", href: "/" },
  { label: "Fabrication", href: "/" },
  { label: "Services", href: "/" },
  { label: "Blog", href: "/" },
  { label: "Contact Us", href: "/" },
];

const menuLinkClass =
  "3xl:text-[18px] 2xl:text-[16px] xl:text-[14px] text-[12px] text-black 2xl:px-[20px] xl:px-[15px] px-[8px] hover:text-[#036EEE]";

export default function Header() {
  return (
    <header>
      <div className="w-full absolute top-0 left-0 z-10 bg-transparent">
        <div className="container">
          <div className="w-full flex flex-wrap items-center justify-between py-[20px]">
             {/* Logo */}
            <div className="lg:w-[260px] w-[175px] flex items-center justify-center">
              <Link href="/" className="block w-full h-full ">
                <Image
                  src="/images/logo.svg"
                  alt="Uniwood Logo"
                  width={80}
                  height={40}
                  className="w-full h-full object-contain block hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Main menu (desktop only) */}
            <NavigationMenu className="max-lg:hidden">
              <NavigationMenuList className="flex items-center rtl:flex-row-reverse gap-0">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <Link href={item.href} passHref>
                      <NavigationMenuLink asChild>
                        <span className={menuLinkClass}>{item.label}</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

           
          </div>
        </div>
      </div>
    </header>
  );
}
