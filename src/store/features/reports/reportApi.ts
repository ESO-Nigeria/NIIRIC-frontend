import { nirricApi } from "../api";

export const reportApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getReports: builder.query({
			query: () => "/api/reports/",
		}),
		// login: builder.mutation({
		//   query: (body) => ({
		//     url: "/auth/jwt/create/",
		//     method: "POST",
		//     body,
		//   }),
		// }),
		// register: builder.mutation({
		//   query: (credentials) => ({
		//     url: "/auth/users/",
		//     method: "POST",
		//     body: credentials,
		//   }),
		// }),
		// verifyEmail: builder.mutation({
		//   query: (credentials) => ({
		//     url: "/auth/users/activation/",
		//     method: "POST",
		//     body: credentials,
		//   }),
		// }),
	}),

	overrideExisting: false,
});
