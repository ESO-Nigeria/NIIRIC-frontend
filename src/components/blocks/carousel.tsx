"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import EventCard, { EventDetailDialog } from "@/components/blocks/EventCard";

interface NavigationButtonsProps {
	currentIndex: number;
	maxIndex: number;
	handlePrev: () => void;
	handleNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
	currentIndex,
	maxIndex,
	handlePrev,
	handleNext,
}) => (
	<div className="mt-6 pl-2 flex justify-start gap-4">
		<button
			className="inline-flex items-center justify-center rounded-full size-8 font-bold text-primary-green whitespace-nowrap text-sm transition-all duration-300 hover:bg-primary-green/35  hover:scale-105 active:scale-95"
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
			<span className="sr-only">Previous slide</span>
		</button>

		<button
			className="inline-flex items-center justify-center rounded-full size-8 hover:bg-primary-green/35 text-primary-green font-bold whitespace-nowrap text-sm transition-all duration-300  hover:scale-105 active:scale-95"
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
			<span className="sr-only">Next slide</span>
		</button>
	</div>
);

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [maxIndex, setMaxIndex] = useState<number>(0);
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [itemWidth, setItemWidth] = useState<number>(100);
	const sliderRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<HTMLDivElement>(null);

	const items = [
		{
			id: 1,
			category: "Outdoor Adventures",
			title: "Conquer the Wild",
			description:
				"Explore breathtaking landscapes and challenge yourself with thrilling outdoor adventures. Whether it's hiking, kayaking, or rock climbing, adventure awaits.",
			imageSrc: "/assets/images/DSC_9158.png",
			date: "July 2025",
		},
		{
			id: 2,
			category: "Culinary Delights",
			title: "Savor Every Bite",
			description:
				"Indulge in mouthwatering dishes from around the world. From gourmet meals to street food favorites, experience flavors that excite your taste buds.",
			imageSrc: "/assets/images/DSC_9158-2.png",
			date: "August 2025",
		},
		{
			id: 3,
			category: "Tech Gadgets",
			title: "Innovate Your Life",
			description:
				"Discover cutting-edge technology designed to make your life easier. From smart devices to futuristic tools, stay ahead with the latest innovations.",
			imageSrc: "/assets/images/DSC_9158-3.png",
			date: "September 2025",
		},
		{
			id: 4,
			category: "Wellness & Mindfulness",
			title: "Find Your Zen",
			description:
				"Prioritize your mental and physical well-being with practices that promote relaxation, balance, and self-care. A healthier life starts with mindfulness.",
			imageSrc: "/assets/images/DSC_9158-1.png",
			date: "October 2025",
		},
		{
			id: 5,
			category: "Mystery & Exploration",
			title: "Uncover Hidden Secrets",
			description:
				"Step into the unknown and explore the world's greatest mysteries. From ancient ruins to urban legends, embark on a journey of discovery.",
			imageSrc: "/assets/images/DSC_9158-2.png",
			date: "November 2025",
		},
	];

	useEffect(() => {
		const calculateVisibleSlides = () => {
			if (!sliderRef.current) return;
			let slides = 1;
			if (window.innerWidth >= 1280) {
				slides = 3.8;
			} else if (window.innerWidth >= 1024) {
				slides = 1.8;
			} else if (window.innerWidth >= 640) {
				slides = 1.2;
			} else {
				slides = 1.2;
			}
			const width = 100 / slides;
			setItemWidth(width);
			setMaxIndex(items.length - Math.floor(slides) + (slides % 1 > 0 ? 0 : 1));
		};
		calculateVisibleSlides();
		window.addEventListener("resize", calculateVisibleSlides);
		return () => {
			window.removeEventListener("resize", calculateVisibleSlides);
		};
	}, []);

	const handleNext = () => {
		if (currentIndex < maxIndex) {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	const handlePlusClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		item: any,
	) => {
		e.stopPropagation();
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	const getTransformValue = (): string => {
		return `translate3d(-${currentIndex * itemWidth}%, 0px, 0px)`;
	};

	return (
		<section className="space-y-6">
			{/* Header Section */}
			<div className="flex justify-between items-end ml-0 text-start pl-2">
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

			{/* Carousel Section */}
			<div className="mx-auto flex max-w-container flex-col items-start">
				<div
					className="relative w-full overflow-hidden"
					role="region"
					aria-roledescription="carousel"
					ref={sliderRef}
				>
					<div className="relative">
						<div
							ref={itemsRef}
							className="flex transition-all duration-700 ease-out"
							style={{ transform: getTransformValue() }}
						>
							{items.map((item, index) => (
								<div
									key={index}
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
				</div>
			</div>

			{/* Dialog Section */}
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
