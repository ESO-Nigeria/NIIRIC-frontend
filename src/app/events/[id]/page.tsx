"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GeneralLayout from "@/layouts/General";
import Breadcrumbs from "@/components/common/Breadcrumb";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";

interface EventItemType {
  id: number;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  date?: string;
}

const events: EventItemType[] = [
  {
    id: 1,
    category: "Technology",
    title: "AI in Education Summit",
    description:
      "Join innovators redefining the future of learning with AI-driven tools.",
    imageSrc: "/assets/images/DSC_9158.png",
    date: "Nov 10, 2025",
  },
  {
    id: 2,
    category: "Climate",
    title: "Climate Innovation Forum",
    description:
      "Collaborate with experts on sustainable energy and green technology.",
    imageSrc: "/assets/images/DSC_9158-1.png",
    date: "Dec 2, 2025",
  },
  {
    id: 3,
    category: "Engineering",
    title: "Robotics Hackathon",
    description: "Compete with teams across Nigeria to build the smartest robot.",
    imageSrc: "/assets/images/DSC_9158-2.png",
    date: "Jan 15, 2026",
  },
  {
    id: 4,
    category: "Startup",
    title: "Startup Founders Meetup",
    description:
      "Connect with mentors and investors from across Africa’s startup ecosystem.",
    imageSrc: "/assets/images/DSC_9158-3.png",
    date: "Feb 20, 2026",
  },
  {
    id: 5,
    category: "Science",
    title: "Research & Innovation Expo",
    description:
      "Showcase your research and network with global scientists and entrepreneurs.",
    imageSrc: "/assets/images/DSC_9158.png",
    date: "Mar 10, 2026",
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 6,
    category: "Tech",
    title: `Event ${i + 6}`,
    description: `Demo description for event ${i + 6}`,
    imageSrc: "/assets/images/DSC_9158.png",
    date: `2026-04-${(i + 1).toString().padStart(2, "0")}`,
  })),
];

export default function EventDetailPage() {
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EventItemType | null>(null);

  const event = events.find(
    (ev) => ev.title.toLowerCase().replace(/\s+/g, "-") === id
  );

  if (!event)
    return (
      <div className="p-10 text-center text-gray-500 text-xl font-semibold">
        Event not found.
      </div>
    );

  const related = events.filter((ev) => ev.title !== event.title).slice(0, 3);

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: EventItemType
  ) => {
    e.stopPropagation();
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <GeneralLayout>
      <div className="pt-8 lg:pt-16 px-16">
        <Breadcrumbs />
      </div>

      <div className="p-8 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — Event Detail */}
          <main className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold w-full lg:w-1/2 leading-12 sm:text-4xl text-primary-green leading-tight">
              {event.title}
            </h1>

            {event.date && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 text-lg font-medium ml-1">
                  {event.date}
                </p>
              </div>
            )}

            <img
              src={event.imageSrc}
              alt={event.title}
              className="rounded-xl w-full max-h-[500px] object-cover shadow-lg"
            />

            <p className="text-gray-700 text-lg leading-relaxed">
              {event.title}
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">{event.date}</p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Theme: {event.title}
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              {event.description}
            </p>

            <Link
              href={""}
              className="px-4 py-2 bg-primary-green text-white rounded-md shadow-md hover:shadow-primary-green/20 transition-all duration-300 hover:scale-105"
            >
              Register
            </Link>
          </main>

          {/* RIGHT SIDE — Related Events */}
          <aside className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-normal font-poppins">Related Events</h3>
            <div className="flex flex-col gap-4">
              {related.map((item) => (
                <EventCard
                  key={item.id}
                  item={item}
                  onPlusClick={handlePlusClick}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <EventDetailDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedItem={selectedItem}
      />
    </GeneralLayout>
  );
}
