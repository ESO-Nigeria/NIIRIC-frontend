"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "@/helpers/helpers";
import { RootState } from "@/store";
import { useGetUserProfileQuery } from "@/store/features/auth/actions";
import { setPublisherProfile } from "@/store/features/auth/auth.slice";
import Header02 from "../blocks/header";
import DashBoardHeader from "../blocks/header/dashboardHeader";
import PageLoader from "../common/PageLoader";

function PublicationsLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.token);
	const {
		data: userProfile,
		isLoading: Personal_Info_loading,
		refetch,
	} = useGetUserProfileQuery({});

	useEffect(() => {
		// Only dispatch when we have a profile payload
		if (userProfile) {
			dispatch(setPublisherProfile(userProfile));
		}
	}, [userProfile, dispatch]);

	useEffect(() => {
		if (!token && !isTokenValid(token)) {
			router.replace("/auth/login");
		}
	}, [token]);

	console.log("token, ", token, isTokenValid(token));
	return (
		<div className="">
			<DashBoardHeader />
			<div className="flex min-h-screen bg-[#F9FAFB]">
				{/* Show loading spinner while profile is fetching */}
				<main className="flex-1 p-8">
					{Personal_Info_loading ? (
						// <div className="flex items-center justify-center h-full">
						// 	<svg
						// 		className="animate-spin h-8 w-8 text-primary-green"
						// 		viewBox="0 0 24 24"
						// 	>
						// 		<circle
						// 			className="opacity-25"
						// 			cx="12"
						// 			cy="12"
						// 			r="10"
						// 			stroke="currentColor"
						// 			strokeWidth="4"
						// 			fill="none"
						// 		/>
						// 		<path
						// 			className="opacity-75"
						// 			fill="currentColor"
						// 			d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
						// 		/>
						// 	</svg>
						// </div>
					<PageLoader	 message="Loading ..." overlay size="lg" />
					) : (
						children
					)}
				</main>
			</div>
		</div>
	);
}

export default PublicationsLayout;
