import { nirricApi } from "../api";

export const opportunityApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getOpportunities: builder.query({
			query: () => "/api/funding-opportunities/",
		}),
	}),

	overrideExisting: false,
});
