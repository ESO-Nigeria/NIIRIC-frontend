"use client";

import {
	Calendar,
	Download,
	FileText,
	MessageSquare,
	MoreHorizontal,
	MoreVertical,
	Share,
	Share2,
	ThumbsUp,
	Upload,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiShareFat } from "react-icons/pi";
import { useSelector } from "react-redux";
import DocPlaceholder from "@/assets/doc_placeholder.png";
import { EventAndOpportunityCard } from "@/components/blocks/EventsAndOpportunityCard";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import { TeamMemberCard } from "@/components/blocks/UsersCard";
import PublicationsLayout from "@/components/layouts/Publications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { useGetAllPublishersProfileQuery } from "@/store/features/auth/actions";
import {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
} from "@/store/features/publications/actions";
import { Profile, Publication } from "@/components/types/profile";

export const team = [
	{
		id: 1,
		name: "Dr. Amarachi Collins",
		role: "Senior Researcher",
		avatarUrl: "",
	},
	{
		id: 2,
		name: "John Okafor",
		role: "Policy Analyst",
		avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
	},
];

export const events = [
	{
		id: 1,
		title: "Catalyst Impact Fund - Small Grants for Early-Stage",
		deadline: "01 June 2025",
		description:
			"The Nigeria Impact Investing Research Industry Collaborative (NIIRC) is Nigeria’s premier network dedicated to advancing",
	},
	{
		id: 2,
		title: "Green Innovation Challenge",
		deadline: "15 July 2025",
		description:
			"Empowering local startups with grants to tackle environmental and sustainability challenges in Nigeria.",
	},
];

