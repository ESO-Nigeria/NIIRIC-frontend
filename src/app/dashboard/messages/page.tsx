"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import MessageTab from "@/components/common/MessageTab";
import FindResearchers from "@/components/messages/FindResearchers";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [conversationView, setConversationView] = useState(false);
  const [messages, setMessages] = useState<{ [userId: number]: any[] }>({});
  const [conversations, setConversations] = useState<any[]>([]);

  
  return (
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
            onClick={() => setConversationView(false)}
          >
            Send Message
          </Button>
        </div>

        <MessageTab />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          {/* Left: Conversation List */}
          <ConversationList
            conversations={conversations}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setConversationView={setConversationView}
          />


          {/* Right: Chat Window */}
          <ChatWindow
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            conversationView={conversationView}
            setConversationView={setConversationView}
            messages={messages}
            setMessages={setMessages}
            conversations={conversations}
            setConversations={setConversations}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
