import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="relative pb-20  md:pb-32  bg-[#F2F5F2] px-6 lg:px-8">
			<div className="container mx-auto relative z-10">
				<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
					{/* Left Content */}
					<div>
						<h1 className="font-bold text-3xl text-primary-green  md:text-5xl leading-tight">
							Driving Impact Investing, Research, and Innovation in Nigeria
						</h1>
						<p className="mt-5 sm:mt-8 text-sm sm:text-base text-main-text-color leading-7">
							The Nigeria Impact Investing Research Industry Collaborative
							(NIIRIC) is Nigeria’s premier network dedicated to advancing the
							nation’s impact investing, research, and innovation ecosystem.
						</p>

						<div className="mt-10 sm:flex sm:items-center space-x-4 sm:space-x-8">
							<Button
								variant="primary-green"
								className="text-base h-12  mt-4 sm:mt-0"
							>
								Become a member <ArrowRight className="size-5" />{" "}
							</Button>
							<Button
								variant="primary-brown"
								className="text-base mt-4 h-12 sm:mt-0"
							>
								Learn More <ArrowRight className="size-5" />
							</Button>
						</div>
					</div>

					{/* Right Image */}

					<div className="relative w-full h-[500px] md:h-[600px]">
						{/* Main Image */}
						<img
							src="/assets/images/hero_image_1.png"
							alt="woman speaking"
							className="scale-in-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg border-16 border-white"
							style={{ zIndex: 4 }}
						/>

						<img
							src="/assets/images/hero_image_2.png"
							alt="group of people"
							className="scale-in-center absolute bottom-0 right-1/4 transform translate-x-1/2 rounded-full shadow-lg"
							style={{ zIndex: 5 }}
						/>
						{/* Third Image */}
						<img
							src="/assets/images/research.png"
							alt="research icon"
							className="slide-in-tr absolute top-[61%] 2xl:top-[59%] right-[93px] 2xl:right-[21%] transform translate-x-1/2 -translate-y-1/2 "
							style={{ zIndex: 3 }}
						/>

						{/* Fourth Image (Ellipse) */}
						<img
							src="/assets/images/ellipse_1.png"
							alt="ellipse"
							className="slide-in-bl absolute top-1/2 left-[52%] transform -translate-x-1/2 translate-y-1/2 "
							style={{ zIndex: 2 }}
						/>

						{/* Fifth Image (Ellipse) */}
						<img
							src="/assets/images/ellipse_2.png"
							alt="ellipse"
							className="slide-in-bl absolute top-[48%] left-[54%] transform -translate-x-1/2 translate-y-2/3 "
							style={{ zIndex: 1 }}
						/>
					</div>
				</div>
			</div>
			<div className="absolute right-0 top-0 h-full">
				<img
					src="/assets/images/rectangle.png"
					alt="Secondary"
					className="object-cover w-full h-full slide-in-tr"
				/>
			</div>
		</section>
	);
}
