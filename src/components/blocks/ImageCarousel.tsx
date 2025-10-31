"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageItem {
  url: string;
  caption?: string;
}

interface ImageCarouselProps {
  images?: ImageItem[];
  height?: string; // e.g. "h-[400px]"
  className?: string;
  fallbackImage?: string;
}

export function ImageCarousel({
  images = [],
  height = "h-[400px]",
  className,
  fallbackImage,
}: ImageCarouselProps) {
  const hasImages = images && images.length > 0;

  return (
    <div className={cn("relative w-full", className)}>
      {hasImages ? (
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img: any, idx) => (
              <CarouselItem key={idx}>
                <div className="relative">
                  <img
                    src={ img ?? img.url ?? "" }
                    alt={img.caption || `Slide ${idx + 1}`}
                    className={cn(
                      "w-full object-cover rounded-md",
                      height
                    )}
                  />
                  {img.caption && (
                    <p className="absolute bottom-2 left-3 text-white text-sm bg-black/40 px-2 py-1 rounded-md">
                      {img.caption}
                    </p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      ) : fallbackImage ? (
        <img
          src={fallbackImage}
          alt="Fallback"
          className={cn("w-full object-cover rounded-md", height)}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-100 text-gray-500 rounded-md",
            height
          )}
        >
          No images available
        </div>
      )}
    </div>
  );
}
