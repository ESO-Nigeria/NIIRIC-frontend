"use client";

import { useState, useMemo, useEffect } from "react";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import Pagination from "@/components/blocks/Pagination";
import { useGetEventsQuery } from "@/store/features/general/actions";

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
  // const [categoryValue, setCategoryValue] = useState("");
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

  // Normalize API data
  const events: EventItemType[] = Array.isArray(data)
    ? data
    : data?.results || [];

  // Filter + Sort logic
  const filteredAndSortedEvents = useMemo(() => {
    const now = new Date();

    return events
      .filter((event) => {
        const matchesSearch =
          event.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchValue.toLowerCase());

       

        const eventDate = event.start_date ? new Date(event.start_date) : null;
        const isUpcoming = eventDate ? eventDate >= now : false;
        const isPast = eventDate ? eventDate < now : false;

        const matchesFilter =
          defaultFilter === "upcoming"
            ? isUpcoming
            : defaultFilter === "past"
            ? isPast
            : true;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
        const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
        return sortOrder === "newer" ? dateB - dateA : dateA - dateB;
      });
  }, [events, searchValue, sortOrder, defaultFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  const currentEvents = filteredAndSortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // UI
  return (
    <GeneralLayout>
      <InfoHero
        tag="Events"
        title={
          defaultFilter === "upcoming"
            ? "Upcoming Events"
            : defaultFilter === "past"
            ? "Past Events"
            : "All Events"
        }
        description="Discover and participate in events that bring together innovators, researchers, and changemakers from the NIIRIC network."
        imageUrl="/assets/images/events_hero.jpg"
        imageAlt="Events Banner Image"
        showSearch={true}
        searchValue={searchValue}
        placeholderText="Search for events"
        onSearchValueChange={setSearchValue}
        showCategorySelect={false}
        onSearch={() => {}}
      />

      {/* Header + Sort */}
      <div className="mx-auto container px-4 flex items-center justify-between mx-5 mt-10">
        <h2 className="text-xl font-normal font-poppins">Latest Events</h2>
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
        ) : data?.results?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.results.map((item: EventItemType) => (
              <EventCard
                key={item.id}
                item={item}
                onPlusClick={handlePlusClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No events found.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      {/* Event Detail Dialog */}
      <EventDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedItem(null);
        }}
        selectedItem={selectedItem}
      />
    </GeneralLayout>
  );
}
