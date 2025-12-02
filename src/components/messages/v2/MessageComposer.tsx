"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Send, Paperclip, Smile, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";

interface MessageComposerProps {
  onSend: (message: string) => void | boolean;
  isSending?: boolean;
  disabled?: boolean;
  onTyping?: () => void;
  placeholder?: string;
  shouldClearInput?: boolean;
}

export default function MessageComposer({
  onSend,
  isSending = false,
  disabled = false,
  onTyping,
  placeholder = "Type a message...",
  shouldClearInput = false,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<any>(null);

  // Strip HTML tags to check if message is empty
  const getPlainText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const isMessageEmpty = !getPlainText(message).trim();

  // Clear input when shouldClearInput becomes true
  useEffect(() => {
    if (shouldClearInput) {
      setMessage("");
      setEditorKey((prev) => prev + 1);
    }
  }, [shouldClearInput]);

  const handleSend = () => {
    if (isMessageEmpty || disabled || isSending) return;

    onSend(message);
    // Don't clear immediately, wait for parent to signal success
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Send on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Notify parent component when user is typing
    if (onTyping && message && !isMessageEmpty) {
      onTyping();
    }
  }, [message, onTyping, isMessageEmpty]);

  return (
    <CardFooter className="border-t bg-white p-4 sticky bottom-0">
      <div className="flex items-end gap-3 w-full">
        {/* Rich Text Editor */}
        <div
          className={`flex-1 border rounded-lg overflow-hidden transition-all ${
            isFocused ? "border-primary-green shadow-sm" : "border-gray-200"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <RichTextEditor
            key={editorKey}
            value={message}
            onChange={setMessage}
            className="min-h-[60px] max-h-[120px] w-full rounded-none border-none text-sm"
            placeholder={placeholder}
            // disabled={disabled}
          />
        </div>

        {/* Send Button */}
        <Button
          size="icon"
          onClick={handleSend}
          disabled={isMessageEmpty || disabled || isSending}
          className={`h-11 w-11 rounded-lg transition-all ${
            isMessageEmpty || disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
              : "bg-primary-green hover:bg-primary-green/90 text-white shadow-sm"
          }`}
        >
          {isSending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Helper Text */}
      {/* {!disabled && (
        <p className="text-[10px] text-gray-400 mt-2 text-center w-full">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">
            Enter
          </kbd>{" "}
          to send
        </p>
      )} */}
    </CardFooter>
  );
}
