"use client";

import { useState, useMemo } from "react";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import Pagination from "@/components/blocks/Pagination";

interface EventItemType {
  id: number;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  date?: string;
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

  const events: EventItemType[] = [
    { id: 1, category: "Technology", title: "AI in Education Summit", description: "Join innovators redefining the future of learning with AI-driven tools.", imageSrc: "/assets/images/DSC_9158.png", date: "2024-11-10" },
    { id: 2, category: "Climate", title: "Climate Innovation Forum", description: "Collaborate with experts on sustainable energy and green technology.", imageSrc: "/assets/images/DSC_9158-1.png", date: "2025-12-02" },
    { id: 3, category: "Engineering", title: "Robotics Hackathon", description: "Compete with teams across Nigeria to build the smartest robot.", imageSrc: "/assets/images/DSC_9158-2.png", date: "2026-01-15" },
    { id: 4, category: "Startup", title: "Startup Founders Meetup", description: "Connect with mentors and investors from across Africa’s startup ecosystem.", imageSrc: "/assets/images/DSC_9158-3.png", date: "2026-02-20" },
    { id: 5, category: "Science", title: "Research & Innovation Expo", description: "Showcase your research and network with global scientists and entrepreneurs.", imageSrc: "/assets/images/DSC_9158.png", date: "2026-03-10" },
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 6,
      category: "Tech",
      title: `Event ${i + 6}`,
      description: `Demo description for event ${i + 6}`,
      imageSrc: "/assets/images/DSC_9158.png",
      date: `2026-04-${(i + 1).toString().padStart(2, "0")}`,
    })),
  ];

  // Filter Logic
  const filteredAndSortedEvents = useMemo(() => {
    const now = new Date();

    let filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        event.description.toLowerCase().includes(searchValue.toLowerCase());
      const matchesCategory = categoryValue
        ? event.category.toLowerCase() === categoryValue.toLowerCase()
        : true;

      const eventDate = new Date(event.date || "");
      const isUpcoming = eventDate >= now;
      const isPast = eventDate < now;

      const matchesFilter =
        defaultFilter === "upcoming"
          ? isUpcoming
          : defaultFilter === "past"
          ? isPast
          : true;

      return matchesSearch && matchesCategory && matchesFilter;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || "").getTime();
      const dateB = new Date(b.date || "").getTime();
      return sortOrder === "newer" ? dateB - dateA : dateA - dateB;
    });
  }, [events, searchValue, categoryValue, sortOrder, defaultFilter]);

  // Pagination
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
        onSearchValueChange={setSearchValue}
        categoryValue={categoryValue}
        onCategoryChange={setCategoryValue}
        onSearch={() => {}}
      />

      {/* Header + Sort */}
      <div className="flex items-center justify-between mx-5 mt-10">
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

      {/* Grid */}
      <section className="mx-auto px-4 py-10">
        {currentEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentEvents.map((item) => (
              <EventCard
                key={item.id}
                item={item}
                onPlusClick={handlePlusClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No events found.
          </p>
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
