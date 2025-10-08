"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function GoogleCallback() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return; // Still loading

		if (session) {
			// User is authenticated, redirect to dashboard or home
			router.push("/");
		} else {
			// Authentication failed, redirect to sign in
			router.push("/");
		}
	}, [session, status, router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h2 className="text-xl font-semibold mb-4">
					Processing authentication...
				</h2>
				<p className="text-gray-600">
					Please wait while we complete your sign in.
				</p>
			</div>
		</div>
	);
}
