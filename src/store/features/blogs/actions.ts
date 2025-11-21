import { blogsApi } from "./blogs";

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useGetPublishedBlogsQuery,
    useGetRecentBlogsQuery,
} = blogsApi;
