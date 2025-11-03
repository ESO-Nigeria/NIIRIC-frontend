import { publicationApi } from "./publications";

export const {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
	useUploadPublicationMutation,
	useGetPublicationByIdQuery,
	useUpdatePublicationMutation,
	useDeletePublicationMutation,
	useGetSectorsQuery,
	useLikeOrUnlikePublicationMutation,
	useGetCommentsQuery,
	useCommentOnPublicationMutation,
	useDeleteCommentMutation
	// useLikePublicationMutation,
	// useCommentOnPublicationMutation,
	// useSharePublicationMutation,
} = publicationApi;
