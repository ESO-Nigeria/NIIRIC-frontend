export const selectAuthenticatedUser = (state: {
	auth: { token: string; user_data: {} };
}) => state.auth.token && state.auth.token;

export const selectCurrentUser = (state: {
	auth: { token: string; user: {first_name: "", last_name: "", email: ""} };
}) => state.auth.user
