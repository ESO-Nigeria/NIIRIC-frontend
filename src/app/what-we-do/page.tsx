'use client'
import Image3 from "@/app/assets/images/panel.png";
import InfoHero from "@/components/blocks/infoHero";
import CommunityShowcase from "@/components/CommunityShowcase";
import DecorativeCurve from "@/components/DecorativeCurve";
import JoinCommunity from "@/components/JoinCommunity";
import GeneralLayout from "@/layouts/General";
import { useRouter } from "next/navigation";

// Config-driven showcases
const showcases = [
	{
		image: "/assets/images/partner_2.png",
		imagePosition: "left",
		title: "Mainstreaming Nigeria into Global Impact Investing Landscape",
		description:
			"We are committed to mainstreaming impact investing in Nigeria, and fostering a thriving ecosystem for impact-driven investments. ",
	},
	{
		image: "/assets/images/partner_1.png",
		imagePosition: "right",
		title: "Accelerating Research Commercialization",
		description: [
			"We bridge the gap between groundbreaking research, innovative ideas, and real-world impact by fostering the commercialization of research and innovation into scalable products, services, or ventures that drive economic growth.",
		],
	},
	{
		image: "/assets/images/wed_3.png",
		imagePosition: "left",
		title: "Research & Policy Advocacy",
		description: [
			"We leverage research and policy advocacy to generate evidence, inform decision-making, and shape a supportive policy environment that mainstreams impact investing, research and innovation in Nigeria.",
		],
	},
	{
		image: Image3,
		imagePosition: "right",
		title: "Capacity Building",
		description: [
			"We design capacity-building programs, workshops and seminars tailored to meet the needs of diverse stakeholders and equip individuals, organizations, and institutions with the skills, knowledge, and expertise needed to thrive in the impact investing, research, and innovation sector.",
		],
	},
	{
		image: "/assets/images/wed_5.png",
		imagePosition: "left",
		title: "Industry Collaboration & Engagement",
		description: [
			"We organize key industry events such as the Annual NIIRIC Convening, Industry Brief Sessions, and Policy Dialogue Sessions to promote strategic collaboration among diverse stakeholders and cultivate an ecosystem where partnership is prioritized over competition.",
		],
	},
];

function Page() {
	const router = useRouter()
	return (
		<GeneralLayout>
			<InfoHero
				tag="What we do"
				title="Strengthening Impact Investing Through Research, Innovation, and Policy Collaboration"
				description="Through strategic collaboration, commercialization of research, policy advocacy, and global engagement, NIIRIC drives inclusive growth and systemic change across Nigeria’s impact economy."
				imageUrl="/assets/images/what_we_do_banner.png"
				imageAlt="About Us Hero Image"
			/>

			{/* Showcase Section */}
			<section className="bg-white py-25 px-6 lg:px-10">
				<div className="container mx-auto max-w-7xl space-y-8 sm:space-y-16">
					{showcases.map((item, index) => (
						<CommunityShowcase 
							key={index} 
							{...item} 
							imagePosition={item.imagePosition as "left" | "right"} 
							/>
					))}
				</div>
			</section>

			{/* Join Community Section */}
			<section className="bg-[#F2F5F2] relative py-20 px-6 lg:px-10">
				<JoinCommunity image={Image3} imagePosition="right" primaryButtonText="Become a member"
					onPrimaryClick={() => router.push('/auth/register')}
					onSecondaryClick={() => router.push('/about')} />
				<DecorativeCurve
					className=""
					style={{ position: "absolute", top: "0", left: "150px" }}
				/>
			</section>
		</GeneralLayout>
	);
}

export default Page;
