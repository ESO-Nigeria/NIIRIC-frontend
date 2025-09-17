"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

// fake payload for demo (replace with API call)
import payload from "@/store/mockData/payload.json";

// ----------------------
// TYPES
// ----------------------
export interface Section {
	section_no: number;
	background_color: string | null;
	background_image_url: string | null;
	parallax_background_image: string | null;
	content_type: string | null;
	content_short_description: string | null;
	content_name: string | null;
	content_html: string | null;
	content_url: string | null;
	visible?: boolean; // added for toggling
	id?: string; // in case backend provides unique id for section
}

export interface Page {
	id: string;
	name: string;
	number_of_sections: number;
	section_belonging_to_page: Section[];
}

interface PageBuilderContextType {
	pages: Page[];
	activePage: string | null;
	setActivePage: (id: string | null) => void;
	toggleSection: (pageId: string, sectionNo: number) => void;
}

interface ProviderProps {
	children: ReactNode;
}

// ----------------------
// CONTEXT
// ----------------------
const PageBuilderContext = createContext<PageBuilderContextType | undefined>(
	undefined,
);

export const PageBuilderProvider: React.FC<ProviderProps> = ({ children }) => {
	const [pages, setPages] = useState<Page[]>(payload.data as Page[]);
	const [activePage, setActivePage] = useState<string | null>(
		pages[0]?.id || null,
	);

	// toggle whole section visibility
	const toggleSection = (pageId: string, sectionNo: number) => {
		setPages((prev) =>
			prev.map((page) =>
				page.id === pageId
					? {
							...page,
							section_belonging_to_page: page.section_belonging_to_page.map(
								(section) =>
									section.section_no === sectionNo
										? { ...section, visible: !section.visible }
										: section,
							),
						}
					: page,
			),
		);
	};

	return (
		<PageBuilderContext.Provider
			value={{ pages, activePage, setActivePage, toggleSection }}
		>
			{children}
		</PageBuilderContext.Provider>
	);
};

export const usePageBuilder = (): PageBuilderContextType => {
	const context = useContext(PageBuilderContext);
	if (!context) {
		throw new Error("usePageBuilder must be used within a PageBuilderProvider");
	}
	return context;
};
