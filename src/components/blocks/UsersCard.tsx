"use client";

import { IdCardIcon, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TeamMemberCardProps {
	id: string,
	name: string;
	role: string;
	avatarColor?: string;
	avatarUrl?: string;
	onActionClick?: () => void;
	className?: string;
}

export function TeamMemberCard({
	id,
	name,
	role,
	avatarColor = "bg-pink-100",
	avatarUrl,
	onActionClick,
	className,
}: TeamMemberCardProps) {

	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();


	return (
		<div
			className={cn("flex items-center justify-between w-full py-2", className)}
		>
			
			{/* Left: Avatar + Info */}
			<div className="flex items-center gap-3">
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt={name}
						className="w-11 h-11 rounded-full object-cover flex-shrink-0"
					/>
				) : (
					<div
						className={cn(
							"w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium text-gray-700",
							avatarColor
						)}
					>
						{initials}
					</div>
				)}

				<div>
					<Link href={`/user-profile/${id}`} className="font-normal text-base text-[#3F434A]">{name}</Link>
					<div className="text-sm text-[#667085] capitalize">{role}</div>
				</div>
			</div>

			{/* Right: Action Button */}
			<button
				onClick={onActionClick}
				className="text-gray-400 hover:text-gray-600 transition"
			>
				<MoreVertical className="w-5 h-5" />
			</button>
		</div>
	);
}
