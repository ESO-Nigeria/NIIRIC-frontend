import React from "react";
import Image3 from "@/app/assets/images/panel.png";
import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import InfoHero from "@/components/blocks/infoHero";
import CommunityShowcase from "@/components/CommunityShowcase";
import DecorativeCurve from "@/components/DecorativeCurve";
import JoinCommunity from "@/components/JoinCommunity";
import GeneralLayout from "@/layouts/General";

function page() {
	return (
		<>
			<GeneralLayout>
				<InfoHero
					tag="What we do"
					title="Strengthening Impact Investing Through Research, Innovation, and Policy Collaboration"
					description="Through strategic collaboration, commercialization of research, policy advocacy, and global engagement, NIIRIC drives inclusive growth and systemic change across Nigeria’s impact economy."
					imageUrl={PageBanner}
					imageAlt="About Us Hero Image"
				/>
				<section className="bg-white py-25 px-6 lg:px-10">
					<div className="container mx-auto max-w-7xl space-y-8 sm:space-y-16">
						<CommunityShowcase
							image={Image3}
							imagePosition="left" // or "left"
							title="Research and Innovation to Commercialization"
							description="At NIIRIC, we bridge the gap between groundbreaking research, innovative ideas, and real-world impact by fostering the commercialization of research and innovation. Our aim is to ensure that ideas and solutions developed within Nigeria’s academic, research, and entrepreneurial communities are effectively transformed into scalable products, services, or ventures that drive sustainable development. We work closely with researchers, innovators, and industry stakeholders to identify viable solutions to pressing societal challenges. By providing strategic guidance, resources, and connections, we enable the seamless transition from conceptual ideas to market-ready innovations."
						/>
						<CommunityShowcase
							image={Image3}
							imagePosition="right" // or "left"
							title="Industry Collaboration and Engagement"
							description={[
								"One of NIIRIC’s core mandates is to create and sustain an ecosystem that fosters collaboration among diverse stakeholders to drive impactful research and innovation. Achieving sustainable growth in Nigeria’s impact investing and innovation sector requires the combined efforts of academia, industry, government, civil society, and investors. ",
								"By building networks that connect stakeholders across sectors, facilitating knowledge sharing through workshops, conferences, and discussions, and promoting multi-sectoral projects that leverage the strengths of each stakeholder group, NIIRIC ensures that innovation is inclusive, impactful, and aligned with shared goals. Through these efforts, we bridge gaps, create synergies, and accelerate the transformation of ideas into tangible solutions that advance Nigeria’s development.",
							]}
						/>
						<CommunityShowcase
							image={Image3}
							imagePosition="left" // or "left"
							title="Policy Advocacy"
							description={[
								"We are deeply committed to advocating for policies that create a conducive environment for the growth and sustainability of Nigeria’s impact investing, research, and innovation sectors. Our policy advocacy efforts focus on influencing public policy, shaping regulatory frameworks, and advancing legislative initiatives that foster collaboration, innovation, and investment in research and development.",
								"We work closely with government bodies, policymakers, industry leaders, and civil society organizations to ensure that the voices of key stakeholders are heard and represented in policy discussions. By providing data-driven insights and evidence-based recommendations, we aim to influence decisions that create an enabling environment for innovation, address regulatory barriers, and promote sustainable development in Nigeria. Our advocacy initiatives include engaging in dialogues, organizing policy forums, and contributing to the formulation of policies that align with global best practices while addressing local challenges. Through these efforts, NIIRIC ensures that the policy landscape supports the growth of impact investing, research, and innovation, contributing to long-term, systemic change for Nigeria’s socio-economic development.",
							]}
						/>
						<CommunityShowcase
							image={Image3}
							imagePosition="right" // or "left"
							title="Capacity Building"
							description={[
								"At NIIRIC, we prioritize building the skills, knowledge, and expertise of stakeholders to strengthen Nigeria’s impact investing, research, and innovation sectors. Our capacity-building initiatives are designed to equip individuals, organizations, and institutions with the tools they need to navigate and thrive in a dynamic and rapidly evolving environment.",
								"We provide a range of training programs, workshops, and seminars tailored to meet the needs of diverse stakeholders, including researchers, policymakers, businesses, and civil society organizations. ",
								"These initiatives cover a variety of topics, such as impact investing, research and innovation commercialization, research methodologies, impact measurement etc.",
								"Our capacity-building efforts are also aimed at creating a network of informed and skilled professionals who can drive impactful change, contribute to the scaling of innovations, and influence policies that advance the nation’s development goals. Through strategic partnerships and collaborations with the academia, global experts, and industry leaders, NIIRIC ensures that its capacity-building programs align with international best practices and address the specific needs of Nigeria’s impact investing, research and innovation landscape.",
							]}
						/>
						<CommunityShowcase
							image={Image3}
							imagePosition="left" // or "left"
							title="Mainstreaming Nigeria into the Global Impact Investment Landscape"
							description={[
								"NIIRIC is committed to positioning Nigeria as a key player in the global impact investing ecosystem. We strive to integrate Nigeria into the global landscape by fostering connections between local innovators, impact investors, and international markets. Our efforts focus on enhancing Nigeria’s visibility, encouraging cross-border collaborations, and aligning local impact investing practices with global standards.",
								"By mainstreaming Nigeria into the global impact investing network, we not only enhance the country’s global standing but also accelerate sustainable development by attracting investments that address local challenges. This approach positions Nigeria for growth, innovation, and leadership in sustainable development, ensuring a long-term, positive impact on the nation’s socio-economic progress.",
							]}
						/>
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
		</>
	);
}

export default page;
