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
	}),

	overrideExisting: false,
});
