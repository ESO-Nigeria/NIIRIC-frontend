"use client";

import { Download, FileText, MessageSquare, ThumbsUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { PiShareFat } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PublicationCardProps {
	id?: string;
	image?: string | StaticImageData;
	title?: string;
	abstract?: string;
	tags?: { label: string; colorClass: string; textClass: string }[];
	onViewPaper?: () => void;
	onDownload?: () => void;
	onLike?: () => void;
	onComment?: () => void;
	onShare?: () => void;
	containerClass?: string;
	showActionButtons?: boolean;
	showLikeShareButtons?: boolean;
	thumbnail?: string;
	publicationLink?: string;
}

export function PublicationCard({
	id,
	image,
	title,
	abstract,
	tags = [],
	onViewPaper,
	onDownload,
	onLike,
	onComment,
	onShare,
	showActionButtons = true,
	showLikeShareButtons = true,
	publicationLink,
	thumbnail,
	containerClass,
}: PublicationCardProps) {
	return (
		<div className={containerClass}>
			<div className="flex gap-4">
				{/* Thumbnail */}
				<div className="relative">
					<div className="w-16 h-20 bg-gray-100 relative rounded flex-shrink-0">
						{/* <iframe
                  title="pdf-preview"
                  src={image as string}
                  className="w-full h-full  border rounded"
                /> */}
					</div>
				</div>

				{/* Content */}
				<div className="flex-1">
					{/* Title */}
					<Link href={`/dashboard/publications/${id}`} className="font-normal capitalize text-base text-[#242424]">
						{title}
					</Link>

					{/* Tags */}
					{tags.length > 0 && (
						<div className="flex gap-2 mt-2">
							{tags.map((tag, idx) => (
								<Badge
									key={idx}
									className={`${tag.colorClass} ${tag.textClass} text-base font-poppins font-normal rounded-full`}
								>
									{tag.label}
								</Badge>
							))}
						</div>
					)}

					{/* Abstract */}
					<p className="text-sm font-normal text-gray-600 mt-2 leading-6">
						<span className="text-primary-green inline">Abstract:</span>{" "}
						<span
							className="line-clamp-3"
							dangerouslySetInnerHTML={{
								__html: abstract ?? "",
							}}
						></span>
						<Link href={`/dashboard/publications/${id}`} className="text-primary-green cursor-pointer">Read more</Link>
					</p>

					{/* Action buttons */}
					{showActionButtons && (
						<div className="flex gap-3 mt-2.5">
							<Button
								variant="outline"
								className="rounded-lg font-normal shadow-none text-base text-[#475467]"
								onClick={onViewPaper}
							>
								<FileText className="w-4 h-4" /> View Paper
							</Button>
							<Button
								variant="outline"
								className="rounded-lg font-normal shadow-none text-base text-[#475467]"
								onClick={onDownload}
							>
								<Download className="w-4 h-4" /> Download PDF
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Bottom actions */}
			{showLikeShareButtons && (
				<div className="flex items-center gap-6 mt-4 text-gray-500 text-sm">
				{onLike &&	<Button
						variant={"ghost"}
						className="flex items-center gap-1 cursor-pointer"
						onClick={onLike}
					>
						<ThumbsUp className="w-4 h-4" /> Like
					</Button>}
				{onComment &&	<Button
						variant={"ghost"}
						className="flex items-center gap-1 cursor-pointer"
						onClick={onComment}
					>
						<MessageSquare className="w-4 h-4" /> Comments
					</Button>}
					{onShare && <Button
						variant={"ghost"}
						className="flex items-center gap-1 cursor-pointer"
						onClick={onShare}
					>
						<PiShareFat className="w-4 h-4" /> Share
					</Button>}
				</div>
			)}
		</div>
	);
}
