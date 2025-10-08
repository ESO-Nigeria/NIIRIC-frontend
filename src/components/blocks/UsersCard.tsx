"use client";

import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
	name: string;
	role: string;
	avatarColor?: string; // fallback background color if no avatar image
	avatarUrl?: string;
	onActionClick?: () => void;
	className?: string;
}

export function TeamMemberCard({
	name,
	role,
	avatarColor = "bg-pink-100",
	avatarUrl,
	onActionClick,
	className,
}: TeamMemberCardProps) {
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
						className={cn("w-11 h-11 rounded-full flex-shrink-0", avatarColor)}
					/>
				)}

				<div>
					<div className="font-normal text-base text-[#3F434A]">{name}</div>
					<div className="text-sm text-[#667085]">{role}</div>
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
