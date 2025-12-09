"use client";
import type React from "react";
import { useMemo, useState } from "react";
import OpportunityImage from "@/app/assets/images/oppo_card.jpg"; // Adjust the path as necessary
import { EmptyState } from "@/components/blocks/EmptyState";
// import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import InfoHero from "@/components/blocks/infoHero";
import FilterSidebar, { type FilterValues } from "@/components/FilterSidebar";
import OpportunityCard from "@/components/OpportunityCard";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import GeneralLayout from "@/layouts/General";
import { useGetOpportunitiesQuery } from "@/store/features/opportunities/actions";
import PaginationControls from "@/components/common/Pagination";
import { Opportunity } from "@/components/types/opportunity";

const defaultFilters: FilterValues = {
  category: "",
  deadline: "",
  eligibility: "",
  funding_types: [],
  job_levels: [],
  job_types: [],
  locations: [],
  ordering: "",
  program_formats: [],
  program_types: [],
  sectors: [],
  target_groups: [],
  page_size: 3,
};
function Page() {
	const [inputValue, setInputValue] = useState("");   // typing only
	const [searchValue, setSearchValue] = useState(""); // applied to API
	const [categoryValue, setCategoryValue] = useState("");
	const [filters, setFilters] = useState<FilterValues>(defaultFilters);
	  const [currentPage, setCurrentPage] = useState(1);
		const queryParams = useMemo(
		() => ({
			...filters,
			search: searchValue || undefined, // API search
			category: categoryValue || undefined, // category filter
			page: currentPage,
		}),
		[filters, currentPage, searchValue, categoryValue]
		);



	const { data, isLoading } = useGetOpportunitiesQuery(queryParams);

	const handleSearch = () => {
	setSearchValue(inputValue);  //  apply search
	setCurrentPage(1);
	};


	const handleFilterChange = (newFilters: FilterValues) => {
		setFilters(newFilters);
		 setCurrentPage(1); 
		// Optionally trigger filtering logic here
	};

	const handleFilterReset = () => {
		setFilters(defaultFilters);
		 setCurrentPage(1); 
		// Optionally reset filtering logic here
	};

	return (
		<GeneralLayout withSponsors={false} withSubscribe={false}>
			<InfoHero
				tag="Opportunities"
				title="Explore Opportunities for Growth, Funding, and Career Advancement"
				description="Stay updated on curated opportunities in funding, training, fellowships, and impact-driven careers tailored for professionals, entrepreneurs, and organizations in Nigeria’s impact investing ecosystem."
				imageUrl={"/assets/images/what_we_do_banner.png"}
				imageAlt="Opportunities Banner Image"
				showSearch={true}
				searchValue={searchValue}
				placeholderText="Looking for funding, training, jobs?"
				onSearchValueChange={(value) => {
				setInputValue(value);

				// If input is cleared, remove active filter
				if (value.trim() === "") {
					setSearchValue("");
					setCurrentPage(1);
				}
				}}

				categoryValue={categoryValue}
				onCategoryChange={(value) => {
				setCategoryValue(value);
				setCurrentPage(1);
				}}

				onSearch={handleSearch}
			/>
			<section className="">
				<div className="container mx-auto  py-8">
					<div className="flex flex-row gap-8">
						<div className="flex-1">
							{isLoading && <Skeleton className="h-44 w-full" />}
							{data?.results?.length === 0 && (
								<EmptyState
									title="No Results Found"
									description="We couldn’t find any reports matching your filters. Try adjusting your keywords,  selections or to start fresh."
								/>
							)}
							{!isLoading && data?.results?.length > 0 && (
								<div className="space-y-5 w-full">
									{data?.results?.map((opportunity: Opportunity) => (
											<OpportunityCard
												key={opportunity?.id}
												imageSrc={OpportunityImage}
												imageAlt="Opportunity image"
												title={opportunity?.title}
												deadline={opportunity?.deadline}
												type={opportunity?.funding_types?.map((s: any) => s.name).join(", ")}
												sector={opportunity?.sectors?.map((s: any) => s.name).join(", ")}
												description={opportunity?.description}
												id={opportunity?.id}
											/>
										))}
								</div>
							)}
							<div className="my-8 *:flex justify-center">
								
								<PaginationControls
									currentPage={currentPage}
									totalCount={data?.count || 0}
									pageSize={filters?.page_size || 0}
									onPageChange={setCurrentPage}
								/>
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
