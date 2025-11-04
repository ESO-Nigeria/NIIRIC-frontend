import React, { Suspense } from 'react'
import ResearchArea from './ResearchAreaNew'

function page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResearchArea />
		</Suspense>
	)
}

export default page