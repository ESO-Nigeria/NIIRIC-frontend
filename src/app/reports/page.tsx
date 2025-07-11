"use client";
import type React from "react";
import { useState } from "react";
import PageBanner from "@/app/assets/images/what_we_do_banner.png";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";

function Page() {
	const [searchValue, setSearchValue] = useState("");
	const [categoryValue, setCategoryValue] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Add your search logic here
	};

	return (
		<GeneralLayout withSubscribe={false}>
			<InfoHero
				tag="Reports"
				title="Research Case Studies & Insights"
				description="Explore a curated library of reports, case studies, and data-driven insights shaping the future of impact investing and innovation in Nigeria."
				imageUrl={PageBanner}
				imageAlt="Reports Banner Image"
				showSearch={true}
				searchValue={searchValue}
				onSearchValueChange={setSearchValue}
				categoryValue={categoryValue}
				onCategoryChange={setCategoryValue}
				onSearch={handleSearch}
			/>
		</GeneralLayout>
	);
}

export default Page;
