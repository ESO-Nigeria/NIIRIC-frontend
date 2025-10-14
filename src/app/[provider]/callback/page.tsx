"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Header02 from "@/components/blocks/header";
import { buttonVariants } from "@/components/ui/button";
import { setCredentials } from "@/store/features/auth/auth.slice";

export default function ProviderPage() {
	const { provider } = useParams();
	const { data: session, status } = useSession();
	const dispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	const title = "Success";
	let description = "";

	useEffect(() => {
		if (status === "loading") return; // don't run effects during loading

		if (status === "unauthenticated") {
			toast.error("Authentication failed, please try again.");
			router.push("/auth/login");
			return;
		}

		if (status === "authenticated" && session) {
			description = `You have successfully authenticated using ${provider}.`;
		// const callbackUrl =
    //   router.query?.callbackUrl ||
    //   (document.referrer && !document.referrer.includes(window.location.origin)
    //     ? "/"
    //     : document.referrer) ||
    //   "/";
			dispatch(setCredentials({ ...session }));
			router.push("/dashboard");
			toast.success("Authentication successful!");
		}
	}, [session, status, dispatch, router]);

	if (status === "loading") {
		return (
			<div>
				<Header02 />
				<div className="min-h-[80vh] flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
						<p className="text-gray-600">Authenticating, please wait...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Header02 />
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="w-full flex items-center justify-center h-full p-4">
					<div className="max-w-lg m-auto space-y-4 w-full flex flex-col items-center">
						<h4 className="text-[28px] font-bold">{title}</h4>
						<div className="bg-[#F6FEF9] px-6 py-3 space-y-4 rounded-2xl text-center w-full">
							<h4 className="text-[#039855] text-[28px] font-bold">
								Successful
							</h4>
							<p className="text-base font-normal tracking-tight">
								{description} <br /> {email}
							</p>
						</div>
						<Link
							href={"/dashboard"}
							className={clsx(
								buttonVariants({ variant: "primary-green" }),
								"mt-4 h-11 w-full",
							)}
						>
							Continue to dashboard
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
