"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GeneralLayout from "@/layouts/General";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { useGetOpportunitiesQuery } from "@/store/features/opportunities/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetOpportunitiesQuery({ page_size: 100 }); // fetch enough to include all opportunities

  if (isLoading) {
    return (
      <GeneralLayout>
        <div className="p-16 flex justify-center items-center">
          <Skeleton className="w-full h-[400px]" />
        </div>
      </GeneralLayout>
    );
  }

  // Find the single opportunity based on ID
  const opportunity = data?.results?.find(
    (op: any) => String(op.id) === String(id)
  );

  if (!opportunity)
    return (
      <GeneralLayout>
        <div className="p-10 text-center text-gray-500 text-xl font-semibold">
          Opportunity not found.
        </div>
      </GeneralLayout>
    );

  // Get related opportunities (e.g., same category)
  const related = data?.results
    ?.filter((op: any) => op.id !== opportunity.id)
    ?.slice(0, 3);

  return (
    <GeneralLayout>
      <div className="pt-8 lg:pt-16 px-16">
        <Breadcrumbs />
      </div>

      <div className="p-8 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — Opportunity Detail */}
          <main className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold w-full lg:w-3/4 sm:text-4xl text-primary-green leading-tight">
              {opportunity.title}
            </h1>

            {opportunity.deadline && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 text-lg font-medium ml-1">
                  Deadline: {opportunity.deadline}
                </p>
              </div>
            )}

            <div className="text-main-text-color text-xs md:text-sm mt-1">
              <span className="font-semibold text-primary-green">Type:</span>{" "}
              {opportunity.funding_types
                ?.map((t: any) => t.name)
                .join(", ") || "N/A"}
              <span className="mx-1">|</span>
              <span className="text-primary-green">Sector:</span>{" "}
              {opportunity.sectors?.map((s: any) => s.name).join(", ") ||
                "General"}
            </div>

            <Image
              src={opportunity.image || "/assets/images/globe.svg"}
              alt={opportunity.title}
              width={800}
              height={500}
              className="rounded-xl w-full max-h-[500px] object-cover shadow-lg"
            />

            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                {opportunity.description}
              </p>

              <Link
                href={opportunity.link || "#"}
                target="_blank"
                className="inline-block px-6 py-2 bg-primary-green text-white rounded-md shadow-md hover:shadow-primary-green/20 transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Link>
            </div>
          </main>

          {/* RIGHT SIDE — Related Opportunities */}
          <aside className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-normal font-poppins">
              Related Opportunities
            </h3>
            <div className="flex flex-col gap-4">
              {related?.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/opportunities/${item.id}`}
                  className="block group"
                >
                  <div className="border border-[#D1E3D6] rounded-lg bg-white overflow-hidden w-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                    {/* Image Section */}
                    <div className="w-full flex justify-center items-center p-4">
                      <div className="rounded-lg overflow-hidden shadow-sm w-full">
                        <Image
                          src={item.image || "/assets/images/globe.svg"}
                          alt={item.title}
                          width={400}
                          height={150}
                          className="w-full h-[150px] object-cover rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-main-text-color font-medium text-sm md:text-base leading-snug group-hover:text-primary-green transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-main-text-color text-xs md:text-sm">
                        <span className="text-primary-green font-semibold">
                          Deadline:
                        </span>{" "}
                        {item.deadline}
                      </div>
                      <p className="text-main-text-color text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                      <div className="text-main-text-color text-xs md:text-sm mt-1">
                        <span className="font-semibold text-primary-green">
                          Type:
                        </span>{" "}
                        {item.funding_types
                          ?.map((t: any) => t.name)
                          .join(", ") || "N/A"}
                        <span className="mx-1">|</span>
                        <span className="text-primary-green">Sector:</span>{" "}
                        {item.sectors?.map((s: any) => s.name).join(", ") ||
                          "General"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </GeneralLayout>
  );
}
