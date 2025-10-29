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
				<div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-green-600">
					<img src={user ? user.profile_pic : ""} alt={user?.first_name} className="object-cover" />
				</div>

				{/* Name */}
				<h2 className="text-xl font-semibold text-gray-800">{user?.first_name} {user?.last_name}</h2>

				{/* University & Course */}
				<p className="text-sm text-gray-500">
					{/* {user?.university} • {user?.course} */}
				</p>

				{/* Stats */}
				<div className="flex justify-center gap-8 text-center">
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{/* {user?.publications} */}
							</p>
						<p className="text-xs text-gray-500">Publications</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{/* {user?.followers} */}
							</p>
						<p className="text-xs text-gray-500">Followers</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">
							{/* {user?.contributions} */}
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
					<span>{user?.state}</span>
				</div>
				<div className="flex capitalize items-center gap-3 text-sm text-gray-600">
					<Mail className="w-4 h-4 text-gray-400" />
					<span>{user?.email}</span>
				</div>
				<div className="flex  items-center gap-3 text-sm text-gray-600">
					<LinkedInNew className="w-4 h-4 text-gray-400 shrink-0" />
					<span>{user?.linkedin_url}</span>
				</div>
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Phone className="w-4 h-4 text-gray-400" />
					<span>{user?.phone_number}</span>
				</div>
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Link className="w-4 h-4 text-gray-400" />
					<a
						// href={`https://${user?.website}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{/* {user?.website} */}
					</a>
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Qualifications Card Component =====
function QualificationsCard({ user }: { user: UserProfile }) {
	if (!user.qualifications || user.qualifications.length === 0) return null;

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-4">
				<div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
					<div className="p-3 rounded-xl bg-yellow-400 mb-3">
						<GraduationCap className="w-4 h-4 text-orange-500" />
					</div>
					<h3 className="text-[24px] font-normal text-gray-800 mb-3">Qualifications</h3>
				</div>
				{user.qualifications?.map((qual, index) => (
					<div key={index}>
						<p className="text-[20px] font-medium text-gray-800">{qual.title}</p>
						<p className="text-[20px] text-gray-600">{qual.field}</p>
						<div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
							<Building className="w-4 h-4 text-gray-400" />
							<span>{qual.institution}</span>
						</div>
						{index !== user.qualifications!.length - 1 && (
							<hr className="my-3 border-gray-200" />
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

// ===== Research Interests Card =====
function ResearchInterestsCard({ interests }: { interests?: string[] }) {
	if (!interests || interests.length === 0) return null;

	const colorMap: Record<string, string> = {
		Agriculture: "bg-yellow-100 text-yellow-800",
		Education: "bg-green-100 text-green-800",
		Healthcare: "bg-red-100 text-red-800",
	};

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-4">
				<h3 className="text-lg font-semibold text-gray-800">Research Interests</h3>
				<div className="flex flex-wrap gap-2">
					{interests.map((interest, i) => (
						<span
							key={i}
							className={`px-3 py-1 text-sm rounded-full font-medium ${colorMap[interest] || "bg-gray-100 text-gray-700"}`}
						>
							{interest}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Research Area Card =====
function ResearchAreaCard({ area }: { area?: string }) {
	if (!area) return null;

	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl w-full h-fit mt-4">
			<CardContent className="p-6 space-y-2">
				<h3 className="text-lg font-semibold text-gray-800">Research Area</h3>
				<p className="text-sm text-gray-600 leading-relaxed">{area}</p>
			</CardContent>
		</Card>
	);
}

// ===== Main Layout (Two Columns) =====
export default function ProfileGrid() {
  const { id } = useParams();
  const router = useRouter();
  const {data, isLoading, refetch} = useGetPublisherProfileByIdQuery(id)
  const {data: publications = [], isLoading: loading_publications} = useGetPublicationsQuery({author: id})

  console.log('data', data, publications, id)

	return (
		<GeneralLayout>
			<section className="bg-gray-50">
				<div className="container mx-auto py-8">
					<div className="grid grid-cols-[360px_1fr] gap-4 min-h-screen font-poppins">
						{/* Left Column: Profile + Address + Qualifications + Research */}
						<div className="space-y-4">
							<ProfileCard user={data} />
							<AddressCard user={data} />
							<QualificationsCard user={userData} />
							<ResearchInterestsCard interests={userData.researchInterests} />
							<ResearchAreaCard area={userData.researchArea} />
						</div>

						{/* Right Column: Publications */}
						<div>
							<Breadcrumbs />
							<div className="mt-4 space-y-6">
                {loading_publications &&   <Skeleton className="h-[125px] w-full rounded-xl" />}
                {!loading_publications && publications?.length == 0 && <EmptyState description="" title="No publications found for this author." />}
								{!loading_publications && publications?.map((pub: Publication) => (
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
						</div>
					</div>
				</div>
			</section>
		</GeneralLayout>
	);
}
