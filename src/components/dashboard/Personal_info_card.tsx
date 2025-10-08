"use client";

import clsx from "clsx";
import {
	ContactRound,
	Linkedin,
	Link as LinkIcon,
	Mail,
	Pencil,
	Phone,
} from "lucide-react";
import Link from "next/link";
import { LinkedInNew, PencilWithLine } from "@/assets/icons/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "../types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type PersonalInfoCardProps = {
	data?: User;
	onEdit?: () => void;
	isLoading?: boolean;
};

export function PersonalInfoCard({
	data,
	onEdit,
	isLoading,
}: PersonalInfoCardProps) {
	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-6 text-gray-500">
					Loading profile…
				</CardContent>
			</Card>
		);
	}

	if (!data) {
		return (
			<Card>
				<CardContent className="p-6 text-gray-500">
					No personal info available.
				</CardContent>
			</Card>
		);
	}

	const {
		id,
		title,
		first_name,
		last_name,
		email,
		phone_number,
		linkedin_url,
		orcid,
		state,
		bio,
	} = data;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-2">
				<div className="rounded-xl bg-[#D1FADF] text-[#039855] p-2 size-8 flex items-center justify-center">
					<ContactRound className="h-5 w-5" />
				</div>
				<h2 className="text-xl font-normal">Personal Information</h2>
			</div>

			<Card className="shadow-none p-0">
				<CardContent className="py-6 px-8 space-y-2">
					<div className="flex items-start gap-4">
						{/* Avatar Placeholder */}
						{/* <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 uppercase">
            {first_name?.[0]}
          </div> */}
						<Avatar className="size-[102px]">
							<AvatarImage src="" alt={first_name} />
							<AvatarFallback className="text-2xl">
								{first_name?.[0]}
							</AvatarFallback>
						</Avatar>

						{/* Info */}
						<div className="flex-1 space-y-2">
							<h2 className="text-xl text-[#3F434A] medium capitalize">
								{title
									? `${title} ${first_name} ${last_name}`
									: `${first_name} ${last_name}`}
							</h2>
							{state && (
								<p className="text-sm text-[#475467] capitalize">
									{state}, Nigeria
								</p>
							)}

							<div className="flex gap-3 text-sm text-[#475467]">
								{email && (
									<span className="flex items-center gap-2">
										<Mail className="h-5 w-5 text-[#98A2B3]" />
										{email}
									</span>
								)}
								{phone_number && (
									<span className="flex items-center gap-2">
										<Phone className="h-5 w-5 text-[#98A2B3]" />
										{phone_number}
									</span>
								)}
								{linkedin_url && (
									<span className="flex items-center gap-2">
										<LinkedInNew className="h-5 w-5 text-[#98A2B3]" />
										{linkedin_url}
									</span>
								)}
							</div>
						</div>

						{/* Edit */}
						{/* {onEdit && ( */}
						{/* <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="ml-auto"
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit Profile
            </Button> */}
						{/* )} */}
					</div>
					<div className="flex space-y-2 flex-col">
						<h5 className="text-xl text-[#3F434A] medium  ">Bio</h5>
						{bio && (
							<p className="text-sm text-[#475467] leading-relaxed">{bio}</p>
						)}

						{orcid && (
							<div className=" text-sm  flex items-center gap-2 text-[#475467]">
								<LinkIcon className="h-4 w-4 text-[#98A2B3]" />
								{orcid}
							</div>
						)}
						<div className="ml-auto">
							<Link
								href={`/dashboard/profile-journey/profile-completion/?edit&id=${id}`}
								onClick={onEdit}
								className={clsx(
									buttonVariants({ variant: "link", size: "sm" }),
									"ml-auto text-primary-green font-normal underline text-base ",
								)}
							>
								<PencilWithLine className="h-5 w-5 mr-1" /> Edit Profile
							</Link>
						</div>
						{/* <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="ml-auto"
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit Profile
            </Button> */}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
