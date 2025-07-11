"use client";
import type React from "react";
import Footer from "@/components/blocks/footer";
import Header02 from "@/components/blocks/header";

export default function GeneralLayout({
	children,
	className,
	withSponsors,
	withSubscribe,
}: {
	children: React.ReactNode;
	className?: string;
	withSponsors?: boolean;
	withSubscribe?: boolean;
}) {
	return (
		<div className={`flex flex-col min-h-screen ${className}`}>
			<Header02 />
			<main className="flex-grow">{children}</main>
			<Footer withSponsors={withSponsors} withSubscribe={withSubscribe} />
		</div>
	);
}
