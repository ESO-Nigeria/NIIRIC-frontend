import { messageApi } from "./message";

export const {  useGetMessageListQuery,
  useSendMessageMutation,
  useGetConversationQuery,
  useMarkAsReadMutation,
  useGetEventsByIdQuery,
  useGetGalleryImagesQuery,
  useGetSuggestedConnectionsQuery } = messageApi