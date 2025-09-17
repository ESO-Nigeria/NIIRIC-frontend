import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Image1 from "@/app/assets/images/banner1.png";
import Image2 from "@/app/assets/images/banner2.png";
import Image3 from "@/app/assets/images/panel.png";
// C:\Users\HomePC\Documents\work\niimric_next\public\assets\images\section_banner.png
// import SectionBanner from "@/public/assets/images/section_banner.png";
import CaseCard from "@/components/blocks/CaseCard";
import Carousel from "@/components/blocks/carousel";
import { EventsCarousel } from "@/components/blocks/EventsCarousel";
import HeroCarouselWithIndicatorsAndAutoplay from "@/components/blocks/HeroWithSlider";
import Hero from "@/components/blocks/hero";
import DecorativeCurve from "@/components/DecorativeCurve";
import JoinCommunity from "@/components/JoinCommunity";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import GeneralLayout from "@/layouts/General";

const features = [
	{
		image: "/assets/images/partner_2.png",
		icon: ArrowUpRight,
		title: "Research and Innovation to Commercialization",
		description:
			"At NIIRIC, we bridge the gap between groundbreaking research, innovative ideas, and real-world impact by fostering the commercialization of research and..",
	},
	{
		image: "/assets/images/partner_1.png",
		icon: ArrowUpRight,
		title: "Industry Collaboration and Engagement",
		description:
			"One of NIIRIC’s core mandates is to create and sustain an ecosystem that fosters collaboration among diverse stakeholders to drive impactful research and innovation.",
	},
	{
		image: "/assets/images/partner_3.png",
		icon: ArrowUpRight,
		title: "Policy Advocacy",
		description:
			"At NIIRIC, we are deeply committed to advocating for policies that create a conducive environment for the growth and sustainability of Nigeria’s impact investing...",
	},
	{
		image: "/assets/images/partner_4.png",
		icon: ArrowUpRight,
		title: "Capacity Building",
		description:
			"We prioritize building the skills, knowledge, and expertise of stakeholders to strengthen Nigeria’s impact investing, research, and innovation sectors.",
	},
	{
		image: "/assets/images/partner_5.png",
		icon: ArrowUpRight,
		title: "Mainstreaming Nigeria into Global Impact Investing Landscape",
		description:
			"One of NIIRIC’s core mandates is to create and sustain an ecosystem that fosters collaboration among diverse..",
	},
];

export default function Home() {
	return (
		<GeneralLayout>
			<HeroCarouselWithIndicatorsAndAutoplay />
			{/* <Hero /> */}

			<section className=" relative py-20 px-6 lg:px-10 lg:h-[600px] -top-1/5">
				<JoinCommunity
					image={"/assets/images/section_banner.png"}
					imagePosition="left" // or "left"
					// You can also override badgeText, title, description, etc.
					badgeText="About Niric"
					title="Catalyzing Impact Through Research and Collaboration"
					description="The Nigerian Impact Investing Research Industry Collaborative
									(NIIRIC), established under the auspices of the Impact
									Investors Foundation (IIF) and the Nigerian Advisory Board on
									Impact Investing (NABII), is actively addressing the critical
									need for high-quality research, cohesive industry
									collaboration,capacity-building, and a robust policy framework
									in Nigeria."
					containerClassName="gap-x-8 sm:gap-x-16 py-5 lg:py-0 -mt-[30%] lg:mt-0  rounded-lg lg:h-[669px] -top-[26%] bg-white px-4 lg:px-8 shadow-lg absolute z-10"
					secondaryButtonText={false}
					primaryButtonText="Learn More"
				/>
			</section>

			<section className="bg-primary-green py-12 lg:py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<div className="space-y-4">
						<Badge
							variant="primary-brown-25"
							className="uppercase rounded-8 text-white bg-[#FFFFFF40]"
						>
							What we do
						</Badge>
						<h2 className="text-3xl font-bold w-full lg:w-1/2 text-white leading-12 sm:text-4xl">
							<span className="block">
								Empowering Impact Through Research, Partnerships, and Innovation
							</span>
						</h2>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="flex flex-col  rounded-xl bg-white  gap-5"
							>
								<div className=" flex items-center justify-center rounded-full">
									{/* <feature.icon className="size-6" /> */}
									<img
										src={feature?.image}
										alt=""
										className="w-full object-cover rounded-t-lg"
										loading="lazy"
									/>
								</div>
								<div className="gap-y-4 flex flex-col  pb-5 px-5">
									<span className="text-base font-medium text-primary-green">
										{feature.title}
									</span>
									<p className="text-main-text-color text-sm leading-6">
										{feature.description}
									</p>
								</div>

								{/* <div> */}
								{/* <div className="flex size-8 items-center justify-center bg-primary-green/34 rounded-full p-2">
									<feature.icon className="size-5" />
								</div> */}
								{/* </div> */}
							</div>
						))}
					</div>
				</div>
			</section>
			{/* */}

			<section className="bg-white py-12 lg:py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<Carousel />
				</div>
			</section>
			<section className="bg-primary-brown py-12 lg:py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<div className="space-y-4">
						<Badge variant="primary-brown-25" className="uppercase rounded-8 ">
							LATEST RESEARCH & PUBLICATIONS
						</Badge>
						<h2 className="text-3xl flex justify-between items-center font-bold text-primary-green leading-12 sm:text-4xl">
							<span className="block">
								Research, Case Studies and Industry Insights{" "}
							</span>
							<Link
								href="/research"
								className={`${buttonVariants({
									variant: "primary-green",
									size: "lg",
								})} !hidden lg:inline-flex`}
							>
								See All <ArrowRight className="size-5 inline" />
							</Link>
						</h2>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3  gap-6">
						{Array.from({ length: 10 }).map((_, index) => (
							<div
								key={index}
								className="flex items-center justify-center border rounded-lg bg-gray-50"
							>
								{/* <img src={`/images/partners/partner-${index + 1}.png`} alt={`Partner ${index + 1}`} className="h-12" /> */}
								<CaseCard
									imageUrl="/assets/images/doc_images.png"
									title="Driving Impact Investing, Research, and Innovation in Nigeria"
									author="Stephen Ajose"
									abstract="We performed a survey of grassland communities in the Ukrainian Carpathians with the aim of: (1) syntaxonomically..."
									link="/blog/impact"
								/>
							</div>
						))}
					</div>
					<div className="flex justify-center">
						<Link
							href="/research"
							className={`${buttonVariants({
								variant: "primary-green",
								size: "lg",
							})} inline lg:hidden mt-6 mx-auto`}
						>
							See All <ArrowRight className="size-5 inline" />
						</Link>
					</div>
				</div>
			</section>

			<section className="bg-white relative py-12 lg:py-20 px-6 lg:px-10">
				<JoinCommunity
					image={Image3}
					imagePosition="right" // or "left"
				/>
				<DecorativeCurve
					className=""
					style={{ position: "absolute", top: "0", left: "150px" }}
				/>
			</section>
			<section className="bg-[#F2F5F2] py-12 lg:py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<div className="space-y-4 text-center">
						<Badge variant="primary-brown-25" className="uppercase rounded-8 ">
							Gallery
						</Badge>
						<h2 className="text-3xl font-bold text-primary-green leading-12 sm:text-4xl">
							<span className="block">Snapshots of Events</span>
						</h2>
					</div>
					<div className="">
						<EventsCarousel />
					</div>
				</div>
			</section>
		</GeneralLayout>
	);
}
