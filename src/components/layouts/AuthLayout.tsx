"use client";

import { ReactNode } from "react";
import Header02 from "@/components/blocks/header";

interface AuthLayoutProps {
	children: ReactNode;
	side?: ReactNode;
}

export default function AuthLayout({ children, side }: AuthLayoutProps) {
	return (
		<div>
			<Header02 />
			<div className="h-screen flex items-center justify-center">
				<div className="w-full h-full grid lg:grid-cols-2 ">
					<div className="hidden lg:block overflow-hidden">
						{side ? side : <div className="w-full h-full bg-muted" />}
					</div>
					<div className="max-w-2xl m-auto w-full flex flex-col items-center">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
