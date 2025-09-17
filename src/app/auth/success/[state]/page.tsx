"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Header02 from "@/components/blocks/header";
import { buttonVariants } from "@/components/ui/button";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const { state } = useParams();
	let title = "Success";
	let description = "";

	switch (state) {
		case "verification-sent":
			title = "Verification Email Sent";
			description = "Please check your inbox to verify your account.";
			break;
		case "reset-link-sent":
			title = "Password Reset Email Sent";
			description = "We’ve sent you a link to reset your password.";
			break;
		case "verified":
			title = "Email Verification";
			description = "Your email has been successfully verified.";
			break;
		default:
			description = "Your request was successful.";
	}

	return (
		<div>
			<Header02 />
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="w-full flex items-center justify-center h-full p-4">
					<div className="max-w-lg m-auto space-y-4 w-full flex flex-col items-center">
						<h4 className="text-[28px] font-bold">{title}</h4>
						<div className="bg-[#F6FEF9] px-6 py-3  space-y-4 rounded-2xl text-center w-full">
							<h4 className="text-[#039855] text-[28px] font-bold">
								Successful
							</h4>
							<p className=" text-base font-normal tracking-tight">
								{description} <br /> {email}
							</p>
						</div>
						<Link
							href={"/auth/login"}
							className={clsx(
								buttonVariants({ variant: "primary-green" }),
								"mt-4 h-11 w-full",
							)}
						>
							Continue to login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
