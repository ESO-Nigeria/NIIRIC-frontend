"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import RichTextEditor from "@/components/common/RichTextEditor";
import { SendHorizonal } from "lucide-react";
import { getRelativeTime } from "./ConversationList";
import { useState } from "react";

export default function MessageInput({
  selectedUser,
  messages,
  setMessages,
  conversations,
  setConversations,
  setConversationView,
}: any) {
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { abstract: "" } });
  const [editorKey, setEditorKey] = useState(0); // Forcing RichTextEditor re-render

  const onSubmit = (data: any) => {
    if (!selectedUser) {
      alert("Please select a user to message.");
      return;
    }

    const now = new Date();
    const timestamp = now.toISOString();
    const newMessage = { text: data.abstract, fromSelf: true, timestamp };

    setMessages((prev: any) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));

    const relativeTime = getRelativeTime(timestamp);
    setConversations((prev: any) => {
      const existing = prev.find((c: any) => c.id === selectedUser.id);
      let updated;
      if (existing) {
        updated = prev.map((c: any) =>
          c.id === selectedUser.id
            ? { ...c, lastMessage: newMessage.text, time: relativeTime, timestamp }
            : c
        );
      } else {
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
      return updated.sort(
        (a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });

    // Clear the form and force RichTextEditor re-render
    setValue("abstract", "");
    setEditorKey((prev) => prev + 1);

    setConversationView?.(true);

      // dummy response after short delay
  setTimeout(() => {
    const reply = {
      text: "Hey there 👋, I got your message!",
      fromSelf: false,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev: any) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), reply],
    }));
  }, 1500);
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
          disabled={!selectedUser}
          className={`flex items-center justify-center transition-all duration-200 bg-transparent text-base-800 ${
            !selectedUser ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <SendHorizonal size={22} className="text-green-700" />
        </Button>
      </CardFooter>
    </form>
  );
}
