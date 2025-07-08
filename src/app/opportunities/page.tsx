"use client";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import React, { useState } from "react";
import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import OpportunityImage from "@/app/assets/images/oppo_card.jpg"; // Adjust the path as necessary
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
import FilterSidebar, { FilterValues } from "@/components/FilterSidebar";

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
    <GeneralLayout withSponsors={false} withSubscribe={false}>
      <InfoHero
        tag="Opportunities"
        title="Explore Opportunities for Growth, Funding, and Career Advancement"
        description="Stay updated on curated opportunities in funding, training, fellowships, and impact-driven careers tailored for professionals, entrepreneurs, and organizations in Nigeria’s impact investing ecosystem."
        imageUrl={PageBanner}
        imageAlt="Opportunities Banner Image"
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
                    <OpportunityCard
                      key={index + 1}
                      imageSrc={OpportunityImage}
                      imageAlt="Opportunity image"
                      title="Catalyst Impact Fund – Small Grants for Early-Stage Solutions"
                      deadline="August 30, 2025"
                      type="Grant"
                      sector="SDGs, Social Innovation"
                      description="The Catalyst Impact Fund is offering up to $25,000 in seed funding for early-stage startups and nonprofits focused on sustainable development goals (SDGs) in Sub-Saharan Africa. Priority areas include clean energy, gender equity, and inclusive fintech."
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
