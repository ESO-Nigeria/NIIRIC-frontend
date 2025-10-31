"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import GeneralLayout from "@/layouts/General";
import { Mail, MapPin, Phone, Link, Building, GraduationCap } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetPublisherProfileByIdQuery } from "@/store/features/auth/actions";
import { useGetPublicationsQuery } from "@/store/features/publications/actions";
import { Profile, Publication } from "@/components/types/profile";
import { LinkedInNew } from "@/assets/icons/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/blocks/EmptyState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatString, getColorClass } from "@/helpers/helpers";
import PaginationControls from "@/components/common/Pagination";
import { useMemo, useState } from "react";
import { FilterValues } from "@/components/FilterSidebar";

// ===== Interface for Profile Data =====
interface UserProfile {
	name: string;
	university: string;
	course: string;
	publications: number;
	followers: number;
	contributions: number;
	bio: string;
	image: string;
	address?: string;
	email?: string;
	linkedin?: string;
	phone?: string;
	website?: string;
	qualifications?: Qualification[];
	researchInterests?: string[];
	researchArea?: string;
}

interface Qualification {
	title: string;
	field: string;
	institution: string;
}

// ===== Dummy Data =====
const userData: UserProfile = {
	name: "David Chukwuchebem",
	university: "University of Lagos",
	course: "Computer Science",
	publications: 3,
	followers: 1,
	contributions: 0,
	bio: "Hi! I'm a passionate software engineer and UI designer who loves creating engaging digital experiences that help learners connect with technology and innovation.",
	image: "/assets/images/avatar.png",
	address: "Lagos, Nigeria",
	email: "davidchukwuchebem@email.com",
	linkedin: "linkedin.com/in/davidchukwuchebem",
	phone: "+234 913 485 0138",
	website: "www.6thtouch.tech",
	qualifications: [
		{
			title: "Faculty Member",
			field: "Economics",
			institution: "University of Lagos",
		},
		{
			title: "Post Doctorate",
			field: "Economics",
			institution: "Julius–Maximzburgwilliams–Universität Würzburg",
		},
	],
	researchInterests: ["Agriculture", "Education", "Healthcare"],
	researchArea:
		"Dr. Amarachi Collins is a development economist and researcher with a strong focus on social finance and inclusive growth. She has contributed to studies on impact measurement in West Africa and often collaborates with networks that advance sustainable investment practices.",
};

// ===== Dummy Publications =====
// const publications = [
// 	{
// 		id: "1",
// 		title: "AI and the Future of Education",
// 		abstract:
// 			"Exploring how artificial intelligence is reshaping modern learning environments and improving student outcomes.",
// 		tags: [
// 			{ label: "AI", colorClass: "bg-purple-100", textClass: "text-purple-700" },
// 			{ label: "Education", colorClass: "bg-yellow-100", textClass: "text-yellow-700" },
// 		],
// 		is_liked: "false",
// 		like_count: "12",
// 	},
// 	{
// 		id: "2",
// 		title: "Blockchain and Data Security",
// 		abstract:
// 			"An in-depth look at how blockchain technology ensures data integrity and security in decentralized systems.",
// 		tags: [
// 			{ label: "Blockchain", colorClass: "bg-blue-100", textClass: "text-blue-700" },
// 			{ label: "Security", colorClass: "bg-red-100", textClass: "text-red-700" },
// 		],
// 		is_liked: "true",
// 		like_count: "30",
// 	},
// 	{
// 		id: "3",
// 		title: "Quantum Computing Basics",
// 		abstract:
// 			"A beginner-friendly overview of how quantum mechanics is being used to develop powerful computing systems.",
// 		tags: [
// 			{ label: "Quantum", colorClass: "bg-green-100", textClass: "text-green-700" },
// 			{ label: "Research", colorClass: "bg-gray-100", textClass: "text-gray-700" },
// 		],
// 		is_liked: "false",
// 		like_count: "8",
// 	},
// ];

