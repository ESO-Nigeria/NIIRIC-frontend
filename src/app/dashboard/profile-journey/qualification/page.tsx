import React, { Suspense } from 'react'
import QualificationForm from './QualificationNew'

function page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<QualificationForm />
		</Suspense>
	)
}

export default page