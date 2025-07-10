"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import OverlayImage from "@/app/assets/images/header_rectangle.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeroSectionProps {
  tag?: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string | StaticImageData;
  imageAlt?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  categoryValue?: string;
  onCategoryChange?: (value: string) => void;
  onSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InfoHero: React.FC<HeroSectionProps> = ({
  tag,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt = "Hero Image",
  showSearch = false,
  searchValue = "",
  onSearchValueChange,
  categoryValue = "",
  onCategoryChange,
  onSearch,
}) => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={OverlayImage}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />

      {/* <div className="bg-[linear-gradient(90.13deg,#003302_31.95%,rgba(0,153,6,0)_97.69%)]"> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90.13deg,#003302_31.95%,rgba(0,153,6,0)_97.69%)] z-10" />

      <Image
        src={`${imageUrl}`}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 lg:px-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            {tag && (
              <span className="uppercase text-base inline-block mb-4 px-3 py-1 text-main-text-color  font-medium bg-white  rounded">
                {tag}
              </span>
            )}
            <h1 className="text-xl lg:text-4xl font-bold leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-xl font-semibold mb-2">{subtitle}</h2>
            )}
            <p className="text-base  leading-relaxed">{description}</p>
          </div>
          {showSearch && (
            <div className="mt-8 max-w-4xl">
              <form
                className="flex w-full items-center gap-2 bg-white rounded-lg shadow px-4 py-2 min-h-[62px]"
                onSubmit={onSearch}
              >
                <span className="text-[#1D1B20]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3333 17.5L11.0833 12.25C10.6667 12.5833 10.1875 12.8472 9.64583 13.0417C9.10417 13.2361 8.52778 13.3333 7.91667 13.3333C6.40278 13.3333 5.12153 12.809 4.07292 11.7604C3.02431 10.7118 2.5 9.43056 2.5 7.91667C2.5 6.40278 3.02431 5.12153 4.07292 4.07292C5.12153 3.02431 6.40278 2.5 7.91667 2.5C9.43056 2.5 10.7118 3.02431 11.7604 4.07292C12.809 5.12153 13.3333 6.40278 13.3333 7.91667C13.3333 8.52778 13.2361 9.10417 13.0417 9.64583C12.8472 10.1875 12.5833 10.6667 12.25 11.0833L17.5 16.3333L16.3333 17.5ZM7.91667 11.6667C8.95833 11.6667 9.84375 11.3021 10.5729 10.5729C11.3021 9.84375 11.6667 8.95833 11.6667 7.91667C11.6667 6.875 11.3021 5.98958 10.5729 5.26042C9.84375 4.53125 8.95833 4.16667 7.91667 4.16667C6.875 4.16667 5.98958 4.53125 5.26042 5.26042C4.53125 5.98958 4.16667 6.875 4.16667 7.91667C4.16667 8.95833 4.53125 9.84375 5.26042 10.5729C5.98958 11.3021 6.875 11.6667 7.91667 11.6667Z"
                      fill="#1D1B20"
                    />
                  </svg>
                </span>
                <Input
                  type="text"
                  placeholder="Looking for funding, training, jobs?"
                  className="w-[55%] min-w-0 bg-white outline-none ring-0 text-gray-700 placeholder:text-gray-400 px-2 py-2 border-0 shadow-none focus:bg-transparent focus:ring-0 focus:outline-none focus:border-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none active:bg-transparent active:ring-0 active:outline-none active:border-0"
                  value={searchValue}
                  onChange={(e) =>
                    onSearchValueChange && onSearchValueChange(e.target.value)
                  }
                />
                <span className="h-8 w-px bg-gray-200 mx-2" />
                <Select value={categoryValue} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-[30%] min-w-0 bg-white shadow-none text-gray-700 px-2 py-2 border-0 focus:bg-white focus:ring-0 focus:outline-none focus:border-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none active:bg-transparent active:ring-0 active:outline-none active:border-0">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-700 border-0 shadow-none focus:bg-white focus:ring-0 focus:outline-none focus:border-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none active:bg-transparent active:ring-0 active:outline-none active:border-0">
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="jobs">Jobs</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="w-[15%] min-w-0 bg-[#1B4137] text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-green transition-colors flex items-center gap-2 min-h-[48px] justify-center"
                >
                  Search
                  <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                    <path
                      d="M3 9h12m0 0-4.5-4.5M15 9l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoHero;
