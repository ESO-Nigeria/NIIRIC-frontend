"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Header02 from "@/components/blocks/header";
import { isTokenValid } from "@/helpers/helpers";
import { RootState } from "@/store";

interface AuthLayoutProps {
	children: ReactNode;
	side?: ReactNode;
}

export default function AuthLayout({ children, side }: AuthLayoutProps) {
	const router = useRouter();
	const token = useSelector((state: RootState) => state.auth.token);

	useEffect(() => {
		if (token && isTokenValid(token)) {
			router.replace("/");
		}
	}, [token]);

	return (
		<div>
			<Header02 />
			<div className="h-screen flex items-center justify-center">
				<div className="w-full h-full grid lg:grid-cols-2 ">
					<div className="hidden lg:block overflow-hidden">
						{side ? side : <div className="w-full h-full bg-muted" />}
					</div>
					<div className="max-w-lg m-auto w-full flex flex-col items-center">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
