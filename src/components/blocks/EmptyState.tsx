"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
	title?: string;
	description?: string;
	icon?: string; // optional custom icon (svg/png path)
	className?: string;
}

export function EmptyState({
	title = "No Results Found",
	description = "We couldn’t find any reports matching your filters. Try adjusting your keywords, selections or to start fresh.",
	icon = "/assets/icons/empty.svg", // replace with your magnifying glass illustration
	className,
}: EmptyStateProps) {
	return (
		<Card
			className={cn(
				"w-full flex items-center justify-center border shadow-none",
				className,
			)}
		>
			<CardContent className="flex flex-col items-center justify-center text-center py-12">
				<Image
					src={icon}
					alt="Empty state illustration"
					width={100}
					height={100}
					className="mb-4 opacity-80"
				/>
				<h2 className="text-base font-medium text-gray-900">{title}</h2>
				<p className="text-sm text-gray-500 max-w-md mt-2">{description}</p>
			</CardContent>
		</Card>
	);
}
