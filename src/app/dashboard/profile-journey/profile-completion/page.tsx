import React, { Suspense } from 'react'
import ProfileCompletionForm from './ProfilePage'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileCompletionForm />
    </Suspense>
  )
}

export default page