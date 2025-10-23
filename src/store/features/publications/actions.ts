import { publicationApi } from "./publications";

export const {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
	useUploadPublicationMutation,
	useGetPublicationByIdQuery,
	useGetSectorsQuery,
	useLikeOrUnlikePublicationMutation,
	useGetCommentsQuery,
	useCommentOnPublicationMutation,
	useDeleteCommentMutation
	// useLikePublicationMutation,
	// useCommentOnPublicationMutation,
	// useSharePublicationMutation,
} = publicationApi;
