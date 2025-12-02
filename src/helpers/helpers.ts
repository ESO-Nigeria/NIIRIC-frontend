import { publicationTypeOptions } from "@/store/mockData/mockdata";
import { parseISO, isValid, format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
interface JwtPayload {
  exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 > Date.now(); // check expiry in ms
  } catch {
    return false;
  }
};

export const ORCID_ID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/i;
export const ORCID_URL_REGEX =
  /^https?:\/\/(www\.)?orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/i;
export const LINKEDIN_URL_REGEX =
  /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9\-_./?=#%]+$/i;

export default function objectToFormData(payload: Record<string, any>) {
  const fd = new FormData();
  const isFile = (v: any) =>
    typeof window.File !== "undefined" && v instanceof window.File;

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => fd.append(`${key}`, v));
    } else if (value instanceof File) {
      fd.append(key, value);
    } else {
      fd.append(key, String(value));
    }
  });
  return fd;
}

export function mapTagsToPublicationColors(tagLabels: string[]) {
  return tagLabels.map((label) => {
    const matchedType = publicationTypeOptions.find(
      (type) => type.value === label
    );

    const fallbackColor = "bg-gray-100 text-gray-600";
    const [bgColor, textColor] =
      matchedType?.color?.split(" ") || fallbackColor.split(" ");

    return {
      label: matchedType?.label || label.replace(/_/g, " "),
      colorClass: bgColor,
      textClass: textColor,
    };
  });
}

export function parseDate(value?: string | null): Date | null {
  if (!value) return null;

  try {
    // Try ISO format first
    const isoParsed = parseISO(value);
    if (isValid(isoParsed)) return isoParsed;

    const fallback = new Date(value);
    return isValid(fallback) ? fallback : null;
  } catch {
    return null;
  }
}

export function formatDeadline(deadline?: string | null): string {
  const parsed = parseDate(deadline);
  if (!parsed) return "";

  const hasTime = typeof deadline === "string" && deadline.includes("T");
  return format(parsed, hasTime ? "PPP p" : "PPP");
}

/**
 * Downloads a PDF directly from a given URL.
 *
 * @param {string} url - The URL of the PDF file.
 * @param {string} [fileName='document.pdf'] - The desired download file name.
 */
export function downloadPdfFromUrl(url: string, fileName = "document.pdf") {
  if (!url) return console.error("No URL provided for PDF download");

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Force-downloads a PDF file from a given URL, even if the server serves it inline.
 *
 * @param {string} url - The URL of the PDF file.
 * @param {string} [fileName='document.pdf'] - The name to save the file as.
 */
export async function forceDownloadPdf(url: string, fileName = "document.pdf") {
  if (!url) {
    console.error("No URL provided for PDF download");
    return;
  }

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error("Failed to fetch PDF");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);

    link.click(); // force download
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
}

export function getInitials(fullName?: string, limit?: number): string {
  if (!fullName) return "";

  const initials = fullName
    .trim()
    .split(/\s+/) // split by any whitespace
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");

  return limit ? initials.slice(0, limit) : initials;
}

export function formatString(
  input: string,
  options?: {
    case?: "title" | "upper" | "lower";
    preserveNumbers?: boolean;
    trim?: boolean;
    autoDetect?: boolean;
  }
): string {
  if (!input) return "";

  const {
    case: textCase = "title",
    preserveNumbers = true,
    trim = true,
    autoDetect = true,
  } = options || {};

  let formatted = input;

  // If autoDetect is on, check if string already looks clean
  if (autoDetect && /^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(formatted.trim())) {
    // Looks like a normal title case string → skip parsing
    return trim ? formatted.trim() : formatted;
  }

  // Handle camelCase and PascalCase
  formatted = formatted.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace underscores or hyphens with spaces
  formatted = formatted.replace(/[_-]+/g, " ");

  // Optionally add spaces before numbers
  if (!preserveNumbers) {
    formatted = formatted.replace(/(\d+)/g, " $1");
  }

  // Normalize spacing
  formatted = formatted.replace(/\s+/g, " ");

  if (trim) formatted = formatted.trim();

  // Apply case style
  switch (textCase) {
    case "upper":
      return formatted.toUpperCase();
    case "lower":
      return formatted.toLowerCase();
    case "title":
    default:
      return formatted
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
  }
}

export function getColorClass(label: string): string {
  const pastelColors = [
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-indigo-100 text-indigo-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-teal-100 text-teal-800",
    "bg-cyan-100 text-cyan-800",
    "bg-orange-100 text-orange-800",
  ];

  // Create a deterministic hash from the label so the same tag always has the same color
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % pastelColors.length;

  return pastelColors[index];
}

/**
 * Convert timestamp (seconds or ms) to "x days ago"
 * @param {number} ts - timestamp in seconds or milliseconds
 * @returns {string}
 */
export function smartTimeAgo(ts: any) {
  if (!ts) return "";

  // Detect if ts is in seconds (10 digits) or milliseconds (13 digits)
  const ms = ts < 1e12 ? ts * 1000 : ts;

  return dayjs(ms).fromNow();
}

// wsMessageDispatcher.ts

// Stores handlers for each msg_type
const handlers: Record<number, (data: any) => void> = {};

// Register handler
export function onWS(msgType: number, handler: (data: any) => void) {
  handlers[msgType] = handler;
}

// Call handler
export function dispatchWSMessage(data: any) {
  const handler = handlers[data.msg_type];

  if (handler) handler(data);
  else console.warn("No WS handler for msg_type:", data.msg_type);

  // Also dispatch as custom event so multiple listeners can receive it
  const event = new CustomEvent(`ws-message-${data.msg_type}`, {
    detail: data,
  });
  window.dispatchEvent(event);
}
