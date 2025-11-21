"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import RichTextEditor from "@/components/common/RichTextEditor";
import { SendHorizonal } from "lucide-react";
import { getRelativeTime } from "./ConversationList";
import { useState } from "react";
import { useSendMessageMutation } from "@/store/features/messages/actions";
import {useSocket} from "@/hooks/useWebSocket";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useSocketNew} from "@/hooks/useSocketHold";
import {useWebSocket} from "@/hooks/useSocket";

export default function MessageInput({
  selectedUser,
  messages,
  setMessages,
  conversations,
  setConversations,
  setConversationView,
  submitMessage,
  run,
  setRun,
  selectedConversation,
    send
}: any) {
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { abstract: "" } });
  const [editorKey, setEditorKey] = useState(0); // Forcing RichTextEditor re-render
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
    // const [messages, setMessages] = useState([]);
    const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: any) => state.auth.user?.id)

  const onSubmit = async (data: any) => {
    if (!selectedConversation) {
      alert("Please select a user to message.");
      return;
    }
    const now = new Date();
    const timestamp = now.toISOString();
    const newMessage =  {
          "msg_type": 3,
          "text": data.abstract,
          "user_pk": selectedConversation,
          "random_id": -Math.floor(Math.random() * 1000000)
      }
      console.log("newMessage", newMessage, selectedUser);
      const success = send(newMessage);
          // send(newMessage);
          //
      if (success) {
          console.log("Message sent successfully");
          // setInputValue(""); // Clear input
      } else {
          console.error("Failed to send message - socket not connected");
      }
    // console.log('response', response)
    setRun(!run)
    // Clear the form and force RichTextEditor re-render
      setValue("abstract", "");
      setEditorKey((prev) => prev + 1);
      setConversationView?.(true);
  };

  console.log('selectedConversation', selectedConversation)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardFooter className="flex items-center gap-3 p-4 border-t mx-5">
        <div className="flex-1 border rounded-md overflow-hidden">
          <Controller
            name="abstract"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                key={editorKey} // force re-mount
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
          disabled={!selectedConversation || isSending}
          className={`flex items-center justify-center text-primary-green! hover:bg-primary-green hover:text-white! transition-all duration-200 bg-transparent text-base-800 ${
            !selectedConversation ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <SendHorizonal size={22} className="" />
        </Button>
      </CardFooter>
    </form>
  );
}
