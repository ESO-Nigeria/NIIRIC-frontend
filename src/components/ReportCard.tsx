import { DownloadIcon, File } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ReportCardProps {
	imageSrc: string | StaticImageData;
	imageAlt?: string;
	title: string;
	byline: string;
	sector: string;
	description: string;
	id: string
	category?: { label: string; colorClass: string; textClass: string }[];
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
	id
	// thumbnailUrl,
}) => {
	return (
		<div className="flex mb-6 border p-4 rounded-lg font-raleway">
			<div className="w-31 h-44 rounded-md overflow-hidden flex-shrink-0">
				<Image
					src={imageSrc}
					alt={imageAlt || "Report Image"}
					width={123}
					height={162}
					className="object-cover w-full h-full object-center"
				/>
			</div>
			<div className="w-3/4 pl-6">
				<Link href={`/resources/publications/${id}`} className="text-xl font-bold text-gray-800">{title}</Link>
				{category && category?.length > 0 && (
						<div className="flex gap-2 mt-2">
							{category?.map((tag, idx) => (
								<Badge
									key={idx}
									className={`${tag.colorClass} ${tag.textClass} text-sm font-poppins font-normal rounded-full`}
								>
									{tag.label}
								</Badge>
							))}
						</div>
					)}
				<div className="flex mt-2 space-x-4  items-center">
					<span className="text-sm text-gray-600">
						<span className="text-primary-green">By: </span>
						{byline}
					</span>
				{ <span className="text-sm text-primary-green">Sector: {sector}</span>}
				</div>
				<p className=" mt-2 line-clamp-3 text-sm text-gray-700 "
							dangerouslySetInnerHTML={{
								__html: description ?? "",
							}} />
				<Link
						href={`/resources/publications/${id}`}
						className="text-primary-green text-sm font-medium hover:underline"
					>
						{" "}
						Read more
					</Link>
				<div className=" flex space-x-4">
					<Button asChild variant={"ghost"} className="!px-0 !py-0 hover:bg-transparent">
						<Link href={`/resources/publications/${id}`} > <File className="h-5 w-5" strokeWidth={3} />
						<span className="!text-primary-green">View Paper</span> </Link>
					</Button>

					<Button variant="ghost" className="!px-0 !py-0 hover:bg-transparent">
						<DownloadIcon className="h-5 w-5" strokeWidth={3} />
						<span className="!text-primary-green">Download PDF</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ReportCard;
