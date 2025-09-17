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
