import React, { Suspense } from 'react'
import ResearchPublicationPage from './Publication'
import Loader from '@/components/common/Loader'
import PageLoader from '@/components/common/PageLoader'

function Page() {
	return (
		<Suspense fallback={<PageLoader	 message="Loading ..." overlay size="lg" />}>
					<ResearchPublicationPage />
				</Suspense>
	)
}

export default Page