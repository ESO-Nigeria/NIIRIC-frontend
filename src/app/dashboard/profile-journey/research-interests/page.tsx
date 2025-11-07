import React, { Suspense } from 'react'
import InterestForm from './InterestNew'

function page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<InterestForm />
		</Suspense>
	)
}

export default page