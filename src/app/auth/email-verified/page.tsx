import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import EmailVerified from "./EmailVerified";

export default function EmailVerifiedPage() {
	return (
		<Suspense
			fallback={
				<div className="flex flex-col justify-center items-center min-h-[80vh]">
					<Loader2 className="h-12 w-12 animate-spin text-green-600" />
					<p>Loading...</p>
				</div>
			}
		>
			<EmailVerified />
		</Suspense>
	);
}
