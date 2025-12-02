"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useWebSocket } from "./useSocket";
import { dispatchWSMessage, onWS } from "@/helpers/helpers";
import {
  useGetConversationQuery,
  useGetMessageListQuery,
} from "@/store/features/messages/actions";

interface OptimisticMessage {
  id: string;
  sender: string;
  sender_name: string;
  sender_profile_pic: string;
  text: string;
  sent: string;
  read: boolean;
  out: boolean;
  status: "sending" | "sent" | "failed";
  isOptimistic: boolean;
}

export const useMessaging = (conversationId?: string | null) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector(
    (state: RootState) => (state.auth.user as any)?.id
  );
  const userName = useSelector(
    (state: RootState) => (state.auth.user as any)?.first_name
  );
  const userProfilePic = useSelector(
    (state: RootState) => (state.auth.user as any)?.profile_pic
  );
  const [isTyping, setIsTyping] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<
    Map<string, OptimisticMessage>
  >(new Map());
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const pendingMessagesRef = useRef<Map<number, string>>(new Map());

  // WebSocket connection
  const {
    isConnected,
    isConnecting,
    error: wsError,
    send,
    sendTyped,
  } = useWebSocket({
    url: `wss://niiric-api-d3f7b4baewdvfjbp.westeurope-01.azurewebsites.net/chat_ws`,
    path: "/chat_ws",
    token: token || "",
    autoConnect: true,
    reconnectAttempts: 3,
    onOpen: () => {
      console.log("✅ Chat WebSocket connected");
    },
    onMessage: (data: string) => {
      const wsData = JSON.parse(data);
      dispatchWSMessage(wsData);
    },
    onClose: (event) => {
      console.log("🔌 Chat WebSocket closed:", event.code);
    },
    onError: (error) => {
      console.error("❌ Chat WebSocket error:", error);
    },
  });

  // Fetch conversation messages
  const {
    data: conversation,
    isLoading: isLoadingMessages,
    refetch: refetchConversation,
  } = useGetConversationQuery(conversationId!, {
    // skip: !conversationId,
  });

  // Fetch conversation list
  const {
    data: conversationsList,
    isLoading: isLoadingConversations,
    refetch: refetchConversationsList,
  } = useGetMessageListQuery({});

  // Send message handler with optimistic update
  const sendMessage = useCallback(
    (text: string, recipientId: string) => {
      if (!text.trim() || !isConnected) return false;

      const randomId = -Math.floor(Math.random() * 1000000);
      const tempId = `temp-${Date.now()}-${randomId}`;

      // Create optimistic message
      const optimisticMessage: OptimisticMessage = {
        id: tempId,
        sender: userId || "",
        sender_name: userName || "You",
        sender_profile_pic: userProfilePic || "",
        text: text.trim(),
        sent: new Date().toISOString(),
        read: false,
        out: true,
        status: "sending",
        isOptimistic: true,
      };

      // Add to optimistic messages immediately
      setOptimisticMessages((prev) => {
        const updated = new Map(prev);
        updated.set(tempId, optimisticMessage);
        return updated;
      });

      // Track pending message
      pendingMessagesRef.current.set(randomId, tempId);

      const message = {
        msg_type: 3,
        text: text.trim(),
        user_pk: recipientId,
        random_id: randomId,
      };

      try {
        send(JSON.stringify(message));

        // Set timeout to mark as failed if no response in 10 seconds
        setTimeout(() => {
          if (pendingMessagesRef.current.has(randomId)) {
            setOptimisticMessages((prev) => {
              const updated = new Map(prev);
              const msg = updated.get(tempId);
              if (msg && msg.status === "sending") {
                updated.set(tempId, { ...msg, status: "failed" });
              }
              return updated;
            });
            pendingMessagesRef.current.delete(randomId);
          }
        }, 10000);
      } catch (error) {
        // Mark as failed immediately
        setOptimisticMessages((prev) => {
          const updated = new Map(prev);
          updated.set(tempId, { ...optimisticMessage, status: "failed" });
          return updated;
        });
        pendingMessagesRef.current.delete(randomId);
        return false;
      }

      return true;
    },
    [isConnected, send, userId, userName, userProfilePic]
  );

  // Mark messages as read
  const markAsRead = useCallback(
    (messageId: string, senderId: string) => {
      if (!isConnected) return false;

      const message = {
        msg_type: 6,
        user_pk: senderId,
        message_id: messageId,
      };

      return send(JSON.stringify(message));
    },
    [isConnected, send]
  );

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (recipientId: string, isTyping: boolean) => {
      if (!isConnected) return false;

      const message = {
        msg_type: isTyping ? 4 : 5, // 4: typing, 5: stop typing
        user_pk: recipientId,
      };

      return send(JSON.stringify(message));
    },
    [isConnected, send]
  );

  // Handle typing with debounce
  const handleTyping = useCallback(
    (recipientId: string) => {
      if (!isTyping) {
        setIsTyping(true);
        sendTypingIndicator(recipientId, true);
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Stop typing after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        sendTypingIndicator(recipientId, false);
      }, 3000);
    },
    [isTyping, sendTypingIndicator]
  );

  // Auto mark unread messages as read
  useEffect(() => {
    if (!conversation?.data || !conversationId) return;

    const unreadMessages = conversation.data.filter(
      (msg: any) => msg.out === false && msg.read === false
    );

    if (unreadMessages.length > 0) {
      unreadMessages.forEach((msg: any) => {
        markAsRead(msg.id, msg.sender);
      });
    }
  }, [conversation?.data, conversationId, markAsRead]);

  // Listen to WebSocket events
  useEffect(() => {
    const handleNewMessage = (event: any) => {
      console.log("📨 New message received, refetching...");
      const data = event.detail;

      // Check if this is a confirmation of our sent message
      if (
        data &&
        data.random_id &&
        pendingMessagesRef.current.has(data.random_id)
      ) {
        const tempId = pendingMessagesRef.current.get(data.random_id)!;

        // Remove optimistic message after successful send
        setOptimisticMessages((prev) => {
          const updated = new Map(prev);
          updated.delete(tempId);
          return updated;
        });

        pendingMessagesRef.current.delete(data.random_id);
      }

      if (conversationId) {
        refetchConversation();
      }
      refetchConversationsList();
    };

    const handleMessageRead = () => {
      console.log("✓ Message read, refetching conversation...");
      if (conversationId) {
        refetchConversation();
      }
    };

    const handleNewConversation = () => {
      console.log("💬 New conversation, refetching list...");
      refetchConversationsList();
    };

    const handleConversationUpdate = () => {
      console.log("🔄 Conversation updated, refetching list...");
      refetchConversationsList();
    };

    // Register handlers - these will be called for ALL instances
    const listeners = [
      { type: 3, handler: handleNewMessage },
      { type: 6, handler: handleMessageRead },
      { type: 8, handler: handleNewConversation },
      { type: 9, handler: handleConversationUpdate },
    ];

    listeners.forEach(({ type, handler }) => {
      // Subscribe to custom event for this message type
      const eventName = `ws-message-${type}`;
      window.addEventListener(eventName, handler as EventListener);
    });

    // Cleanup
    return () => {
      listeners.forEach(({ type, handler }) => {
        const eventName = `ws-message-${type}`;
        window.removeEventListener(eventName, handler as EventListener);
      });
    };
  }, [refetchConversation, refetchConversationsList, conversationId]);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Merge optimistic messages with real messages
  const mergedMessages = [
    ...(conversation?.data || []),
    ...Array.from(optimisticMessages.values()),
  ].sort((a, b) => new Date(a.sent).getTime() - new Date(b.sent).getTime());

  return {
    // Connection state
    isConnected,
    isConnecting,
    wsError,

    // Data
    conversation: mergedMessages,
    conversationsList: conversationsList || [],
    userId,

    // Loading states
    isLoadingMessages,
    isLoadingConversations,

    // Actions
    sendMessage,
    markAsRead,
    handleTyping,
    refetchConversation,
    refetchConversationsList,

    // State
    isTyping,
  };
};
