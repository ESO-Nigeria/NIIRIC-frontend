import Image, { type StaticImageData } from "next/image";
import type React from "react";

interface CommunityShowcaseProps {
	image?: StaticImageData | string;
	imageAlt?: string;
	imagePosition?: "left" | "right";
	title?: string;
	description?: string | string[];
}

const CommunityShowcase: React.FC<CommunityShowcaseProps> = ({
	image,
	imageAlt = "Facilitator Group",
	imagePosition = "right",
	title = "Join The Community",
	description = "Joining NIIRIC connects you to a dynamic network of stakeholders in Nigeria’s impact investing, research, and innovation ecosystem. Gain access to cutting-edge studies, reports, and trends, while showcasing your research or innovations on a platform that amplifies your impact.",
}) => {
	const imageSection = (
		<div className="w-full h-[407px] relative rounded-xl overflow-hidden shadow-lg">
			<Image
				src={image ?? ''}
				alt={imageAlt}
				fill
				className="object-cover object-right-bottom"
				style={{ objectFit: "cover" }}
			/>
		</div>
	);

	const textSection = (
		<div className="max-w-2xl space-y-4 mx-auto lg:mx-0 lg:pr-10 lg:pl-0 lg:text-left">
			<h2 className="text-2xl font-bold text-primary-green leading-12 sm:text-[32px]">
				<span className="block">{title}</span>
			</h2>
			{Array.isArray(description) ? (
				description.map((desc, idx) => (
					<p key={idx} className="text-base text-main-text-color leading-7">
						{desc}
					</p>
				))
			) : (
				<p className="text-base text-main-text-color leading-7">
					{description}
				</p>
			)}
		</div>
	);

	return (
		<div className="container mx-auto overflow-hidden relative lg:flex gap-8 sm:gap-16  lg:items-center">
			{imagePosition === "left" ? (
				<>
					<div className="w-full lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0">
						{imageSection}
					</div>
					<div className="w-full lg:w-1/2">{textSection}</div>
				</>
			) : (
				<>
					<div className="w-full lg:w-1/2">{textSection}</div>
					<div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
						{imageSection}
					</div>
				</>
			)}
		</div>
	);
};

export default CommunityShowcase;
