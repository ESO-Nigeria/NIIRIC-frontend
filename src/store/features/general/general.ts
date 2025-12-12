import { nirricApi } from "../api";

export const generalApi = nirricApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({ query: () => "/api/events/" }),
    getEventsById: builder.query({ query: (id) => `/api/events/${id}/` }),
    getGalleryImages: builder.query({ query: (params = {}) => ({ url: `/api/galleries/`, params }) }),
    getSuggestedConnections: builder.query({ query: () => "/api/profile/suggestions/" }),
    
    // Fetch sectors from backend
    getSectors: builder.query({
      query: () => "/api/sectors/",
    }),

    // new newsletter subscription mutation
    subscribeNewsletter: builder.mutation({
      query: (payload: { email: string; is_active?: boolean }) => ({
        url: "/api/newsletter-subscribers/",
        method: "POST",
        body: { ...payload, is_active: true },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEventsQuery,
  useGetEventsByIdQuery,
  useGetGalleryImagesQuery,
  useGetSuggestedConnectionsQuery,
  useGetSectorsQuery, 
  useSubscribeNewsletterMutation,
} = generalApi;
