"use client";

import { Check, Copy, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { PublicationCard } from "../blocks/PublicationCard";
import { Separator } from "../ui/separator";

interface PublicationUploadModalProps {
	isOpen: boolean;
	onClose: () => void;
	publication: {
		title: string;
		abstract: string;
		tags: string[];
		thumbnail?: string;
		publicationLink: string;
	};
	onViewPaper?: () => void;
}

const PublicationUploadModal: React.FC<PublicationUploadModalProps> = ({
	isOpen,
	onClose,
	publication,
	onViewPaper,
}) => {
	const [copied, setCopied] = React.useState(false);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(publication.publicationLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleShare = (platform: string) => {
		const url = publication.publicationLink;
		const text = publication.title;

		switch (platform) {
			case "linkedin":
				window.open(
					`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
					"_blank",
				);
				break;
			case "twitter":
				window.open(
					`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
					"_blank",
				);
				break;
			case "whatsapp":
				window.open(
					`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
					"_blank",
				);
				break;
			case "email":
				window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
				break;
			case "sms":
				window.location.href = `sms:?body=${encodeURIComponent(text + " " + url)}`;
				break;
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto p-0 gap-0">
				{/* Header with Close Button */}
				{/* <DialogHeader className="absolute right-6 top-6 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-sm hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader> */}

				<div className="p-8 pb-6">
					{/* Success Banner */}
					<div className=" mt-4 bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0">
								<div className="w-10 h-10 text-primary-green rounded-full flex items-center justify-center">
									<Check className="h-6 w-6 " />
								</div>
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-900 mb-1">
									Publication uploaded Successfully!
								</h3>
								<p className="text-gray-600 text-sm">
									Your publication have been successfully uploaded.
								</p>
							</div>
						</div>
					</div>

					{/* Share Publication Section */}
					<h2 className="text-base font-semibold text-gray-900 ">
						Share Publication
					</h2>

					<Separator className="my-5" />
					{/* Publication Card */}
					<div className="w-full mb-6">
						<PublicationCard
							title={publication.title}
							abstract={publication.abstract}
							tags={[
								{ label: "Research", colorClass: "bg-blue-100", textClass: "text-blue-800" },
								{ label: "Case Study", colorClass: "bg-green-100", textClass: "text-green-800" },
							]}
							thumbnail={publication.thumbnail}
							publicationLink="https://www.niiric.org/impact-investing-on-research..."
							// publication={{
							// 	title: publication.title,
							// 	abstract: publication.abstract,
							// 	tags: ["Research", "Case Study"],
							// 	thumbnail: "/path/to/image.png",
							// 	publicationLink:
							// 		"https://www.niiric.org/impact-investing-on-research...",
							// }}
							showActionButtons={false}
							showLikeShareButtons={false}
						/>
					</div>

					{/* Social Share Icons */}
					<div className="flex gap-4 mb-8">
						<button
							onClick={() => handleShare("linkedin")}
							className="w-12 h-12  rounded-full bg-[#F6F8FA] cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors"
							aria-label="Share on LinkedIn"
						>
							<svg
								className="w-6 h-6 text-[#0A66C2]"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</button>

						<button
							onClick={() => handleShare("twitter")}
							className="w-12 h-12  rounded-full bg-[#F6F8FA] flex cursor-pointer items-center justify-center hover:bg-gray-50 transition-colors"
							aria-label="Share on Twitter/X"
						>
							<svg
								className="w-5 h-5 text-gray-900"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</button>

						<button
							onClick={() => handleShare("whatsapp")}
							className="w-12 h-12  rounded-full bg-[#F6F8FA] flex cursor-pointer items-center justify-center hover:bg-gray-50 transition-colors"
							aria-label="Share on WhatsApp"
						>
							<svg
								className="w-6 h-6 text-[#25D366]"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
							</svg>
						</button>

						<button
							onClick={() => handleShare("email")}
							className="w-12 h-12  rounded-full bg-[#F6F8FA] flex cursor-pointer items-center justify-center hover:bg-gray-50 transition-colors"
							aria-label="Share via Email"
						>
							<svg
								className="w-6 h-6 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</button>

						<button
							onClick={() => handleShare("sms")}
							className="w-12 h-12 rounded-full bg-[#F6F8FA] cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors"
							aria-label="Share via SMS"
						>
							<svg
								className="w-6 h-6 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
						</button>
					</div>

					{/* Copy Link Section */}
					<div className="mb-6">
						<h3 className="text-sm font-semibold text-gray-900 mb-3">
							Copy Publication Link
						</h3>
						<div
							className="flex gap-3 items-center  bg-gray-50 border 
            border-gray-200 rounded-lg px-4 py-1 text-gray-700 text-[13px]
            font-mono  "
						>
							<div className="flex-1 font-medium max-w-full">
								<p
									className="truncate whitespace-normal break-all cursor-pointer"
									title={publication.publicationLink}
								>
									{" "}
									{publication.publicationLink}
								</p>
							</div>
							<Button
								onClick={handleCopyLink}
								variant="outline"
								size="icon"
								className="flex-shrink-0 0 !bg-transparent border-0 shadow-none hover:!bg-gray-100 hover:border-0"
							>
								{copied ? (
									<Check className="h-5 w-5 text-green-600" />
								) : (
									<Copy className="h-5 w-5 text-gray-600" />
								)}
							</Button>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-4">
						<Button
							onClick={onClose}
							variant="outline"
							className="flex-1 h-12 text-base font-medium border-gray-300 hover:bg-gray-50"
						>
							Skip for Later
						</Button>
						<Button
							onClick={onViewPaper}
							className="flex-1 h-12 text-base font-medium bg-primary-green hover:bg-primary-green/90 text-white"
						>
							View Paper
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PublicationUploadModal;
