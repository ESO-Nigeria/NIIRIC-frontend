import { DownloadIcon, File } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ReportCardProps {
	imageSrc: string | StaticImageData;
	imageAlt?: string;
	title: string;
	category: string;
	byline: string;
	sector: string;
	description: string;
	// thumbnailUrl: string | StaticImageData;
}

const ReportCard: React.FC<ReportCardProps> = ({
	title,
	category,
	byline,
	sector,
	description,
	imageSrc,
	imageAlt,
	// thumbnailUrl,
}) => {
	return (
		<div className="flex mb-6 border p-4 rounded-lg ">
			<div className="w-31 h-44 rounded-md overflow-hidden flex-shrink-0">
				<Image
					src={imageSrc}
					alt={imageAlt}
					width={123}
					height={162}
					className="object-cover w-full h-full object-center"
				/>
			</div>
			<div className="w-3/4 pl-6">
				<h3 className="text-xl font-bold text-gray-800">{title}</h3>
				<div className="flex space-x-4 mt-2 items-center">
					<span className="px-3 py-1 text-sm text-primary-green bg-primary-brown/20 rounded-full">
						{category}
					</span>
					<span className="text-sm text-gray-600">
						<span className="text-primary-green">By: </span>
						{byline}
					</span>
					<span className="text-sm text-primary-green">Sector: {sector}</span>
				</div>
				<p className="text-gray-700 mt-4">
					{description}
					<Link
						href="/"
						className="text-primary-green font-medium hover:underline"
					>
						{" "}
						Read more
					</Link>
				</p>
				<div className="mt-4 flex space-x-4">
					<Button variant={"ghost"} className="">
						<File className="h-5 w-5" strokeWidth={3} />
						<span className="!text-primary-green">View Paper</span>
					</Button>

					<Button variant="ghost" className="">
						<DownloadIcon className="h-5 w-5" strokeWidth={3} />
						<span className="!text-primary-green">Download PDF</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ReportCard;
