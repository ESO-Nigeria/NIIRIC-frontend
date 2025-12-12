"use client";
import type * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Default options
const CATEGORY_OPTIONS = [
    { label: "Research paper", value: "research" },
    { label: "Report", value: "report" },
    { label: "Case study", value: "case-study" },
    { label: "Industry insight", value: "industry-insight" },
    { label: "Policy", value: "policy" },
];


const SECTOR_OPTIONS = [
    { label: "Manufacturing / Industrial", value: "1" }, 
    { label: "Technology / Information & Communication", value: "2" },
    { label: "Healthcare / Life Sciences", value: "3" },
    { label: "Financial Services", value: "4" },
    { label: "Construction & Real Estate", value: "5" },
    { label: "Business & Professional Services", value: "6" },
    { label: "Education", value: "7" },
    { label: "Transport & Logistics", value: "8" },
    { label: "Public Sector / Government", value: "9" },
    { label: "Media, Arts & Entertainment", value: "10" },
    { label: "Environment / Sustainability", value: "11" },
    { label: "Emerging Technologies", value: "12" },
    { label: "Energy / Utilities", value: "13" },
    { label: "Agriculture / Food & Agritech", value: "14" },

];

export interface FilterValues {
    publication_type?: string;
    sectors?: string[];
    page_size?: number;
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
        const newValue = value.publication_type === val ? undefined : val;
        onChange({ ...value, publication_type: newValue });
    };

    const handleSectorChange = (sectorValue: string) => {
        const currentValues = value.sectors || [];
        const newSectors = currentValues.includes(sectorValue)
            ? currentValues.filter((v) => v !== sectorValue)
            : [...currentValues, sectorValue];
        
        onChange({ 
            ...value, 
            sectors: newSectors.length > 0 ? newSectors : undefined 
        });
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
                <h3 className="text-[#1A3B34] text-base font-medium mb-1">
                    Publication Type
                </h3>
                <div className="flex flex-col gap-2">
                    {CATEGORY_OPTIONS.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2 py-0.5 text-[#3F434A] text-sm"
                            htmlFor={`category-${opt.value}`}
                        >
                            <Checkbox
                                checked={value?.publication_type === opt.value}
                                onCheckedChange={() =>
                                    handleCategoryChange(opt.value)
                                }
                                id={`category-${opt.value}`}
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
                                checked={value?.sectors?.includes(opt.value) || false}
                                onCheckedChange={() =>
                                    handleSectorChange(opt.value)
                                }
                                id={`sector-${opt.value}`}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;