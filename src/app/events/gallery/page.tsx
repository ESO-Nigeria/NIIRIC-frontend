"use client";

import { useState, useMemo, useEffect } from "react";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import Pagination from "@/components/blocks/Pagination";
import { useGetEventsQuery } from "@/store/features/general/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export default function Events({ defaultFilter = "all" }: EventsProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"newer" | "older">("newer");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EventItemType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Fetch events
  const { data , isLoading, error } = useGetEventsQuery(undefined);

  // Debug logging
  useEffect(() => {
    if (isLoading) console.log("Loading events...");
    else if (error) console.error("Error fetching events:", error);
    else if (data) console.log("Events fetched successfully:", data);
  }, [data, isLoading, error]);

  // Pagination logic
  const [selectedEvent, setSelectedEvent] = useState<null | {
		id: number;
		title: string;
		date: string;
		image: string;
	}>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: EventItemType
  ) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const events = Array.from({ length: 4 }).map((_, index) => ({
		id: index + 1,
		title: "Annual Convening",
		date: "March 2024",
		image: "/assets/images/events_hero.jpg",
	}));
  // UI
  return (
    <GeneralLayout>
      <InfoHero
        tag="Gallery"
        title={'Snapshots of our Events'}
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
            onChange={(e) =>
              setSortOrder(e.target.value as "newer" | "older")
            }
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none"
          >
            <option value="newer">Newest</option>
            <option value="older">Oldest</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <section className="mx-auto container px-4 py-10">
        {isLoading ? (
          <p className="text-center text-gray-500 py-10">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            Failed to load events.
          </p>
        ) : events?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((item, index) => (
              	<div key={index+1} className="p-1">
								<Card
									className="relative overflow-hidden group cursor-pointer"
									onClick={() => setSelectedEvent(item)}
								>
									{/* Thumbnail */}
									<img
										src={item.image}
										alt={item.title}
										className="absolute inset-0 w-full h-full object-cover"
									/>

									<CardContent className="flex aspect-square items-center justify-center p-6 relative z-10">
										<span className="text-2xl font-semibold text-white drop-shadow-md">
											{item.id}
										</span>
									</CardContent>

									{/* Overlay */}
									<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,51,2,0)_0%,rgba(0,51,2,0.95)_61.92%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Zoom Icon */}
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

									{/* Caption */}
									<div className="absolute bottom-4 left-4 text-white z-10">
										<h3 className="text-xl font-bold">{item.title}</h3>
										<p className="text-xl">{item.date}</p>
									</div>
								</Card>
							</div>
              // <EventCard
              //   key={item.id}
              //   item={item}
              //   onPlusClick={handlePlusClick}
              // />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No events found.</p>
        )}

        {/* {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )} */}
      </section>
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
				<DialogContent className="max-w-2xl p-0 overflow-hidden">
					{selectedEvent && (
						<>
							<img
								src={selectedEvent.image}
								alt={selectedEvent.title}
								className="w-full h-80 object-cover"
							/>
							<div className="p-6">
								<DialogHeader>
									<DialogTitle>{selectedEvent.title}</DialogTitle>
									<DialogDescription>{selectedEvent.date}</DialogDescription>
								</DialogHeader>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
    
    </GeneralLayout>
  );
}
