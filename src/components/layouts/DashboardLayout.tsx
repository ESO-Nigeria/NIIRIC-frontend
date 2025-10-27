"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
	LayoutDashboard,
	FileText,
	MessageSquare,
	Settings,
} from "lucide-react";

import { RootState } from "@/store";
import { isTokenValid } from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/store/features/auth/actions";
import { setPublisherProfile } from "@/store/features/auth/auth.slice";

import DashBoardHeader from "../blocks/header/dashboardHeader";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Publications", href: "/dashboard/publications", icon: FileText },
	{ label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
	{ label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.token);

	const { data: userProfile, isLoading } = useGetUserProfileQuery({});

	// Save user profile to store
	useEffect(() => {
		if (userProfile?.length > 0) {
			dispatch(setPublisherProfile(userProfile));
		}
	}, [userProfile, dispatch]);

	// Redirect to login if token invalid
	useEffect(() => {
		if (!token || !isTokenValid(token)) {
			router.replace("/auth/login");
		}
	}, [token, router]);

	return (
		<div className="flex min-h-screen flex-col bg-[#F9FAFB]">
			<DashBoardHeader userProfile={userProfile} />

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 bg-white border-r px-4 py-6">
					<nav className="flex flex-col gap-3">
						{NAV_ITEMS.map((item) => {
							const isActive = pathname === item.href;
							const isDisabled = userProfile?.length == 0 && item.label !== "Dashboard";
							return (
								<div
									key={item.href}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
										isActive
											? "bg-primary-green text-white "
											: "text-gray-700 hover:bg-primary-green/15 hover:text-primary-green",
										isDisabled && "opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-500",
									)}
								>
									{isDisabled ? (
										<>
											<item.icon className="h-5 w-5 text-gray-400" />
											<span>{item.label}</span>
										</>
									) : (
										<Link
											href={item.href}
											className="flex items-center gap-3 w-full"
										>
											<item.icon
												className={cn("h-5 w-5", {
													"text-white": isActive,
													"text-gray-600": !isActive,
												})}
											/>
											<span>{item.label}</span>
										</Link>
									)}
								</div>
							);
						})}
					</nav>
				</aside>

				{/* Main content */}
				<main className="flex-1 p-8">
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<div className="spinner-border text-success" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						children
					)}
				</main>
			</div>
		</div>
	);
}
