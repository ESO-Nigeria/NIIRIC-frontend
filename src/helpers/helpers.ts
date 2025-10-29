import { publicationTypeOptions } from "@/store/mockData/mockdata";
import { parseISO, isValid, format } from "date-fns";
import { jwtDecode } from "jwt-decode";

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
export function downloadPdfFromUrl(url: string, fileName = 'document.pdf') {
  if (!url) return console.error('No URL provided for PDF download');

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank'; 
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
export async function forceDownloadPdf(url: string, fileName = 'document.pdf') {
  if (!url) {
    console.error('No URL provided for PDF download');
    return;
  }

  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('Failed to fetch PDF');

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click(); // force download
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}

export function getInitials(fullName?: string, limit?: number): string {
  if (!fullName) return "";

  const initials = fullName
    .trim()
    .split(/\s+/) // split by any whitespace
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .join("");

  return limit ? initials.slice(0, limit) : initials;
}