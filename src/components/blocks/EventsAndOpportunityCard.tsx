"use client";

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type EventCardProps = {
	title: string;
	deadline: string;
	description: string;
	borderColor?: string; // customize the left border if needed
	className?: string;
};

export function EventAndOpportunityCard({
	title,
	deadline,
	description,
	borderColor = "#F79009",
	className,
}: EventCardProps) {
	return (
		<div
			className={cn(
				"mb-2.5 last:mb-0 space-y-2 rounded-xl border-l-2 px-3.5 py-4",
				className,
			)}
			style={{ borderLeftColor: borderColor }}
		>
			<p className="font-medium text-sm font-raleway text-primary-green">
				{title}
			</p>

			<div className="flex items-center text-[#242424] text-xs mt-1">
				<Calendar className="w-3 h-3 mr-1" />
				Deadline: {deadline}
			</div>

			<p className="text-xs text-[#242424] mt-1">{description}</p>
		</div>
	);
}
