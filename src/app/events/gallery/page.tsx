"use client";

import { useState, useMemo, useEffect } from "react";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import Pagination from "@/components/blocks/Pagination";
import {
  useGetEventsQuery,
  useGetGalleryImagesQuery,
} from "@/store/features/general/actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaginationControls from "@/components/common/Pagination";
import { ImageCarousel } from "@/components/blocks/ImageCarousel";
import GalleryGrid from "@/components/blocks/GalleryGrid";

interface EventItemType {
  id: string;
  title: string;
  description: string;
  category?: string;
  event_image?: string;
  start_date?: string;
}

interface EventsProps {
  defaultFilter?: "upcoming" | "past" | "all";
}

export default function Gallery({ defaultFilter = "all" }: EventsProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"newer" | "older">("newer");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    page_size: 10,
  });
  const queryParams = useMemo(
    () => ({
      ...filters,
      page: currentPage,
    }),
    [filters, currentPage]
  );
  // Fetch events
  const { data, isLoading, error } = useGetGalleryImagesQuery(queryParams);

  // Pagination logic
  const [selectedEvent, setSelectedEvent] = useState<null | {
    id: number;
    title: string;
    date: string;
    image: string;
    description: string;
    cover_image_url?: string;
    images?: [];
  }>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UI
  return (
    <GeneralLayout>
      <InfoHero
        tag="Gallery"
        title={"Snapshots of our Events"}
        description=""
        imageUrl="/assets/images/events_hero.jpg"
        imageAlt="Events Banner Image"
        showSearch={false}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        categoryValue={categoryValue}
        onCategoryChange={setCategoryValue}
        onSearch={() => {}}
      />

      {/* Header + Sort */}
      <div className="mx-auto container px-4 flex items-center justify-between mx-5 mt-10">
        <h2 className="text-xl font-normal font-poppins">Gallery</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newer" | "older")}
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none"
          >
            <option value="newer">Newest</option>
            <option value="older">Oldest</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <GalleryGrid
    items={data?.results || []}
    isLoading={isLoading}
    error={error}
  />

<div className="mt-10 flex justify-center">
          <PaginationControls
            currentPage={currentPage}
            totalCount={data?.count || 0}
            pageSize={filters?.page_size || 0}
            onPageChange={handlePageChange}
          />
        </div>
      {/* <section className="mx-auto container px-4 py-10">
        {isLoading ? (
          <p className="text-center text-gray-500 py-10">Loading Gallery...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            Failed to load gallery.
          </p>
        ) : data?.results?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.results.map((item: any, index: any) => (
              <div key={index + 1} className="p-1">
                <Card
                  className="relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedEvent(item)}
                >
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,51,2,0)_0%,rgba(0,51,2,0.95)_100%)] 
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  />

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 
      group-hover:opacity-100 transition-opacity duration-300 z-20 text-center px-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white mb-3"
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

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      {item.date && (
                        <p className="text-sm text-gray-300 mt-1">
                          {item.date}
                        </p>
                      )}
                    </div>
                  </div>

                  <CardContent className="flex aspect-square items-center justify-center p-6 relative z-0"></CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No events found.</p>
        )}

        
      </section> */}
      {/* <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedEvent && (
            <>
              <ImageCarousel
                images={selectedEvent.images}
                fallbackImage={selectedEvent.cover_image_url}
                height="h-[450px]"
                className="rounded-none"
              />

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    {selectedEvent.title}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-gray-700">
                    {selectedEvent.description}
                  </DialogDescription>
                  {selectedEvent.date && (
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedEvent.date}
                    </p>
                  )}
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog> */}
    </GeneralLayout>
  );
}
