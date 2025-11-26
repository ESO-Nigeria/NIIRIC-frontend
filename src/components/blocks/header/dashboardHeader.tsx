"use client";
import { Badge, Book, File, Menu, Search, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/app/assets/images/iif_logo.png";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { isTokenValid } from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetProfileQuery, useGetUserProfileQuery } from "@/store/features/auth/actions";
import { logoutUser, setProfile } from "@/store/features/auth/auth.slice";
import {
	selectAuthenticatedUser,
	selectCurrentUser,
} from "@/store/features/auth/selectors";
import UserAvatarMenu from "./UserProfile";
import { Profile } from "@/components/types/profile";
import { useRouter } from "next/navigation";

const TopMenu = [
	{ name: "Timeline", href: "/dashboard/publications/timeline" },
	{
		name: "Resources",
		Dropdown: [
			{
				title: "Resources",
				description:
					"The latest research papers, case studies, and industry insights",
				icon: (
					<File
						className="size-5 shrink-0 text-primary-green"
						strokeWidth={3}
					/>
				),
				href: "/reports",
			},
			{
				title: "Opportunities",
				description:
					"Explore Opportunities for Growth, Funding, and Career Advancement",
				icon: (
					<Search
						className="size-5 shrink-0 text-primary-green"
						strokeWidth={3}
					/>
				),
				href: "/opportunities",
			},
		],
	},
	{
		name: "Events",
		Dropdown: [
			{
				title: "Upcoming Events",
				description: "Check out our upcoming events and webinars",
				icon: <Trees className="size-5 shrink-0" />,
				href: "/events/upcoming",
			},
			{
				title: "Past Events",
				description: "Explore our past events and webinars",
				icon: <Book className="size-5 shrink-0" />,
				href: "/events/past",
			},
		],
	},
];

export default function DashBoardHeader({userProfile}: {userProfile: Profile}) {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(selectCurrentUser);
	const token = useSelector((state: RootState) => state.auth.token);

	const { data } = useGetProfileQuery(token!, {
		skip: !token || !isTokenValid(token),
	});

	const { data: profile } = useGetUserProfileQuery(token!, {
		skip: !token || !isTokenValid(token),
	});

	const handleLogout = () => {
		dispatch(logoutUser());
		router.push('/auth/login');
	};

	useEffect(() => {
		dispatch(setProfile(data));
	}, [data]);

	return (
		<header className="w-full py-4 px-6 lg:px-8 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
			<div className=" mx-auto">
				<nav className="hidden justify-between lg:flex">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<Link href="/" className="flex w-23 h-9 items-center gap-1">
								<Image
									src={Logo}
									alt={"IIF_Logo"}
									width={92}
									height={36}
									className="object-cover w-full h-full object-center"
								/>
							</Link>
						</div>
					</div>
					<div className="items-center flex gap-6">
						<div className="flex items-center">
							<NavigationMenu className="relative z-[100]">
								<NavigationMenuList>
									{TopMenu.map((menu, idx) =>
										menu.Dropdown ? (
											<NavigationMenuItem key={idx}>
												<NavigationMenuTrigger className="bg-transparent">
													{menu.name}
												</NavigationMenuTrigger>
												<NavigationMenuContent className="z-[100]">
													{menu.name === "Getting Started" ? (
														<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
															<li className="row-span-3">
																<NavigationMenuLink asChild>
																	<Link
																		className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
																		href="/"
																	>
																		<Badge className="h-6 w-6" />
																		<div className="mb-2 mt-4 text-lg font-medium">
																			shadcn/ui
																		</div>
																		<p className="text-sm leading-tight text-muted-foreground">
																			Beautifully designed components that you
																			can copy and paste into your apps.
																			Accessible. Customizable. Open Source.
																		</p>
																	</Link>
																</NavigationMenuLink>
															</li>
															{menu.Dropdown.map((item, idx) => (
																<ListItem
																	key={idx}
																	href={item.href}
																	title={item.title}
																>
																	{item.description} {item.href}
																</ListItem>
															))}
														</ul>
													) : (
														<ul className="w-80 p-3">
															{menu.Dropdown.map((item, index) => (
																<li key={index} className="group">
																	<NavigationMenuLink asChild>
																		<Link
																			className={cn(
																				"flex flex-row select-none hover:bg-primary-brown/25 gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors",
																			)}
																			href={item.href}
																		>
																			<span className="transition-colors text-primary-green group-hover:text-primary">
																				{item.icon}
																			</span>
																			<div>
																				<div className="text-base text-primary-green font-semibold">
																					{item.title}
																				</div>
																				<p className="text-sm leading-snug text-main-text-color mt-0.5">
																					{item.description}
																				</p>
																			</div>
																		</Link>
																	</NavigationMenuLink>
																</li>
															))}
														</ul>
													)}
												</NavigationMenuContent>
											</NavigationMenuItem>
										) : (
											<NavigationMenuItem key={idx}>
												<Link
													className={buttonVariants({ variant: "ghost" })}
													href={menu.href}
												>
													{menu.name}
												</Link>
											</NavigationMenuItem>
										),
									)}
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					{(!token || !isTokenValid(token)) && (
						<div className="flex gap-2">
							<Link
								href="/auth/login"
								className={buttonVariants({ variant: "ghost" })}
							>
								Log in
							</Link>
							<Link
								href="/auth/register"
								className={buttonVariants({ variant: "primary-green" })}
							>
								Sign up
							</Link>
						</div>
					)}

					{(token || isTokenValid(token)) && (
						<UserAvatarMenu user={profile ?? user}  profile={profile} handleLogout={handleLogout} />
					)}
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Link href="/" className="flex w-23 h-9 items-center gap-1">
								<Image
									src={Logo}
									alt={"IIF_Logo"}
									width={92}
									height={36}
									className="object-cover w-full h-full object-center"
								/>
							</Link>
						</div>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant={"outline"} size={"icon"}>
									<Menu className="size-4 " />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto px-4">
								<SheetHeader className="pb-4 px-0 border-b">
									<SheetTitle>
										<Link href="/" className="flex w-23 h-9 items-center gap-1">
											<Image
												src={Logo}
												alt={"IIF_Logo"}
												width={92}
												height={36}
												className="object-cover w-full h-full object-center"
											/>
										</Link>
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col">
									{TopMenu.map((menu, idx) =>
										menu.Dropdown ? (
											<Accordion
												key={idx}
												type="single"
												collapsible
												className="w-full mb-1"
											>
												<AccordionItem
													value={menu.name}
													className="border-b border-border/40"
												>
													<AccordionTrigger className="py-3 font-medium hover:no-underline text-base">
														{menu.name}
													</AccordionTrigger>
													<AccordionContent className="pt-2 pb-3">
														<div className="flex flex-col space-y-3">
															{menu.Dropdown.map((item, index) => (
																<Link
																	key={index}
																	className={cn(
																		"flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
																	)}
																	href={item.href}
																>
																	<div className="flex-shrink-0 text-primary">
																		{item.icon}
																	</div>
																	<div>
																		<div className="font-medium text-sm">
																			{item.title}
																		</div>
																		<p className="text-xs text-muted-foreground mt-0.5">
																			{item.description}
																		</p>
																	</div>
																</Link>
															))}
														</div>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										) : (
											<Link
												key={idx}
												href={menu.href}
												className="py-3 px-1 font-medium text-base border-b border-border/40 flex items-center"
											>
												{menu.name}
											</Link>
										),
									)}
								</div>
								<div className="border-t pt-4">
									<div className="mt-2 flex flex-col gap-2">
										<Link
											href="/auth/login"
											className={buttonVariants({ variant: "ghost" })}
										>
											Log in
										</Link>
										<Link
											href="/auth/register"
											className={buttonVariants({ variant: "default" })}
										>
											Sign up
										</Link>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
