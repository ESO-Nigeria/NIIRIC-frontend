"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ResearchInterestsCardProps {
  interests?: { id?: string | number; interest_display?: string }[];
  loading?: boolean;
  badgeColors?: string[];
}

export default function ResearchInterestsCard({
  interests = [],
  loading = false,
  badgeColors = [
    "bg-[#F3F4F6]",
    "bg-[#E0F2FE]",
    "bg-[#FEF3C7]",
    "bg-[#FDE68A]",
    "bg-[#E9D5FF]",
  ],
}: ResearchInterestsCardProps) {
  return (
    <Card className="shadow-none border-0 rounded-xl">
      <CardContent>
        <h3 className="font-medium text-base text-[#3F434A] mb-3">
          Research Interests
        </h3>

        <div className="flex flex-wrap gap-2">
          {loading && <Skeleton className="h-8 w-full rounded-full" />}

          {!loading &&
            interests.map((interest, index) => {
              const colorClass = badgeColors[index % badgeColors.length];
              const label = interest?.interest_display
                ?.replace(/_/g, " ")
                ?.toLowerCase();

              return (
                <Badge
                  key={interest.id || index}
                  variant="secondary"
                  className={`text-sm font-normal capitalize rounded-full ${colorClass}`}
                >
                  {label}
                </Badge>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
