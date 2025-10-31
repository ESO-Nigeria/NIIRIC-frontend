import { nirricApi } from "../api";

export const publicationApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getPublications: builder.query({
			query: (params = {}) => ({
				url: '/api/publications/',
				params, 
			}),
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
		}),

		likeOrUnlikePublication: builder.mutation({
			query: ({ id, action }: { id: string; action: "like" | "unlike" }) => ({
				url: `/api/publications/${id}/${action}/`,
				method: "POST",
			}),
		}),

		// getComments: builder.query({
		// 	query: () => `/api/comments/`,
		// }),
		getComments: builder.query({
			query: (params = {}) => ({
				url: '/api/comments/',
				params, // <-- RTK Query + fetchBaseQuery will convert this to ?key=value
			}),
		}),
		commentOnPublication: builder.mutation({
			query: (body) => ({
				url: `/api/comments/`,
				method: "POST",
				body,
			}),
		}),
		
		deleteComment: builder.mutation({
			query: (id: string) => ({
				url: `/api/comments/${id}/`,
				method: "DELETE",
			}),
		}),
	}),
	overrideExisting: false,
});
