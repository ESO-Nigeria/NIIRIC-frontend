// auth.ts

import GoogleProvider from "@auth/core/providers/google";
import LinkedInProvider from "@auth/core/providers/linkedin";
import { NextAuth } from "@auth/nextjs";
import axios from "axios";

// Extend the Session type to include custom properties
import type { Session } from "@auth/nextjs";

declare module "@auth/nextjs" {
  interface Session {
	access?: string;
	refresh?: string;
  }
}

interface AuthenticatedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  // Accept both naming conventions for safety
  access?: string;
  refresh?: string;
  accessToken?: string;
  refreshToken?: string;
}

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
    // scopes: ["r_emailaddress", "r_liteprofile"],
  }),
] as any; // cast to any to avoid cross-package type mismatch


export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	debug: true,
	providers,
	callbacks: {
		  authorized: async (_ctx: any) => {
      return true;
    },
		async signIn({ user, account }) {
			if (!account) return false;

			try {
				if (account.provider === "google") {
					const { access_token, id_token } = account;
					const requestData = access_token ? { access_token } : { id_token };

					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login/`,
						requestData,
					);

					const { access, refresh, ...rest } = response.data;

					(user as AuthenticatedUser).access = access;
					(user as AuthenticatedUser).refresh = refresh;

					return true;
				}

				if (account.provider === "linkedin") {
					const { access_token } = account;

					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin/login/`,
						{ access_token },
					);

					const { access, refresh } = response.data;

					(user as AuthenticatedUser).access = access;
					(user as AuthenticatedUser).refresh = refresh;

					return true;
				}

				return false;
			} catch (error) {
				console.error("Backend authentication failed:", error);
				return false;
			}
		},
		// async redirect({ baseUrl }) {
		// 	return `${baseUrl}/google/callback/`;
		// },
		async jwt({ token, user, account }) {
			if (user && account) {
				token.accessToken = (user as AuthenticatedUser).access;
				token.refreshToken = (user as AuthenticatedUser).refresh;
			}
			return token;
		},
		async session({ session, token }: any ) {
			if (token.accessToken) session.access = token.accessToken;
			if (token.refreshToken) session.refresh = token.refreshToken;
			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
});
