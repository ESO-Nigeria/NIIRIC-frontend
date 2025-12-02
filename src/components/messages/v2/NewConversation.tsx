"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllPublishersProfileQuery } from "@/store/features/auth/actions";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface NewConversationProps {
  onStartConversation?: (userId: string, profileId: string) => void;
}

const UserItem = ({ user, onClick }: { user: any; onClick: () => void }) => {
  const displayName = `${user.first_name} ${user.last_name}`.trim();
  const initials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
    >
      <Avatar className="w-10 h-10 border-2 border-primary-green/20 group-hover:border-primary-green/40 transition-colors">
        <AvatarImage src={user.profile_pic} alt={displayName} />
        <AvatarFallback className="bg-primary-green/10 text-primary-green text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate capitalize text-sm">
          {displayName}
        </h4>
        {user.bio && (
          <p className="text-xs text-gray-500 truncate w-5xl">{user.bio}</p>
        )}
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="text-primary-green hover:bg-primary-green/10"
      >
        Message
      </Button>
    </div>
  );
};

const UserSkeleton = () => (
  <div className="flex items-center gap-3 p-3">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
    <Skeleton className="h-8 w-20" />
  </div>
);

export default function NewConversation({
  onStartConversation,
}: NewConversationProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: publishers, isLoading } = useGetAllPublishersProfileQuery({
    params: { is_publisher: true },
  } as any);

  const users = publishers?.results || [];

  // Filter users based on search
  const filteredUsers = users.filter((user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleStartConversation = (user: any) => {
    if (onStartConversation) {
      onStartConversation(user.user, user.id);
    } else {
      // Navigate to conversation page
      router.push(`/dashboard/messages/${user.user}/${user.id}`);
    }
  };

  return (
    <Card className="flex-[1.5] border-none shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <MessageSquarePlus className="w-5 h-5 text-primary-green" />
          Start New Conversation
        </CardTitle>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search researchers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="p-3 space-y-2">
            {[...Array(8)].map((_, i) => (
              <UserSkeleton key={i} />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {searchQuery
                ? "No researchers found"
                : "No researchers available"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery
                ? "Try a different search term"
                : "Check back later for more researchers"}
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-1">
            {filteredUsers.map((user: any) => (
              <UserItem
                key={user.id}
                user={user}
                onClick={() => handleStartConversation(user)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
