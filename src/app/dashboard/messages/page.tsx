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

    console.log("Messages selectedUser", selectedUser);
  return (

    <>
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
    
    </>
   

      
      
  );
}
