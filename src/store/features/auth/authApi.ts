import { nirricApi } from "../api";

export const authApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => "/auth/user/",
		}),
		login: builder.mutation({
			query: (body) => ({
				url: "/auth/login/",
				method: "POST",
				body,
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/registration/",
				method: "POST",
				body: credentials,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (credentials) => ({
				url: "/auth/registration/verify-email/",
				method: "POST",
				body: credentials,
			}),
		}),
		sendResetPasswordEmail: builder.mutation({
			query: (credentials) => ({
				url: "/auth/password/reset/",
				method: "POST",
				body: credentials,
			}),
		}),
		resetPassword: builder.mutation({
			query: (credentials) => ({
				url: "/auth/password/reset/confirm/",
				method: "POST",
				body: credentials,
			}),
		}),

		socialLogin: builder.mutation({
			query: ({ provider, redirectUri }) => ({
				url: `${process.env.NEXT_PUBLIC_API_URL}/auth/o/${provider}/?redirect_uri=${redirectUri}`,
				method: "GET",
				credentials: "include",
			}),
		}),

		socialVerifyLogin: builder.mutation({
			query: ({ provider, body }) => ({
				url: `/auth/o/${provider}/?state=${body?.state}&code=${encodeURIComponent(body?.code)}`,
				credentials: "include",
				method: "POST",
				// body: body
			}),
		}),

		getUserProfile: builder.query({
			query: () => "/api/profile/",
		}),

		updateUserProfile: builder.mutation({
			query: (credentials) => ({
				url: "/api/profile/",
				method: "POST",
				body: credentials,
			}),
		}),

		editUserProfile: builder.mutation({
			query: (credentials) => ({
				url: `/api/profile/${credentials?.id}/`,
				method: "PUT",
				body: credentials,
			}),
		}),
		
		getUserQualifications: builder.query({
			query: () => "/api/qualifications/",
		}),
		updateUserQualification: builder.mutation({
			query: (credentials) => ({
				url: "/api/qualifications/",
				method: "POST",
				body: credentials,
			}),
		}),
		editUserQualification: builder.mutation({
			query: (credentials) => ({
				url: `/api/qualifications/${credentials?.id}/`,
				method: "PUT",
				body: credentials,
			}),
		}),
		deleteUserQualification: builder.mutation({
			query: (credentials) => ({
				url: `/api/qualifications/${credentials?.id}/`,
				method: "Delete",
				body: credentials,
			}),
		}),
		getUserInterests: builder.query({
			query: () => "/api/research-interests/",
		}),
		updateUserInterests: builder.mutation({
			query: (credentials) => ({
				url: "/api/research-interests/",
				method: "POST",
				body: credentials,
			}),
		}),
		editUserInterests: builder.mutation({
			query: (credentials) => ({
				url: `/api/research-interests/${credentials?.id}/`,
				method: "PUT",
				body: credentials,
			}),
		}),
		deleteUserInterest: builder.mutation({
			query: (id) => ({
				url: `/api/research-interests/${id}/`,
				method: "Delete",
			}),
		}),
		getUserResearchArea: builder.query({
			query: () => "/api/research-areas/",
		}),
		updateUserResearchArea: builder.mutation({
			query: (credentials) => ({
				url: "/api/research-areas/",
				method: "POST",
				body: credentials,
			}),
		}),
		editUserResearchArea: builder.mutation({
			query: (credentials) => ({
				url: `/api/research-areas/${credentials?.id}/`,
				method: "PUT",
				body: credentials,
			}),
		}),
		getAllUsers: builder.query({
			query: (params) => ({
				url: "/api/users/",
				params,
			}),
		}),
		
		getAllPublishersProfile: builder.query({
			query: () => "/api/users/profiles/",
		}),
		
		getPublisherProfileById: builder.query({
			query: (id) => `/api/profile/${id}/` // /api/profile/{id}/
		}),

	}),
	overrideExisting: false,
});
