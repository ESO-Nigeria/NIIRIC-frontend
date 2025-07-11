"use client";

import Image from "next/image";
import React from "react";
import AboutBanner from "@/app/assets/images/about_banner.png";
import Image1 from "@/app/assets/images/banner1.png";
import Image2 from "@/app/assets/images/banner2.png";
import Logo1 from "@/app/assets/images/logo4.png";
import Logo2 from "@/app/assets/images/logo5.png";
import Logo3 from "@/app/assets/images/logo6.png";
import Logo4 from "@/app/assets/images/logo7.png";
import Logo5 from "@/app/assets/images/logo8.png";
import Logo6 from "@/app/assets/images/logo9.png";
import Logo7 from "@/app/assets/images/logo11.png";
import Logo8 from "@/app/assets/images/logo12.png";
import Logo9 from "@/app/assets/images/logo13.png";
import Logo10 from "@/app/assets/images/logo14.png";
import Logo11 from "@/app/assets/images/logo15.png";
import Image3 from "@/app/assets/images/panel.png";
import InfoHero from "@/components/blocks/infoHero";
import DecorativeCurve from "@/components/DecorativeCurve";
import JoinCommunity from "@/components/JoinCommunity";
import { Badge } from "@/components/ui/badge";
import GeneralLayout from "@/layouts/General";

const sponsors = [
	{
		name: "Marblism",
		url: "https://marblism.com/?utm_source=Fazier",
		logo: Logo1,
	},
	{
		name: "Lede",
		url: "https://thelede.ai?ref=Fazier",
		logo: Logo2,
	},
	{
		name: "Zero to SaaS",
		url: "https://www.zerotosaascourse.com?ref=Fazier",
		logo: Logo3,
	},
	{
		name: "Aidbase",
		url: "https://www.aidbase.ai/?utm_source=Fazier&affref=Fazier&affid=4a810c68",
		logo: Logo4,
	},
	{
		name: "Stimpack",
		url: "https://stimpack.io?ref=Fazier",
		logo: Logo5,
	},
	{
		name: "Marblism",
		url: "https://marblism.com/?utm_source=Fazier",
		logo: Logo6,
	},
	{
		name: "Lede",
		url: "https://thelede.ai?ref=Fazier",
		logo: Logo7,
	},
	{
		name: "Zero to SaaS",
		url: "https://www.zerotosaascourse.com?ref=Fazier",
		logo: Logo8,
	},
	{
		name: "Aidbase",
		url: "https://www.aidbase.ai/?utm_source=Fazier&affref=Fazier&affid=4a810c68",
		logo: Logo9,
	},
	{
		name: "Stimpack",
		url: "https://stimpack.io?ref=Fazier",
		logo: Logo10,
	},
	{
		name: "Stimpack",
		url: "https://stimpack.io?ref=Fazier",
		logo: Logo11,
	},
];

