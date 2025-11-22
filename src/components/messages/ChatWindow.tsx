import { Card, CardHeader, CardContent } from "@/components/ui/card";
import FindResearchers from "@/components/messages/FindResearchers";
import MessageInput from "./MessageInput";
import { getRelativeTime } from "./ConversationList";
import {useGetAllPublishersProfileQuery, useGetPublisherProfileByIdQuery} from "@/store/features/auth/actions";
import { useGetConversationQuery, useSendMessageMutation } from "@/store/features/messages/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchParams } from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { Profile } from "../types/profile";
import {useWebSocket} from "@/hooks/useSocket";
import {dispatchWSMessage, onWS, smartTimeAgo} from "@/helpers/helpers";


export default function ChatWindow({
  selectedUser,
  setSelectedUser,
  conversationView,
  setConversationView,
  messages,
  setMessages,
  conversations,
  setConversations,
}: any) {
  const activeMessages = selectedUser ? messages[selectedUser.id] || [] : [];
  const searchParams = useSearchParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationId = searchParams.get("user");

  const { data: publishers, isLoading, refetch} = useGetAllPublishersProfileQuery({})
  const [message, setMessage] = useState({})
  const [run, setRun] = useState()
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const {data: conversation,  isLoading: isGettingConversation, refetch: refetchConversation  } = useGetConversationQuery(conversationId)
    const token: string = useSelector((state: RootState): any => state.auth.token) ;
    const socket = useSelector((state: RootState): any => state.messages.socketMessageId) ;

  const userId = useSelector((state: any) => state.auth.user?.id ) ;


  useEffect(() => {
    refetchConversation()
  }, [run])

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
        // reconnectAttempts,
        onOpen: () => {
        },
        onMessage: (data: any) => {
            const wsData = JSON.parse(data);
            dispatchWSMessage(wsData); // 👈 this replaces your switch-case
        },
        onClose: (event: { code: any; }) => {
        },
        onError: (error: any) => {
            console.error('❌ Chat error:', error);
        }
    });

  useEffect(() => {
        onWS(3, (data) => {
            refetchConversation()
        });
    }, [socket]);


    useEffect(() => {
        if (conversationId) {
            setConversationView(true);
            setSelectedUser({
                other_user_id: conversationId
            })
        }
    }, [conversationId]);

    useEffect(() => {
        // if (!conversationView || !selectedUser  || !conversation?.data) return;

        const unreadMessages = conversation?.data?.filter(
            (msg: any) => msg.out === false && msg.read === false
        );

        if (unreadMessages?.length > 0) {
            unreadMessages?.forEach((msg: any) => {
                const markAsReadMessage = {
                    msg_type: 6,
                    user_pk: msg?.sender,
                    message_id: msg.id
                };

                send(JSON.stringify(markAsReadMessage));
            });
        }
    }, [conversationView, conversation?.data, selectedUser]);

    useEffect(() => {
        onWS(8, (data) => {
            refetchConversation()
        });
        onWS(9, (data) => {
            refetchConversation()
        });
        onWS(6, (data) => {
            refetchConversation()
        });

    }, []);

    useEffect(() => {
        if (conversationView && conversation?.data) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversation?.data, conversationView]);

  return (
    <div className="flex-[1.5]">
      <Card className="border-none h-fit w-full">
        <CardHeader>
          {!conversationView   ? (
            <>
              <h2 className="text-xl font-normal font-poppins mb-3">
                Send Message
              </h2>
              <FindResearchers
                onSelect={(user) => {
                    setSelectedUser(user);
                }}
                selectedUser={selectedUser}
                publishers={publishers?.results}
                />

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
                  {selectedUser?.name || selectedUser?.first_name + ' ' + selectedUser?.last_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedUser?.university || "Researcher"}
                </p>
              </div>
            </div>
          )}
        </CardHeader>

        {/* Chat Display */}
        <CardContent className="px-6 py-4 min-h-[100px] max-h-[400px] overflow-y-auto flex flex-col gap-3">
          {isGettingConversation && <p>loading</p> }
          {!conversationView  ? (
            <div className="text-gray-400 text-center py-20">
              Select a user and start a conversation
            </div>
          ) : conversation?.data?.length === 0 ? (
            <div className="text-gray-400 text-center py-20">
              No messages yet. Say hello 👋
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {conversation?.data?.slice().reverse()?.map((msg: any, idx: number) => {
                const isSelf = msg.sender == userId;
                const senderName = isSelf ? "You" : msg?.sender_name;
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
                          src={msg?.sender_profile_pic}
                          alt={senderName}
                          className="w-12 h-12 rounded-full object-cover border border-gray-300"
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
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline">
                                  <path d="M2 8L5.5 11.5L10 7" stroke="#0084FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 8L9.5 11.5L14 7" stroke="#0084FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                          ) : (
                              // Single tick for sent but unread messages
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline">
                                  <path d="M2 8L6 12L14 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
            selectedConversation={selectedUser?.id}
            selectedUser={selectedUser}
            messages={messages}
            setMessages={setMessages}
            run={run}
            send={send}
            setRun={setRun}
            setConversations={setConversations}
            conversations={conversations}
            setConversationView={setConversationView}
        />
      </Card>
    </div>
  );
}
