import { createSlice } from "@reduxjs/toolkit";
import Storage from "@/lib/storage";

const cachedUser = Storage.get("user");

const defaultUser = {
	user: null,
	user_data: null,
	token: null,
	accessToken: null,
	refreshToken: null,
	profile: null,
};

const initialUser = defaultUser || cachedUser;

export const userSlice = createSlice({
	name: "auth",
	initialState: initialUser,
	reducers: {
		setCredentials: (state, { payload: { access, refresh, user } }) => {
			state.token = access;
			state.accessToken = access;
			state.refreshToken = refresh;
			state.user = user;
			Storage.set("user", {
				token: access,
				refreshToken: refresh,
				user: user,
			});
		},
		logoutUser: (state) => {
			state.user = null;
			state.user_data = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.token = null;
			Storage.remove("user");
		},
		setProfile: (state, { payload }) => {
			state.user_data = payload;
			state.user = payload;
		},
		setPublisherProfile: (state, { payload }) => {
			state.profile = payload ? payload[0] : null;
		},
	},
});

// export const authApiSlice = nirricApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProfile: builder.query({
//       query: () => `/auth/users/me/`,
//       //   providesTags: ["Profile"],
//     }),

//     getProfileChoices: builder.query({
//       query: () => `/cs/lookup`,
//     }),

//     /**
//      * mutations
//      */

//     login: builder.mutation({
//       query: (body) => ({
//         url: "/auth/jwt/create/",
//         method: "POST",
//         body,
//       }),
//     }),

//     logout: builder.mutation({
//       query: () => ({
//         url: "/cs/logout/",
//         method: "POST",
//       }),
//     }),
//     logoutAll: builder.mutation({
//       query: () => ({
//         url: "/cs/logoutall/",
//         method: "POST",
//       }),
//     }),
//     register: builder.mutation({
//       query: (credentials) => ({
//         url: "/auth/users/",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     verifyEmail: builder.mutation({
//       query: (credentials) => ({
//         url: "/auth/users/activation/",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     resendVerificationCode: builder.mutation({
//       query: (credentials) => ({
//         url: "cs/v2/account/learner/create/resend-otp/",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     changePassword: builder.mutation({
//       query: (body) => ({
//         url: "/cs/v2/account/change-password/",
//         method: "PATCH",
//         body,
//       }),
//     }),
//     resetPassword: builder.mutation({
//       query: (body) => ({
//         url: "/cs/v2/account/reset-password/request/",
//         method: "PATCH",
//         body,
//       }),
//     }),
//     resetPasswordConfirm: builder.mutation({
//       query: (body) => ({
//         url: "/cs/v2/account/reset-password/confirm-otp/",
//         method: "PATCH",
//         body,
//       }),
//     }),
//     resendResetPasswordOTP: builder.mutation({
//       query: (body) => ({
//         url: "/cs/v2/account/reset-password/resend-otp/",
//         method: "PATCH",
//         body,
//       }),
//     }),
//     editProfile: builder.mutation({
//       query: (body) =>
//         // console.log("Submitted Data:", body),
//         ({
//           url: "cs/profile/",
//           method: "PATCH",
//           body,
//         }),
//       invalidatesTags: ["Profile"],
//     }),
//   }),
// });

export const { logoutUser, setCredentials, setProfile, setPublisherProfile } =
	userSlice.actions;

export default userSlice.reducer;
