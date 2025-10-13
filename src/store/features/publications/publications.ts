import { nirricApi } from "../api";

export const publicationApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getPublications: builder.query({
			query: () => "/api/publications/",
		}),
		getUserPublications: builder.query({
			query: () => "/api/publications/my_publications/",
		}),
		uploadPublication: builder.mutation({
			query: (newPublication) => ({
				url: "/api/publications/",
				method: "POST",
				body: newPublication,
			}),
			// invalidatesTags: ["Publications"],
		}),

		getPublicationById: builder.query({
			query: (id) => `/api/publications/${id}/`,
			// providesTags: ["Publications"],
		}),

		getSectors: builder.query({
			query: () => "/api/sectors/"
		})
	}),

	overrideExisting: false,
});
