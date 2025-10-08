import { publicationApi } from "./publications";

export const {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
	useUploadPublicationMutation,
	// useLikePublicationMutation,
	// useCommentOnPublicationMutation,
	// useSharePublicationMutation,
} = publicationApi;
