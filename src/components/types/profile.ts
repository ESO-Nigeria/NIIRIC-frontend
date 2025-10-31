export interface User {
	id: string;
	user: string;
	title: "mr" | "mrs" | "dr" | "prof";
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	linkedin_url: string;
	orcid: string;
	state: string;
	bio: string;
	created_at: string;
	updated_at: string;
	// Optional user metadata
	user_email?: string;
	user_first_name?: string;
	user_last_name?: string;
	publication_count?: string;
	follower_count?: string;
	profile_pic?: string
}

export interface Qualification {
	id: string;
	user: string;
	department: string;
	position: string;
	position_display: string;
	institution: string;
	created_at: string;
	updated_at: string;
	user_email: string;
}

export interface ResearchInterest {
	id: string;
	user: string; // user ID reference
	interest: string; // e.g., "climate_change"
	interest_display: string; // human-readable label for UI
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
	user_email: string;
}

export interface ResearchArea {
	id: string;
	user: string; // user ID reference
	description: string; // description of the research area
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
	user_email: string;
}

export interface Profile {
	id: string;
	user?: string; // user ID reference
	profile_picture_url?: string; // URL to profile picture
	profile_pic?: string
	image_url?: string;
	title?: string;
	cv_url?: string; // URL to CV document
	first_name?: string; // first name
	last_name?: string; // last name
	full_name?: string; // full name
	email?: string; // email address
	phone_number?: string; // phone number
	linkedin_url?: string; // LinkedIn profile URL
	orcid?: string; // ORCID identifier
	state?: string; // state or region
	bio?: string; // biography or summary
	qualifications?: Qualification[]; // array of qualifications
	research_interests?: ResearchInterest[] | string[]; // array of research interests
	research_areas?: ResearchArea[]; // array of research areas
	created_at?: string; // ISO date string
	updated_at?: string; // ISO date string
	user_email?: string;
	publication_count?: string;
	follower_count?: string;
	contribution_count?: string
}

export interface Sector {
	name?: string
	item?: {
		name?: string
	}
}

export interface Publication {
	id: string;
	user?: string; // user ID reference
	journal?: string; // journal name
	publication_date?: string; // ISO date string
	doi?: string; // Digital Object Identifier
	url?: string; // URL to the publication
	created_at?: string; // ISO date string
	updated_at?: string; // ISO date string
	user_email?: string;
	title?: string;
	abstract?: string;
	author_name?: string;
	document?: string;
	publication_type?: string[]
	profile_pic?: string;
	author_profile_pic?: string;
	user_first_name?: string
	user_last_name?: string
	first_name?: string
	last_name?: string
	qualifications?: string[]
	author?: string
	author_qualifications?: Qualification[];
	sectors?: Sector[]

}
// Example usage: