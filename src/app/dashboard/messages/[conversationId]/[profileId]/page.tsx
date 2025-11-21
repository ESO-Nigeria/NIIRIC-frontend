"use client";

import { getProfileById } from "@/components/messages/ChatWindow";
import MessageInput from "@/components/messages/MessageInput";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dispatchWSMessage, onWS, smartTimeAgo } from "@/helpers/helpers";
import { useWebSocket } from "@/hooks/useSocket";
import { RootState } from "@/store";
import { useGetPublisherProfileByIdQuery } from "@/store/features/auth/actions";
import {
  useGetConversationQuery,
  useSendMessageMutation,
} from "@/store/features/messages/actions";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function page() {
  const { conversationId, profileId } = useParams();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const {
    data: conversation,
    isLoading: isGettingConversation,
    refetch: refetchConversation,
  } = useGetConversationQuery(conversationId);
   const { data: recipientProfile, isLoading } = useGetPublisherProfileByIdQuery(profileId, {
        skip: !profileId // Don't fetch if no ID provided
    });

  const token: string = useSelector(
    (state: RootState): any => state.auth.token
  );
  const [run, setRun] = useState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = useSelector((state: any) => state.auth.user?.id);

  useEffect(() => {
    onWS(8, (data: any) => {
      console.log("MessageIdCreated: convo list", data);
      refetchConversation();
    });
    onWS(9, (data: any) => {
      console.log("NewUnreadCount: convo list", data);
      refetchConversation();
    });
    onWS(6, (data: any) => {
      console.log("MessageRead: convo list", data);
      refetchConversation();
    });
  }, []);

  const {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    send,
    sendTyped,
  } = useWebSocket({
    url: `wss://niiric-api-d3f7b4baewdvfjbp.westeurope-01.azurewebsites.net/chat_ws`,
    path: "/chat_ws",
    token,
    autoConnect: true,
    // reconnectAttempts,
    onOpen: () => {
      console.log("✅ Chat connected!");
    },
    onMessage: (data: any) => {
      console.log("📨 Received:", data);
      const wsData = JSON.parse(data);
      dispatchWSMessage(wsData); // 👈 this replaces your switch-case
    },
    onClose: (event: { code: any }) => {
      console.log("🔌 Chat closed:", event.code);
    },
    onError: (error: any) => {
      console.error("❌ Chat error:", error);
    },
  });

   useEffect(() => {
          // if (conversationView && conversation?.data) {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          // }
      }, [conversation, isGettingConversation]);


  useEffect(() => {
    refetchConversation();
  }, [run]);

  console.log("conversation single page", conversation, recipientProfile, profileId);
  return (
    <>
      <div className="flex-[1.5]">
        <Card className="border-none h-fit w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <img
                src={recipientProfile?.profile_pic || "/default-avatar.png"}
                alt={recipientProfile?.name || recipientProfile?.first_name + ' ' + recipientProfile?.last_name}
                className="w-10 h-10 rounded-full object-cover border border-[#039855]"
              />
              <div>
                <h3 className="font-medium text-gray-800 capitalize">
                  {recipientProfile?.name || recipientProfile?.first_name + ' ' + recipientProfile?.last_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {recipientProfile?.university || "Researcher"}
                </p>
              </div>
            </div>
          </CardHeader>

          {/* Chat Display */}
          <CardContent className="px-6 py-4 min-h-[100px] max-h-[400px] overflow-y-auto flex flex-col gap-3">
            {isGettingConversation && <p>loading</p>}
            {conversation?.data?.length === 0 ? (
              <div className="text-gray-400 text-center py-20">
                No messages yet. Say hello 👋
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {conversation?.data
                  ?.slice()
                  .reverse()
                  ?.map((msg: any, idx: number) => {
                    const isSelf = msg.sender == userId;
                    const senderName = isSelf ? "You" : recipientProfile?.name || recipientProfile?.first_name + ' ' + recipientProfile?.last_name;
                    const senderProfile = getProfileById(msg.sender);

                    // const avatar = isSelf
                    //   ? {} // replace with your profile image
                    //   : selectedUser?.avatar || "/default-avatar.png";

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}
                      >
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-2 mb-1">
                          {!isSelf && (
                            <img
                              src={recipientProfile?.profile_pic || "/default-avatar.png"}
                              alt={senderName}
                              className="w-[48px] h-[48px] rounded-full object-cover border border-gray-300"
                            />
                          )}
                          <span className="text-[14px]  capitalize font-medium text-gray-600 ">
                            {senderName}
                          </span>
                          {/*{isSelf && (*/}
                          {/*  <img*/}
                          {/*    src={msg?.sender_profile_pic}*/}
                          {/*    alt={senderName}*/}
                          {/*    className="w-[48px] h-[48px] rounded-full object-cover border border-gray-300"*/}
                          {/*  />*/}
                          {/*)}*/}
                        </div>

                        {/* Message Bubble */}
                        <div
                          dangerouslySetInnerHTML={{ __html: msg.text ?? "" }}
                          className={`px-4 py-2 rounded-[10px] text-sm break-words max-w-[70%] ${
                            isSelf
                              ? "bg-gray-100 text-base-800 rounded-tr-none"
                              : "bg-gray-50  rounded-tl-none"
                          }`}
                        />
                        {/* Timestamp */}
                        <span
                          className={`text-[11px] text-gray-400 mt-1 ${
                            isSelf ? "text-right" : "text-left"
                          }`}
                        >
                          {smartTimeAgo(msg?.sent)}
                        </span>
                        {isSelf && (
                          <span className="text-[11px]">
                            {msg.read ? (
                              // Double tick for read messages
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="inline"
                              >
                                <path
                                  d="M2 8L5.5 11.5L10 7"
                                  stroke="#0084FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 8L9.5 11.5L14 7"
                                  stroke="#0084FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              // Single tick for sent but unread messages
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="inline"
                              >
                                <path
                                  d="M2 8L6 12L14 4"
                                  stroke="#9CA3AF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    );
                  })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>

          {/* Message Input */}
          <MessageInput
            selectedConversation={conversationId}
            run={run}
            send={send}
            setRun={setRun}
        />
        </Card>
      </div>
    </>
  );
}

export default page;
