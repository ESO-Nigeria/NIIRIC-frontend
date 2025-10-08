import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

// If you want multiple slides later, just add more objects to this array.
const slides = [
	{
		id: 1,
		imgSrc: "/assets/images/solar_panel_farm.png",
		imgAlt: "NIIRIC banner",
		heading: "Driving Impact Investing, Research, and Innovation in Nigeria",
		body: "The Nigeria Impact Investing Research Industry Collaborative (NIIRIC) is Nigeria’s premier network dedicated to advancing the nation’s impact investing, research, and innovation ecosystem.",
	},
	{
		id: 2,
		imgSrc: "/assets/images/about_banner.png",
		imgAlt: "NIIRIC banner",
		heading: "Driving Impact Investing, Research, and Innovation in Nigeria",
		body: "The Nigeria Impact Investing Research Industry Collaborative (NIIRIC) is Nigeria’s premier network dedicated to advancing the nation’s impact investing, research, and innovation ecosystem.",
	},
];

export default function HeroCarouselWithIndicatorsAndAutoplay() {
	return (
		<section className="relative w-full overflow-hidden bg-[#F2F5F2]">
			{/* Carousel only for images */}
			<Carousel
				opts={{ align: "start", loop: true, autoplay: true, interval: 5000 }}
				className="w-full"
			>
				<CarouselContent>
					{slides.map((slide) => (
						<CarouselItem key={slide.id} className="p-0">
							{/* Background Image */}
							<div className="relative w-full h-[520px] md:h-[680px]">
								<Image
									src={slide.imgSrc}
									alt={slide.imgAlt}
									fill
									priority
									className="object-cover"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{/* Dot Indicators */}
				<div className="absolute bottom-15 left-1/2 transform z-30   -translate-x-1/2 flex gap-2">
					{/* {slides.map((_, index) => ( */}
					<CarouselDots
						selectedstyle="bg-[#D1AE6F] !w-4 !h-2 rounded-full"
						dotstyle="w-2.5 h-2 rounded-full "
						className=" rounded-full"
					/>
					{/* ))} */}
				</div>
			</Carousel>

			{/* Fixed Text Overlay with Background */}
			<div className="absolute inset-0 z-10 flex items-center justify-center">
				<div className=" bg-black/70 py-20  md:py-32 px-6 lg:px-8  h-full w-full">
					<div className="container mx-auto relative z-10 ">
						<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-[705px_1fr]">
							{/* Left Content */}
							<div>
								<h1 className="font-bold font-poppins text-3xl text-white  md:text-5xl leading-tight">
									Driving Impact Investing, Research, and Innovation in Nigeria
								</h1>
								<p className="mt-5 font-poppins sm:mt-8 text-sm sm:text-base text-white leading-7">
									The Nigeria Impact Investing Research Industry Collaborative
									(NIIRIC) is Nigeria’s premier network dedicated to advancing
									the nation’s impact investing, research, and innovation
									ecosystem.
								</p>

								<div className="mt-10 sm:flex sm:items-center space-x-4 sm:space-x-8">
									<Link
										href={"/auth/register"}
										className={clsx(
											buttonVariants({ variant: "primary-green" }),
											"text-base mt-4 h-12 sm:mt-0",
										)}
									>
										Become a member <ArrowRight className="size-5" />{" "}
									</Link>
									<Link
										href={"/about"}
										className={clsx(
											buttonVariants({ variant: "primary-brown" }),
											"text-base mt-4 h-12 sm:mt-0",
										)}
									>
										Learn More <ArrowRight className="size-5" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
