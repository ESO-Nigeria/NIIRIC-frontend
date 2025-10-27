"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import GeneralLayout from "@/layouts/General";

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
};

// ===== Dummy Publications =====
const publications = [
	{
		id: "1",
		title: "AI and the Future of Education",
		abstract:
			"Exploring how artificial intelligence is reshaping modern learning environments and improving student outcomes.",
		tags: [
			{ label: "AI", colorClass: "bg-purple-100", textClass: "text-purple-700" },
			{ label: "Education", colorClass: "bg-yellow-100", textClass: "text-yellow-700" },
		],
		is_liked: "false",
		like_count: "12",
	},
	{
		id: "2",
		title: "Blockchain and Data Security",
		abstract:
			"An in-depth look at how blockchain technology ensures data integrity and security in decentralized systems.",
		tags: [
			{ label: "Blockchain", colorClass: "bg-blue-100", textClass: "text-blue-700" },
			{ label: "Security", colorClass: "bg-red-100", textClass: "text-red-700" },
		],
		is_liked: "true",
		like_count: "30",
	},
	{
		id: "3",
		title: "Quantum Computing Basics",
		abstract:
			"A beginner-friendly overview of how quantum mechanics is being used to develop powerful computing systems.",
		tags: [
			{ label: "Quantum", colorClass: "bg-green-100", textClass: "text-green-700" },
			{ label: "Research", colorClass: "bg-gray-100", textClass: "text-gray-700" },
		],
		is_liked: "false",
		like_count: "8",
	},
];

// ===== Profile Card Component =====
function ProfileCard({ user }: { user: UserProfile }) {
	return (
		<Card className="shadow-sm border border-gray-200 rounded-2xl flex flex-col items-center justify-center w-full h-fit">
			<CardContent className="flex flex-col items-center justify-center text-center space-y-4 p-6">
				{/* Profile Image */}
				<div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-green-600">
					<Image src={user.image} alt={user.name} fill className="object-cover" />
				</div>

				{/* Name */}
				<h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>

				{/* University & Course */}
				<p className="text-sm text-gray-500">
					{user.university} • {user.course}
				</p>

				{/* Stats */}
				<div className="flex justify-center gap-8 text-center">
					<div>
						<p className="text-lg font-semibold text-gray-800">{user.publications}</p>
						<p className="text-xs text-gray-500">Publications</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">{user.followers}</p>
						<p className="text-xs text-gray-500">Followers</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-800">{user.contributions}</p>
						<p className="text-xs text-gray-500">Contributions</p>
					</div>
				</div>

				<Button variant="primary-green">Following</Button>

				{/* Bio */}
				<div className="text-start">

				<p className="font-bold">Bio</p>
				<p className="text-sm text-gray-600 max-w-md">{user.bio}</p>
				</div>
			</CardContent>
		</Card>
	);
}

// ===== Main Layout (Two Columns) =====
export default function ProfileGrid() {
	return (
		<GeneralLayout>
			<section className="bg-gray-50">
				<div className="container mx-auto py-8">
					<div className="grid grid-cols-[360px_1fr] gap-4 min-h-screen font-poppins">
						{/* Left Column: Profile Card */}
						<ProfileCard user={userData} />

						{/* Right Column: Publications */}
						<div>
							<Breadcrumbs />
							<div className="mt-4 space-y-6">
								{publications.map((pub) => (
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
