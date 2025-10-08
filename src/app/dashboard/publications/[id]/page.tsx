import React, { Suspense } from 'react'
import ResearchPublicationPage from './Publication'
import Loader from '@/components/common/Loader'

function Page() {
	return (
		<Suspense fallback={<Loader />}>
					<ResearchPublicationPage />
				</Suspense>
	)
}

export default Page