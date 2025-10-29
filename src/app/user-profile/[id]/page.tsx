import React, { Suspense } from 'react'
import Loader from '@/components/common/Loader'
import PageLoader from '@/components/common/PageLoader'
import ProfileGrid from './UserProfile'

function Page() {
	return (
		<Suspense fallback={<PageLoader	 message="Loading ..." overlay size="lg" />}>
					<ProfileGrid />
				</Suspense>
	)
}

export default Page