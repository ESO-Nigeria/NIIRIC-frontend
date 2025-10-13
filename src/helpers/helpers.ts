import { publicationTypeOptions } from "@/store/mockData/mockdata";
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
	// Object.entries(payload).forEach(([key, value]) => {
	// 	if (value === undefined || value === null) return;

	// 	if (Array.isArray(value)) {
	// 		value.forEach((v) => {
	// 			// append arrays as field[]
	// 			if (isFile(v)) fd.append(`${key}[]`, v);
	// 			else fd.append(`${key}[]`, String(v));
	// 		});
	// 	} else if (isFile(value)) {
	// 		fd.append(key, value, value.name);
	// 	} else {
	// 		fd.append(key, String(value));
	// 	}
	// });
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