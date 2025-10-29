"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamMemberCard } from "../blocks/UsersCard";

interface SuggestedConnectionsCardProps {
  title?: string;
  suggestions?: {
    id: string;
    full_name: string;
    qualifications?: { position: string }[];
    avatarUrl?: string;
  }[];
  isLoading?: boolean;
  limit?: number;
  onActionClick?: (memberId: string) => void;
  className?: string;
}

export default function SuggestedConnectionsCard({
  title = "Suggested Connections",
  suggestions = [],
  isLoading = false,
  limit = 3,
  onActionClick,
  className = "",
}: SuggestedConnectionsCardProps) {
  const displayed = suggestions.slice(0, limit);

  return (
    <Card className={`shadow-none gap-3 border-0 rounded-xl p-6 ${className}`}>
      <h3 className="font-medium text-base mb-3 text-primary-green">{title}</h3>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: limit }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.length > 0 ? (
            displayed.map((member) => (
              <TeamMemberCard
                id={member?.id}
                key={member.id}
                name={member.full_name}
                role={member.qualifications
                  ?.map((item) => item?.position)
                  ?.join(", ")
                  ?.replace(/_/g, " ")
                  ?.toLowerCase() ?? ""}
                avatarUrl={member.avatarUrl}
                onActionClick={() => onActionClick?.(member.id)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No suggestions available</p>
          )}
        </div>
      )}
    </Card>
  );
}
