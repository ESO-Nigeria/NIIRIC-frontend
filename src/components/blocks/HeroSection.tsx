import type React from "react";

const HeroSection: React.FC = () => {
	return (
		<section className="relative bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
					{/* Text Section */}
					<div className="text-center md:text-left">
						<h1 className="text-4xl sm:text-5xl font-semibold text-green-700 mb-6">
							Driving Impact Investing, Research, and Innovation in Nigeria
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							The Nigeria Impact Investing Research Industry Collaborative
							(NIIRIC) is Nigeria’s premier network dedicated to advancing the
							nation’s impact investing, research, and innovation ecosystem.
						</p>
						<div className="flex justify-center md:justify-start space-x-6">
							{/* Buttons */}
							<button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
								Become a member
							</button>
							<button className="px-6 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg shadow-md hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
								Learn More
							</button>
						</div>
					</div>

					{/* Image Section (5 overlapping images) */}
					<div className="relative w-full h-[500px] md:h-[600px]">
						{/* Main Image */}
						<img
							src="/assets/images/hero_image_1.png"
							alt="woman speaking"
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
							style={{ zIndex: 4 }}
						/>

						<img
							src="/assets/images/hero_image_2.png"
							alt="group of people"
							className="absolute bottom-0 right-1/4 transform translate-x-1/2 rounded-full shadow-lg"
							style={{ zIndex: 5 }}
						/>
						{/* Third Image */}
						<img
							src="/assets/images/research.png"
							alt="research icon"
							className="absolute top-[40%] right-[16%] transform translate-x-1/2 translate-y-1/2 "
							style={{ zIndex: 3 }}
						/>

						{/* Fourth Image (Ellipse) */}
						<img
							src="/assets/images/ellipse_1.png"
							alt="ellipse"
							className="absolute top-1/2 left-[48%] transform -translate-x-1/2 translate-y-1/2 "
							style={{ zIndex: 2 }}
						/>

						{/* Fifth Image (Ellipse) */}
						<img
							src="/assets/images/ellipse_2.png"
							alt="ellipse"
							className="absolute top-[48%] left-1/2 transform -translate-x-1/2 translate-y-2/3 "
							style={{ zIndex: 1 }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
