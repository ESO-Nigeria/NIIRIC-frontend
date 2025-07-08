import React from "react";
import Image, { StaticImageData } from "next/image";

interface OpportunityCardProps {
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  title: string;
  deadline: string;
  description: string;
  type: string;
  sector: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  imageSrc,
  imageAlt = "Opportunity image",
  title = "Catalyst Impact Fund – Small Grants for Early-Stage Solutions",
  deadline = "August 30, 2025",
  description = "The Catalyst Impact Fund is offering up to $25,000 in seed funding for early-stage startups and nonprofits focused on sustainable development goals (SDGs) in Sub-Saharan Africa. Priority areas include clean energy, gender equity, and inclusive fintech.",
  type ="Grant",
  sector ="SDGs, Social Innovation",
}) => {
  return (
    <div className="border border-[#D1E3D6] rounded-lg bg-white p-4 flex items-start gap-4 w-full mx-auto">
      <div className="w-31 h-41 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={123}
          height={162}
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-main-text-color font-medium text-sm md:text-base leading-snug mb-1">
          {title}
        </h3>
        <div className="text-main-text-color text-base mb-1">
          <span className=" text-primary-green">Deadline:</span> {deadline}
        </div>
        <p className="text-main-text-color text-sm leading-relaxed mb-2">
          {description}
        </p>
        <div className="text-main-text-color text-xs md:text-sm ">
          <span className="font-semibold text-primary-green">Type:</span> {type}{" "}
          <span className="mx-1">|</span>{" "}
          <span className=" text-primary-green">Sector:</span> {sector}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
