import NextAuth, { Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { AuthenticatedUser } from "@/components/types/auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      version: "2.0",
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      issuer: "https://www.linkedin.com/oauth", 
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
          response_type: "code"
        }
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
        async request({ client, params, checks, provider }:{ client: any; 
          params: Record<string, any>;
          checks: Record<string, any>;
          provider: any; }) {
          const response = await client.callback(provider.callbackUrl, params, checks, {
            exchangeBody: {
              client_id: process.env.LINKEDIN_CLIENT_ID,
              client_secret: process.env.LINKEDIN_CLIENT_SECRET,
              grant_type: "authorization_code",
              code: params.code,
              redirect_uri: provider.callbackUrl,
            }
          });
          return {
            tokens: response
          };
        }
      },
      profile(profile: {sub: string, name: string, email: string, picture: string}) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ] as any,
  callbacks: {
    async signIn({ user, account }: { user: AuthenticatedUser; account: Account | null }) {
      if (!account) return false;
      if (account.provider === "google") {
        const { access_token, id_token } = account;
        try {
          // Use access_token (preferred by Django allauth) or fallback to id_token
          const requestData = access_token 
            ? { access_token } 
            : { id_token };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login/`,
            requestData
          );

          const { access, refresh, ...rest } = response.data;
          (user as AuthenticatedUser).access = access;
					(user as AuthenticatedUser).refresh = refresh;

					return true;
        } catch (error) {
          console.error("Backend authentication failed:", error);
          return false;
        }
      }
      
      if (account.provider === "linkedin") {
        const { access_token , id_token,code} = account;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin/login/`,
            { access_token, id_token, code }
          );

          const { access, refresh } = response.data;
          (user as AuthenticatedUser).access = access;
					(user as AuthenticatedUser).refresh = refresh;
          return true;
        } catch (error) {
          console.error("LinkedIn backend authentication failed:", error);
          return false;
        }
      }
      
      return false;
    },
    // async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    //   return url.startsWith(baseUrl) ? url : `${baseUrl}${url}`;
    // },
    async jwt({ token, user, account }: { token: JWT; user?: AuthenticatedUser; account?: Account | null;  }) {
      if (user && account) {
        token.accessToken = (user as AuthenticatedUser).access;
        token.refreshToken = (user as AuthenticatedUser).refresh;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.accessToken) session.access = token.accessToken;
			if (token.refreshToken) session.refresh = token.refreshToken;
			return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };