import { nirricApi } from "../api";

export const blogsApi = nirricApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET all blogs (with optional filters/pagination)
        getBlogs: builder.query({
            query: (params = {}) => ({
                url: "/api/blogs/",
                params,
            }),
        }),

        // GET single blog by ID
        getBlogById: builder.query({
            query: (id: string) => `/api/blogs/${id}/`,
        }),

        // GET only published blogs
        getPublishedBlogs: builder.query({
            query: () => `/api/blogs/published/`,
        }),

        // GET recent blogs
        getRecentBlogs: builder.query({
            query: () => `/api/blogs/recent/`,
        }),

    }),

    overrideExisting: false,
});
