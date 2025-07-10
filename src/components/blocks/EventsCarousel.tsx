'use client'

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function EventsCarousel() {
  return (
    <>
    <Carousel plugins={[Autoplay()]} className="w-full relative">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 15 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="relative overflow-hidden group">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
                 {/* Overlay - hidden until hover */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,51,2,0)_0%,rgba(0,51,2,0.95)_61.92%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom Icon - appears on hover */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l5 5m-5-5a6 6 0 111.414-1.414L20 20"
            />
          </svg>
        </div>

         <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-xl font-bold">Annual Covening</h3>
          <p className="text-xl">March 2024</p>
        </div>
              </Card>
            </div>
          </CarouselItem>
        ))}

      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
      <CarouselDots />
    </Carousel>
     </>
  )
}