export default function Publications() {
	const {
		data: myPubications,
		isLoading,
		isError,
	} = useGetUserPublicationsQuery({}); //useGetMyPublicationsQuery();
	const {
		data: recommendedPublications,
		isLoading: isRecLoading,
		isError: isRecError,
	} = useGetPublicationsQuery({}); //useGetRecommendedPublicationsQuery();
	const publisher = useSelector((state: RootState) => state.auth.profile as Profile | null);

	const router = useRouter();
	const downloadPDF = (url: string) => {
		// Create a temporary anchor element to trigger the download
		const link = document.createElement("a");
		link.href = url;
		link.download = url.split("/").pop() || "document.pdf"; // Use the file name from the URL or a default name
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const user = useSelector((state: RootState) => state.auth.user);
	const { data: publishers } = useGetAllPublishersProfileQuery({});
	console.log("My Publications:", publisher, myPubications);
	console.log("Recommended Publications:", recommendedPublications);
	// const publisher = profile ? profile[0] : null;

	return (
		<PublicationsLayout>
			<div className="flex container mx-auto flex-col md:flex-row gap-6 p-6 bg-[#F8F9F7] min-h-screen text-[#1B1B1B]">
				{/* Left Sidebar */}
				<aside className="w-full md:w-1/4 space-y-6">
					{/* Profile Card */}
					<Card className="shadow-none border-0 rounded-xl">
						<CardHeader className="flex flex-col items-center p-4">
							<Avatar className="w-26 h-26">
								<AvatarImage src={publisher?.image_url} alt="Profile" />
								<AvatarFallback>
									{publisher?.first_name?.[0]}
									{publisher?.last_name?.[0]}
								</AvatarFallback>
							</Avatar>
							<h2 className="mt-4  capitalize font-medium text-base text-[#3F434A]">
								{publisher?.title} {publisher?.first_name}{" "}
								{publisher?.last_name}
							</h2>
							{/* <p className="text-sm text-[#475467]">Emeritus</p> */}
							<div className="flex justify-between w-full mt-4 text-center">
								<div>
									<p className="font-medium text-[#475467] text-base">1</p>
									<p className="text-[9px] text-[#475467]">Publications</p>
								</div>
								<div>
									<p className="font-medium text-[#475467] text-base">0</p>
									<p className="text-[9px] text-[#475467]">Followers</p>
								</div>
								<div>
									<p className="font-medium text-[#475467] text-base">0</p>
									<p className="text-[9px] text-[#475467]">Contributions</p>
								</div>
							</div>
						</CardHeader>
					</Card>
					<Card className="shadow-none border-0 rounded-xl">
						<CardContent className="">
							<h3 className="font-medium text-base text-[#3F434A] mb-3">
								Research Interests
							</h3>
							<div className="flex flex-wrap gap-2">
								<Badge
									className="text-sm font-normal  bg-[#F6EDE1] rounded-full"
									variant="secondary"
								>
									Agriculture
								</Badge>
								<Badge
									className="text-sm font-normal rounded-full"
									variant="secondary"
								>
									Education
								</Badge>
								<Badge
									className="text-sm font-normal  bg-[#F6EDE1] rounded-full"
									variant="secondary"
								>
									Healthcare
								</Badge>
							</div>
						</CardContent>
					</Card>
				</aside>

				{/* Main Content */}
				<main className="w-full md:w-2/4 space-y-6">
					{/* Upload Post */}
					<Card className="shadow-none border rounded-xl p-4 flex flex-row items-center gap-3">
						<Avatar className="w-10 h-10">
							<AvatarImage src={publisher?.image_url} alt="User" />
							<AvatarFallback>
								{publisher?.first_name?.[0]}
								{publisher?.last_name?.[0]}
							</AvatarFallback>
						</Avatar>
						<Input
							placeholder="Share your research insights"
							className="flex-1 h-11"
						/>
						<Button
							variant="primary-green"
							className="rounded-lg font-dm_sans font-medium"
							asChild
						>
							<Link href={"/dashboard/publications/upload"}>Upload Post</Link>
						</Button>
					</Card>

					{/* My Publications */}
					<section>
						<h3 className="font-medium text-lg mb-3 text-primary-green">
							My Publications
						</h3>
						<Card className="shadow-none gap-3 rounded-xl p-6">
							<div className="flex justify-between">
								<div className="flex items-center gap-3">
									<Avatar className="size-12">
										<AvatarImage src={publisher?.image_url} alt="Profile" />
										<AvatarFallback>
											{publisher?.first_name?.[0]}
											{publisher?.last_name?.[0]}
										</AvatarFallback>
									</Avatar>

									<div>
										<h4 className="font-normal capitalize text-base text-[#3F434A]">
											{publisher?.title} {publisher?.first_name}{" "}
											{publisher?.last_name}
										</h4>
										{/* <p className="text-sm text-[#667085]">Senior Researcher</p> */}
									</div>
								</div>
								<MoreHorizontal className="text-gray-500" />
							</div>
							{isLoading ? (
								<p>Loading...</p>
							) : isError ? (
								<p>Error loading publications.</p>
							) : myPubications && myPubications?.results.length === 0 ? (
								<p>No publications found.</p>
							) : myPubications ? (
								myPubications?.results?.map((pub: Publication) => (
									<>
										<PublicationCard
											image={DocPlaceholder}
											title={pub?.title}
											abstract={pub?.abstract}
											tags={[
												{
													label: "Research",
													colorClass: "bg-[#D1AE6F40]",
													textClass: "text-primary-green",
												},
												{
													label: "Case Study",
													colorClass: "bg-violet-100",
													textClass: "text-violet-600",
												},
											]}
											onViewPaper={() =>
												router.push(`/dashboard/publications/${pub.id}`)
											}
											onDownload={() => downloadPDF(pub.document ?? "")}
											onLike={() => console.log("Liked")}
											onComment={() => console.log("Comment")}
											onShare={() => console.log("Shared")}
											{...pub}
										/>
										<Separator className="my-5" />
									</>
								))
							) : null}
						</Card>
					</section>

					{/* Recommended Section */}
					<section>
						<h3 className="font-medium text-lg mb-3 text-primary-green">
							Recommended for you
						</h3>
						
						{isRecLoading ? (
							<p>Loading...</p>
						) : isRecError ? (
							<p>Error loading publications.</p>
						) : recommendedPublications &&
							recommendedPublications?.results.length === 0 ? (
							<p>No publications found.</p>
						) : recommendedPublications ? (
							recommendedPublications?.results?.map((pub: Publication) => (
								//  <PublicationCard
								<Card key={pub?.id} className="shadow-none mb-4 gap-3 rounded-xl p-6">
									<div className="flex justify-between">
										<div className="flex gap-3">
											<Avatar className="size-12">
												<AvatarImage src="/assets/avatar.png" />
												<AvatarFallback>AC</AvatarFallback>
											</Avatar>
											<div>
												<h4 className="font-normal text-base text-[#3F434A]">
													{pub?.author_name}
												</h4>
												<p className="text-sm text-[#667085]">
													Senior Researcher
												</p>
											</div>
										</div>
										<MoreHorizontal className="text-gray-500" />
									</div>
									<PublicationCard
										image={DocPlaceholder}
										title={pub?.title}
										abstract={pub?.abstract}
										tags={[
											{
												label: "Research",
												colorClass: "bg-[#D1AE6F40]",
												textClass: "text-primary-green",
											},
											{
												label: "Case Study",
												colorClass: "bg-violet-100",
												textClass: "text-violet-600",
											},
										]}
										onViewPaper={() =>
											router.push(`/dashboard/publications/${pub.id}`)
										}
										onDownload={() => downloadPDF(pub.document ?? "")}
										onLike={() => console.log("Liked")}
										onComment={() => console.log("Comment")}
										onShare={() => console.log("Shared")}
										{...pub}
									/>
								</Card>
							))
						) : null}
					</section>
				</main>

				{/* Right Sidebar */}
				<aside className="w-full md:w-1/4 space-y-6">
					{/* Upcoming Events */}
					<Card className="shadow-none gap-3 border-0 rounded-xl p-6">
						<h3 className="font-medium text-base mb-3 text-primary-green">
							Upcoming Event
						</h3>
						{events.map((event) => (
							<EventAndOpportunityCard
								key={event.id}
								title={event.title}
								deadline={event.deadline}
								description={event.description}
							/>
						))}
						{[1, 2].map((_, i) => (
							<div
								key={i}
								className="mb-2.5 last:mb-0 space-y-2 rounded-xl border-l-2 px-3.5 py-4 border-l-[#F79009] "
							>
								<p className="font-medium text-sm font-raleway text-primary-green">
									Driving Impact Investing, Research, and Innovation in Nigeria
								</p>
								<div className="flex items-center text-[#242424] text-xs mt-1">
									<Calendar className="w-3 h-3 mr-1" /> 01 June 2025
								</div>
								<p className="text-xs text-[#242424] mt-1">
									The Nigeria Impact Investing Research Industry Collaborative
									(NIIRC) is Nigeria’s premier network dedicated to advancing
								</p>
							</div>
						))}
					</Card>

					{/* Suggested Connections */}
					<Card className="shadow-none gap-3  border-0 rounded-xl p-6">
						<h3 className="font-medium text-base mb-3 text-primary-green">
							Suggested Connections
						</h3>
						<div className="space-y-3">
							{team.map((member) => (
								<TeamMemberCard
									key={member.id}
									name={member.name}
									role={member.role}
									avatarUrl={member.avatarUrl}
									onActionClick={() => console.log(`Action for ${member.name}`)}
								/>
							))}
						</div>
					</Card>

					{/* Opportunities */}
					<Card className="shadow-none gap-3 border-0 rounded-xl p-6">
						<h3 className="font-medium text-base mb-3 text-primary-green">
							Opportunities
						</h3>
						{events.map((event) => (
							<EventAndOpportunityCard
								key={event.id}
								title={event.title}
								deadline={event.deadline}
								description={event.description}
							/>
						))}
					</Card>
				</aside>
			</div>
		</PublicationsLayout>
	);
}
