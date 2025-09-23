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
export const ORCID_URL_REGEX = /^https?:\/\/(www\.)?orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/i;
export const LINKEDIN_URL_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9\-_./?=#%]+$/i;
