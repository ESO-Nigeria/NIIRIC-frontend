"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageCarousel } from "@/components/blocks/ImageCarousel";

interface GalleryItem {
  id: number | string;
  title: string;
  description?: string;
  date?: string;
  cover_image_url: string;
  images?: string[];
}

interface GalleryGridProps {
  items: GalleryItem[];
  isLoading?: boolean;
  error?: any;
}

export default function GalleryGrid({
  items = [],
  isLoading,
  error,
}: GalleryGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);

  return (
    <section className="mx-auto container px-4 py-10">
      {isLoading ? (
        <p className="text-center text-gray-500 py-10">Loading Gallery...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-10">Failed to load gallery.</p>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div key={index} className="p-1">
              <Card
                className="relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedEvent(item)}
              >
                {/* Image */}
                <img
                  src={item.cover_image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,51,2,0)_0%,rgba(0,51,2,0.95)_100%)]
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                />

                {/* Hover content */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 z-20 text-center px-4"
                >
                  {/* Search Icon */}
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
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    {item.date && (
                      <p className="text-sm text-gray-300 mt-1">{item.date}</p>
                    )}
                  </div>
                </div>

                <CardContent className="flex aspect-square items-center justify-center p-6 relative z-0"></CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No items found.</p>
      )}

      {/* Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
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
      </Dialog>
    </section>
  );
}
