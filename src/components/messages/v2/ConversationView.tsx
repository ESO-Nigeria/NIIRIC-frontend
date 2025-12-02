"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials, smartTimeAgo } from "@/helpers/helpers";
import { CheckCheck, Check, Loader2 } from "lucide-react";
import MessageComposer from "./MessageComposer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: string;
  sender_name: string;
  sender_profile_pic: string;
  text: string;
  sent: string;
  read: boolean;
  out: boolean;
  status?: "sending" | "sent" | "failed";
  isOptimistic?: boolean;
}

interface RecipientProfile {
  id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  bio?: string;
  university?: string;
}

interface ConversationViewProps {
  messages: Message[];
  recipientProfile: RecipientProfile | null;
  currentUserId: string;
  isLoadingMessages: boolean;
  isLoadingProfile: boolean;
  onSendMessage: (text: string) => void | boolean;
  isSending: boolean;
  isTyping?: boolean;
  shouldClearInput?: boolean;
}

const MessageBubble = ({
  message,
  isSelf,
  showAvatar,
}: {
  message: Message;
  isSelf: boolean;
  showAvatar: boolean;
}) => {
  return (
    <div
      className={`flex flex-col ${isSelf ? "items-end" : "items-start"} gap-1`}
    >
      {/* Avatar + Name */}
      {showAvatar && (
        <div className="flex items-center gap-2 mb-1">
          {/* {!isSelf && (
           
        <Avatar className="w-10 h-10 border-2 border-primary-green/20 group-hover:border-primary-green/40 transition-colors">
                        <AvatarImage src={message.sender_profile_pic || "/default-avatar.png"} alt={message.sender_name} />
                        <AvatarFallback className="bg-primary-green/10 text-primary-green text-sm font-medium">
                          {getInitials(message.sender_name)}
                        </AvatarFallback>
                      </Avatar> 
          )} */}
          <span className="text-xs font-medium text-gray-600 capitalize">
            {isSelf ? "You" : message.sender_name}
          </span>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`px-4 py-2.5 rounded-2xl text-sm wrap-break-word max-w-[70%] ${
          isSelf
            ? "bg-primary-green text-white rounded-tr-sm"
            : "bg-gray-100 text-gray-900 rounded-tl-sm"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
      </div>

      {/* Timestamp + Status */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-400">
          {smartTimeAgo(message.sent)}
        </span>
        {isSelf && (
          <span>
            {message.status === "sending" ? (
              <Loader2 className="w-3.5 h-3.5 text-gray-400 animate-spin" />
            ) : message.read ? (
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            ) : (
              <Check className="w-3.5 h-3.5 text-gray-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

const MessagesSkeleton = () => (
  <div className="space-y-4 p-6">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
      >
        <div className="space-y-2 max-w-[70%]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-16 w-48 rounded-2xl" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    ))}
  </div>
);

const TypingIndicator = ({ name }: { name: string }) => (
  <div className="flex items-start gap-2 mb-4">
    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
      <span className="text-xs text-gray-500">{name} is typing</span>
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  </div>
);

export default function ConversationView({
  messages,
  recipientProfile,
  currentUserId,
  isLoadingMessages,
  isLoadingProfile,
  onSendMessage,
  isSending,
  isTyping = false,
  shouldClearInput = false,
}: ConversationViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    // Use setTimeout to ensure DOM has updated
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    // Small delay to ensure messages are rendered
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  // Group messages by sender without reversing (display in chronological order)
  const groupedMessages = messages.reduce(
    (acc, message, index, arr) => {
      const prevMessage = arr[index - 1];
      const showAvatar = !prevMessage || prevMessage.sender !== message.sender;

      acc.push({ ...message, showAvatar });
      return acc;
    },
    [] as (Message & { showAvatar: boolean })[]
  );

  const recipientName = recipientProfile
    ? `${recipientProfile.first_name} ${recipientProfile.last_name}`.trim()
    : "User";

  return (
    <Card className="flex-[1.5] border-none shadow-sm flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <CardHeader className="border-b bg-white sticky top-0 z-10">
        {isLoadingProfile ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary-green/20 group-hover:border-primary-green/40 transition-colors">
              <AvatarImage
                src={recipientProfile?.profile_pic || "/default-avatar.png"}
                alt={recipientName}
              />
              <AvatarFallback className="bg-primary-green/10 text-primary-green text-sm font-medium">
                {getInitials(recipientName)}
              </AvatarFallback>
            </Avatar>
            {/* <img
              src={recipientProfile?.profile_pic || "/default-avatar.png"}
              alt={recipientName}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-green/20"
            /> */}
            <div>
              <h3 className="font-semibold text-gray-900 capitalize">
                {recipientName}
              </h3>
              {recipientProfile?.university && (
                <p className="text-xs text-gray-500">
                  {recipientProfile.university}
                </p>
              )}
            </div>
          </div>
        )}
      </CardHeader>

      {/* Messages */}
      <CardContent
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50/50 custom-scrollbar"
      >
        {isLoadingMessages ? (
          <MessagesSkeleton />
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-primary-green/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-primary-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start the conversation by saying hello 👋
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isSelf={message.sender === currentUserId}
                showAvatar={message.showAvatar}
              />
            ))}
            {isTyping && <TypingIndicator name={recipientName} />}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      {/* Message Composer */}
      <MessageComposer
        onSend={onSendMessage}
        isSending={isSending}
        disabled={!recipientProfile}
        shouldClearInput={shouldClearInput}
      />
    </Card>
  );
}
