"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchableSelect({
  options = [],
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No options found.",
  disabled = false,
  className = "",
  itemClassName = "",
  contentClassName = "",
  loading = false,
  loadingText = "Loading...",
  children,
}) {
  const [open, setOpen] = React.useState(false);

  // Find selected option
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  // Spinner component for loading state
  const Spinner = ({ className = "inline-block h-4 w-4 mr-2" }) => (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled || loading}
        >
          {loading ? (
            <div className="flex items-center">
              <Spinner className="inline-block h-4 w-4 mr-2" />
              <span className="align-middle">{loadingText}</span>
            </div>
          ) : selectedOption ? (
            selectedOption.label
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 3xl:h-4 3xl:w-4 2xl:h-3 2xl:w-3 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", contentClassName)}>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9 3xl:text-[18px] 2xl:text-[16px] xl:text-[12px] md:text-[10px] text-[14px] font-normal uppercase placeholder:!text-black"
          />
          <CommandList>
            {options.length > 0 ? (
              <>
                <CommandEmpty className="3xl:py-[16px] 2xl:py-[14px] xl:py-[12px] md:py-[10px] py-[10px] 3xl:px-4 px-[10px] 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[8px] text-[14px] font-normal uppercase text-gray-500">{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                      className={cn(
                        "cursor-pointer",
                        itemClassName
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 3xl:h-4 3xl:w-4 2xl:h-3 2xl:w-3 h-3 w-3",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : (
              <div className="3xl:py-[16px] 2xl:py-[14px] xl:py-[12px] md:py-[10px] py-[10px] 3xl:px-4 px-[10px] 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[8px] text-[14px] font-normal uppercase text-gray-500 text-center">
                {emptyText}
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
