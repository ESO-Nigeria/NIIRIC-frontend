"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetPublisherProfileByIdQuery } from "@/store/features/auth/actions";
import { useMessaging } from "@/hooks/useMessaging";
import ConversationView from "@/components/messages/v2/ConversationView";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params?.conversationId as string;
  const profileId = params?.profileId as string;

  const currentUserId = useSelector(
    (state: RootState) => (state.auth.user as any)?.id || ""
  );

  // Fetch recipient profile
  const {
    data: recipientProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetPublisherProfileByIdQuery(profileId, {
    skip: !profileId,
  });

  // Use messaging hook
  const {
    conversation,
    isLoadingMessages,
    sendMessage,
    handleTyping,
    isConnected,
    isConnecting,
    wsError,
  } = useMessaging(conversationId);

  const [isSending, setIsSending] = React.useState(false);
  const [shouldClearInput, setShouldClearInput] = React.useState(false);
  const previousMessageCountRef = React.useRef(conversation.length);

  // Clear input only after conversation is refetched with new message
  React.useEffect(() => {
    if (
      shouldClearInput &&
      conversation.length > previousMessageCountRef.current
    ) {
      setShouldClearInput(false);
      setIsSending(false);
      previousMessageCountRef.current = conversation.length;
    }
  }, [conversation.length, shouldClearInput]);

  const handleSendMessage = (text: string) => {
    if (!conversationId || !text.trim()) return false;

    setIsSending(true);
    try {
      const success = sendMessage(text, conversationId);
      console.log('success', success);
      if (success) {
        setShouldClearInput(true);
        return true;
      } else {
        console.error("Failed to send message");
        setIsSending(false);
        return false;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSending(false);
      return false;
    }
  };

  // Loading state
  if (isLoadingProfile && isLoadingMessages) {
    return (
      <div className="flex-[1.5] flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
          <p className="text-sm text-gray-500">Loading conversation...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (profileError) {
    return (
      <div className="flex-[1.5] flex items-center justify-center h-[calc(100vh-200px)] p-6">
        <Card className="max-w-md border-red-200 bg-red-50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">
                Error loading profile
              </p>
              <p className="text-sm text-red-700 mt-1">
                Failed to load recipient profile. Please try again later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (wsError || !isConnected) {
    return (
      <div className="flex-[1.5] flex items-center justify-center h-[calc(100vh-200px)] p-6">
        <Card className="max-w-md border-yellow-200 bg-yellow-50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Connection Issue
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                {isConnecting
                  ? "Connecting to chat server..."
                  : "Connection lost. Messages may not send properly."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ConversationView
      messages={conversation}
      recipientProfile={recipientProfile}
      currentUserId={currentUserId}
      isLoadingMessages={isLoadingMessages}
      isLoadingProfile={isLoadingProfile}
      onSendMessage={handleSendMessage}
      isSending={isSending}
      isTyping={false}
      shouldClearInput={shouldClearInput}
    />
  );
}
