import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JoinCommunityProps {
	image: StaticImageData | string;
	imageAlt?: string;
	imagePosition?: "left" | "right";
	badgeText?: string;
	title?: string;
	description?: string;
	primaryButtonText?: string | boolean;
	secondaryButtonText?: string | boolean;
	onPrimaryClick?: () => void;
	onSecondaryClick?: () => void;
	containerClassName?: string;
	imageAreaClassName?: string;
	imageClassName?: string;
	textAreaClassName?: string;
}

const JoinCommunity: React.FC<JoinCommunityProps> = ({
	image,
	imageAlt = "Facilitator Group",
	imagePosition = "right",
	badgeText = "become a member",
	title = "Join The Community",
	description = "Joining NIIRIC connects you to a dynamic network of stakeholders in Nigeria’s impact investing, research, and innovation ecosystem. Gain access to cutting-edge studies, reports, and trends, while showcasing your research or innovations on a platform that amplifies your impact.",
	primaryButtonText = "Create an account",
	secondaryButtonText = "Learn More",
	onPrimaryClick,
	onSecondaryClick,
	containerClassName = "",
	imageAreaClassName = "",
	imageClassName = "",
	textAreaClassName = "",
}) => {
	const imageSection = (
		<div
			className={`w-full h-[407px] relative rounded-xl overflow-hidden shadow-lg ${imageAreaClassName}`}
		>
			<Image
				src={image}
				alt={imageAlt}
				fill
				className={
					"object-cover object-right-bottom *:imageClassName" + imageClassName
				}
				style={{ objectFit: "cover" }}
			/>
		</div>
	);

	const textSection = (
		<div
			className={
				"max-w-2xl space-y-4 mx-auto lg:mx-0 lg:pr-10 lg:pl-0 lg:text-left" +
				textAreaClassName
			}
		>
			<Badge variant="primary-brown-25" className="uppercase rounded-8 ">
				{badgeText}
			</Badge>
			<h2 className="text-3xl font-bold text-primary-green leading-12 sm:text-4xl">
				<span className="block">{title}</span>
			</h2>
			<p className="text-base text-main-text-color leading-7">{description}</p>
			<div className="sm:flex sm:items-center space-x-4 sm:space-x-8">
				{primaryButtonText && (
					<Button
						variant="primary-green"
						className="text-base mt-4 h-12 sm:mt-0 cursor-pointer"
						onClick={onPrimaryClick}
					>
						{primaryButtonText} <ArrowRight className="size-5" />
					</Button>
				)}
				{secondaryButtonText && (
					<Button
						variant="primary-brown"
						className="text-base mt-4 h-12 sm:mt-0 cursor-pointer"
						onClick={onSecondaryClick}
					>
						{secondaryButtonText} <ArrowRight className="size-5" />
					</Button>
				)}
			</div>
		</div>
	);

	return (
		<div
			className={
				"container mx-auto overflow-hidden relative lg:flex lg:items-center " +
				containerClassName
			}
		>
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

export default JoinCommunity;
