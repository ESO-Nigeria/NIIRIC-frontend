"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageTab from "@/components/common/MessageTab";
import { Search, Plus, SendHorizonal } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Controller, useForm } from "react-hook-form";
import FindResearchers from "@/components/FindResearchers";
import Link from "next/link";

// Helper: Convert timestamp into relative time text
const getRelativeTime = (timestamp: string) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diff = Math.floor((now.getTime() - messageTime.getTime()) / 1000); // seconds

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 172800) return "yesterday";
  return `${Math.floor(diff / 86400)} days ago`;
};

type MessageType = {
  text: string;
  fromSelf: boolean;
  timestamp: string; // raw date string
};

export default function Messages() {
  // Track currently selected user
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Whether we're in "new message" view or "chat" view
  const [conversationView, setConversationView] = useState(false);

  // Each user's messages stored separately by user ID
  const [messages, setMessages] = useState<{ [userId: number]: MessageType[] }>({});

  // Left-panel list of conversations
  const [conversations, setConversations] = useState<any[]>([]);

  // Form setup
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      abstract: "",
    },
  });

  /**
   * Handle sending a new message
   */
  const onSubmit = (data: any) => {
    if (!selectedUser) {
      alert("Please select a user to message.");
      return;
    }

    const now = new Date();
    const timestamp = now.toISOString(); // store exact time
    const newMessage: MessageType = {
      text: data.abstract,
      fromSelf: true,
      timestamp,
    };

    // Append new message to this user’s chat only
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));

    // Switch to conversation view if not already there
    setConversationView(true);

    // Update or add conversation in left panel
    const relativeTime = getRelativeTime(timestamp);
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === selectedUser.id);
      let updated;

      if (existing) {
        // Update last message and time
        updated = prev.map((c) =>
          c.id === selectedUser.id
            ? { ...c, lastMessage: newMessage.text, time: relativeTime, timestamp }
            : c
        );
      } else {
        // New chat entry
        updated = [
          ...prev,
          {
            id: selectedUser.id,
            name: selectedUser.name,
            avatar: selectedUser.avatar || "/default-avatar.png",
            lastMessage: newMessage.text,
            time: relativeTime,
            timestamp,
          },
        ];
      }

      // Sort by newest first
      return updated.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });

    reset();
  };

  // Get messages for the active user
  const activeMessages = selectedUser ? messages[selectedUser.id] || [] : [];

  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
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
          {/* ===================== LEFT PANEL ===================== */}
          <div className="flex-1">
            <Card className="border-none h-screen">
              <CardHeader>
                {/* Filters */}
                <div className="flex gap-4 w-full mb-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-md bg-green-50 text-green-700 border-green-700"
                  >
                    All
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-md">
                    Unread
                  </Button>
                </div>

                {/* Search Bar + Add Button */}
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search messages..."
                      className="pl-10 py-6 pr-3"
                    />
                  </div>
                  <Button variant="primary-green" size="icon" className="h-12 w-12">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Conversations */}
              <CardContent className="p-4 text-gray-400">
                {conversations.length === 0 ? (
                  <div className="flex items-center justify-center text-center">
                    <div>
                      <p className="text-[18px] font-dm_sans font-medium">
                        You do not have any messages
                      </p>
                      <Link
                        href="/dashboard/publications/upload"
                        className="h-11 px-3 text-green-700 text-[14px] font-dm_sans font-medium"
                      >
                        Send messages to other Researchers
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col divide-y">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl hover:bg-gray-50 ${
                          selectedUser?.id === conv.id ? "bg-green-50" : ""
                        }`}
                        onClick={() => {
                          setSelectedUser(conv);
                          setConversationView(true);
                        }}
                      >
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#039855]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">
                            {conv.name}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 whitespace-nowrap">
                          {getRelativeTime(conv.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ===================== RIGHT PANEL ===================== */}
          <div className="flex-[1.5]">
            <Card className="border-none h-fit w-full">
              {/* Header */}
              <CardHeader>
                {!conversationView ? (
                  <>
                    <h2 className="text-xl font-normal font-poppins mb-3">
                      Send Message
                    </h2>
                    <FindResearchers onSelect={(user) => setSelectedUser(user)} />
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedUser?.avatar || "/default-avatar.png"}
                      alt={selectedUser?.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#039855]"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {selectedUser?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedUser?.university || "Researcher"}
                      </p>
                    </div>
                  </div>
                )}
              </CardHeader>

              {/* Chat Display */}
              <CardContent className="px-6 py-4 min-h-[100px] max-h-[400px] overflow-y-auto">
                {!conversationView ? (
                  <div className="text-gray-400 text-center py-20">
                    Select a user and start a conversation
                  </div>
                ) : activeMessages.length === 0 ? (
                  <div className="text-gray-400 text-center py-20">
                    No messages yet. Say hello 👋
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {activeMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          msg.fromSelf ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                            msg.fromSelf
                              ? "bg-gray-100 text-base rounded-br-none"
                              : "bg-white border rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1">
                          {getRelativeTime(msg.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Input Area */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardFooter className="flex items-center gap-3 p-4 border-t mx-5">
                  <div className="flex-1 border rounded-md overflow-hidden">
                    <Controller
                      name="abstract"
                      control={control}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="min-h-[60px] w-full rounded-none border-none"
                        />
                      )}
                    />
                  </div>

                  <Button
                    size="icon"
                    type="submit"
                    disabled={!selectedUser}
                    className={`flex items-center justify-center transition-all duration-200 bg-transparent text-base-800 ${
                      !selectedUser ? "opacity-50 cursor-not-allowed" : "opacity-100"
                    }`}
                  >
                    <SendHorizonal size={22} className="text-green-700" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
