import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export function handleApiError(error: FetchBaseQueryError | SerializedError ) {
  if ("data" in error && typeof error.data === "object" && error.data !== null) {
    const data = error.data as Record<string, string[] | string>;
    const messages = Object.entries(data)
      .map(([field, val]) => {
        if (Array.isArray(val)) return `${val.join(", ")}`;
        return `${val}`;
      })
      .join("\n");

    toast.error(messages || "An error occurred");
    return;
  }
  if ("message" in error && typeof error.message === "string") {
    toast.error(error.message);
    return;
  }

  toast.error("Something went wrong");
}
