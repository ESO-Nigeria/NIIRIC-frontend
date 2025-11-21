"use client";
import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MessageTab from "@/components/common/MessageTab";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import ConversationList from "@/components/messages/ConversationList";
import { dispatchWSMessage, onWS } from "@/helpers/helpers";
import { useGetMessageListQuery } from "@/store/features/messages/actions";
import { useWebSocket } from "@/hooks/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  const {
    data: conversations,
    isLoading,
    refetch,
  } = useGetMessageListQuery({});
  const token: string = useSelector(
    (state: RootState): any => state.auth.token
  );
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
    onOpen: () => {
      console.log("✅ Chat layout connected!");
    },
    onMessage: (data: any) => {
      console.log("📨 Received: from layout", data);
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
    onWS(8, (data) => {
      console.log("New message: convo list", data);
      refetch();
    });

    onWS(9, (data) => {
      console.log("New message: convo list", data);
      refetch();
    });
    console.log("here", conversations);
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="pb-2">
          <Breadcrumbs />
        </div>
        <div className="space-y-4 font-dm_sans">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-normal font-poppins">Messages</h2>
            <Button
              variant="primary-green"
              className="h-11 px-3"
              asChild
              // onClick={() => setConversationView(false)}
            >
              <Link href="/dashboard/messages">
                  Send Message
              </Link>
              
            </Button>
          </div>

          <MessageTab />

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            {/* Left: Conversation List */}
            <ConversationList
            // conversations={conversations}
            // selectedUser={selectedUser}
            // setSelectedUser={setSelectedUser}
            // setConversationView={setConversationView}
            />

            {/* Right: Chat Window */}

            <>{children}</>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default layout;
