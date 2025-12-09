"use client";
import type React from "react";
import { useMemo, useState } from "react";
import OpportunityImage from "@/app/assets/images/oppo_card.jpg"; // Adjust the path as necessary
import { EmptyState } from "@/components/blocks/EmptyState";
// import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import InfoHero from "@/components/blocks/infoHero";
import FilterSidebar, { type FilterValues } from "@/components/FilterSidebar";
import ReportCard from "@/components/ReportCard";
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
import { useGetReportsQuery } from "@/store/features/reports/actions";
import { useGetPublicationsQuery } from "@/store/features/publications/actions";
import PaginationControls from "@/components/common/Pagination";
import { Opportunity } from "@/components/types/opportunity";
import { Publication } from "@/components/types/profile";
import { mapTagsToPublicationColors } from "@/helpers/helpers";

const defaultFilters: FilterValues = {
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
		title: searchValue || undefined,   
		category: categoryValue || undefined,
		page: currentPage,
	}),
	[filters, currentPage, searchValue, categoryValue]
	);


	
	const { data, isLoading } = useGetPublicationsQuery(queryParams);

	const handleSearch = () => {
	setSearchValue(inputValue);  // apply filter
	setCurrentPage(1);
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
				imageUrl={"/assets/images/what_we_do_banner.png"}
				imageAlt="Reports Banner Image"
				showSearch={true}

				searchValue={inputValue}  
				placeholderText="Search for research papers, case studies, and industry insights."

				onSearchValueChange={(value) => {
					setInputValue(value);
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
									{data?.results?.map((publication: Publication) => (
											<ReportCard
												key={publication?.id}
												title={publication?.title ?? ''}
												byline={publication.author_name ?? ''}
												sector={publication?.sectors?.map(({ item }: { item?: { name?: string } }) => item?.name).join(', ') || ''}
												category={mapTagsToPublicationColors(publication.publication_type ?? []) ?? null}
												description={publication?.abstract ?? ''}
												id={publication?.id}
												imageSrc={OpportunityImage}
												imageAlt="Report Card Image"
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
