import { ArrowRight } from "lucide-react";
import Image from "next/image";
import OverlayImage from "@/app/assets/images/header_rectangle.png";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="relative w-full  overflow-hidden py-20  md:py-32  bg-[#F2F5F2] px-6 lg:px-8">
			<div className="absolute inset-0 bg-[#000000A8] z-10" />
			<Image
				src={`${"/assets/images/what_we_do_banner.png"}`}
				alt={"banner"}
				fill
				className="object-cover"
				priority
			/>
			<div className="container mx-auto relative z-10 ">
				<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-[705px_1fr]">
					{/* Left Content */}
					<div>
						<h1 className="font-bold text-3xl text-white  md:text-5xl leading-tight">
							Driving Impact Investing, Research, and Innovation in Nigeria
						</h1>
						<p className="mt-5 sm:mt-8 text-sm sm:text-base text-white leading-7">
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
				</div>
			</div>
		</section>
	);
}
