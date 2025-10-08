"use client";

import clsx from "clsx";
import {
	BookUp,
	Building,
	ContactRound,
	GraduationCap,
	Heart,
	User,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Qualification,
	ResearchArea,
	ResearchInterest,
	User as UserProps,
} from "../types/profile";
import { PersonalInfoCard } from "./Personal_info_card";
import { QualificationCard } from "./Qualification_card";
import { ResearchAreaCard } from "./ResearchAreaCard";
import { ResearchInterestCard } from "./ResearchInterestCard";

interface JourneyProps {
	personalInformation: UserProps | null;
	qualifications: Qualification[];
	interests: ResearchInterest[];
	researchArea: ResearchArea | null;
	personal_info_loading?: boolean;
	interest_loading?: boolean;
	qualifications_loading?: boolean;
	research_area_loading?: boolean;
}

export function ProfileJourney({
	personalInformation,
	personal_info_loading,
	qualifications,
	interests,
	researchArea,
	interest_loading,
	qualifications_loading,
	research_area_loading,
}: JourneyProps) {
	return (
		<Card className="mb-8 p-8 border-0 shadow-none rounded-8 font-poppins">
			<CardContent className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-[28px] font-poppins font-medium">
						Your NIIRIC Profile Journey
					</h2>
				</div>
				<p className="text-sm text-gray-600">
					Update your personal information, add your qualification, interests
					and share research area.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Personal Information */}
					{/* <div className=""> */}
					{personal_info_loading ? (
						<Card className="animate-pulse border shadow-none h-40 bg-gray-100" />
					) : personalInformation ? (
						<div className="col-span-2">
							<PersonalInfoCard data={personalInformation} />
						</div>
					) : (
						<Card className="border-primary-green shadow-none bg-green-50">
							<CardContent className="flex flex-col gap-3">
								<span className="bg-[#D1FADF] text-[#039855] p-2 size-8 rounded-lg flex items-center justify-center">
									<ContactRound className="h-5 w-5" />
								</span>
								<div className="flex text-base items-center text-[#3F434A]">
									<span className="font-medium">Personal Information</span>
								</div>
								<p className="text-sm text-[#3F434A]">
									Update your personal information.
								</p>
								<Link
									href="/dashboard/profile-journey/profile-completion"
									className={clsx(
										buttonVariants({ variant: "primary-green" }),
										"w-36",
									)}
								>
									Update
								</Link>
							</CardContent>
						</Card>
					)}
					{/* </div> */}

					{/* Qualifications */}
					{/* <div className=""> */}
					{qualifications_loading ? (
						<Card className="animate-pulse border shadow-none h-40 bg-gray-100" />
					) : qualifications?.length > 0 ? (
						<div className="col-span-2">
							<QualificationCard qualifications={qualifications} />
						</div>
					) : (
						<Card className="border shadow-none">
							<CardContent className="flex flex-col gap-3">
								<span className="bg-[#FEF0C7] text-[#DC6803] p-2 size-8 rounded-lg flex items-center justify-center">
									<GraduationCap className="h-5 w-5" />
								</span>
								<div className="flex text-base items-center text-[#3F434A]">
									<span className="font-medium">Qualification</span>
								</div>
								<p className="text-sm text-[#3F434A]">
									Add your educational background and degrees.
								</p>
								<Link
									href="/dashboard/profile-journey/qualification"
									className={clsx(
										buttonVariants({ variant: "primary-green" }),
										"w-36",
									)}
								>
									Add Qualification
								</Link>
							</CardContent>
						</Card>
					)}
					{/* </div> */}

					{/* Research Interests */}
					{/* <div className=""> */}
					{interest_loading ? (
						<Card className="animate-pulse border shadow-none h-40 bg-gray-100" />
					) : interests?.length > 0 ? (
						<div className="col-span-2">
							<ResearchInterestCard interests={interests} />
						</div>
					) : (
						<Card className="border shadow-none">
							<CardContent className="flex flex-col gap-3">
								<span className="bg-[#D1E9FF] text-[#0086C9] p-2 size-8 rounded-lg flex items-center justify-center">
									<Heart className="h-5 w-5" />
								</span>
								<div className="flex text-base items-center text-[#3F434A]">
									<span className="font-medium">Research Interests</span>
								</div>
								<p className="text-sm text-[#3F434A]">
									Define your areas of interest and expertise.
								</p>
								<Link
									href="/dashboard/profile-journey/research-interests"
									className={clsx(
										buttonVariants({ variant: "primary-green" }),
										"w-36",
									)}
								>
									Add Interests
								</Link>
							</CardContent>
						</Card>
					)}
					{/* </div> */}

					{/* Research Area */}
					{/* <div className=""> */}
					{research_area_loading ? (
						<Card className="animate-pulse border shadow-none h-40 bg-gray-100" />
					) : researchArea ? (
						<div className="col-span-2">
							<ResearchAreaCard data={researchArea} />
						</div>
					) : (
						<Card className="border shadow-none">
							<CardContent className="flex flex-col gap-3">
								<span className="bg-[#FEE4E2] text-[#D92D20] p-2 size-8 rounded-lg flex items-center justify-center">
									<BookUp className="h-5 w-5" />
								</span>
								<div className="flex text-base items-center text-[#3F434A]">
									<span className="font-medium">Research Area (Optional)</span>
								</div>
								<p className="text-sm text-[#3F434A]">
									Connect with like minds by letting them know what you are
									working on.
								</p>
								<Link
									href="/dashboard/profile-journey/research-area"
									className={clsx(
										buttonVariants({ variant: "primary-green", size: "sm" }),
										"w-36",
									)}
								>
									Add Research Area
								</Link>
							</CardContent>
						</Card>
					)}
					{/* </div> */}
				</div>
			</CardContent>
		</Card>
	);
}
