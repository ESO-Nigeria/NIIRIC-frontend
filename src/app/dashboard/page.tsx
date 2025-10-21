"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import PublicationsTab from "@/components/common/PublicationTab";

/**
 * Dashboard page
 * - Adds a unified loading state that displays while any RTK query is loading
 * - Calls all refetch functions on mount
 */
export default function DashboardPage(): JSX.Element {
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

  // unified loading flag — true while any of the RTK queries are loading
  const isAnyLoading =
    Boolean(Personal_Info_loading) ||
    Boolean(qualifications_loading) ||
    Boolean(interest_loading) ||
    Boolean(researchAreaLoading);

  useEffect(() => {
    if (isTokenValid(token) === false) {
      router.replace("/");
    }
  }, [token, router]);

  // refetch all on mount (depend on the refetch funcs to avoid stale closures)
  useEffect(() => {
    refetch();
    refetchQualifications();
    refetchInterest();
    refetchResearchArea();
  }, [refetch, refetchQualifications, refetchInterest, refetchResearchArea]);

  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>

      <h1 className="text-[28px] font-poppins text-[#242424] font-normal mb-6">
        Hi, {user?.first_name}
      </h1>

      {/* Show skeleton loader while any query is loading */}
      {isAnyLoading ? (
        <div className="space-y-6">
          {/* Top row skeleton: title + action */}
          <div className="flex items-center justify-between gap-4">
            <div className="w-1/3 h-8 rounded-md bg-gray-200 animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-28 h-10 rounded-md bg-gray-200 animate-pulse" />
              <div className="w-36 h-10 rounded-md bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Main content skeleton: publications list */}
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-lg bg-white shadow-sm"
                aria-hidden
              >
                {/* thumbnail */}
                <div className="w-16 h-20 bg-gray-200 rounded-md animate-pulse flex-shrink-0" />

                {/* content */}
                <div className="flex-1 space-y-3">
                  <div className="w-2/5 h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-20 h-7 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-12 h-7 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-3">
                    <div className="w-28 h-10 bg-gray-200 rounded-md animate-pulse" />
                    <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar / lower area skeleton (optional) */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="col-span-2 space-y-3">
              <div className="w-full h-40 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-full h-24 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-full h-20 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        /* When not loading, show either the full dashboard or the profile journey flow */
        (userQualifications?.results &&
        userInterests?.results &&
        userProfile?.[0]) ? (
          <div>
            <div className="flex items-center justify-end mb-4">
              {/* <h2 className="text-xl font-normal font-poppins">Dashboard</h2> */}
              <Button
                variant="primary-green"
                className="h-11 px-3"
                onClick={() => {
                  window.location.href = "/dashboard/publications/upload";
                }}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload New Publication
              </Button>
            </div>
            <PublicationsTab />
          </div>
        ) : (
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
        )
      )}
    </DashboardLayout>
  );
}