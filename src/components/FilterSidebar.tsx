"use client";
import type * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Default options
const OPPORTUNITY_OPTIONS = [
	{ label: "Grants & Funding Opportunities", value: "grants" },
	{ label: "Training & Scholarships", value: "training" },
	{ label: "Job Board", value: "jobs" },
];
const SECTOR_OPTIONS = [
	{ label: "Agriculture", value: "agriculture" },
	{ label: "Healthcare", value: "healthcare" },
	{ label: "Education", value: "education" },
	{ label: "Renewable Energy", value: "renewable" },
	{ label: "Climate", value: "climate" },
	{ label: "Mobility/ Transportation", value: "mobility" },
	{ label: "Technology", value: "technology" },
	{ label: "Consulting", value: "consulting" },
	{ label: "Services", value: "services" },
	{ label: "Others", value: "others" },
];
const DEADLINE_OPTIONS = [
	{ label: "This Week", value: "week" },
	{ label: "This Month", value: "month" },
	{ label: "Open Now", value: "open" },
];

// Grants & Funding
const FUNDING_TYPE_OPTIONS = [
	{ label: "Grant", value: "grant" },
	{ label: "Seed", value: "seed" },
	{ label: "Equity", value: "equity" },
	{ label: "Loan", value: "loan" },
];
const TARGET_GROUP_OPTIONS = [
	{ label: "Startups", value: "startups" },
	{ label: "Nonprofits", value: "nonprofits" },
	{ label: "Individuals", value: "individuals" },
	{ label: "Women", value: "women" },
	{ label: "Youth", value: "youth" },
];

// Training & Scholarships
const PROGRAM_TYPE_OPTIONS = [
	{ label: "Fellowship", value: "fellowship" },
	{ label: "Scholarship", value: "scholarship" },
	{ label: "Workshop", value: "workshop" },
	{ label: "Bootcamp", value: "bootcamp" },
];
const FORMAT_OPTIONS = [
	{ label: "Online", value: "online" },
	{ label: "Offline", value: "offline" },
	{ label: "Hybrid", value: "hybrid" },
];
const ELIGIBILITY_OPTIONS = [
	{ label: "Students", value: "students" },
	{ label: "Professionals", value: "professionals" },
	{ label: "Entrepreneurs", value: "entrepreneurs" },
];

// Job Board
const JOB_TYPE_OPTIONS = [
	{ label: "Full-time", value: "fulltime" },
	{ label: "Part-time", value: "parttime" },
	{ label: "Contract", value: "contract" },
	{ label: "Internship", value: "internship" },
];
const LEVEL_OPTIONS = [
	{ label: "Entry", value: "entry" },
	{ label: "Mid", value: "mid" },
	{ label: "Senior", value: "senior" },
];
const LOCATION_OPTIONS = [
	{ label: "Remote", value: "remote" },
	{ label: "Lagos", value: "lagos" },
	{ label: "Abuja", value: "abuja" },
	{ label: "Other", value: "other" },
];

export interface FilterValues {
	category: string;
	opportunities: string[];
	sectors: string[];
	deadlines: string[];
	fundingTypes?: string[];
	targetGroups?: string[];
	programTypes?: string[];
	formats?: string[];
	eligibilities?: string[];
	jobTypes?: string[];
	levels?: string[];
	locations?: string[];
}

