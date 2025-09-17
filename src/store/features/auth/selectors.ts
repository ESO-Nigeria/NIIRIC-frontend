export const selectAuthenticatedUser = (state: {
	auth: { token: string; user_data: {} };
}) => state.auth.token && state.auth.token;
