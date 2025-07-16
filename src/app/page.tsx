import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Image1 from "@/app/assets/images/banner1.png";
import Image2 from "@/app/assets/images/banner2.png";
import Image3 from "@/app/assets/images/panel.png";
import CaseCard from "@/components/blocks/CaseCard";
import Carousel from "@/components/blocks/carousel";
import { EventsCarousel } from "@/components/blocks/EventsCarousel";
import Hero from "@/components/blocks/hero";
import DecorativeCurve from "@/components/DecorativeCurve";
import JoinCommunity from "@/components/JoinCommunity";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import GeneralLayout from "@/layouts/General";

const features = [
	{
		icon: ArrowUpRight,
		title: "Research and Innovation to Commercialization",
		description:
			"At NIIRIC, we bridge the gap between groundbreaking research, innovative ideas, and real-world impact by fostering the commercialization of research and..",
	},
	{
		icon: ArrowUpRight,
		title: "Industry Collaboration and Engagement",
		description:
			"One of NIIRIC’s core mandates is to create and sustain an ecosystem that fosters collaboration among diverse stakeholders to drive impactful research and innovation.",
	},
	{
		icon: ArrowUpRight,
		title: "Policy Advocacy",
		description:
			"At NIIRIC, we are deeply committed to advocating for policies that create a conducive environment for the growth and sustainability of Nigeria’s impact investing...",
	},
	{
		icon: ArrowUpRight,
		title: "Capacity Building",
		description:
			"We prioritize building the skills, knowledge, and expertise of stakeholders to strengthen Nigeria’s impact investing, research, and innovation sectors.",
	},
	{
		icon: ArrowUpRight,
		title: "Mainstreaming Nigeria into Global Impact Investing Landscape",
		description:
			"One of NIIRIC’s core mandates is to create and sustain an ecosystem that fosters collaboration among diverse..",
	},
];

export default function Home() {
	return (
		<GeneralLayout>
			<Hero />
			{/* <HeroSection /> */}
			<section className="bg-white py-20 px-6 lg:px-8">
				<div className="  container mx-auto  overflow-hidden relative lg:flex lg:items-center">
					<div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
						<div className=" relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
							<div className="w-[297px] h-[407px] relative rounded-xl overflow-hidden shadow-lg">
								<Image
									src={Image1}
									alt="Facilitator Group"
									fill
									className="object-cover"
								/>
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
						<div className="text-base leading-7">
							<div className="max-w-2xl mx-auto lg:mx-0 lg:pl-10 lg:pr-0 lg:text-left">
								<h2 className="text-3xl font-bold text-primary-green leading-12   sm:text-4xl">
									<span className="block">
										Catalyzing Impact Through Research and Collaboration
									</span>
								</h2>
								<p className="text-base  text-main-text-color mt-4 sm:mt-6 leading-7">
									The Nigerian Impact Investing Research Industry Collaborative
									(NIIRIC), established under the auspices of the Impact
									Investors Foundation (IIF) and the Nigerian Advisory Board on
									Impact Investing (NABII), is actively addressing the critical
									need for high-quality research, cohesive industry
									collaboration,capacity-building, and a robust policy framework
									in Nigeria.
								</p>
								<div className="mt-10 sm:flex sm:items-center space-x-4 sm:space-x-8">
									<Button
										variant="primary-green"
										className="text-base mt-4 h-12 sm:mt-0"
									>
										Learn More <ArrowRight className="size-5" />
									</Button>
								</div>
							</div>
						</div>
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

			<section className="bg-primary-brown py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<div className="space-y-4">
						<Badge
							variant="primary-brown-25"
							className="uppercase rounded-8 bg-[#FFFFFF40]"
						>
							What we do
						</Badge>
						<h2 className="text-3xl font-bold text-white leading-12 sm:text-4xl">
							<span className="block">
								Empowering Impact Through Research and Collaboration
							</span>
						</h2>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="flex flex-col border rounded-xl bg-white py-6 px-5 gap-5"
							>
								<div className=" size-16 flex items-center justify-center bg-primary-green rounded-full">
									{/* <feature.icon className="size-6" /> */}
								</div>
								<span className="text-base font-medium text-primary-green">
									{feature.title}
								</span>
								<p className="text-main-text-color text-sm leading-6">
									{feature.description}
								</p>
								{/* <div> */}
								<div className="flex size-8 items-center justify-center bg-primary-green/34 rounded-full p-2">
									<feature.icon className="size-5" />
								</div>
								{/* </div> */}
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

			<section className="bg-white py-20 px-6 lg:px-8">
				<div className="container mx-auto space-y-6">
					<Carousel />
				</div>
			</section>
			<section className="bg-primary-brown/25 py-20 px-6 lg:px-8">
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
								className={buttonVariants({
									variant: "primary-green",
									size: "lg",
								})}
							>
								See All <ArrowRight className="size-5 inline" />
							</Link>
						</h2>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3  gap-6">
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
				</div>
			</section>

			<section className="bg-[#F2F5F2] py-20 px-6 lg:px-8">
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
