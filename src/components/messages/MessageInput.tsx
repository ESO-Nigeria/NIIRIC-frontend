"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import RichTextEditor from "@/components/common/RichTextEditor";
import { SendHorizonal } from "lucide-react";
import { getRelativeTime } from "./ConversationList";
import { useState } from "react";
import { useSendMessageMutation } from "@/store/features/messages/actions";

export default function MessageInput({
  selectedUser,
  messages,
  setMessages,
  conversations,
  setConversations,
  setConversationView,
  submitMessage,
  run,
  setRun
}: any) {
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { abstract: "" } });
  const [editorKey, setEditorKey] = useState(0); // Forcing RichTextEditor re-render
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const onSubmit = async (data: any) => {
    if (!selectedUser) {
      alert("Please select a user to message.");
      return;
    }
    const now = new Date();
    const timestamp = now.toISOString();
    const newMessage = { content: data.abstract, recipient: selectedUser?.id, fromSelf: true, timestamp };
    const response = await sendMessage(newMessage).unwrap() 
    console.log('response', response)
    setRun(!run)
    // Clear the form and force RichTextEditor re-render
      setValue("abstract", "");
      setEditorKey((prev) => prev + 1);
      setConversationView?.(true);
  };

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
          disabled={!selectedUser || isSending}
          className={`flex items-center justify-center text-primary-green! hover:bg-primary-green hover:text-white! transition-all duration-200 bg-transparent text-base-800 ${
            !selectedUser ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <SendHorizonal size={22} className="" />
        </Button>
      </CardFooter>
    </form>
  );
}
