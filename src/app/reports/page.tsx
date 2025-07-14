"use client";
import type React from "react";
import { useState } from "react";
import FilterSidebar, { type FilterValues } from "@/components/FilterSidebar";
import OpportunityImage from "@/app/assets/images/oppo_card.jpg"; // Adjust the path as necessary
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
// import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import ReportCard from "@/components/ReportCard";

const defaultFilters: FilterValues = {
	category: "",
	opportunities: [],
	sectors: [],
	deadlines: [],
};

function Page() {
	const [searchValue, setSearchValue] = useState("");
		const [categoryValue, setCategoryValue] = useState("");
		const [filters, setFilters] = useState<FilterValues>(defaultFilters);
	
		const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			// Add your search logic here
		};
	
		const handleFilterChange = (newFilters: FilterValues) => {
			setFilters(newFilters);
			// Optionally trigger filtering logic here
		};
	
		const handleFilterReset = () => {
			setFilters(defaultFilters);
			// Optionally reset filtering logic here
		};

	return (
		<GeneralLayout withSubscribe={false}>
			<InfoHero
				tag="Reports"
				title="Research Case Studies & Insights"
				description="Explore a curated library of reports, case studies, and data-driven insights shaping the future of impact investing and innovation in Nigeria."
				imageUrl={'/assets/images/what_we_do_banner.png'}
				imageAlt="Reports Banner Image"
				showSearch={true}
				searchValue={searchValue}
				onSearchValueChange={setSearchValue}
				categoryValue={categoryValue}
				onCategoryChange={setCategoryValue}
				onSearch={handleSearch}
			/>
				<section className="">
				<div className="container mx-auto  py-8">
					<div className="flex flex-row gap-8">
						<div className="flex-1">
							<div className="space-y-5 w-full">
								{Array(10)
									.fill(null)
									.map((opportunity, index) => (
										 <ReportCard
										 			key={index + 1}
													title="Mapping the Impact Investing Landscape in Nigeria – 2025"
													byline="Impact Investors Foundation"
													sector="Investment"
													category="Research"
													description="A nationwide overview of Nigeria’s growing impact investing ecosystem—key players, funding trends, regulatory landscape, and strategic gaps to watch in 2025."
													imageSrc={OpportunityImage}
													imageAlt="Report Card Image"
												/>
									))}
							</div>
							<div className="my-8 *:flex justify-center">
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious className="border" href="#" />
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#">1</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink className="" href="#" isActive>
												2
											</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#">3</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationNext className="border" href="#" />
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</div>
						<div className="w-2/6">
							<FilterSidebar
								value={filters}
								onChange={handleFilterChange}
								onReset={handleFilterReset}
							/>
						</div>
					</div>
				</div>
			</section>

		</GeneralLayout>
	);
}

export default Page;
