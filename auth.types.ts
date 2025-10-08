import "next-auth";

declare module "next-auth" {
  interface Session {
    // fields you add to session in your callbacks
    access?: string;
    refresh?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    access?: string;
    refresh?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}