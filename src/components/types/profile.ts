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
  
}

export interface Qualification {
  id: string;
  user: string;                 
  department: string;
  position:  string;
  position_display: string;      
  institution: string;
  created_at: string;            
  updated_at: string;            
  user_email: string;
}

export interface ResearchInterest {
  id: string;
  user: string;                 // user ID reference
  interest: string;             // e.g., "climate_change"
  interest_display: string;     // human-readable label for UI
  created_at: string;           // ISO date string
  updated_at: string;           // ISO date string
  user_email: string;
}

export interface ResearchArea {
  id: string;
  user: string;           // user ID reference
  description: string;    // description of the research area
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
  user_email: string;
}
