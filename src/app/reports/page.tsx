"use client";
import type React from "react";
import { useMemo, useState } from "react";
import OpportunityImage from "@/app/assets/images/oppo_card.jpg";
import { EmptyState } from "@/components/blocks/EmptyState";
import InfoHero from "@/components/blocks/infoHero";
import ReportFilterSidebar, { type FilterValues } from "@/components/ReportFilterSidebar";
import ReportCard from "@/components/ReportCard";
import PaginationControls from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import GeneralLayout from "@/layouts/General";
import { useGetPublicationsQuery } from "@/store/features/publications/actions";
import { Publication } from "@/components/types/profile";
import { mapTagsToPublicationColors } from "@/helpers/helpers";

const defaultFilters: FilterValues = {
    publication_type: undefined,
    sectors: undefined,
    page_size: 3,
};

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

        // Include search keyword if provided
        if (searchValue) {
            params.title = searchValue;
        }

        // Determine publication type
        let pubType: string | undefined = undefined;

        if (categoryValue && categoryValue !== "all") {
            pubType = categoryValue;
        } else if (filters.publication_type) {
            pubType = filters.publication_type;
        }

        if (pubType) {
            params.publication_type = pubType;
        }

        // FIX: Handle sectors array properly
        // The API expects "sectors" as array<string> in query parameters
        if (filters.sectors && filters.sectors.length > 0) {
            params.sectors = filters.sectors;
            
        }

        return params;
    }, [filters, currentPage, searchValue, categoryValue]);

    const { data, isLoading } = useGetPublicationsQuery(queryParams);

    const handleSearch = () => {
        setSearchValue(inputValue);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters: FilterValues) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleFilterReset = () => {
        setFilters(defaultFilters);
        setCategoryValue(""); // Also reset the dropdown
        setCurrentPage(1);
    };

    const categories = [
        { value: "all", label: "All" },
        { value: "research", label: "Research" },
        { value: "report", label: "Report" },
        { value: "case-study", label: "Case Study" },
        { value: "industry-insight", label: "Industry Insights" },
        { value: "policy", label: "Policy" },
    ];

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
                categories={categories}
            />

            <section className="">
                <div className="container mx-auto py-8">
                    <div className="flex flex-row gap-8">
                        <div className="flex-1">
                            {isLoading && <Skeleton className="h-44 w-full" />}
                            {data?.results?.length === 0 && (
                                <EmptyState
                                    title="No Results Found"
                                    description="We couldn’t find any reports matching your filters. Try adjusting your keywords, selections or to start fresh."
                                />
                            )}
                            {!isLoading && data?.results?.length > 0 && (
                                <div className="space-y-5 w-full">
                                    {data?.results?.map((publication: Publication) => (
                                        <ReportCard
                                            key={publication?.id}
                                            title={publication?.title ?? ''}
                                            byline={publication.author_name ?? ''}
                                            sector={publication?.sectors?.map((sector: any) => sector.name).join(', ') || ''}
                                            category={mapTagsToPublicationColors(publication.publication_type ?? []) ?? null}
                                            description={publication?.abstract ?? ''}
                                            id={publication?.id}
                                            imageSrc={OpportunityImage}
                                            imageAlt="Report Card Image"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="my-8 flex justify-center">
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalCount={data?.count || 0}
                                    pageSize={filters?.page_size || 0}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                        <div className="w-2/6">
                            <ReportFilterSidebar
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