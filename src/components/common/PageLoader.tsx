"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  overlay?: boolean; // ⬅️ NEW: enables blurred overlay background
}

const PageLoader: React.FC<LoaderProps> = ({
  message = "Loading...",
  className,
  size = "md",
  overlay = false,
}) => {
  const sizeClasses =
    size === "sm"
      ? "h-5 w-5"
      : size === "lg"
      ? "h-10 w-10"
      : "h-6 w-6";

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 text-gray-600",
        className
      )}
    >
      <Loader2
        className={cn("animate-spin text-primary-green", sizeClasses)}
      />
      {message && (
        <p className="mt-3 text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default PageLoader;
