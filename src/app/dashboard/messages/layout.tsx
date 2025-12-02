"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/common/Breadcrumb";
import MessageTab from "@/components/common/MessageTab";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MessagesList from "@/components/messages/v2/MessagesList";
import { useMessaging } from "@/hooks/useMessaging";
import { MessageSquarePlus } from "lucide-react";

export default function MessagesV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conversationsList, isLoadingConversations, userId } = useMessaging();

  console.log('conversationList', conversationsList)
  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>

      <div className="space-y-4 font-dm_sans">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-normal font-poppins">Messages</h2>
          <Button variant="primary-green" className="h-11 px-4 gap-2" asChild>
            <Link href="/dashboard/messages">
              <MessageSquarePlus className="w-4 h-4" />
              New Message
            </Link>
          </Button>
        </div>

        <MessageTab />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          {/* Conversations List */}
          <MessagesList
            conversations={conversationsList?.data || []}
            isLoading={isLoadingConversations}
            currentUserId={userId}
          />

          {/* Main Content (Children) */}
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
