"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { ProfileJourney } from "@/components/dashboard/ProfileJourney";
import { Publications } from "@/components/dashboard/Publications";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { isTokenValid } from "@/helpers/helpers";
import { RootState } from "@/store";
import {
	useGetUserInterestsQuery,
	useGetUserProfileQuery,
	useGetUserQualificationsQuery,
	useGetUserResearchAreaQuery,
} from "@/store/features/auth/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";

export default function DashboardPage() {
	const token = useSelector((state: RootState) => state.auth.token);
	const user = useSelector(selectCurrentUser);

	const router = useRouter();
	const {
		data: userProfile,
		isLoading: Personal_Info_loading,
		refetch,
	} = useGetUserProfileQuery({});
	const {
		data: userQualifications,
		isLoading: qualifications_loading,
		refetch: refetchQualifications,
	} = useGetUserQualificationsQuery({});
	const {
		data: userInterests,
		isLoading: interest_loading,
		refetch: refetchInterest,
	} = useGetUserInterestsQuery({});
	const {
		data: userResearchArea,
		isLoading: researchAreaLoading,
		refetch: refetchResearchArea,
	} = useGetUserResearchAreaQuery({});

	useEffect(() => {
		if (isTokenValid(token) == false) {
			router.replace("/");
		}
	}, [token]);

	useEffect(() => {
		refetch();
		refetchQualifications();
		refetchInterest();
		refetchResearchArea();
	}, [router]);

	return (
		<DashboardLayout>
			<div className="pb-2">
				<Breadcrumbs />
			</div>
			<h1 className="text-[28px] font-poppins text-[#242424] font-normal mb-6">
				Hi, {user?.first_name}
			</h1>
			<ProfileJourney
				personalInformation={userProfile?.[0]}
				personal_info_loading={Personal_Info_loading}
				qualifications={userQualifications?.results}
				interests={userInterests?.results}
				researchArea={userResearchArea?.results?.[0]}
				interest_loading={interest_loading}
				qualifications_loading={qualifications_loading}
				research_area_loading={researchAreaLoading}
			/>
			<Publications />
		</DashboardLayout>
	);
}
