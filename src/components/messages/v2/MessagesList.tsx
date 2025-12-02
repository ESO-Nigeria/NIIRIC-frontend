"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, MessageSquare } from "lucide-react";
import { smartTimeAgo } from "@/helpers/helpers";
import { useGetPublisherProfileByIdQuery } from "@/store/features/auth/actions";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  other_user_id: string;
  other_profile_id: string;
  last_message?: {
    text: string;
    sent: string;
    read: boolean;
    out: boolean;
  };
  unread_count: number;
}

interface MessagesListProps {
  conversations: Message[];
  isLoading: boolean;
  currentUserId?: string;
}

const ConversationItemSkeleton = () => (
  <div className="flex items-center gap-3 p-4 rounded-xl animate-pulse">
    <Skeleton className="w-12 h-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
    <Skeleton className="h-3 w-12" />
  </div>
);

const ConversationItem = ({ conv }: { conv: Message }) => {
  const { data: profile, isLoading } = useGetPublisherProfileByIdQuery(
    conv?.other_profile_id,
    { skip: !conv?.other_profile_id }
  );

  if (isLoading) return <ConversationItemSkeleton />;

  const displayName = profile
    ? `${profile.first_name} ${profile.last_name}`.trim()
    : "Unknown User";

    // make this an helper reusable function


  const initials = profile
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`
        .toUpperCase()
    : "UU";

  return (
    <Link
      href={`/dashboard/messages/${conv.other_user_id}/${conv?.other_profile_id}`}
      className="flex items-center gap-3 p-4 cursor-pointer rounded-xl hover:bg-gray-50 transition-colors group"
    >
      {/* Avatar */}
      <div className="relative">
        <Avatar className="w-10 h-10 border-2 border-primary-green/20 group-hover:border-primary-green/40 transition-colors">
                <AvatarImage src={profile?.profile_pic || "/default-avatar.png"} alt={displayName} />
                <AvatarFallback className="bg-primary-green/10 text-primary-green text-sm font-medium">
                  {initials}
                </AvatarFallback> 
              </Avatar>
        {conv.unread_count > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-green text-white text-[10px] font-semibold size-5 rounded-full flex items-center justify-center shadow-sm">
            {conv.unread_count > 9 ? "9+" : conv.unread_count}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate capitalize text-sm">
          {displayName}
        </h4>
        {conv.last_message ? (
          <div
            dangerouslySetInnerHTML={{ __html: conv.last_message.text || "" }}
            className={`text-xs line-clamp-1 overflow-hidden ${
              !conv.last_message.read && !conv.last_message.out
                ? "text-gray-900 font-medium"
                : "text-gray-500"
            }`}
          />
        ) : (
          <p className="text-xs text-gray-400 italic">No messages yet</p>
        )}
      </div>

      {/* Time & Status */}
      <div className="flex flex-col items-end gap-1 self-start">
        <p className="text-[10px] text-gray-400 whitespace-nowrap">
          {conv.last_message?.sent ? smartTimeAgo(conv.last_message.sent) : ""}
        </p>
      </div>
    </Link>
  );
};

export default function MessagesList({
  conversations,
  isLoading,
  currentUserId,
}: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    if (!conversations || !Array.isArray(conversations)) return [];
    if (!searchQuery.trim()) return conversations;

    return conversations.filter((conv) => {
      // We'll need to check the profile name, but since we don't have it in the main list,
      // we'll search in the last message text for now
      return conv.last_message?.text
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [conversations, searchQuery]);

  // Sort: unread first, then by most recent
  const sortedConversations = useMemo(() => {
    if (!filteredConversations || !Array.isArray(filteredConversations))
      return [];
    return [...filteredConversations].sort((a, b) => {
      // Unread messages first
      if (a.unread_count > 0 && b.unread_count === 0) return -1;
      if (a.unread_count === 0 && b.unread_count > 0) return 1;

      // Then by most recent
      const timeA = a.last_message?.sent
        ? new Date(a.last_message.sent).getTime()
        : 0;
      const timeB = b.last_message?.sent
        ? new Date(b.last_message.sent).getTime()
        : 0;

      return timeB - timeA;
    });
  }, [filteredConversations]);

  return (
    <Card className="flex-1 border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-green" />
          Conversations
          {conversations.length > 0 && (
            <span className="text-xs text-gray-500 font-normal">
              ({conversations.length})
            </span>
          )}
        </CardTitle>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </CardHeader>

      <CardContent className="px-2 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <ConversationItemSkeleton key={i} />
            ))}
          </div>
        ) : sortedConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery
                ? "Try a different search term"
                : "Start a new conversation to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sortedConversations.map((conv) => (
              <ConversationItem key={conv.id} conv={conv} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
