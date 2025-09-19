import { nirricApi } from "../api";

export const authApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => "/auth/users/me/",
		}),
		login: builder.mutation({
			query: (body) => ({
				url: "/auth/jwt/create/",
				method: "POST",
				body,
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/users/",
				method: "POST",
				body: credentials,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (credentials) => ({
				url: "/auth/users/activation/",
				method: "POST",
				body: credentials,
			}),
		}),
		  // ✅ New: Social OAuth mutation
    socialLogin: builder.mutation({
      query: ({ provider, redirectUri }) => ({
				url: `${process.env.NEXT_PUBLIC_API_URL}/auth/o/${provider}/?redirect_uri=${redirectUri}`,
        method: "GET",
				credentials: 'include',
      }),
    }),
		socialVerifyLogin: builder.mutation({
      query: ({ provider, body }) => ({
				url: `/auth/o/${provider}/?state=${body?.state}&code=${encodeURIComponent(body?.code)}`,
				credentials: 'include',
        method: "POST",
				// body: body
      }),
    }),
	}),

	overrideExisting: false,
});
