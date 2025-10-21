"use client";

import {
	BarChart,
	Bell,
	FileText,
	LayoutDashboard,
	MessageSquare,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetUserProfileQuery } from "@/store/features/auth/actions";
import { setPublisherProfile } from "@/store/features/auth/auth.slice";
import Header02 from "../blocks/header";
import DashBoardHeader from "../blocks/header/dashboardHeader";

const navItems = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Publications", href: "/dashboard/publications", icon: FileText },
	{ label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
	// { label: "Analytics", href: "/analytics", icon: BarChart },
	// { label: "Notifications", href: "/notifications", icon: Bell },
	{ label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.token);
	const {
		data: userProfile,
		isLoading: Personal_Info_loading,
		refetch,
	} = useGetUserProfileQuery({});

	useEffect(() => {
		dispatch(setPublisherProfile(userProfile));
	}, [userProfile]);

	// useEffect(() => {
	// 	if (!token || !isTokenValid(token)) {
	// 		router.replace("/auth/login");
	// 	}
	// }, [token]);

	// console.log("token, ", token);
	return (
		<div>
			<DashBoardHeader />
			<div className="flex min-h-screen bg-[#F9FAFB]">
				{/* Sidebar */}
				<aside className="w-64 bg-white border-r px-4 py-6">
					<div className="flex flex-col space-y-6">
						<nav className="flex flex-col gap-2">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700",
									)}
								>
									<item.icon className="h-5 w-5" />
									{item.label}
								</Link>
							))}
						</nav>
					</div>
				</aside>

				{/* Main content */}
				<main className="flex-1 p-8">{children}</main>
			</div>
		</div>
	);
}
