import { authApi } from "./authApi";

export const {
	useGetProfileQuery,
	// useGetProfileChoicesQuery,
	useLoginMutation,
	// useLogoutMutation,
	useRegisterMutation,
	// useLogoutAllMutation,
	useVerifyEmailMutation,
	useSocialLoginMutation,
	useSocialVerifyLoginMutation
	// useEditProfileMutation,
	// useResetPasswordMutation,
	// useChangePasswordMutation,
	// useResetPasswordConfirmMutation,
	// useResendResetPasswordOTPMutation,
	// useResendVerificationCodeMutation,
} = authApi;
