import React, { Suspense } from "react";
import ProviderPage from "./ProviderPage";

function page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ProviderPage />
		</Suspense>
	);
}

export default page;
