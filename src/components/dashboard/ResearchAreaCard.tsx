"use client";

import { BookUp, Heart, PenLine } from "lucide-react";
import { PencilWithLine } from "@/assets/icons/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ResearchArea } from "../types/profile";
import Link from "next/link";
import clsx from "clsx";

type ResearchAreaCardProps = {
	data: ResearchArea;
	onEdit?: () => void;
	loading?: boolean;
};
export function ResearchAreaCard({
	data,
	onEdit,
	loading = false,
}: ResearchAreaCardProps) {
	return (
		<div className="space-y-3">
			{/* Header */}
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#FEE4E2] text-[#D92D20]  ">
					<BookUp className="h-4 w-4" />
				</div>
				<h2 className="text-lg font-medium">Research Area</h2>
			</div>

			{/* Card */}
			<Card className="p-4 border rounded-md shadow-none">
				<div className="flex flex-wrap ">
					{loading ? (
						<p className="text-sm text-gray-400">Loading Reasearch Area...</p>
					) : (
						<p className="text-sm text-[#475467]">{data?.description}</p>
					)}
				</div>

				{/* Divider */}
				<div className="border-t my-2" />

				{/* Edit button */}
				<div className="flex justify-end">
					<Button
						variant="link"
						size="sm"
						onClick={onEdit}
						className="text-primary-green underline  flex items-center gap-1 font-normal"
					>
						<PencilWithLine className="h-4 w-4" />
						Edit Research Area
					</Button>
				</div>

				<div className="flex justify-end mt-4">
					<Link
								href={`/dashboard/profile-journey/research-area/?edit=true`}
								onClick={onEdit}
								className={clsx(
									buttonVariants({ variant: "link", size: "sm" }),
									"ml-auto text-primary-green font-normal underline text-base ",
								)}
							>
								<PencilWithLine className="h-5 w-5 mr-1" /> Edit Research Area
							</Link>
						
					</div>
			</Card>
		</div>
	);
}
