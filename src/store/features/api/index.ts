import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser, setCredentials } from "../auth/auth.slice";

const BASE_URL =
	process.env.REACT_APP_API_URL ||
	"https://niiric-api-d3f7b4baewdvfjbp.westeurope-01.azurewebsites.net";

// Base query with token injection
const rawBaseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers, { getState }: any) => {
		const token = getState()?.auth?.token;
		console.log(token, "token", getState());
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

// Wrapper base query with refresh handling
const baseQueryWithReauth: typeof rawBaseQuery = async (
	args,
	api,
	extraOptions,
) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		// token expired or invalid
		const refreshToken = (api.getState() as any).auth.refreshToken;
		if (refreshToken) {
			// try refresh
			const refreshResult: any = await rawBaseQuery(
				{
					url: "/auth/jwt/refresh/",
					method: "POST",
					body: { refresh: refreshToken },
				},
				api,
				extraOptions,
			);

			if (refreshResult.data) {
				// save new tokens

				api.dispatch(setCredentials(refreshResult.data));

				// retry the original request with new token
				result = await rawBaseQuery(args, api, extraOptions);
			} else {
				// refresh failed, logout
				api.dispatch(logoutUser());
			}
		} else {
			api.dispatch(logoutUser());
		}
	}
	return result;
};

export const nirricApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Profile"],
	endpoints: () => ({}),
});

// export const questenceLeanersApi = createApi({
// 	reducerPath: "learnerApi",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: LEARNER_URL,
// 		prepareHeaders: (headers, { getState }: any) => {
// 			const token = getState().auth?.learner_token;
// 			if (token) {
// 				headers.set("Authorization", `Bearer ${token}`);
// 			}
// 			return headers;
// 		},
// 	}),
// 	tagTypes: ["Cart", "EnrolledCourses", "Profile"],
// 	endpoints: () => ({}),
// });
