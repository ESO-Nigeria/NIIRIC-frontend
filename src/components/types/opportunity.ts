import { StaticImageData } from "next/image";

export interface Opportunity {
  imageSrc: string | StaticImageData;
  id?: string;
  funding_types?: string[];
  sectors?: string[];
    imageAlt?: string;
    title?: string;
    deadline?: string;
    description?: string;
    type?: string;
    sector?: string;
}