import { publicationApi } from "./publications";

export const {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
	useUploadPublicationMutation,
	useGetPublicationByIdQuery,
	useTrackPublicationViewQuery,
	useUpdatePublicationMutation,
	useDeletePublicationMutation,
	useGetSectorsQuery,
	useLikeOrUnlikePublicationMutation,
	useGetCommentsQuery,
	useCommentOnPublicationMutation,
	useDeleteCommentMutation,
	useLikeAndUnlikeCommentMutation,
	useFollowUserMutation,
	useUnfollowUserMutation,
	useDownloadPublicationMutation,
	useSharePublicationMutation,
	// useLikePublicationMutation,
	// useCommentOnPublicationMutation,
	// useSharePublicationMutation,
} = publicationApi;
