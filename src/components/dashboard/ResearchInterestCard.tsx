"use client";

import { Heart, PenLine } from "lucide-react";
import { PencilWithLine } from "@/assets/icons/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatString } from "@/helpers/helpers";
import clsx from "clsx";
import Link from "next/link";

type ResearchInterestCardProps = {
	interests: { interest: string }[];
	onEdit?: () => void;
	loading?: boolean;
};



export function ResearchInterestCard({
	interests,
	onEdit,
	loading = false,
}: ResearchInterestCardProps) {
	return (
		<div className="space-y-3">
			{/* Header */}
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#D1E9FF] text-[#0086C9] ">
					<Heart className="h-4 w-4" />
				</div>
				<h2 className="text-lg font-medium">Research Interest</h2>
			</div>

			{/* Card */}
			<Card className="p-4 border rounded-md shadow-none">
				<div className="flex flex-wrap gap-2 ">
					{loading ? (
						<p className="text-sm text-gray-400">Loading interests...</p>
					) : interests.length > 0 ? (
						interests.map((item, idx) => (
							<span
								key={idx}
								className={cn(
									"px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700",
								)}
							>
								{formatString(item.interest)}
							</span>
						))
					) : (
						<p className="text-sm text-gray-400">No interests added yet</p>
					)}
				</div>

				{/* Divider */}
				<div className="border-t my-2" />

				{/* Edit button */}
				<div className="flex justify-end mt-4">
					<Link
								href={`/dashboard/profile-journey/research-interests/?edit=true`}
								onClick={onEdit}
								className={clsx(
									buttonVariants({ variant: "link", size: "sm" }),
									"ml-auto text-primary-green font-normal underline text-base ",
								)}
							>
								<PencilWithLine className="h-5 w-5 mr-1" /> Edit Interest
							</Link>
						
					</div>
			</Card>
		</div>
	);
}
