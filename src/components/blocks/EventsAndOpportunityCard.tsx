"use client";

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatDeadline } from "@/helpers/helpers";
import Link from "next/link";

type EventCardProps = {
	title: string;
	deadline: string;
	description: string;
	borderColor?: string; // customize the left border if needed
	className?: string;
	link?: string
};

export function EventAndOpportunityCard({
	title,
	deadline,
	description,
	borderColor = "#F79009",
	className,
	link
}: EventCardProps) {
	return (
		<div
			className={cn(
				"mb-2.5 last:mb-0 space-y-2 rounded-xl border-l-2 px-3.5 py-4",
				className,
			)}
			style={{ borderLeftColor: borderColor }}
		>
			<Link href={link ?? ''} className="font-medium text-sm font-raleway text-primary-green">
				{title}
			</Link>

			<div className="flex items-center text-[#242424] text-xs mt-1">
				<Calendar className="w-3 h-3 mr-1" />
				Deadline: 	{formatDeadline(deadline)}
			</div>

			 <div
                className="text-xs text-[#242424] mt-1 line-clamp-3 overflow-hidden text-ellipsis"
                dangerouslySetInnerHTML={{ __html: description }}
              />
		</div>
	);
}
