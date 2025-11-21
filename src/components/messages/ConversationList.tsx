'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import ConversationItem from "./ConversationItem";
import { useGetMessageListQuery } from "@/store/features/messages/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {dispatchWSMessage, onWS} from "@/helpers/helpers";
import {useWebSocket} from "@/hooks/useSocket";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export const getRelativeTime = (timestamp: string) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diff = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 172800) return "yesterday";
  return `${Math.floor(diff / 86400)} days ago`;
};

export default function ConversationList({
  // conversations,
  selectedUser,
  setSelectedUser,
  setConversationView,
}: any) {
  type ConversationType = {
    id: number | string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    timestamp: string;
  };
  const {data: conversations, isLoading, refetch} = useGetMessageListQuery({})

  const router = useRouter();
  const searchParams = useSearchParams();
    const token: string = useSelector((state: RootState): any => state.auth.token) ;
    const user: any = useSelector((state: RootState): any => state.auth.user) ;

    // ✅ Read userId from query params
    const userId = searchParams.get("userId");

    // ✅ Auto-select conversation if userId exists in URL
    useEffect(() => {
      if (userId) {
        const found = conversations.find((conv: any) => conv.id === userId);
        if (found) {
          setSelectedUser(found);
          setConversationView(true);
        }
      }
    }, [userId, conversations]);

    const {
        isConnected,
        isConnecting,
        error,
        connect,
        disconnect,
        send,
        sendTyped
    } = useWebSocket({
        url: `wss://niiric-api-d3f7b4baewdvfjbp.westeurope-01.azurewebsites.net/chat_ws`,
        path: '/chat_ws' ,
        token,
        autoConnect: true,
        reconnectAttempts: 3,
        onOpen: () => {
            console.log('✅ Chat connected!');
        },
        onMessage: (data: any) => {
            console.log('📨 Received: list', data);

            const wsData = JSON.parse(data);
            dispatchWSMessage(wsData); // 👈 this replaces your switch-case
        },
        onClose: (event: { code: any; }) => {
            console.log('🔌 Chat closed:', event.code);
        },
        onError: (error: any) => {
            console?.error('❌ Chat error:', error);
        }
    });

const handleSelect = (conv: any) => {
  setSelectedUser(conv);
  setConversationView(true);

    // const message = {
    //     msg_type: 6,
    //     user_pk: conv?.other_user_id,
    //     message_id: conv?.id
    // };
    //
    // console.log(conv, 'conv')
    // send(JSON.stringify(message));
  // ✅ Update query params dynamically
  const params = new URLSearchParams(window.location.search);
  params.set("user", conv?.other_user_id); // or conv.userId
  router.push(`?${params.toString()}`);
};

    useEffect(() => {
        onWS(8, (data) => {
            console.log("New message: convo list", data.text);
            refetch()
        });

        onWS(9, (data) => {
            console.log("New message: convo list", data.text);
            refetch()
        });

    }, []);

  console.log('data', conversations, user)


  return (
    <div className="flex-1 max-sm:order-2 md:max-w-[350px] lg:max-w-[500px]">
      <Card className="border-none h-screen ">
        <CardHeader>
          {/* Filter Buttons */}
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

          {/* Search Bar */}
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

        {/* Conversation Items */}
        <CardContent className="p-4 text-gray-400">
          {conversations?.data?.length === 0 ? (
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
              {conversations?.data?.map((conv: ConversationType) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  selectedUser={selectedUser}
                  onSelect={() => {
                    handleSelect(conv)
                  }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
