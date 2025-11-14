"use client";

import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";

export function EventsCarousel() {
	const [selectedEvent, setSelectedEvent] = useState<null | {
		id: number;
		title: string;
		date: string;
		image: string;
	}>(null);

	const events = Array.from({ length: 4 }).map((_, index) => ({
		id: index + 1,
		title: "Annual Convening",
		date: "March 2024",
		image: "/assets/images/events_hero.jpg",
	}));

	return (
		<>
			<Carousel plugins={[Autoplay()]} className="w-full relative  ">
				<CarouselContent className="-ml-1">
					{events.map((event) => (
						<CarouselItem
							key={event.id}
							className="pl-1 md:basis-1/2 lg:basis-1/4"
						>
							<div className="p-1">
								<Card
									className="relative overflow-hidden group cursor-pointer"
									onClick={() => setSelectedEvent(event)}
								>
									{/* Thumbnail */}
									<img
										src={event.image}
										alt={event.title}
										className="absolute inset-0 w-full h-full object-cover"
									/>

									<CardContent className="flex aspect-square items-center justify-center p-6 relative z-10">
										<span className="text-2xl font-semibold text-white drop-shadow-md">
											{event.id}
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
										<h3 className="text-xl font-bold">{event.title}</h3>
										<p className="text-xl">{event.date}</p>
									</div>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselDots />
			</Carousel>

			{/* Modal */}
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
		</>
	);
}
