import { nirricApi } from "../api";

export const generalApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getEvents: builder.query({
			query: () => "/api/events/",
		}),
		getEventsById: builder.query({
			query: (id) => `/api/events/${id}/`,
		}),
		
		getSuggestedConnections: builder.query({
			query: () => "/api/profile/suggestions/"
		})
	}),

	overrideExisting: false,
});