interface FilterSidebarProps {
	value: FilterValues;
	onChange: (value: FilterValues) => void;
	onReset?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
	value,
	onChange,
	onReset,
}) => {
	const handleCategoryChange = (val: string) => {
		onChange({ ...value, category: val });
	};

	const handleCheckboxChange = (group: keyof FilterValues, val: string) => {
		const currentValues = value[group];
		const arr = Array.isArray(currentValues)
			? currentValues.includes(val)
				? currentValues.filter((v) => v !== val)
				: [...currentValues, val]
			: [val]; // If it's not an array, start a new array with the value
		onChange({ ...value, [group]: arr });
	};

	const handleReset = () => {
		onReset?.();
	};

	return (
		<aside className="rounded-lg border border-[#E3E8EF] bg-white p-6 w-full">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-medium text-primary-green">Filter</h2>
				<button
					type="button"
					className="text-primary-brown text-sm font-medium hover:underline"
					onClick={handleReset}
				>
					Reset
				</button>
			</div>
			<div className="mb-6">
				<Label
					htmlFor="category"
					className="text-[#1A3B34] font-medium mb-1 block"
				>
					Category<span className="text-red-500 ml-6">*</span>
				</Label>
				<Select value={value.category} onValueChange={handleCategoryChange}>
					<SelectTrigger id="category" className="w-full mt-1">
						<SelectValue placeholder="Select Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="grants">
							Grants & Funding Opportunities
						</SelectItem>
						<SelectItem value="training">Training & Scholarships</SelectItem>
						<SelectItem value="jobs">Job Board</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Default: Opportunities, Sectors, Deadline */}
			{(!value.category ||
				value.category === "" ||
				value.category === "all") && (
				<>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Opportunities
						</h3>
						<div className="flex flex-col gap-2">
							{OPPORTUNITY_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`opportunity-${opt.value}`}
								>
									<Checkbox
										checked={value.opportunities.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("opportunities", opt.value)
										}
										id={`opportunity-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Sectors
						</h3>
						<div className="flex flex-col gap-2">
							{SECTOR_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`sector-${opt.value}`}
								>
									<Checkbox
										checked={value.sectors.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("sectors", opt.value)
										}
										id={`sector-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Deadline
						</h3>
						<div className="flex flex-col gap-2">
							{DEADLINE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`deadline-${opt.value}`}
								>
									<Checkbox
										checked={value.deadlines.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("deadlines", opt.value)
										}
										id={`deadline-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
				</>
			)}

			{/* Grants & Funding Opportunities */}
			{value.category === "grants" && (
				<>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Funding Type
						</h3>
						<div className="flex flex-col gap-2">
							{FUNDING_TYPE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`funding-type-${opt.value}`}
								>
									<Checkbox
										checked={value.fundingTypes?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("fundingTypes", opt.value)
										}
										id={`funding-type-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Sectors
						</h3>
						<div className="flex flex-col gap-2">
							{SECTOR_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`sector-${opt.value}`}
								>
									<Checkbox
										checked={value.sectors.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("sectors", opt.value)
										}
										id={`sector-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Target Group
						</h3>
						<div className="flex flex-col gap-2">
							{TARGET_GROUP_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`target-group-${opt.value}`}
								>
									<Checkbox
										checked={value.targetGroups?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("targetGroups", opt.value)
										}
										id={`target-group-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Deadline
						</h3>
						<div className="flex flex-col gap-2">
							{DEADLINE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`deadline-${opt.value}`}
								>
									<Checkbox
										checked={value.deadlines.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("deadlines", opt.value)
										}
										id={`deadline-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
				</>
			)}

			{/* Training & Scholarships */}
			{value.category === "training" && (
				<>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Program Type
						</h3>
						<div className="flex flex-col gap-2">
							{PROGRAM_TYPE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`program-type-${opt.value}`}
								>
									<Checkbox
										checked={value.programTypes?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("programTypes", opt.value)
										}
										id={`program-type-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Format
						</h3>
						<div className="flex flex-col gap-2">
							{FORMAT_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`format-${opt.value}`}
								>
									<Checkbox
										checked={value.formats?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("formats", opt.value)
										}
										id={`format-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Sectors
						</h3>
						<div className="flex flex-col gap-2">
							{SECTOR_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`sector-${opt.value}`}
								>
									<Checkbox
										checked={value.sectors.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("sectors", opt.value)
										}
										id={`sector-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Eligibility
						</h3>
						<div className="flex flex-col gap-2">
							{ELIGIBILITY_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`eligibility-${opt.value}`}
								>
									<Checkbox
										checked={value.eligibilities?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("eligibilities", opt.value)
										}
										id={`eligibility-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Deadline
						</h3>
						<div className="flex flex-col gap-2">
							{DEADLINE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
									htmlFor={`deadline-${opt.value}`}
								>
									<Checkbox
										checked={value.deadlines.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("deadlines", opt.value)
										}
										id={`deadline-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
				</>
			)}

			{/* Job Board */}
			{value.category === "jobs" && (
				<>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Job Type
						</h3>
						<div className="flex flex-col gap-2">
							{JOB_TYPE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center py-0.5 gap-2 text-[#3F434A] text-sm"
									htmlFor={`job-type-${opt.value}`}
								>
									<Checkbox
										checked={value.jobTypes?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("jobTypes", opt.value)
										}
										id={`job-type-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">Level</h3>
						<div className="flex flex-col gap-2">
							{LEVEL_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center py-0.5 gap-2 text-[#3F434A] text-sm"
									htmlFor={`level-${opt.value}`}
								>
									<Checkbox
										checked={value.levels?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("levels", opt.value)
										}
										id={`level-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Sectors
						</h3>
						<div className="flex flex-col gap-2">
							{SECTOR_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center py-0.5 gap-2 text-[#3F434A] text-sm"
									htmlFor={`sector-${opt.value}`}
								>
									<Checkbox
										checked={value.sectors.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("sectors", opt.value)
										}
										id={`sector-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div className="mb-4">
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Location
						</h3>
						<div className="flex flex-col gap-2">
							{LOCATION_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center py-0.5 gap-2 text-[#3F434A] text-sm"
									htmlFor={`location-${opt.value}`}
								>
									<Checkbox
										checked={value.locations?.includes(opt.value) || false}
										onCheckedChange={() =>
											handleCheckboxChange("locations", opt.value)
										}
										id={`location-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-[#1A3B34] text-base font-medium mb-1">
							Deadline
						</h3>
						<div className="flex flex-col gap-2">
							{DEADLINE_OPTIONS.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center py-0.5 gap-2 text-[#3F434A] text-sm"
									htmlFor={`deadline-${opt.value}`}
								>
									<Checkbox
										checked={value.deadlines.includes(opt.value)}
										onCheckedChange={() =>
											handleCheckboxChange("deadlines", opt.value)
										}
										id={`deadline-${opt.value}`}
									/>
									{opt.label}
								</label>
							))}
						</div>
					</div>
				</>
			)}
		</aside>
	);
};

export default FilterSidebar;
