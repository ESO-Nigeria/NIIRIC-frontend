"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import GeneralLayout from "@/layouts/General";
import Breadcrumbs from "@/components/common/Breadcrumb";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";
import {
  useGetEventsByIdQuery,
  useGetEventsQuery,
} from "@/store/features/general/actions";
import { Skeleton } from "@/components/ui/skeleton";

interface EventItemType {
  id: string;
  title: string;
  description: string;
  event_image?: string;
  start_date?: string;
  category?: string;
  registration_link?: string;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const { data: event, isLoading, error } = useGetEventsByIdQuery(id);

  // Normalize the structure of the API response
  // const events = Array.isArray(data)
  //   ? data
  //   : Array.isArray(data?.results)
  //   ? data.results
  //   : Array.isArray(data?.data)
  //   ? data.data
  //   : [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EventItemType | null>(null);
  // if (isLoading) {
  //   return (
  //     <div className="p-10 text-center text-gray-500 text-xl font-semibold">
  //       Loading event details...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="p-10 text-center text-red-500 text-xl font-semibold">
  //       Failed to load events.
  //     </div>
  //   );
  // }

  //  UseMemo to find the event based on the slug in the URL
  // const event = useMemo(
  //   () =>
  //     events.find(
  //       (ev: EventItemType) =>
  //         ev.title?.toLowerCase().replace(/\s+/g, "-") === id
  //     ),
  //   [events, id]
  // );

  if (!event && !isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 text-xl font-semibold">
        Event not found.
      </div>
    );
  }

  // Filter out the current event to show related ones
  // const related = events?.filter((ev: EventItemType) => ev.id !== event.id)?.slice(0, 3);

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
        <Breadcrumbs dynamicLabels={{ [id as string]: event?.title }} />
      </div>

      <div className="p-8 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — Event Details */}
          {isLoading && (
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-11/12 rounded-md" />
                <Skeleton className="h-4 w-10/12 rounded-md" />
                <Skeleton className="h-4 w-9/12 rounded-md" />
              </div>
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          )}
          {event && !isLoading && (
            <main className="lg:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold w-full  leading-12 sm:text-4xl text-primary-green leading-tight">
                {event?.title}
              </h1>

              {event?.start_date && (
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
                  <p className="text-gray-600 text-base font-medium ml-1">
                    {new Date(event?.start_date).toDateString()}
                  </p>
                </div>
              )}

              {event?.event_landing_image && (
                <img
                  src={event?.event_landing_image}
                  alt={event?.title}
                  className="rounded-xl w-full object-cover shadow-lg"
                />
              )}

              <p className="text-gray-700 text-base leading-relaxed">
                {event?.description}
              </p>

              <Link
                href={event?.registration_link || "#"}
                className="inline-block text-base px-4 py-2 bg-primary-green text-white rounded-md shadow-md hover:shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              >
                Register
              </Link>
            </main>
          )}
          {/* RIGHT SIDE — Related Events */}
          <aside className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-normal font-poppins">Related Events</h3>
            <div className="flex flex-col gap-4">
              {/* {related.length > 0 ? (
                related.map((item: EventItemType) => (
                  <EventCard
                    key={item.id}
                    item={item}
                    onPlusClick={handlePlusClick}
                  />
                ))
              ) : (
                <p className="text-gray-500">No related events found.</p>
              )} */}
            </div>
          </aside>
        </div>
      </div>

      <EventDetailDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedItem={selectedItem}
      />
    </GeneralLayout>
  );
}
