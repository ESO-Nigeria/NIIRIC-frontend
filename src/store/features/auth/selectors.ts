import { User } from "@/components/types/profile";

export const selectAuthenticatedUser = (state: {
	auth: { token: string };
}) => state.auth.token && state.auth.token;

export const selectCurrentUser = (state: {
	auth: { token: string; user: User };
}) => state.auth.user;

export const currentUserProfile = (state: { auth: { profile: [] } }) =>
	state.auth.profile || null;
