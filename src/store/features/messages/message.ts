// api/messageApi.ts
import { nirricApi } from "../api";

export const messageApi = nirricApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessageList: builder.query({
        // query: (conversationId) => `/chat/dialogs/`,
      query: (params = {}) => ({
        url: "/api/chat/dialogs/",
        params
      }),
    }),
    
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/api/messages/send/",
        method: "POST",
        body: messageData,
      }),
    }),

    // /api/messages/inbox/{user_identifier}/
    getConversation: builder.query({
      query: (conversationId) => `/api/chat/messages/${conversationId}/`,
    }),
    
    markAsRead: builder.mutation({
      query: (messageId) => ({
        url: `/api/messages/${messageId}/read/`,
        method: "PATCH",
      }),
    }),
    
    getEventsById: builder.query({
      query: (id) => `/api/events/${id}/`,
    }),
    
    getGalleryImages: builder.query({
      query: (params = {}) => ({ url: `/api/galleries/`, params }),
    }),
    
    getSuggestedConnections: builder.query({
      query: () => "/api/profile/suggestions/",
    }),
  }),

  overrideExisting: false,
});