function page() {
	return (
		<GeneralLayout>
			<InfoHero
				tag="About Niiric"
				title="Catalyzing Impact Through Research and Collaboration"
				description="Welcome to the Nigerian Impact Investing Research Industry Collaborative (NIIRIC) — a strategic multi-stakeholder initiative dedicated to advancing research, policy, and innovation in Nigeria’s impact investing ecosystem."
				imageUrl={AboutBanner}
				imageAlt="About Us Hero Image"
			/>
			<section>
				<div className="container mx-auto px-4 py-16">
					<div className=" mx-auto grid md:grid-cols-2 gap-12 items-start">
						{/* Image Group */}
						<div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
							<div className="w-[297px] h-[407px] relative rounded-xl overflow-hidden shadow-lg">
								<Image
									src={Image1}
									alt="Facilitator Group"
									fill
									className="object-cover"
								/>
								{/* <div className=""> */}
								{/* </div> */}
							</div>
							<div className="w-[297px] -mb-24 h-[407px] relative rounded-xl overflow-hidden shadow-lg ">
								<Image
									src={Image2}
									alt="Meeting Room"
									fill
									className="object-cover"
								/>
							</div>
							<DecorativeCurve
								className="absolute left-1/2 bottom-16 -translate-x-1/2 translate-y-1/2 scale-x-[-1]"
								style={{ transform: "rotate(-90deg)" }}
							/>
						</div>

						{/* Text Content */}
						<div className="text-base leading-7">
							<Badge variant="primary-brown-25" className="uppercase rounded ">
								{" "}
								ABOUT NIIRIC
							</Badge>
							<p className="text-gray-800 mb-6">
								The Nigerian Impact Investing Research Industry Collaborative
								(NIIRIC), established under the auspices of the Impact Investors
								Foundation (IIF) and the Nigerian Advisory Board on Impact
								Investing (NABII), is actively addressing the critical need for
								high-quality research, cohesive industry collaboration,
								capacity-building, and a robust policy framework in Nigeria.
							</p>
							<p className="text-gray-800 mb-6">
								As the leading collaborative platform, NIIRIC is driving the
								advancement of Nigeria’s impact investing, research, and
								innovation ecosystem. We bring together academia, researchers,
								think tanks, businesses, industry leaders, civil society, and
								policymakers to foster collaboration, enhance capacity, promote
								evidence-based advocacy, and implement impactful initiatives.
								These efforts are transforming Nigeria’s impact investing and
								innovation landscape, accelerating sustainable development
								throughout the country.
							</p>
							<p className="text-gray-800">
								With funding from the Foreign, Commonwealth and Development
								Office, The RISA Fund, and Ford Foundation, NIIRIC continues to
								lead transformative initiatives that empower stakeholders,
								catalyze innovation, and address Nigeria’s most pressing
								development challenges.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-[#F2F5F2] rounded-3xl px-6 py-12 md:py-20 md:px-16 max-w-7xl mx-auto relative overflow-hidden">
				{/* Top Left Decorative Curve (optional) */}
				{/* <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-green-900 rounded-tl-full"></div> */}
				<DecorativeCurve
					className="absolute -left-[34px] top-[2px] "
					style={{ transform: "rotate(-8deg)" }}
				/>
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Vision & Mission Card */}
					<div className="bg-primary-brown/25 rounded-tl-3xl rounded-br-3xl p-8 relative">
						<Badge
							variant="primary-brown-25"
							className="uppercase rounded mb-5"
						>
							{" "}
							OUR VISION & MISSION
						</Badge>
						<h2 className="text-[#003302] text-4xl font-bold mb-4">VISION</h2>
						<p className="text-gray-800 text-base font-medium mb-6">
							To be the foremost collaborative platform propelling the growth of
							Nigeria’s impact investing, research, and innovation ecosystem.
						</p>
						<h2 className="text-[#003302] text-4xl font-bold mb-4">MISSION</h2>
						<p className="text-gray-800 text-base font-medium">
							To foster collaboration, innovation, and research excellence that
							accelerates the growth of Nigeria’s impact investing ecosystem,
							driving sustainable development and transformative change.
						</p>
					</div>

					{/* Right Timeline Stats */}
					<div className="flex flex-col justify-center ">
						{/* Line */}
						<div className="flex relative pb-12">
							<div className="h-full w-10 absolute -inset-2 flex items-center justify-center">
								<div className="h-full w-1 bg-primary-brown/25 pointer-events-none"></div>
							</div>
						</div>
						<div className="flex relative pb-12">
							<div className="h-full w-10 absolute -inset-2 flex items-center justify-center">
								<div className="h-full  w-1 bg-primary-brown/25 pointer-events-none"></div>
							</div>
							<div className="flex-shrink-0 w-7 h-7 mt-2 rounded-full bg-primary-brown inline-flex items-center justify-center text-white relative z-10"></div>
							<div className="flex-grow pl-4">
								<p className="font-bold title-font text-4xl text-[#003302] mb-1 tracking-wider">
									12
								</p>
								<p className="leading-relaxed text-base">Steering Committe</p>
							</div>
						</div>
						<div className="flex relative pb-12">
							<div className="h-full w-10 absolute -inset-2 flex items-center justify-center">
								<div className="h-full  w-1 bg-primary-brown/25 pointer-events-none"></div>
							</div>
							<div className="flex-shrink-0 w-7 h-7 mt-2 rounded-full bg-primary-brown inline-flex items-center justify-center text-white relative z-10"></div>
							<div className="flex-grow pl-4">
								<p className="font-bold title-font text-4xl text-[#003302] mb-1 tracking-wider">
									60+
								</p>
								<p className="leading-relaxed text-base">Registered Members</p>
							</div>
						</div>
						<div className="flex relative pb-12">
							<div className="h-full w-10 absolute -inset-2 flex items-center justify-center">
								<div className="h-full  w-1 bg-primary-brown/25 pointer-events-none"></div>
							</div>
							<div className="flex-shrink-0 w-7 h-7 mt-2 rounded-full bg-primary-brown inline-flex items-center justify-center text-white relative z-10"></div>
							<div className="flex-grow pl-4">
								<p className="font-bold title-font text-4xl text-[#003302] mb-1 tracking-wider">
									Since 2024
								</p>
								<p className="leading-relaxed text-base">Founded</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto px-4 py-16 space-y-3">
					<Badge variant="primary-brown-25" className="uppercase rounded ">
						{" "}
						EXPLORE HIGHLIGHTS
					</Badge>
					<h2 className="text-4xl font-bold text-primary-green leading-12">
						Steering Committee
					</h2>
					<p className="text-gray-800 text-base mb-6">
						To foster collaboration, innovation, and research excellence that
						accelerates the growth of Nigeria’s impact investing ecosystem,
						driving sustainable development and transformative change.
					</p>
					<div className="flex flex-col items-center sm:flex-row sm:flex-wrap gap-8">
						{Array.isArray(sponsors) &&
							sponsors?.map((sponsor, index) => (
								<div
									key={index}
									className="w-1/7 h-[160px] transition-transform duration-300 transform hover:scale-105 flex flex-col items-center justify-center"
								>
									{typeof sponsor.logo === "string" ? (
										<img
											src={sponsor.logo}
											alt={`${sponsor.name} Logo`}
											width={150}
											height={150}
											className="mb-2"
										/>
									) : (
										<Image
											src={sponsor.logo}
											alt={`${sponsor.name} Logo`}
											width={150}
											height={150}
											className="mb-2"
										/>
									)}
								</div>
							))}
					</div>
				</div>
			</section>
			<section className="bg-[#F2F5F2] relative py-20 px-6 lg:px-10">
				<JoinCommunity
					image={Image3}
					imagePosition="right" // or "left"
					// You can also override badgeText, title, description, etc.
				/>
				<DecorativeCurve
					className=""
					style={{ position: "absolute", top: "0", left: "150px" }}
				/>
			</section>
		</GeneralLayout>
	);
}

export default page;