// ===== Profile Card Component =====
function ProfileCard({ user }: { user: Profile }) {
	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl flex flex-col items-center justify-center w-full h-fit">
			<CardContent className="flex flex-col items-center justify-center text-center space-y-4 p-6">
				{/* Profile Image */}
				<Avatar className="w-26 h-26 border-2 border-green-600">
                <AvatarImage src={user?.profile_pic} alt={user?.first_name} />
                <AvatarFallback className="uppercase">
                  {user?.first_name?.[0]}
                  {user?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
				{/* Name */}
				<h2 className="text-xl font-semibold text-gray-800 capitalize">{user?.first_name} {user?.last_name}</h2>

				{/* University & Course */}
				<p className="text-sm text-gray-500">
					{/* {user?.university} • {user?.course} */}
				</p>

				{/* Stats */}
				<div className="flex justify-center gap-8 text-center">
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{user?.publication_count || 0}
							</p>
						<p className="text-xs text-gray-500">Publications</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{user?.follower_count || 0}
							</p>
						<p className="text-xs text-gray-500">Followers</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{user?.contribution_count || 0}
							</p>
						<p className="text-xs text-gray-500">Contributions</p>
					</div>
				</div>

				<Button variant="primary-green">Following</Button>

				{/* Bio */}
				<div className="text-start w-full mt-2">
					<p className="font-bold mb-1">Bio</p>
					<p className="text-sm text-gray-600">{user?.bio}</p>
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Address Card Component =====
function AddressCard({ user }: { user: Profile }) {
	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-4 ">
				<h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
				<div className="flex capitalize items-center gap-3 text-sm text-gray-600">
					<MapPin className="w-4 h-4 text-gray-400" />
					<p>{user?.state}</p>
				</div>
				<div className="flex capitalize items-center gap-3 text-sm text-gray-600">
					<Mail className="w-4 h-4 text-gray-400" />
					<p>{user?.email}</p>
				</div>
				<div className="flex  items-center gap-3 text-sm text-gray-600">
					<LinkedInNew className="w-4 h-4 text-gray-400 shrink-0" />
					<p>{user?.linkedin_url}</p>
				</div>
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Phone className="w-4 h-4 text-gray-400" />
					<p>{user?.phone_number}</p>
				</div>
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Link className="w-4 h-4 text-gray-400" />
					<a
						href={`https://${user?.orcid}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{user?.orcid}
					</a>
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Qualifications Card Component =====
function QualificationsCard({ user }: { user: Profile }) {
	if (!user?.qualifications || user?.qualifications?.length === 0) return null;

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-4">
				<div className="flex items-center gap-2  text-sm text-gray-500">
					<div className="p-3 rounded-xl bg-yellow-400 ">
						<GraduationCap className="w-4 h-4 text-orange-500" />
					</div>
					<h3 className="text-lg font-semibold text-gray-800">Qualifications</h3>
				</div>
				{user?.qualifications?.map((qual, index) => (
					<div key={index}>
						<p className=" font-medium text-gray-800 capitalize">{formatString(qual.position)} </p>
						<p className=" text-gray-600 capitalize">{formatString(qual.department)}</p>
						<div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
							<Building className="w-4 h-4 text-gray-400" />
							<span className="capitalize">{qual.institution}</span>
						</div>
						{index !== user?.qualifications!.length - 1 && (
							<hr className="my-3 border-gray-200" />
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

// ===== Research Interests Card =====
function ResearchInterestsCard({ user }: { user: Profile }) {
	if (!user?.research_interests || user?.research_interests?.length === 0) return null;

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-4">
				<h3 className="text-lg font-semibold text-gray-800">Research Interests</h3>
				<div className="flex flex-wrap gap-2">
					{user?.research_interests.map((interest, i) => {
							const name = typeof interest === "string" ? interest : interest?.interest_display ?? "";
						
						return (
						<span
							key={i}
							className={`px-3 py-1 text-sm rounded-full font-medium ${getColorClass(name)} || "bg-gray-100 text-gray-700"}`}
						>
							{/* {interest} */}
							{formatString(name)}
						</span>
					)})}
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Research Area Card =====
function ResearchAreaCard({ user }: { user: Profile }) {
	if (!user?.research_areas || user?.research_areas?.length === 0) return null;

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-2">
				<h3 className="text-lg font-semibold text-gray-800">Research Area</h3>
			{user?.research_areas?.map(item => (
				<p className="text-sm text-gray-600 leading-relaxed">{item}</p>
			))}
			</CardContent>
		</Card>
	);
}

const defaultFilters: FilterValues = {
	page_size: 10,

};

// ===== Main Layout (Two Columns) =====
export default function ProfileGrid() {
  const { id } = useParams();
  const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState<FilterValues>(defaultFilters)
	const queryParams = useMemo(
			() => ({
				...filters,
				page: currentPage,
				author: id
			}),
			[filters, currentPage]
		);
  const {data, isLoading, refetch} = useGetPublisherProfileByIdQuery(id)
  const {data: publications = [], isLoading: loading_publications} = useGetPublicationsQuery(queryParams)

  console.log('data', data, publications, id)

	return (
		<GeneralLayout>
			<section className="bg-gray-50">
				<div className="container mx-auto py-8">
					<div className="grid grid-cols-[360px_1fr] gap-4 min-h-screen font-poppins">
						{isLoading && (
							<>
								<div className="space-y-4">
              <Skeleton className="h-[180px] w-full rounded-xl" /> {/* Profile */}
              <Skeleton className="h-[120px] w-full rounded-xl" /> {/* Address */}
              <Skeleton className="h-[160px] w-full rounded-xl" /> {/* Qualifications */}
              <Skeleton className="h-[140px] w-full rounded-xl" /> {/* Research Interests */}
              <Skeleton className="h-[120px] w-full rounded-xl" /> {/* Research Area */}
            </div>
						<div>
              <Skeleton className="h-6 w-40 mb-4 rounded-md" /> {/* Breadcrumbs */}
              <div className=" space-y-6">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[125px] w-full rounded-xl"
                  />
                ))}
              </div>
            </div>
							</>
						)}
						{/* Left Column: Profile + Address + Qualifications + Research */}
					{!isLoading && 	(<><div className="space-y-4">
							<ProfileCard user={data} />
							<AddressCard user={data} />
							<QualificationsCard user={data} />
							<ResearchInterestsCard user={data} />
							<ResearchAreaCard user={data} />
						</div>

						{/* Right Column: Publications */}
						<div>
							<Breadcrumbs />
							<div className="mt-4 space-y-6">
                {loading_publications &&   <Skeleton className="h-[125px] w-full rounded-xl" />}
                {!loading_publications && publications?.results?.length == 0 && <EmptyState description="" title="No publications found for this author." />}
								{!loading_publications && publications?.results?.map((pub: Publication) => (
									<PublicationCard
										key={pub.id}
										{...pub}
										onViewPaper={() => console.log("Viewing", pub.title)}
										onDownload={() => console.log("Downloading", pub.title)}
										onLike={() => console.log("Liked", pub.title)}
										onComment={() => console.log("Commented on", pub.title)}
										onShare={() => console.log("Shared", pub.title)}
										containerClass="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
									/>
								))}
							</div>
							<div className="my-8 *:flex justify-center">
								
								<PaginationControls
									currentPage={currentPage}
									totalCount={publications?.count}
									pageSize={filters?.page_size }
									onPageChange={setCurrentPage}
								/>
							</div>
						</div>
						
						
						</>)}
					</div>
				</div>
			</section>
		</GeneralLayout>
	);
}
