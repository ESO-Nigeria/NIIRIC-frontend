"use client";

import { Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Header02 from "@/components/blocks/header";
import { Button } from "@/components/ui/button";
import {
	useRegisterMutation,
	useVerifyEmailMutation,
} from "@/store/features/auth/actions";

export default function EmailVerified() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const email = searchParams.get("email");
	const uid = searchParams.get("key");
	// const token = searchParams.get("token");

	const [verifyEmail, { isLoading, isSuccess, isError }] =
		useVerifyEmailMutation();

	useEffect(() => {
		if (uid) {
			verifyEmail({ key: uid });
		}
	}, [uid, verifyEmail]);

	useEffect(() => {
		if (isSuccess) {
			router.push(`/auth/success/verified`);
		}
	}, [isSuccess, router, email]);

	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center min-h-[80vh]">
					<Loader2 className="h-12 w-12 animate-spin text-green-600" />.
				</div>
			}
		>
			<div>
				<Header02 />
				<div className="min-h-[80vh] flex items-center justify-center px-4">
					<div className="max-w-lg w-full text-center space-y-6">
						{isLoading && (
							<div className="flex flex-col items-center space-y-4">
								<Loader2 className="h-12 w-12 animate-spin text-green-600" />
								<p className="text-lg font-medium">Verifying your email...</p>
							</div>
						)}

						{isError && (
							<div className="flex flex-col items-center space-y-4">
								<XCircle className="h-12 w-12 text-red-600" />
								<h4 className="text-2xl font-bold text-red-600">
									Verification Failed
								</h4>
								<p className="text-gray-600">
									The verification link is invalid or has expired. Please
									request a new one.
								</p>
								<Button>Resend Verification Link</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Suspense>
	);
}
