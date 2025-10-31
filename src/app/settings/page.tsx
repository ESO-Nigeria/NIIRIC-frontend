'use client'

import React, { useEffect } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Breadcrumbs from '@/components/common/Breadcrumb'
import { ProfileJourney } from '@/components/dashboard/ProfileJourney'
import { useGetUserInterestsQuery, useGetUserProfileQuery, useGetUserQualificationsQuery, useGetUserResearchAreaQuery } from '@/store/features/auth/actions';
import { isTokenValid } from '@/helpers/helpers';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/features/auth/selectors';

function SettingsPage() {
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
      <div className="flex flex-col gap-4">
      <ProfileJourney
            showHeader={false}
            personalInformation={userProfile}
            personal_info_loading={Personal_Info_loading}
            qualifications={userQualifications?.results}
            interests={userInterests?.results}
            researchArea={userResearchArea?.results?.[0]}
            interest_loading={interest_loading}
            qualifications_loading={qualifications_loading}
            research_area_loading={researchAreaLoading}
          />
      </div>
  )
}

export default SettingsPage