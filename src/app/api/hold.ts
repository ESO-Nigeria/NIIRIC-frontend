// import axios from "axios";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { AuthenticatedUser } from "@/components/types/auth";

// // LinkedIn provider config for v4
// const LinkedInProvider = {
// 	id: "linkedin",
// 	name: "LinkedIn",
// 	type: "oauth",
// 	version: "2.0",
// 	wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
// 	issuer: "https://www.linkedin.com/oauth",
// 	clientId: process.env.LINKEDIN_CLIENT_ID!,
// 	clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
// 	authorization: {
// 		params: {
// 			scope: "openid profile email",
// 			response_type: "code",
// 		},
// 	},
// 	token: {
// 		url: "https://www.linkedin.com/oauth/v2/accessToken",
// 		async request({ client, params, checks, provider }: any) {
// 			const response = await client.callback(
// 				provider.callbackUrl,
// 				params,
// 				checks,
// 				{
// 					exchangeBody: {
// 						client_id: process.env.LINKEDIN_CLIENT_ID,
// 						client_secret: process.env.LINKEDIN_CLIENT_SECRET,
// 						grant_type: "authorization_code",
// 						code: params.code,
// 						redirect_uri: provider.callbackUrl,
// 					},
// 				},
// 			);
// 			return { tokens: response };
// 		},
// 	},
// 	profile(profile: any) {
// 		return {
// 			id: profile.sub,
// 			name: profile.name,
// 			email: profile.email,
// 			image: profile.picture,
// 		};
// 	},
// };

// export default NextAuth({
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// 		}),
// 		LinkedInProvider,
// 	],
// 	callbacks: {
// 		async signIn({
// 			user,
// 			account,
// 			profile,
// 		}: {
// 			user: AuthenticatedUser;
// 			account: any;
// 			profile: any;
// 		}) {
// 			if (account.provider === "google") {
// 				const { access_token, id_token } = account;
// 				try {
// 					const requestData = access_token ? { access_token } : { id_token };
// 					const response = await axios.post(
// 						"http://127.0.0.1:8000/auth/google/login/",
// 						requestData,
// 					);
// 					const { access, refresh } = response.data;
// 					user.accessToken = access;
// 					user.refreshToken = refresh;
// 					return true;
// 				} catch (error) {
// 					console.error("Backend authentication failed:", error);
// 					return false;
// 				}
// 			}

// 			if (account.provider === "linkedin") {
// 				const { access_token, id_token, code } = account;
// 				try {
// 					const response = await axios.post(
// 						"http://127.0.0.1:8000/auth/linkedin/login/",
// 						{
// 							access_token,
// 							id_token,
// 							code,
// 						},
// 					);
// 					const { access, refresh } = response.data;
// 					user.accessToken = access;
// 					user.refreshToken = refresh;
// 					return true;
// 				} catch (error) {
// 					console.error("LinkedIn backend authentication failed:", error);
// 					return false;
// 				}
// 			}

// 			return false;
// 		},
// 		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
// 			return url.startsWith(baseUrl) ? url : `${baseUrl}${url}`;
// 		},
// 		async jwt({ token, user }: { token: any; user?: AuthenticatedUser }) {
// 			if (user) {
// 				token.accessToken = user.accessToken;
// 				token.refreshToken = user.refreshToken;
// 			}
// 			return token;
// 		},
// 		async session({ session, token }: { session: any; token: any }) {
// 			session.accessToken = token.accessToken;
// 			session.refreshToken = token.refreshToken;
// 			return session;
// 		},
// 	},
// });
