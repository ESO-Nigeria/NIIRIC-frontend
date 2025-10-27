"use client";

import React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { setEventId } from "@/store/features/general/general.slice";

// Define the event item type
interface EventItemType {
  id: string;
  title: string;
  description: string;
  category?: string;
  event_image?: string;
  start_date?: string;
  event_thumbnail?: string;
}


// Define props for the EventCard component
interface EventCardProps {
  item: EventItemType;
  onPlusClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    item: EventItemType
  ) => void;
}

// EventCard component
const EventCard: React.FC<EventCardProps> = ({ item, onPlusClick }) => {
  const dispatch = useDispatch()

  // const addEventToStore = (id: string) => {
  //   dispatch(setEventId(id));
  // }
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl text-card-foreground transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 bg-card border border-border h-full">
      {/* Image container */}
      <div className="relative flex transition-opacity duration-500 opacity-100 min-h-[337px] items-end overflow-hidden">
       {item?.event_thumbnail ? <img
          alt={item.title}
          loading="lazy"
          width="900"
          height="600"
          decoding="async"
          className="h-full bg-amber-300 max-h-[337px] w-full origin-center object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
          src={item.event_thumbnail}
        />  :
          <div className="w-[900px] h-[600px] bg-amber-300 max-h-[337px] w-full origin-center object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"></div>
        
        }

        {/* Overlay card content */}
        <div className="absolute inset-x-0 z-30 bottom-3 w-10/12 mx-auto rounded-lg bg-white bg-gradient-to-t from-primary/20 to-transparent pointer-events-none">
          <div className="flex flex-col gap-2 p-6 relative">
            {/* Date */}
            {item.start_date && (
              <div className="flex items-center text-gray-600 text-sm">
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
                {item.start_date}
              </div>
            )}

            {/* Title */}
            <Link href={`/events/${item.id}`} className="text-lg pointer-events-auto font-semibold text-primary-green tracking-tight">
              {item.title}
            </Link>

            {/* Description */}
            <p className="text-sm text-gray-700 line-clamp-4">{item.description}</p>
          </div>

          {/* Plus (arrow-up-right) button */}
          <button
            className="absolute cursor-pointer pointer-events-auto -top-2 -right-2 z-40 block rounded-full bg-primary-green p-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-primary/30"
            onClick={(e) => onPlusClick(e, item)}
            aria-label="Open details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right h-4 w-4 transition-all duration-500 text-primary-foreground"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Export default EventCard
export default EventCard;

// EventDetailDialog component
interface EventDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: EventItemType | null;
}

export const EventDetailDialog: React.FC<EventDetailDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedItem,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTitle></DialogTitle>
    <DialogContent className="sm:max-w-[800px] bg-card border border-border p-0 overflow-hidden rounded-xl shadow-2xl">
      {selectedItem && (
        <div className="flex flex-col md:flex-row">
          {/* Left Side Image */}
          <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden">
            <img
              src={selectedItem.event_thumbnail}
              alt={selectedItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent"></div>
          </div>

          {/* Right Side Content */}
          <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm text-primary font-medium tracking-wider uppercase mb-2">
                {selectedItem.category}
              </p>
              <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
              <p className="text-sm text-gray-700">
                {selectedItem.description?.split(" ").slice(0, 200).join(" ")}
                {selectedItem.description && selectedItem.description.split(" ").length > 200 && "..."}
              </p>

              {selectedItem.start_date && (
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold">Date:</span> {selectedItem.start_date}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <Link
                href={`/events/${selectedItem?.id}`}
                className="px-4 py-2 bg-primary-green text-primary-foreground rounded-lg shadow-md hover:shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);
