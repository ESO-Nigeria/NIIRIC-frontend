"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import { useGetEventsQuery } from "@/store/features/general/actions";

interface NavigationButtonsProps {
  currentIndex: number;
  maxIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
}

interface EventItemType {
  id: string;
  title: string;
  description: string;
  category?: string;
  event_image?: string;
  start_date?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  maxIndex,
  handlePrev,
  handleNext,
}) => (
  <div className="mt-6 pl-2 flex justify-start gap-4">
    <button
      className="inline-flex items-center justify-center rounded-full size-8 font-bold text-primary-green whitespace-nowrap text-sm transition-all duration-300 hover:bg-primary-green/35 hover:scale-105 active:scale-95"
      disabled={currentIndex === 0}
      onClick={handlePrev}
      aria-label="Previous slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-left h-6 w-6"
      >
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
    </button>

    <button
      className="inline-flex items-center justify-center rounded-full size-8 hover:bg-primary-green/35 text-primary-green font-bold whitespace-nowrap text-sm transition-all duration-300 hover:scale-105 active:scale-95"
      disabled={currentIndex >= maxIndex}
      onClick={handleNext}
      aria-label="Next slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-right h-6 w-6"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </button>
  </div>
);

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<EventItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [itemWidth, setItemWidth] = useState<number>(100);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  // Fetch events from your API
  const { data, isLoading, error } = useGetEventsQuery(undefined);

  const events: EventItemType[] = Array.isArray(data)
    ? data
    : data?.results || [];

  // Adjust layout responsiveness
  useEffect(() => {
    const calculateVisibleSlides = () => {
      if (!sliderRef.current) return;
      let slides = 1;
      if (window.innerWidth >= 1280) slides = 3.8;
      else if (window.innerWidth >= 1024) slides = 1.8;
      else slides = 1.2;

      const width = 100 / slides;
      setItemWidth(width);
      setMaxIndex(events.length - Math.floor(slides));
    };

    calculateVisibleSlides();
    window.addEventListener("resize", calculateVisibleSlides);
    return () => window.removeEventListener("resize", calculateVisibleSlides);
  }, [events.length]);

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: EventItemType
  ) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const getTransformValue = (): string =>
    `translate3d(-${currentIndex * itemWidth}%, 0px, 0px)`;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end pl-2">
        <div className="space-y-4">
          <Badge variant="primary-brown-25" className="uppercase rounded-8">
            EXPLORE EVENTS
          </Badge>
          <h2 className="text-3xl font-bold text-primary-green leading-12 sm:text-4xl">
            <span className="block">Events from the NIIRIC Community</span>
          </h2>
        </div>

        <NavigationButtons
          currentIndex={currentIndex}
          maxIndex={maxIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>

      {/* Carousel Content */}
      <div className="mx-auto flex max-w-container flex-col items-start">
        <div
          className="relative w-full overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          ref={sliderRef}
        >
          {isLoading ? (
            <p className="text-gray-500 py-10 text-center">Loading events...</p>
          ) : error ? (
            <p className="text-red-500 py-10 text-center">
              Failed to load events.
            </p>
          ) : events.length > 0 ? (
            <div className="relative">
              <div
                ref={itemsRef}
                className="flex transition-all duration-700 ease-out"
                style={{ transform: getTransformValue() }}
              >
                {events.map((item) => (
                  <div
                    key={item.id}
                    role="group"
                    aria-roledescription="slide"
                    className="min-w-0 shrink-0 grow-0 px-2"
                    style={{ width: `${itemWidth}%` }}
                  >
                    <EventCard item={item} onPlusClick={handlePlusClick} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 py-10 text-center">No events found.</p>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <EventDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedItem(null);
        }}
        selectedItem={selectedItem}
      />
    </section>
  );
}
