"use client"; // Add this only if used in a Client Component

import Image from "next/image";
import Link from "next/link";
import type React from "react";

interface CaseCardProps {
	imageUrl: string;
	title: string;
	author: string;
	abstract: string;
	link: string;
}

const CaseCard: React.FC<CaseCardProps> = ({
	imageUrl = "/images/sample-thumb.jpg",
	title = "Driving Impact Investing, Research, and Innovation in Nigeria",
	author = "Stephen Ajose",
	abstract = "We performed a survey of grassland communities in the Ukrainian Carpathians with the aim of: (1) syntaxonomically...",
	link = "/blog/impact",
}) => {
	return (
		<div className="flex bg-we rounded-2xl  p-4 max-w-2xl">
			{/* Thumbnail Image */}
			<div className="w-20 h-28 relative mr-4 shrink-0">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover rounded-xl"
				/>
			</div>

			{/* Text Content */}
			<div className="flex flex-col justify-between">
				<Link href={link} className="text-primary-green font-semibold text-base mb-1 line-clamp-2">
					{title}
				</Link>

				<div className="flex items-center text-sm text-gray-700 mb-2">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.3334 14V12.6667C13.3334 11.9594 13.0524 11.2811 12.5523 10.781C12.0522 10.281 11.3739 10 10.6667 10H5.33335C4.62611 10 3.94783 10.281 3.44774 10.781C2.94764 11.2811 2.66669 11.9594 2.66669 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47278 7.33333 8.00002 7.33333C6.52726 7.33333 5.33335 6.13943 5.33335 4.66667C5.33335 3.19391 6.52726 2 8.00002 2C9.47278 2 10.6667 3.19391 10.6667 4.66667Z"
							stroke="#003302"
							strokeWidth="1.67"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="ml-1">{author}</span>
					{/* {author} */}
				</div>

				<p className="text-sm text-gray-700 line-clamp-2">
					<span className="font-medium text-gray-800">Abstract: </span>

					<span dangerouslySetInnerHTML={{__html: abstract}} className="line-clamp-2"></span>
				</p>
				<a href={link} className="text-primary-green text-sm font-medium ">
					Read More
				</a>
			</div>
		</div>
	);
};

export default CaseCard;
