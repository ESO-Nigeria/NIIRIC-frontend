"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { BanIcon, MoreHorizontalIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Login04Page from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isTokenValid } from "@/helpers/helpers";
import { RootState } from "@/store";

const sideVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeOut" } 
  },
};

const sideContent = {
	login: {
		image: "/assets/images/solar_panel_farm.png",
		heading: "Welcome to NIIRIC",
		subheading: "Shaping the future of impact investing in Nigeria",
		description:
			"Nigeria Impact Investing Research Industry Collaborative (NIIRIC) brings together researchers, industry leaders, and investors to build knowledge, share insights, and drive inclusive growth.",
	},
	register: {
		image: "/assets/images/solar_panel_farm.png",
		heading: "Welcome to NIIRIC",
		subheading: "Shaping the future of impact investing in Nigeria",
		description:
			"Nigeria Impact Investing Research Industry Collaborative (NIIRIC) brings together researchers, industry leaders, and investors to build knowledge, share insights, and drive inclusive growth.",
	},
};

export default function AuthTabs() {
	const { tab } = useParams() as { tab?: string };
	const router = useRouter();
	const token = useSelector((state: RootState) => state.auth.token);
	// Fallback to "followers" if tab is invalid
	const currentTab = tab === "login" ? "login" : "register";
	const { image, heading, subheading, description } = sideContent[currentTab];

	// useEffect(() => {
	// 	if (isTokenValid(token)) {
	// 		router.replace("/");
	// 	}
	// }, [token, router]);

	console.log(token, router, 'hi', isTokenValid(token) )
	return (
		<AuthLayout
			side={
				<AnimatePresence mode="wait">
					<motion.div
						key={currentTab}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={sideVariants}
						className="relative w-full h-full"
					>
						{/* Background Image */}
						<img
							src={image}
							alt={`${currentTab} background`}
							className="absolute inset-0 w-full h-full object-cover"
						/>
						{/* Dark Overlay */}
						<div className="absolute inset-0 bg-black/60" />
						{/* Content */}
						<div className="relative max-w-2xl mx-auto z-10 flex flex-col justify-center h-full px-8 text-white">
							<h2 className="text-[51px] font-bold">{heading}</h2>
							<p className="text-2xl mt-2 font-semibold">{subheading}</p>
							<p className="mt-4 text-lg  leading-relaxed">{description}</p>
						</div>
					</motion.div>
				</AnimatePresence>
			}
		>
			<Tabs
				value={currentTab}
				onValueChange={(value) => router.push(`/auth/${value}`)}
				className="max-w-2xl w-full"
			>
				<TabsList className="w-full  grid grid-cols-2 h-full py-2 px-3">
					<TabsTrigger className="h-full p-3 cursor-pointer" value="login">
						Login
					</TabsTrigger>
					<TabsTrigger className="h-full p-3 cursor-pointer" value="register">
						Register
					</TabsTrigger>
				</TabsList>

				<div className="mt-2 p-4 ">
					<TabsContent value="login">
						<Login04Page />
					</TabsContent>
					<TabsContent value="register">
						<Register />
					</TabsContent>
				</div>
			</Tabs>
		</AuthLayout>
	);
}
