import { nirricApi } from "../api";

export const publicationApi = nirricApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublications: builder.query({
      query: (params = {}) => ({
        url: "/api/publications/",
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

    updatePublication: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/publications/${id}/`,
        method: "PATCH", // or "PATCH" if your backend allows partial updates
        body: data,
      }),
    }),

    getPublicationById: builder.query({
      query: (id) => `/api/publications/${id}/`,
      // providesTags: ["Publications"],
    }),

    trackPublicationView: builder.query({
      query: (id) => `/api/publications/${id}/view/`,
      // providesTags: ["Publications"],
    }),

    getSectors: builder.query({
      query: () => "/api/sectors/",
    }),

    likeOrUnlikePublication: builder.mutation({
      query: ({ id, action }: { id: string; action: "like" | "unlike" }) => ({
        url: `/api/publications/${id}/like/`,
        method: "POST",
      }),
    }),

    getComments: builder.query({
      query: (params = {}) => ({
        url: `/comments/api/${params?.content_type}/${params?.object_pk}/`,
        // params, // <-- RTK Query + fetchBaseQuery will convert this to ?key=value
      }),
    }),

    likeAndUnlikeComment: builder.mutation({
      query: (body) => ({
        url: `/comments/api/feedback/`,
        method: "POST",
        body,
      }),
    }),

    commentOnPublication: builder.mutation({
      query: (body) => ({
        url: `/comments/api/comment/`,
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

    deletePublication: builder.mutation({
      query: (id: string) => ({
        url: `/api/publications/${id}/`,
        method: "DELETE",
      }),
    }),

    followUser: builder.mutation({
      query: (userId: string) => ({
        url: `/api/follows/follow_user/`,
        method: "POST",
        body: { user_id: userId },
      }),
    }),

    unfollowUser: builder.mutation({
      query: (userId: string) => ({
        url: `/api/follows/unfollow_user/`,
        method: "POST",
        body: { user_id: userId },
      }),
    }),

    sharePublication: builder.mutation({
      query: (id: string) => ({
        url: `/api/publications/${id}/share/`,
        method: "POST",
      }),
    }),

    downloadPublication: builder.mutation({
      query: (id: string) => ({
        url: `/api/publications/${id}/download/`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});
