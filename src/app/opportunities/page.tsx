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

const dummyOpportunitiesResponse = {
  count: 9,
  results: [
    {
      id: 1,
      title: "Youth Innovation Grant 2025",
      deadline: "2025-03-30",
      description:
        "Funding opportunity for young innovators working on climate, fintech, and health solutions.",
      funding_types: [{ id: 1, name: "Grant" }],
      sectors: [{ id: 1, name: "Climate" }, { id: 2, name: "Fintech" }],
    },
    {
      id: 2,
      title: "Tech Skills Training Fellowship",
      deadline: "2025-04-15",
      description:
        "A fully funded 6-month training program for aspiring software developers.",
      funding_types: [{ id: 2, name: "Scholarship" }],
      sectors: [{ id: 3, name: "Technology" }],
    },
    {
      id: 3,
      title: "Junior Frontend Developer Role",
      deadline: "2025-02-28",
      description:
        "Entry-level frontend developer position open to recent graduates.",
		funding_types: [{ id: 3, name: "Job" }],
      sectors: [{ id: 4, name: "Software Development" }],
    },
    {
      id: 4,
      title: "Women in Agribusiness Fund",
      deadline: "2025-05-10",
      description:
	  "Grant program supporting women-led agribusiness startups in Nigeria.",
      funding_types: [{ id: 1, name: "Grant" }],
      sectors: [{ id: 5, name: "Agriculture" }],
    },
    {
		id: 5,
		title: "Data Science Internship",
		deadline: "2025-01-31",
      description:
	  "Paid internship for students and early-career data scientists.",
      funding_types: [{ id: 3, name: "Job" }],
      sectors: [{ id: 6, name: "Data & AI" }],
    },
  ],
};

const USE_DUMMY_DATA = false;

function Page() {
	const [inputValue, setInputValue] = useState("");   // typing only
	const [searchValue, setSearchValue] = useState(""); // applied to API
	const [categoryValue, setCategoryValue] = useState("");
	const [filters, setFilters] = useState<FilterValues>(defaultFilters);
	const [currentPage, setCurrentPage] = useState(1);
	const queryParams = useMemo(() => {
	const params: Record<string, any> = {
		page: currentPage,
		page_size: filters.page_size || 3,
	};

	// Search
	if (searchValue) {
		params.search = searchValue;
	}

	// Category
	if (categoryValue && categoryValue !== "all") {
		params.category = categoryValue;
	}

	// Deadline
	if (filters.deadline) {
		params.deadline = filters.deadline;
	}

	// Ordering
	if (filters.ordering) {
		params.ordering = filters.ordering;
	}

	// Array-based filters (only send if not empty)
	if (filters.funding_types?.length) {
		params.funding_types = filters.funding_types;
	}

	if (filters.job_levels?.length) {
		params.job_levels = filters.job_levels;
	}

	if (filters.job_types?.length) {
		params.job_types = filters.job_types;
	}

	if (filters.locations?.length) {
		params.locations = filters.locations;
	}

	if (filters.program_formats?.length) {
		params.program_formats = filters.program_formats;
	}

	if (filters.program_types?.length) {
		params.program_types = filters.program_types;
	}

	if (filters.sectors?.length) {
		params.sectors = filters.sectors;
	}

	if (filters.target_groups?.length) {
		params.target_groups = filters.target_groups;
	}

	return params;
	}, [filters, currentPage, searchValue, categoryValue]);



const { data, isLoading } = USE_DUMMY_DATA
  ? { data: dummyOpportunitiesResponse, isLoading: false }
  : useGetOpportunitiesQuery(queryParams);

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

	const categories = [
		{ value: "all", label: "All" },
		{ value: "grants", label: "Grants & Funding Opportunities" },
		{ value: "training", label: "Training & Scholarships" },
		{ value: "jobs", label: "Job Board" },
	];


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
				setCategoryValue(value === "all" ? "" : value);
				setCurrentPage(1);
				}}


				onSearch={handleSearch}
				categories={categories}
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
